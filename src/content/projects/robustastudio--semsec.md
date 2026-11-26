---
title: "RobustaStudio/semsec"
owner: "RobustaStudio"
name: "semsec"
fullName: "RobustaStudio/semsec"
description: "High-precision Semgrep security rules — 146 taint-tracking and secret detection rules for Python, JavaScript, Java, PHP covering 75 providers. By Robusta Studio."
sourceUrl: "https://github.com/RobustaStudio/semsec"
stars: 106
forks: 10
language: "Python"
topics: ["appsec", "code-security", "cwe", "devsecops", "hardcoded-secrets", "java-security", "javascript-security", "owasp"]
license: "MIT"
defaultBranch: "main"
snapshotDate: "2026-11-26"
pushedAt: "2026-11-25T21:16:35Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

Stop vulnerabilities before they ship. Catch leaked secrets before they cost you.


  
  
  
  


---

# SemSec

**SemSec** is Robusta Studio's open-source Semgrep ruleset built for teams that ship fast and refuse to ship insecure. It combines **taint-tracking vulnerability detection** across 4 languages, **vibe-coding security checks** for Supabase/Next.js/Firebase, and **precision secret scanning** for 75 cloud providers — all in one `semgrep --config` command.

Every rule traces back to a real exploit. Not theory. Not "best practice." Real CVEs, real HackerOne reports, real breaches — distilled from **60,517 vulnerability records** into patterns that catch what matters and stay quiet when it doesn't.

---

## Why SemSec

Most static analysis tools bury you in noise. SemSec takes a different approach:

**Taint-mode, not pattern-match.** Rules don't just grep for `exec()` — they trace whether attacker-controlled HTTP input actually reaches the dangerous sink. If your code sanitizes the input, the rule stays silent. This is the difference between 200 false positives and 3 real findings.

**Grounded in real exploits.** Every rule maps to actual CVEs and HackerOne reports. The SQL injection rule catches `CVE-2022-24266` patterns. The SSRF rule catches `CVE-2021-40438` patterns. The command injection rule catches `CVE-2023-30258` patterns. If it hasn't caused a breach, it's not in here.

**Secret detection that knows the format.** Not regex soup hoping to match "anything that looks secret." Each detector targets a provider's exact key format — AWS keys start with `AKIA`, Stripe keys start with `sk_live_`, Anthropic keys start with `sk-ant-api03-`. Precise prefix + length + charset = high confidence, low noise.

---

## Quick Start

```bash
# Clone
git clone https://github.com/RobustaStudio/semsec.git

# Scan your project with everything
semgrep --config semsec/ /path/to/your/project

# Vibe coding audit — Supabase RLS, Next.js auth, Firebase rules
semgrep --config semsec/vibe-coding-security.yaml .

# Secrets only — find leaked keys in 30 seconds
semgrep --config semsec/hardcoded-secrets.yaml .

# Web vulnerabilities only — Python
semgrep --config semsec/python-web-taint.yaml .

# CI-ready SARIF output
semgrep --config semsec/ --sarif -o results.sarif .
```

---

## What's Inside

### Vulnerability Detection (47 rules)

Taint-tracking rules that follow data from **HTTP input** through **dangerous sinks**, with sanitizer exceptions to eliminate false positives.

| Ruleset | Rules | Frameworks | Vulnerability Classes |
|---------|-------|------------|----------------------|
| **Python** | 10 | Django, Flask, FastAPI | SQLi, CMDi, SSRF, Path Traversal, SSTI, XXE, Deserialization, File Upload, Open Redirect |
| **JavaScript** | 8 | Express, Node.js | XSS, SQLi, CMDi, SSRF, Prototype Pollution, NoSQL Injection, Path Traversal |
| **Java** | 7 | Spring Boot, Servlet | SQLi, CMDi, Deserialization, XXE, EL Injection, LDAP Injection |
| **PHP** | 7 | Laravel, WordPress | SQLi, CMDi, LFI, Deserialization, XSS, SSRF, `extract()` abuse |
| **Auth & Access** | 8 | Cross-language | Hardcoded JWT secrets, Missing Auth on APIs, IDOR, CSRF bypass, Cookie trust, WP nopriv |
| **Crypto** | 7 | Cross-language | MD5 passwords, ECB mode, deprecated ciphers, `Math.random()` tokens, TLS verification disabled |

### Vibe Coding Security (35 rules)

Purpose-built rules for the most common mistakes in AI-assisted / vibe-coded web apps:

