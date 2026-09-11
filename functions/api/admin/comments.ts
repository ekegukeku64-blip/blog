import { corsHeaders } from '../../_lib/cors'
import { fail, json } from '../../_lib/http'
import { isCommentStatus, type CommentStatus } from '../../_lib/validate'
import { requireAdmin } from '../../_lib/auth'
import {
  COMMENT_COLUMNS,
  COMMENT_PAGE_LIMIT,
  toPublicComment,
  type CommentRow,
} from '../../_lib/comments'
import type { Ctx } from '../../_lib/types'

// Admin moderation list: every status, newest first. Mirrors the old
// `getDocs(query(collection(db,'comments'), orderBy('createdAt','desc')))`,
// which the admins rule allowed.
export async function onRequestGet(ctx: Ctx): Promise<Response> {
  const cors = corsHeaders(ctx.request, ctx.env)

  const guard = await requireAdmin(ctx, cors)
  if (!guard.ok) return guard.response

  const raw = (new URL(ctx.request.url).searchParams.get('status') || '').trim()
  let filter: CommentStatus | null = null
  if (raw.length > 0) {
    if (!isCommentStatus(raw)) return fail(400, 'status 不合法', cors)
    filter = raw
  }

  const rows = filter
    ? await ctx.env.DB.prepare(
        `SELECT ${COMMENT_COLUMNS} FROM comments WHERE status = ?1 ORDER BY created_at DESC LIMIT ?2`,
      )
        .bind(filter, COMMENT_PAGE_LIMIT)
        .all<CommentRow>()
    : await ctx.env.DB.prepare(
        `SELECT ${COMMENT_COLUMNS} FROM comments ORDER BY created_at DESC LIMIT ?1`,
      )
        .bind(COMMENT_PAGE_LIMIT)
        .all<CommentRow>()

  return json({ comments: (rows.results ?? []).map(toPublicComment) }, 200, cors)
}

