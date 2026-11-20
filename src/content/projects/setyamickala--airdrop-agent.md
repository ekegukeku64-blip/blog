---
title: "setyamickala/airdrop-agent"
owner: "setyamickala"
name: "airdrop-agent"
fullName: "setyamickala/airdrop-agent"
description: "Autonomous airdrop operator: identities, wallets, socials, testnets, quests, radar — guarded CLI + MCP"
sourceUrl: "https://github.com/setyamickala/airdrop-agent"
stars: 82
forks: 34
language: "Python"
topics: ["airdrop", "automation", "cli", "evm", "mcp", "playwright", "python", "solana"]
license: "MIT"
defaultBranch: "main"
snapshotDate: "2026-11-20"
pushedAt: "2026-11-19T08:02:36Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

*图片：ci*
*图片：license: MIT*
*图片：python*

# airdrop-agent

**A local operator for the work that happens before a token exists.** Identities, wallets, social
accounts, quests, testnets and waitlists — driven by one CLI and one policy engine, with an MCP
surface for other agents.

No server. No telemetry. SQLite plus an encrypted vault in `~/.airdrop-agent`.

```
aa quest probe https://app.example.com/points   # read the page, don't guess
aa quest run dow-points --identity main        # run it inside policy
aa cf assist --identity main                   # one visible click when a challenge wins
aa autopilot tick                              # radar → warm → daily → quests → faucet
```

> New in 4.1 — clearance stored per host and user agent, one persistent browser profile per identity,
> encrypted session restore, quest login pre-flight, nineteen tested targets. Full manual:
> docs/GUIDE.md. New here? Read docs/INTRO.md.

## Contents

- What an airdrop agent is
- What this one does
- Why it is built this way
- Architecture
- Install
- Sixty-second start
- Quests
- Testnets and sending
- Cloudflare and sessions
- Wallets and identities
- Social and email
- Autopilot
- Approvals and the kill switch
- Other surfaces
- Docs
- Limits
- Contributing

## What an airdrop agent is

Airdrops pay after the fact. You use a testnet, hold points, fill a waitlist, keep a streak for
months — and a snapshot decides later whether any of it was worth anything. The work is repetitive,
time-windowed, spread over many accounts, and easy to get wrong at the exact moment it matters: one
wrong signature and a wallet is empty.

An airdrop agent is the operations layer for that work. Not a macro that clicks one button — a
system that holds the whole loop:

| layer | question it answers |
|---|---|
| identity graph | who is acting: persona, email, proxy, socials, browser fingerprint |
| custody | which wallet, which key, what is the value ceiling |
| browser | how to reach the page and stay logged in |
| executor | what the task actually is, step by step |
| policy | may this fire without a human, and for how much |
| ledger | proof it happened: screenshot, hash, run row |

Three loops run on top: **acquire** (radar finds candidates), **execute** (quests, faucets, forms,
social actions), **maintain** (warm sessions, keep streaks, respect cooldowns, skip what is done).

The difference between an agent and a pile of scripts is the last two layers. Without policy, an
agent can drain a wallet. Without a ledger, it can only claim it worked.

**What it is not:** a profit guarantee, a token picker, a sybil antidote, a botnet, or a replacement
for judgement. A quiz answer, a deposit size and a fresh signature still need a human.

## What this one does

| capability | command surface | behaviour |
|---|---|---|
| mass identities and wallets | `aa identity new --wallets N`, `aa wallet new --count`, `aa identity clone` | one 24-word seed per identity, BIP44 EVM + Solana, labels scoped per identity |
| quests | `aa quest probe / import / validate / run` | YAML DSL, human-speed steps, proof per step, parks instead of faking |
| testnets | `aa testnet faucets / claim / deploy / campaign` | faucet catalog, cooldowns, counter/ERC20/ERC721 deploys |
| guarded sends | `aa wallet send`, `aa wallet approve` | simulate → cap → gate → sign → broadcast → receipt |
| Cloudflare | `aa cf status / assist / clear` | clearance cache bound to host + UA, native Turnstile, provider token, FlareSolverr |
| sessions that hold | `aa session status / check / warm / save / restore` | one profile per identity, encrypted state mirror, pre-flight parking |
| social | `aa tg`, `aa x`, `aa dc` | MTProto joins, browser follow/like/repost/post, humanised Discord chat |
| own mail | `aa email add / otp / link` | IMAP OTP and verification links, Gmail login assist |
| discovery | `aa radar add / scan / latest` | TG/X/web sources, drainer check, scored queue with reasons |
| daily routine | `aa daily plan / run` | idempotent check-ins, streak ledger, cooldowns |
| autonomy | `aa autopilot tick / daemon` | ordered modules, budgets, active hours, service templates |
| agent access | `aa mcp serve` | 21 stdio JSON-RPC tools, same policy engine |

Every command returns one envelope:

