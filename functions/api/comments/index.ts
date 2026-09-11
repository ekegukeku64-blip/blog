import { corsHeaders } from '../../_lib/cors'
import { fail, json, readJsonBody, rejectUnknownKeys } from '../../_lib/http'
import { cleanContent, cleanDisplayName, cleanPageId, cleanPhotoUrl } from '../../_lib/validate'
import { requireUser } from '../../_lib/auth'
import { checkLimits, HOUR } from '../../_lib/ratelimit'
import {
  COMMENT_COLUMNS,
  COMMENT_PAGE_LIMIT,
  toPublicComment,
  type CommentRow,
} from '../../_lib/comments'
import type { Ctx } from '../../_lib/types'

// firestore.rules: `allow read: if resource.data.status == 'approved'`.
// Unauthenticated, and only ever approved rows.
export async function onRequestGet(ctx: Ctx): Promise<Response> {
  const cors = corsHeaders(ctx.request, ctx.env)

  const pageId = cleanPageId(new URL(ctx.request.url).searchParams.get('pageId') ?? '')
  if (!pageId) return fail(400, 'pageId 不合法', cors)

  const rows = await ctx.env.DB.prepare(
    `SELECT ${COMMENT_COLUMNS}
     FROM comments
     WHERE page_id = ?1 AND status = 'approved'
     ORDER BY created_at DESC
     LIMIT ?2`,
  )
    .bind(pageId, COMMENT_PAGE_LIMIT)
    .all<CommentRow>()

  return json({ comments: (rows.results ?? []).map(toPublicComment) }, 200, cors)
}

// firestore.rules: create requires auth, uid == auth.uid, a strict key
// whitelist, per-field length/format limits, status == 'pending' and
// createdAt == request.time. Here the server decides uid, status and createdAt
// itself and refuses any unexpected key, so none of those can be forged.
export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const cors = corsHeaders(ctx.request, ctx.env)

  const guard = await requireUser(ctx, cors)
  if (!guard.ok) return guard.response
  const user = guard.user

  // Not in Firestore, but a comment endpoint with no ceiling is an open door for
  // spam once registration is public.
  const verdict = await checkLimits(ctx.env, [
    { bucket: `comment:user:${user.id}`, windowMs: HOUR, max: 30 },
  ])
  if (!verdict.ok) {
    return fail(429, '评论过于频繁，请稍后再试', {
      ...cors,
      'Retry-After': String(verdict.retryAfterSeconds),
    })
  }

  const parsed = await readJsonBody(ctx.request, cors)
  if (!parsed.ok) return parsed.response

  const unknown = rejectUnknownKeys(parsed.body, ['pageId', 'content', 'displayName', 'photoURL'])
  if (unknown) return fail(400, unknown, cors)

  const pageId = cleanPageId(parsed.body.pageId)
  if (!pageId) return fail(400, 'pageId 不合法', cors)

  const content = cleanContent(parsed.body.content)
  if (!content) return fail(400, '内容不能为空，且不超过 2000 字节', cors)

  // Display name and avatar default to the account's; the client may override
  // per comment, which is what the old form did.
  const displayName =
    parsed.body.displayName === undefined ? user.displayName : cleanDisplayName(parsed.body.displayName)
  if (displayName === null) return fail(400, '昵称不合法', cors)

  const photoURL =
    parsed.body.photoURL === undefined ? user.photoURL : cleanPhotoUrl(parsed.body.photoURL)
  if (photoURL === null) return fail(400, '头像地址不合法', cors)

  const id = crypto.randomUUID()
  const now = Date.now()

  await ctx.env.DB.prepare(
    `INSERT INTO comments
       (id, page_id, user_id, legacy_uid, display_name, photo_url, content, status, created_at)
     VALUES (?1, ?2, ?3, NULL, ?4, ?5, ?6, 'pending', ?7)`,
  )
    .bind(id, pageId, user.id, displayName, photoURL, content, now)
    .run()

  return json(
    {
      comment: toPublicComment({
        id,
        page_id: pageId,
        user_id: user.id,
        legacy_uid: null,
        display_name: displayName,
        photo_url: photoURL,
        content,
        status: 'pending',
        created_at: now,
      }),
    },
    201,
    cors,
  )
}
