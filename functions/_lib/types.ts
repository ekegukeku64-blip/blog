// Minimal structural types for the Pages Functions runtime.
//
// Deliberately not depending on @cloudflare/workers-types: functions/ is
// excluded from `astro check`, and these signatures are enough to catch typos
// at the call sites without adding a dependency to the blog's package.json.

export interface D1Result<T> {
  results?: T[]
  success: boolean
}

export interface D1Statement {
  bind(...values: unknown[]): D1Statement
  first<T = unknown>(): Promise<T | null>
  all<T = unknown>(): Promise<D1Result<T>>
  run(): Promise<D1Result<unknown>>
}

export interface D1Like {
  prepare(query: string): D1Statement
  batch(statements: D1Statement[]): Promise<D1Result<unknown>[]>
}

export interface Env {
  DB: D1Like
  PBKDF2_PEPPER?: string
  PBKDF2_ITERATIONS?: string
  ALLOWED_ORIGINS?: string
}

export interface Ctx {
  request: Request
  env: Env
  params: Record<string, string>
  next: () => Promise<Response>
  data: Record<string, unknown>
}