```json
{"ok": true, "ts": "…", "data": {"parked": true, "needs_login": "x", "proof": ["…"]},
 "error": null, "next": ["aa social login x --identity id-z4yrky"]}
```

Exit codes are part of the contract: `0` ok, `2` denied, `3` failed, `10` approval gate, `99` kill.
A host branches on those, never on prose.

## Why it is built this way

**One door.** The CLI is the only entry point for shell, cron, autopilot and MCP. Policy is checked
by the caller *and* again inside the library, so a clever host cannot skip a cap.

**Ask once, then run.** Risk is a decision, not a dialog. A mode sets how far the agent may go alone;
above that line the exact payload is frozen behind a hash and a one-time code on your Telegram.

**Park, never fake.** A captcha, a login wall, an unknown field, a wallet gate — the run stops with a
screenshot and one `next` command. A parked quest is not a failed quest and autopilot leaves it alone
for six hours.

**Durable by structure, not retries.** Clearance is treated as an IP-bound credential and reused.
Login is treated as state: one profile, one proxy, warm-up, encrypted mirror. Two problems that
normally eat a farm are removed at the design level instead of being re-tried in a loop.

**Local custody.** Keys are decrypted in-process and handed to the browser through a binding; the
page only ever sees a provider. The vault is AES-256-GCM with scrypt and AAD, logs redact literal
secrets, `.env` is `0600`.

## Architecture

```
caller (shell · MCP · cron · agent)
        │
        ▼
      aa/cli.py ──► envelope: ok · denied · gate · kill
        │
        ├── policy.py    mode, caps, domain + contract allowlists, drainer verdict
        ├── gates.py     payload hash, single-use code, TTL
        ├── guard.py     KILL file, exit 99 everywhere
        ├── vault.py     AES-256-GCM + scrypt, AAD-bound
        ├── chains.py    RPC with chain-id verification
        ├── browser/     stealth engine, provider injection, captcha, cf.py
        ├── session.py   profile reuse, warm-up, encrypted storage_state
        ├── wallet/      hd, evm, sol, sign, send, extensions
        ├── quest/       YAML DSL, runner, adapters
        ├── testnet/     faucets, deploys, campaigns
        ├── radar/       sources, extract, score, pipeline
        └── daily.py · autopilot.py
```

State: `~/.airdrop-agent` — `policy.yaml`, `autopilot.yaml`, `.env` (0600), `data/state.sqlite3`,
`vault/`, `browser//`, `proofs/`. Move it with `AIRDROP_HOME`.

## Install

macOS or Linux, Python 3.10+ (3.12 recommended), Chromium installed by the script.

```bash
git clone https://github.com/setyamickala/airdrop-agent.git
cd airdrop-agent
./install.sh              # venv, deps, chromium
# ./install.sh --full     # adds Foundry for contract deploys
# ./install.sh --no-browser
./install.sh --service=systemd   # or =launchd
aa init && aa doctor
```

`aa init` generates `VAULT_PASSWORD` in `.env` (mode 0600) and copies `policy.yaml`,
`autopilot.yaml` and the quest examples. `aa doctor` must be green before funded work. No desktop?
Set `BROWSER_HEADLESS=1` and optionally `FLARESOLVERR_URL` — see docs/CLOUDFLARE.md.

## Sixty-second start

```bash
aa identity new main --wallets 2
aa email add --identity main --address you@yourdomain.tld --password '…'
aa social login x --identity main --user you --password '…' --totp 'JBSWY…'
aa session warm --identity main
aa cf assist --identity main --url https://app.dowprotocol.com/points
aa quest import config/quests/dow-points.yaml
aa quest validate dow-points
aa quest run dow-points --identity main --dry
aa quest run dow-points --identity main
```

`--dry` lists resolved steps without touching the page. A real run writes proof to
`~/.airdrop-agent/proofs/`, and either finishes or parks with the exact command to continue.

## Quests

```bash
aa quest probe https://app.example.com/tasks --identity main   # fields, buttons, challenge state
aa quest import my-quest.yaml
aa quest validate my-quest
aa quest run my-quest --identity main --dry
aa quest run my-quest --identity main
```

```yaml
id: demo-daily
name: Demo daily
url: https://app.example.com/tasks
chain: base-sepolia
cooldown_hours: 24
steps:
  - goto: "{{url}}"
  - dismiss: true
  - wallet: {connect: true}
  - click: "Check in"
  - assert_text: "Checked in"
  - screenshot: done
  - manual: "answer the quiz if it opens"
```

Nineteen validated quests ship in `config/quests/`: points programs (DOW, Ammora,
vAPI, Qyro, Syqora, Bullgem, Dogeos, KieDex), testnets (Nilly, Stabilizer, Flint, Whisk, Ducat,
Polyester, Tzero, Folesterol) and waitlists (Oripa, Code Kitty, ZkUnnamed). Each records where it
stops — docs/TARGETS.md. Schema and every action:
docs/QUESTS.md.

## Testnets and sending

