// Shared row shape + serialiser for comments.
//
// The client was written against Firestore documents, so the JSON keeps the same
// field names (displayName, photoURL, createdAt) and `createdAt` is an ISO
// string that the client wraps back into a `{ toDate() }` object. That keeps
// Comment.astro's date formatting untouched.

export interface CommentRow {
  id: string
  page_id: string
  user_id: string | null
  legacy_uid: string | null
  display_name: string
  photo_url: string
  content: string
  status: string
  created_at: number
}

export interface PublicComment {
  id: string
  uid: string
  // The admin UI lists and searches by page, so this has to be in the payload.
  pageId: string
  displayName: string
  photoURL: string
  content: string
  status: string
  createdAt: string
}

export const COMMENT_COLUMNS =
  'id, page_id, user_id, legacy_uid, display_name, photo_url, content, status, created_at'

// A migrated row has no account, so it reports the old Firebase UID (which was
// already public in Firestore) and never matches a logged-in user's uid.
export function toPublicComment(row: CommentRow): PublicComment {
  return {
    id: row.id,
    uid: row.user_id ?? row.legacy_uid ?? '',
    pageId: row.page_id,
    displayName: row.display_name,
    photoURL: row.photo_url,
    content: row.content,
    status: row.status,
    createdAt: new Date(row.created_at).toISOString(),
  }
}

// Guard against a single page growing an unbounded response. Well past any
// realistic comment count for a personal blog.
export const COMMENT_PAGE_LIMIT = 500