| Category | Rules | What It Catches |
|----------|-------|-----------------|
| **Supabase** | 7 | RLS disabled/bypassed, service key on client, permissive policies, `USING (true)`, `getSession()` instead of `getUser()`, `select("*")` over-fetching |
| **Next.js** | 4 | API routes without auth, Server Actions without auth, `NEXT_PUBLIC_` secret exposure, middleware matcher gaps |
| **Firebase** | 3 | `allow read/write: if true`, Admin SDK in client-side code |
| **Stripe** | 2 | Webhook signature not verified, payment amount from client input |
| **Auth** | 3 | Client-side role checks, hardcoded admin emails, JWT decode without verify |
| **CORS** | 2 | Wildcard origin, wildcard + credentials |
| **Data Exposure** | 2 | Prisma user returned without field filtering, Supabase `select("*")` |
| **Input Validation** | 2 | Server Actions / API routes without Zod validation, mass assignment |
| **IDOR** | 1 | Delete/update by URL param without ownership check |
| **Database** | 2 | Drizzle `sql.raw()` injection, Prisma `$queryRawUnsafe` injection |
| **AI Security** | 2 | Prompt injection via user input in system prompt, OpenAI key on client |
| **Deployment** | 2 | Secrets in `.env` files, debug mode in production |
| **Rate Limiting** | 1 | Auth endpoints without rate limiting |
| **File Upload** | 1 | Upload without file type validation |
| **Storage** | 1 | Public Supabase bucket uploads |

### React & Vue Client-Side Security (20 rules)

| Category | What It Catches |
|----------|-----------------|
| **XSS** | `dangerouslySetInnerHTML`, `v-html`, `innerHTML`, `document.write()`, `ref.current.innerHTML`, iframe `srcdoc`/`src`, `blocked:` URLs, HTML parser libraries |
| **Code Execution** | `eval()`, `Function()`, `setTimeout(string)` |
| **postMessage** | Missing origin validation, wildcard `"*"` target |
| **Open Redirect** | `location.href` / router navigation from URL params |
| **Token Storage** | Tokens/secrets in `localStorage`/`sessionStorage`, `document.cookie` |
| **Misc** | `target="_blank"` without `noopener`, `URL.createObjectURL` with untrusted blob |

### ORM Security — Prisma, Drizzle, Mongoose (17 rules)

| ORM | What It Catches |
|-----|-----------------|
| **Prisma** | Mass assignment (`create({ data: req.body })`), `deleteMany`/`updateMany` without owner, `$queryRawUnsafe`, raw query concatenation, user object returned unfiltered |
| **Drizzle** | `sql.raw()` with input, `execute` with concatenation, `delete`/`update` without `.where()` |
| **Mongoose** | `$where` JS injection, mass assignment on `findByIdAndUpdate`, `findByIdAndDelete` without ownership, query injection via `req.query`, missing `runValidators` |

### Serverless & Edge Functions (15 rules)

| Platform | What It Catches |
|----------|-----------------|
| **Cloudflare Workers** | `eval()`/`Function()` in workers, secrets in `wrangler.toml` |
| **AWS Lambda** | `AuthType: NONE` (SAM + serverless.yml), raw error exposure, secrets in IaC |
| **Vercel Edge** | Edge handler without auth, narrow middleware matcher |
| **Deno Deploy** | Path traversal via `Deno.readFile`/`Deno.writeFile` with user input |
| **General** | CORS wildcard in responses/config, missing body size limit, auth timing attacks, error leaks |

### Webhook Security (16 rules)

Catches unverified webhook handlers for: **Clerk**, **GitHub**, **Paddle**, **LemonSqueezy**, **Resend**, **Twilio**, **SendGrid**, **Shopify**, **Svix**, **Discord**, **Slack**, plus generic catch-all. Also detects trust-before-verify, error disclosure, and replay/idempotency issues.

### tRPC & GraphQL Security (13 rules)

| Framework | What It Catches |
|-----------|-----------------|
| **tRPC** | Mutations on `publicProcedure`, DB writes without auth, missing `.input()` validation, full user object returned, verbose error exposure |
| **GraphQL** | Introspection enabled in production, no depth/complexity limit, resolver mutations without auth, password fields in schema, `persistedQueries: false`, N+1 without DataLoader, subscriptions without auth, dynamic `buildSchema` |

### Secret Detection (99 rules, 75 providers)

Provider-specific patterns targeting exact key formats — prefix, length, character set — for maximum confidence and minimal false positives.


Cloud & Infrastructure (13 providers)