```bash
aa testnet faucets --chain base-sepolia
aa testnet claim --chain base-sepolia --identity main
aa testnet deploy --chain sepolia --identity main --kind erc721
aa wallet send --chain sepolia --identity main --to 0x… --amount 0.01
aa wallet send --chain sepolia --identity main --to 0x… --amount 0.01 --broadcast
```

Sends are dry by default. Order is policy → simulation → gas cap → optional gate → sign →
broadcast. A revert costs nothing and creates no gate.

## Cloudflare and sessions

```bash
aa cf status
aa cf assist --identity main --url https://app.example.com/points
aa session status --identity main
aa session warm --identity main
aa session save --identity main
aa session restore --identity main
```

Clearance is cached per identity + host with its user agent, `CF_TTL_MINUTES` (45), and injected
before navigation. When it is missing: 28 s of real interaction, then a provider token with
`action`/`cdata`, then FlareSolverr, then one visible assist click. A proxy change invalidates
clearance — one identity, one residential proxy.

Sessions are logged-in state, not hope: the profile is reused by every module, its `storage_state`
is sealed in the vault on close and restored on start. Quests pre-flight social steps and park with
`needs_login` instead of half-finishing. Details:
docs/CLOUDFLARE.md, docs/SESSIONS.md.

## Wallets and identities

```bash
aa identity new solo --persona casual-id --proxy http://user:pass@host:port --wallets 2
aa identity clone solo farm2 --wallets 2
aa wallet new --identity solo --count 10
aa wallet balance --identity solo --chain base-sepolia
aa wallet export --identity solo
aa wallet sign --identity solo --label first --message "gm"
```

One seed per identity, `m/44'/60'/0'/0/i` for EVM and `m/44'/501'/i'/0'` for Solana. The seed never
prints; `aa vault export --password '…'` is the surviving backup and prints a SHA-256.

## Social and email

```bash
aa tg login --identity solo --phone +62…      # real account via MTProto
aa tg join --identity solo @channel
aa x follow --identity solo @project
aa dc login --identity solo --user … --password …
aa dc grind --identity solo --server project --minutes 30
aa email otp --identity solo --sender noreply@project.xyz
```

Discord uses the browser's user token (self-bot, ToS-grey), so chat is opt-in and humanised. Reads
on X can use free syndication; writes go through the browser.

## Autopilot

```bash
aa autopilot plan
aa autopilot tick
aa autopilot daemon
```

Order: radar → auto-follow → warm → daily → quest → faucet. Each module has an interval and a daily
budget counted from events; `active_hours` silences the night. `tick` is the safe unit, `daemon` is
a foreground loop under the service templates.

## Approvals and the kill switch

Modes: `safe` (everything gates), `balanced` (default: testnet inside caps is automatic, mainnet and
permits gate), `turbo` (wide caps and clean-domain auto-allow). Gates freeze chain, recipient,
amount, calldata and origin; approve once with the Telegram code:

```bash
aa gate list
aa gate approve 3 K7F2Q9
```

Re-run the exact command. Any changed field changes the hash. `aa kill "reason"` stops everything
with exit 99 until `aa unkill`.

## Other surfaces

```bash
aa browser --identity solo --url https://app.example.com --headful
aa ext install rabby --identity solo
aa radar scan
aa daily run --identity solo
aa mcp serve          # stdio JSON-RPC, 21 tools
aa events --limit 50
```

Host adapters for Hermes, Muse, OpenClaw and Claude live in `agents/`.
AGENTS.md is the router, SKILL.md the deep skill.

## Docs

| start | depth |
|---|---|
| INTRO | the two design rules, where to begin |
| GUIDE | full manual, install to recovery |
| CAPABILITIES | requirement → command → limit |
| TARGETS | the nineteen tested sites |
| QUESTS | DSL, actions, parking, maintenance |
| SAFETY · SYBIL | caps, gates, drainers, persona hygiene |
| ARCHITECTURE | module map and invariants |
| OPERATIONS · TROUBLESHOOTING | services, backups, symptoms |
| CLOUDFLARE · SESSIONS | the two durability layers |
| MCP · PORTABILITY | agent wiring |

## Limits

- Turnstile without a provider key or FlareSolverr ends in a manual assist. That is the design, not a bug.
- Clearance is IP-bound; rotating proxies on one identity burns it repeatedly.
- Selectors rot. `aa quest probe` is the maintenance tool, and proofs show the diff.
- Points are not tokens. A completed quest is not an allocation.
- Discord user tokens and multi-account farming are ToS-grey, not ToS-clean.
- Gas is real on mainnet; keep farming wallets gas-only and sweep profits.

Seven years of airdrop tooling have produced a lot of clickers. This is the other thing: an operator
with a paper trail.

## Contributing

See CONTRIBUTING.md. Security reports: SECURITY.md — never paste a
private key, an address and tx hash are fine.

## License

MIT. No code vendored from other airdrop bots; the Cloudflare layer implements public browser and
provider APIs independently.
