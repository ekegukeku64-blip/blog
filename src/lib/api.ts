// Client for the self-hosted auth + comments API (Cloudflare Pages Functions).
//
// This replaces src/lib/firebase.ts. The exported names deliberately mirror the
// Firebase version (onAuth, logout, isFirebaseConfigured, the Comment shape) so
// that Comment.astro and admin.astro needed as little surgery as possible.
//
// Auth is a bearer token rather than a cookie: the site is on github.io and the
// API is on pages.dev, so any cookie would be third-party and would be dropped
// by Safari ITP / Firefox TCP / Chrome partitioning. A header token sidesteps
// that entirely, and removes the CSRF surface along with it.

const API_BASE = String(import.meta.env.PUBLIC_API_BASE || '').replace(/\/+$/, '')

// Kept as the old name so the existing "not configured" guards in Comment.astro
// and admin.astro keep working unchanged.
export const isFirebaseConfigured = API_BASE.length > 0

const TOKEN_KEY = 'blog-api-token'

export type User = {
  uid: string
  email: string
  displayName: string
  photoURL: string
  isAdmin: boolean
}

// createdAt keeps a toDate()/toMillis() shape because the renderers and the
// sort comparators were written against Firestore Timestamps.
export type Comment = {
  id: string
  uid: string
  pageId: string
  displayName: string
  photoURL: string
  content: string
  status: string
  createdAt: { toDate: () => Date; toMillis: () => number } | null
}

export type CommentStatus = 'approved' | 'pending' | 'rejected'

type Listener = (user: User | null) => void

const listeners = new Set<Listener>()
let currentUser: User | null = null

function getToken(): string {
  try {
    return localStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

function setToken(token: string): void {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    // Private mode or storage disabled: the session simply will not persist
    // across navigations.
  }
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown; auth?: boolean } = {},
): Promise<T> {
  if (!API_BASE) throw new Error('API 未配置')

  const { method = 'GET', body, auth = false } = options
  const headers: Record<string, string> = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (!token) throw new Error('未登录')
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  if (response.status === 204) return undefined as T

  let payload: unknown = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'error' in payload
        ? String((payload as { error: unknown }).error)
        : `请求失败（${response.status}）`
    throw new Error(message)
  }

  return payload as T
}

function toComment(raw: {
  id: string
  uid: string
  pageId: string
  displayName: string
  photoURL: string
  content: string
  status: string
  createdAt: string
}): Comment {
  const ms = Date.parse(raw.createdAt)
  const safeMs = Number.isFinite(ms) ? ms : 0
  return {
    id: raw.id,
    uid: raw.uid,
    pageId: raw.pageId,
    displayName: raw.displayName,
    photoURL: raw.photoURL,
    content: raw.content,
    status: raw.status,
    createdAt: {
      toDate: () => new Date(safeMs),
      toMillis: () => safeMs,
    },
  }
}

function emit(): void {
  for (const listener of [...listeners]) {
    try {
      listener(currentUser)
    } catch (error) {
      console.error('onAuth listener failed:', error)
    }
  }
}

async function loadCurrentUser(): Promise<User | null> {
  if (!API_BASE || !getToken()) return null
  try {
    const data = await request<{ user: User }>('/api/auth/me', { auth: true })
    return data.user
  } catch {
    // An expired or revoked token lands here; drop it so the UI shows the
    // signed-out state rather than retrying forever.
    setToken('')
    return null
  }
}

// Fires once on subscribe with the current state, then again after every
// login/logout. Returns an unsubscribe function.
export function onAuth(callback: Listener): () => void {
  listeners.add(callback)
  void (async () => {
    const user = await loadCurrentUser()
    if (!listeners.has(callback)) return
    currentUser = user
    callback(user)
  })()
  return () => {
    listeners.delete(callback)
  }
}

export async function register(email: string, password: string, displayName: string): Promise<User> {
  const data = await request<{ token: string; user: User }>('/api/auth/register', {
    method: 'POST',
    body: { email, password, displayName },
  })
  setToken(data.token)
  currentUser = data.user
  emit()
  return data.user
}

export async function login(email: string, password: string): Promise<User> {
  const data = await request<{ token: string; user: User }>('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  })
  setToken(data.token)
  currentUser = data.user
  emit()
  return data.user
}

export async function logout(): Promise<void> {
  try {
    await request('/api/auth/logout', { method: 'POST', auth: true })
  } finally {
    setToken('')
    currentUser = null
    emit()
  }
}

export async function fetchComments(pageId: string): Promise<Comment[]> {
  const data = await request<{ comments: Parameters<typeof toComment>[0][] }>(
    `/api/comments?pageId=${encodeURIComponent(pageId)}`,
  )
  return data.comments.map(toComment)
}

const POLL_INTERVAL_MS = 20_000

// The Firebase version used a live snapshot. There is no push channel here, so
// this polls instead - and skips ticks while the tab is hidden so a background
// tab is not hitting the API forever.
export function subscribeComments(
  pageId: string,
  onData: (comments: Comment[]) => void,
  onError: (error: unknown) => void,
): () => void {
  let stopped = false

  const tick = async () => {
    if (stopped || document.hidden) return
    try {
      const comments = await fetchComments(pageId)
      if (!stopped) onData(comments)
    } catch (error) {
      if (!stopped) onError(error)
    }
  }

  void tick()
  const timer = window.setInterval(() => void tick(), POLL_INTERVAL_MS)
  const onVisible = () => {
    if (!document.hidden) void tick()
  }
  document.addEventListener('visibilitychange', onVisible)

  return () => {
    stopped = true
    window.clearInterval(timer)
    document.removeEventListener('visibilitychange', onVisible)
  }
}

export async function createComment(input: {
  pageId: string
  content: string
}): Promise<Comment> {
  const data = await request<{ comment: Parameters<typeof toComment>[0] }>('/api/comments', {
    method: 'POST',
    auth: true,
    body: { pageId: input.pageId, content: input.content },
  })
  return toComment(data.comment)
}

export async function deleteComment(id: string): Promise<void> {
  await request(`/api/comments/${encodeURIComponent(id)}`, { method: 'DELETE', auth: true })
}

export async function adminListComments(): Promise<Comment[]> {
  const data = await request<{ comments: Parameters<typeof toComment>[0][] }>(
    '/api/admin/comments',
    { auth: true },
  )
  return data.comments.map(toComment)
}

export async function adminSetStatus(id: string, status: CommentStatus): Promise<void> {
  await request(`/api/comments/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    auth: true,
    body: { status },
  })
}