AWS (Access Key + Secret Key), GCP (API Key + Service Account), Azure (Storage + DevOps PAT), Alibaba Cloud, DigitalOcean, Heroku, Cloudflare, Pulumi, Terraform Cloud, Tailscale, Doppler, Infisical, HashiCorp Vault


AI & Machine Learning (12 providers)

OpenAI (legacy + project keys), Anthropic, Groq, xAI (Grok), OpenRouter, HuggingFace, Replicate, NVIDIA, Fireworks AI, Pinecone, LangSmith, ElevenLabs


Git, CI/CD & Package Registries (13 providers)

GitHub (PAT + fine-grained), GitLab (PAT + OAuth2), Bitbucket, Sourcegraph (+ Cody), CircleCI, Buildkite, Harness, Deno Deploy, npm, PyPI, NuGet, RubyGems, Docker Hub


Payments & Commerce (8 providers)

Stripe (secret + restricted keys), Square (access token + app secret), Plaid, Paystack, Razorpay, Flutterwave, GoCardless, Shopify


SaaS & Productivity (13 providers)

Slack (tokens + webhooks), Discord (bot tokens + webhooks), Notion, Linear, PostHog, Postman, LaunchDarkly, Contentful, Mapbox, Mailchimp, Dropbox, PagerDuty, Prefect


Monitoring & Observability (5 providers)

Grafana (Cloud + Service Account), Sentry, New Relic, Databricks, Nightfall


Email & Communication (6 providers)

SendGrid, Mailgun, Resend, Telegram, Microsoft Teams (webhooks), Zapier (webhooks)


Databases & Backend (5 providers)

PlanetScale (password + token), Supabase (service key + token), Salesforce, Firebase, plus generic connection strings (PostgreSQL, MySQL, MongoDB, Redis, RabbitMQ, MSSQL)


Cryptographic Material

RSA, EC, OpenSSH, PKCS#8 private keys, hardcoded JWT signing secrets, `.env` files with secrets


---

## Vulnerability Classes

Every rule maps to CWE identifiers, OWASP 2021 categories, and real-world references:

| Class | CWE | Grounded In |
|-------|-----|-------------|
| SQL Injection | CWE-89 | CVE-2022-24266, CVE-2022-0439, CVE-2024-9796 |
| OS Command Injection | CWE-78 | CVE-2023-30258 (MagnusBilling), CVE-2019-0232 |
| Server-Side Request Forgery | CWE-918 | CVE-2021-40438 (Apache mod_proxy) |
| Path Traversal | CWE-22 | CVE-2024-1483 (MLflow), CVE-2024-6911 |
| Cross-Site Scripting | CWE-79 | PortSwigger patterns, HackerOne reflected XSS |
| Template Injection | CWE-1336 | CVE-2024-42355 (Shopware), Jinja2 RCE chains |
| Insecure Deserialization | CWE-502 | CVE-2023-52357, pickle/yaml.load patterns |
| XML External Entity | CWE-611 | SAML/SOAP/SVG upload XXE patterns |
| Prototype Pollution | CWE-1321 | HackerOne: mermaid, fastify-multipart |
| NoSQL Injection | CWE-943 | MongoDB `{"$gt":""}` auth bypass |
| Open Redirect | CWE-601 | CVE-2020-29565 (OpenStack Horizon) |
| Hardcoded Credentials | CWE-798 | 75 provider-specific key formats |

---

## CI/CD Integration

### GitHub Actions

```yaml
name: Security Scan
on: [push, pull_request]
jobs:
  semsec:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: SemSec Scan
        run: |
          pip install semgrep
          git clone https://github.com/RobustaStudio/semsec.git /tmp/semsec
          semgrep --config /tmp/semsec/ --sarif -o results.sarif .
      - name: Upload Results
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: results.sarif
```

### GitLab CI

```yaml
semsec:
  image: semgrep/semgrep
  script:
    - git clone https://github.com/RobustaStudio/semsec.git /tmp/semsec
    - semgrep --config /tmp/semsec/ --sarif -o gl-sast-report.sarif .
  artifacts:
    reports:
      sast: gl-sast-report.sarif
```

### Pre-commit Hook

