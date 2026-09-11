import type { Env } from './types'

// Fixed-window counters in D1. Login and registration are the only endpoints
// that need this; both are abuse targets (credential stuffing, mass account
// creation) and neither is safe without it.

export interface LimitRule {
  bucket: string
  windowMs: number
  max: number
}

export const MINUTE = 60_000
export const HOUR = 60 * MINUTE

// 10 attempts/minute and 100/hour per IP and per email. Generous enough for a
// shared/CGNAT address, tight enough to make guessing useless.
export function loginRules(ip: string, email: string): LimitRule[] {
  return [
    { bucket: `login:ip:${ip}`, windowMs: MINUTE, max: 10 },
    { bucket: `login:ip:${ip}`, windowMs: HOUR, max: 100 },
    { bucket: `login:email:${email}`, windowMs: MINUTE, max: 10 },
    { bucket: `login:email:${email}`, windowMs: HOUR, max: 100 },
  ]
}

// 10/hour and 50/day per IP: tight enough to make mass account creation
// pointless, loose enough that a shared campus or CGNAT address still works.
export function registerRules(ip: string): LimitRule[] {
  return [
    { bucket: `register:ip:${ip}`, windowMs: HOUR, max: 10 },
    { bucket: `register:ip:${ip}`, windowMs: 24 * HOUR, max: 50 },
  ]
}

export interface LimitVerdict {
  ok: boolean
  retryAfterSeconds: number
}

// Increments every counter before deciding, so a burst cannot slip through by
// racing several requests past a read-then-write check.
export async function checkLimits(env: Env, rules: LimitRule[]): Promise<LimitVerdict> {
  const now = Date.now()
  let worstRetry = 0

  for (const rule of rules) {
    const windowStart = Math.floor(now / rule.windowMs) * rule.windowMs
    const row = await env.DB.prepare(
      `INSERT INTO rate_limits (bucket, window_start, count)
       VALUES (?1, ?2, 1)
       ON CONFLICT (bucket, window_start) DO UPDATE SET count = count + 1
       RETURNING count`,
    )
      .bind(rule.bucket, windowStart)
      .first<{ count: number }>()

    const count = row?.count ?? 0
    if (count > rule.max) {
      const retry = Math.max(1, Math.ceil((windowStart + rule.windowMs - now) / 1000))
      if (retry > worstRetry) worstRetry = retry
    }
  }

  if (worstRetry > 0) return { ok: false, retryAfterSeconds: worstRetry }
  return { ok: true, retryAfterSeconds: 0 }
}

// Counters are only ever written by the auth endpoints, so the table stays
// small and this cheap sweep is enough to stop unbounded growth.
export async function purgeOldCounters(env: Env): Promise<void> {
  const cutoff = Date.now() - 48 * HOUR
  await env.DB.prepare('DELETE FROM rate_limits WHERE window_start < ?1').bind(cutoff).run()
}

export function clientIp(request: Request): string {
  // Set by Cloudflare's edge; a client cannot forge it through the proxy.
  return request.headers.get('CF-Connecting-IP') || 'unknown'
}
