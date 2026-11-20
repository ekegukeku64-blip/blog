---
title: "nickvasilescu/openman"
owner: "nickvasilescu"
name: "openman"
fullName: "nickvasilescu/openman"
description: "OpenMan: open-source autonomous AI agent workspace that runs on your Orgo cloud computer"
sourceUrl: "https://github.com/nickvasilescu/openman"
stars: 60
forks: 30
language: "TypeScript"
topics: []
license: "MIT"
defaultBranch: "main"
snapshotDate: "2026-11-20"
pushedAt: "2026-11-19T21:37:07Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# OpenMan

OpenMan is an open-source autonomous AI agent workspace that runs on your own [Orgo](https://www.orgo.ai) cloud
computer. Give it a job and it plans, browses, runs code and works with files on that computer until the job is done,
while you watch the live screen or take over. Around the agent it gives you tasks with a live computer view, projects
with shared instructions and files, skills, connectors to the apps you use, automations on a schedule or trigger,
websites built and hosted on your computer, generators for slides, documents, charts and audio, meeting notes, an
email address and phone number for the agent, and a public API.


> **Status: early.** OpenMan works end to end for its core features, but it is young software. Read
> Project status and the disclaimer before relying on it.

## How it works

- **Your Orgo account is the account.** People sign in with Orgo. Everything runs on the signed-in user's own Orgo
  account: their computers, their credits, their plan. OpenMan has no billing of its own.
- **Hermes Agent on your Orgo computer.** On first sign-in OpenMan prepares a home computer in your Orgo workspace
  from Orgo's Hermes Agent template (or uses one you pick) and turns on the agent's API. Tasks run there, and the
  computer's screen streams into the app.
- **Claude through Orgo.** The agent uses Anthropic's Claude models through Orgo's model proxy, paid from your Orgo
  credits. No model API key is needed.
- **Supabase for app data.** Tasks, projects, settings and the rest live in a Supabase Postgres database that only the
  OpenMan server can read or write.

More detail: docs/ARCHITECTURE.md.

## Quick start (self-hosting)

### Prerequisites

- Node.js 22 or later, npm and git.
- An [Orgo](https://www.orgo.ai) account with credits (your agent's computer and models are billed there).
- A [Supabase](https://supabase.com) project. The [Supabase CLI](https://supabase.com/docs/guides/cli) is optional.

### 1. Clone and install

```bash
git clone https://github.com/nickvasilescu/openman.git
cd openman
npm install
```

To check the install, `npm run typecheck` (it generates Next's route types first, then runs the TypeScript compiler).

### 2. Create the database

Apply the schema in `supabase/migrations/` to your Supabase project, either with the CLI:

```bash
supabase link --project-ref 
supabase db push
```

or by pasting each file in `supabase/migrations/` (in name order) into the Supabase SQL editor.

### 3. Configure

```bash
cp .env.example .env.local
```

Fill in `APP_PUBLIC_URL` (`http://localhost:3000` locally), `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (Supabase -> Project Settings -> API). Then:

```bash
node scripts/setup.mjs
```

It generates the four app secrets (`APP_DB_SECRET`, `SESSION_SECRET`, `APP_ENCRYPTION_KEY`, `CRON_SECRET`) into
`.env.local` if they are missing (it never overwrites a value), checks the required values, and prints one SQL
statement. **Run that statement in the Supabase SQL editor**: it stores the hash of `APP_DB_SECRET`, which is what lets
the server through the database's row-level security. Nothing works until it is stored.

### 4. Run

```bash
npm run dev                 # http://localhost:3000
node scripts/worker.mjs     # in a second terminal: runs automations and other background work
```

The worker calls the app at `APP_URL` (already `http://localhost:3000` in `.env.example`).

Open the app and sign in with your Orgo account (see Sign in with Orgo). On first sign-in you
choose the agent's computer; setting it up takes a few minutes.

For UI work without signing in, set `OPENMAN_DEV_BYPASS=1` in `.env.local` (`npm run dev` only). You are then a local
development user built from `ORGO_API_KEY`, for requests from this machine only. A production server (`next start`)
with it set refuses to start. With no agent configured, a built-in mock agent plays scripted runs; to use a real agent
computer, fill in the development values in `.env.example`.

## Sign in with Orgo

OpenMan has no accounts of its own: everyone signs in with Orgo, and runs on their own Orgo plan, credits and
computers.

1. **Continue with Orgo** (on the landing page, the sign-in dialog and `/signin`). OpenMan shows a short code and opens
   orgo.ai in a new tab. Sign in there (or create an Orgo account), check the code matches and approve. OpenMan notices
   the approval by itself and takes you back to the page you came from. If the code expires (30 minutes), the request
   is cancelled on Orgo, or too many sign-ins are under way, the screen says so and offers to try again.
2. **Use an API key instead.** Paste an Orgo API key. OpenMan checks it with Orgo, stores it encrypted and signs you
   in. Create a key at [orgo.ai/api-keys](https://www.orgo.ai/api-keys) or with the Orgo CLI:

   ```bash
   orgo login
   orgo keys create --name OpenMan        # account-wide key (recommended)
   ```

   A key made with `--workspace ` also works if you are the only person in that workspace, but Orgo will not show
   it your credit balance or billing, and OpenMan cannot switch workspaces with it. The sign-in screen says so when it
   detects one. A workspace key for a shared workspace is refused.

After sign-in, Settings, Account shows your Orgo name, email, plan and credit balance. OpenMan works in one Orgo
workspace (your own by default): pick it on the first-run screen or change it later in Settings, Account. The first-run
screen offers a suitable Linux computer already in that workspace (one with Orgo's Hermes agent, or plain Linux that
Orgo installs Hermes on) or a new one from Orgo's Hermes template, with Orgo's price for it on your plan. Orgo bills a
new computer to a plan or, on the Free plan, by the hour from credit, so an account with neither is sent to Orgo's
billing page first.

Settings, Sign-in & security has **Sign out**, **Sign out everywhere** and **Disconnect Orgo**. Disconnecting deletes
the key OpenMan stores and signs out every browser. A key OpenMan created through the approval page is revoked on Orgo
too; a key you pasted stays valid on Orgo until you delete it at orgo.ai/api-keys or with `orgo keys delete `.

**Local sign-in (self-hosting on your own machine).** Set `OPENMAN_LOCAL_SIGNIN=1` and `ORGO_API_KEY` in `.env.local`
and the sign-in screen also offers "Sign in with this computer's Orgo key". It is offered only when the server listens
on `127.0.0.1` (`npm run dev`, or `npm start -- -H 127.0.0.1`), `APP_PUBLIC_URL` is unset or a loopback address, and
the request comes from this machine. A production server whose `APP_PUBLIC_URL` is public refuses to start with it set.

## Optional integrations

Each integration is off until its values are set; the app hides or explains features that are not configured. These
vendors are paid by whoever operates the deployment, so per-user daily and monthly caps apply
(`src/config/usage-limits.ts`, override with `USAGE_LIMITS`).

| Feature | Provider | Values |
|---|---|---|
| An email address for the agent; tasks and automations started by email | [AgentMail](https://agentmail.to) | `AGENTMAIL_API_KEY`, `AGENTMAIL_WEBHOOK_SECRET`; optional `AGENTMAIL_POD_ID`, `AGENTMAIL_DOMAIN`, `AUTOMATION_EMAIL_INBOUND=1` |
| A phone number for the agent (SMS and calls) | [AgentPhone](https://agentphone.ai) | `AGENTPHONE_API_KEY`, `AGENTPHONE_WEBHOOK_SECRET`, `AGENTPHONE_SUB_ACCOUNT_ID` |
| Voice input, meeting transcription, speech and sound effects | [ElevenLabs](https://elevenlabs.io) | `ELEVENLABS_API_KEY`; `ELEVENLABS_MUSIC=1` for music (paid plan) |
| Image and video generation | fal, OpenAI, xAI or Krea | Set by each user on their own computer in `~/.hermes/.env`: `FAL_KEY`, `OPENAI_API_KEY`, `XAI_API_KEY` or `KREA_API_KEY` (video: `XAI_API_KEY` or `FAL_KEY`) |

Without ElevenLabs, meeting notes can still be transcribed on the user's own computer with Whisper (no key needed).

For email and phone, register a webhook at the vendor pointing at `https:///api/webhooks/agentmail` or
`/api/webhooks/agentphone` and put its signing secret in the env. Connectors to apps such as Gmail, Notion or GitHub
come from Orgo and need no server configuration.

All settings, including operator options (invite list, alerts, limits), are listed with descriptions in
`.env.example`.

## Deploying

A deployment is:

1. **The web app** on any Node.js 22+ host: `npm ci && npm run build && npm start`, behind HTTPS.
2. **A Supabase project** with the migrations applied and the `APP_DB_SECRET` hash stored.
3. **The scheduler worker**: `node scripts/worker.mjs`, an always-on process that calls `POST /api/cron/tick` with
   `CRON_SECRET` once a minute. Each tick fires due automations, polls their triggers, delivers outgoing webhooks,
   records model costs, clears idle task folders, and checks health alerts. Ticks are safe to overlap, so an external
   cron hitting the same endpoint works too.

Set `INVITE_GATE=1` on any deployment reachable from the internet: only people on the invite list get in, and the
first account to sign in owns the list. Step-by-step instructions for a Linux host, an Orgo computer or a managed Node
platform are in docs/deploy.md; running it day to day is in docs/OPERATIONS.md.

## Security

- Only the server talks to the database; row-level security admits requests only with the server's secret header.
- Secrets kept for users (their Orgo credential, agent keys, connector secrets) are encrypted at rest with
  AES-256-GCM; the session cookie never carries them.
- User-supplied URLs are fetched through an SSRF-safe client, inbound webhooks are signature-checked, and
  operator-paid vendors are capped per user.
- The agent runs as an administrator on the user's own computer. It can do what that computer and the user's
  connected accounts allow, and content it reads can try to mislead it.

Read docs/security-model.md for the full model and its limits. Report vulnerabilities
privately as described in SECURITY.md, not in public issues.

## Project status

OpenMan is early software (version 0.1). What has been exercised for real, against real Orgo computers, a real
database and real vendors:

- Tasks: live desktop, Agent, Chat and Plan modes, follow-ups, branches and side chats, approvals and questions,
  attachments, queueing when too many tasks run at once.
- Projects with instructions and reference files, project sharing (members and editors), and agent-proposed project
  updates.
- Skills (installing from the library and using them in a task), custom MCP connectors, scheduled automations.
- Websites: build, preview, publish and unpublish, including a full-stack site with a database.
- Slides, speech and sound effects, meeting-file transcription into notes, task sharing and collaboration, settings,
  the public API, and the operator page.
- Automated suites for authentication hardening, database access control, SSRF protection, XSS, account data
  export and deletion, the public API and the main UI flows.

Built but early or not yet proven end to end:

- Sign-in for a brand-new user followed by first-time computer setup, and buying credits through Orgo's checkout.
- Signing in to third-party apps through connectors (OAuth) and then using them.
- A real email round trip and real SMS or calls (tested against vendor sandboxes and fakes).
- Slack and Telegram chat channels, recording a skill by demonstration, live microphone transcription.
- Image and video generation (needs the user's own provider keys), music (needs a paid ElevenLabs plan).
- Some website tools (secrets, database browser, scheduled jobs, analytics, custom domains, the element editor).

Expect rough edges, breaking changes and migrations between versions until 1.0.

## Contributing

Contributions are welcome. Read CONTRIBUTING.md for setup, tests and the pull request process,
AGENTS.md for the code layout and conventions (it applies to people and AI coding agents alike), and the
code of conduct.

## Licence and trademarks

The code is released under the MIT License, copyright (c) 2026 Organic Intelligence, Inc. See
NOTICE and THIRD_PARTY_NOTICES.md for third-party software, skills, fonts and
logos.

"OpenMan" and "Orgo" and their logos are trademarks of Organic Intelligence, Inc. and are not covered by the MIT
License. You may fork and modify the code freely, but a fork that is distributed or offered as a service must use a
different name and logo; the brand lives in `src/config/brand.ts` and `public/brand/`. See
TRADEMARKS.md. Third-party names and logos shown in the app identify integrations only and imply no
endorsement or affiliation.

## Disclaimer

OpenMan runs autonomous agents that take real actions with real accounts and real money. You are responsible for how
you configure and use it. It is provided as is, without warranty. Read the full DISCLAIMER.md.