```yaml
repos:
  - repo: https://github.com/returntocorp/semgrep
    rev: v1.100.0
    hooks:
      - id: semgrep
        args:
          - --error
          - --config=https://raw.githubusercontent.com/RobustaStudio/semsec/main/auth-access-control.yaml
          - --config=https://raw.githubusercontent.com/RobustaStudio/semsec/main/crypto-secrets.yaml
          - --config=https://raw.githubusercontent.com/RobustaStudio/semsec/main/hardcoded-secrets.yaml
          - --config=https://raw.githubusercontent.com/RobustaStudio/semsec/main/java-web-taint.yaml
          - --config=https://raw.githubusercontent.com/RobustaStudio/semsec/main/javascript-web-taint.yaml
          - --config=https://raw.githubusercontent.com/RobustaStudio/semsec/main/orm-security.yaml
          - --config=https://raw.githubusercontent.com/RobustaStudio/semsec/main/php-web-taint.yaml
          - --config=https://raw.githubusercontent.com/RobustaStudio/semsec/main/python-web-taint.yaml
          - --config=https://raw.githubusercontent.com/RobustaStudio/semsec/main/react-vue-client-security.yaml
          - --config=https://raw.githubusercontent.com/RobustaStudio/semsec/main/serverless-edge-security.yaml
          - --config=https://raw.githubusercontent.com/RobustaStudio/semsec/main/trpc-graphql-security.yaml
          - --config=https://raw.githubusercontent.com/RobustaStudio/semsec/main/vibe-coding-security.yaml
          - --config=https://raw.githubusercontent.com/RobustaStudio/semsec/main/webhook-security.yaml
```

Semgrep can't load a whole GitHub repo from its URL (it loads 0 rules and passes), so point at each rule file. Replace `main` with a commit SHA to pin the rules.

### Docker

```bash
docker run --rm -v "${PWD}:/src" -v "/path/to/semsec:/semsec:ro" semgrep/semgrep \
  semgrep --config /semsec/ /src
```

---

## How Taint Tracking Works

Traditional SAST tools pattern-match on dangerous function calls. SemSec uses Semgrep's **taint mode** to trace actual data flow:

```
  HTTP Request Input          Sanitizer Check           Dangerous Sink
  ┌─────────────────┐        ┌──────────────┐        ┌────────────────┐
  │ request.args     │───────>│ parameterized │───X    │ cursor.execute │
  │ request.form     │        │ query?        │        │ os.system()    │
  │ request.headers  │        │ input valid?  │        │ send_file()    │
  │ req.query        │        │ escaped?      │        │ redirect()     │
  │ req.body         │        └──────────────┘        └────────────────┘
  │ $_GET / $_POST   │               │
  └─────────────────┘               │ No sanitizer?
                                     │
                              ┌──────▼──────┐
                              │  FINDING    │
                              └─────────────┘
```

If the data is sanitized (parameterized query, escaping function, type cast), no finding is raised. This eliminates the false positive flood that makes other tools unusable.

---

## Project Structure

```
semsec/
├── python-web-taint.yaml        # 10 rules — Django, Flask, FastAPI
├── javascript-web-taint.yaml    #  8 rules — Express, Node.js
├── java-web-taint.yaml          #  7 rules — Spring Boot, Servlet
├── php-web-taint.yaml           #  7 rules — Laravel, WordPress
├── auth-access-control.yaml     #  8 rules — Auth, IDOR, CSRF
├── crypto-secrets.yaml          #  7 rules — Weak crypto, PRNG
├── hardcoded-secrets.yaml       # 99 rules — 75 providers
├── vibe-coding-security.yaml    # 35 rules — Supabase, Next.js, Firebase, Stripe
├── react-vue-client-security.yaml # 20 rules — XSS, eval, postMessage, token storage
├── orm-security.yaml            # 17 rules — Prisma, Drizzle, Mongoose
├── serverless-edge-security.yaml # 15 rules — Workers, Lambda, Edge, Deno
├── webhook-security.yaml        # 16 rules — Clerk, GitHub, Shopify, Slack, +8 more
├── trpc-graphql-security.yaml   # 13 rules — tRPC, GraphQL, Apollo
├── banner.jpeg
├── LICENSE                      # MIT
└── README.md
```

---

## Contributing

Found a false positive? Missing a provider? Have a CVE pattern we should add?

1. Open an issue with the details
2. Or submit a PR — rules follow the existing format with CWE/OWASP metadata

All rules must pass `semgrep --validate` before merge. Add a `# ruleid:` and an `# ok:` case for your rule to `tests/.` and run:

```bash
semgrep --test --config crypto-secrets.yaml tests/crypto-secrets.py
```

---

## About Robusta Studio

**[Robusta Studio](https://robustastudio.com)** builds developer tools and security solutions. SemSec is part of our commitment to making application security accessible, precise, and free.
