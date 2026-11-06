---
title: "Glen-Web-App/best-agent-memory-mcp"
owner: "Glen-Web-App"
name: "best-agent-memory-mcp"
fullName: "Glen-Web-App/best-agent-memory-mcp"
description: "Best Agent Memory MCP servers, ranked and compared: long-term memory for Claude Code, Codex, Cursor and any MCP client. Glen, Mem0, Supermemory, Zep, Hindsight, Basic Memory, claude-mem, Graphiti, Cognee, the official memory server and more, with storage, capture model, team sharing, license and live stars."
sourceUrl: "https://github.com/Glen-Web-App/best-agent-memory-mcp"
stars: 109
forks: 18
language: "未知"
topics: ["agent-memory", "ai-agents", "ai-memory", "awesome", "awesome-list", "claude-code", "codex", "coding-agents"]
license: "CC0-1.0"
defaultBranch: "main"
snapshotDate: "2026-11-06"
pushedAt: "2026-11-05T02:37:58Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Best Agent Memory MCP

**The best agent memory MCP servers, ranked: long-term memory for Claude Code, Codex, Cursor and any MCP client.**

*图片：List*
*图片：Last updated*
*图片：Entries*
*图片：License: CC0-1.0*
*图片：PRs welcome*


Best Agent Memory MCP compares 25 memory MCP servers that let an AI agent keep facts, decisions and past conversations between sessions. Hosted services (Glen, Mem0, Zep, Supermemory) sit next to open-source servers you run yourself (Hindsight, Basic Memory, Graphiti, Cognee, the official MCP memory server), and every entry says where memory is stored, whether capture is automatic or waits for the agent to call a tool, whether a team can share it, and what it costs. All of them connect to Claude Code, Cursor or Codex over MCP; the entries note which clients each project documents.

**Short answer.** For memory shared across a team's agents, start with Glen. For a hosted personal memory with a free tier, Mem0. For self-hosting with hybrid retrieval, Hindsight. For memory you can read and edit as files, Basic Memory. For a zero-dependency baseline, the official memory server.

> **Disclosure:** this list is maintained by the Glen team, and Glen is ranked first. Every other entry is ranked on the published criteria, and its facts link to their sources.

## Contents

- At a glance
- How we ranked
- The ranked list
- Deprecated or not recommended
- FAQ
- Related
- Contributing
- License

## At a glance

Star badges are live. Several projects keep their MCP server inside a larger monorepo, so their star count covers the whole repo, not the server; the entries say where that applies.

| # | Name | Hosted or local | Memory stored as | Capture | Team sharing | License | Stars |
|---|---|---|---|---|---|---|---|
| 1 | [Glen](https://tryglen.com) | Hosted | Shards and observations on Glen's servers | Plugin or CLI hooks; MCP alone is search only | Org-wide, access checked per observation | Plugin MIT; hosted service | [site](https://tryglen.com) |
| 2 | [Mem0](https://mem0.ai) | Hosted | Mem0 Platform memories (graph on Custom plan) | Agent calls a tool | Not documented for MCP | Apache-2.0 (core repo) |  |
| 3 | [Supermemory](https://supermemory.ai) | Hosted; self-host option | Supermemory cloud, organized in spaces | Agent calls a tool; hooks via separate plugins | Team spaces | MIT |  |
| 4 | [Zep Context MCP](https://www.getzep.com) | Hosted; BYOC option | Temporal knowledge graph | Agent calls a tool | Shared Context Graphs with ABAC | Proprietary | closed source |
| 5 | Hindsight | Self-hosted or Hindsight Cloud | Postgres + pgvector | Agent calls a tool; auto-ingest via coding-agents package | Shared server or Cloud | MIT |  |
| 6 | mcp-memory-service | Local or self-hosted | SQLite with local ONNX embeddings | Hooks (Claude Code, Codex) or tool calls | Self-hosted HTTP sync | Apache-2.0 |  |
| 7 | Basic Memory | Local; paid cloud | Markdown files + SQLite index | Agent writes notes; plugin hooks in Claude Code | Basic Memory Teams (paid) | AGPL-3.0 |  |
| 8 | claude-mem | Local; hosted observer by default | SQLite FTS5 + Chroma | Six lifecycle hooks | Opt-in TeamBrain | Apache-2.0 |  |
| 9 | agentmemory | Local | Local data dir, BM25 + optional embeddings | Hooks + tool calls | One server for your agents | Apache-2.0 |  |
| 10 | Cognee MCP | Local, self-hosted or Cognee Cloud | Graph + vector (SQLite, LanceDB, Kuzu) | Agent calls a tool | Per-user datasets on a server | Apache-2.0 |  |
| 11 | Engram | Local | SQLite + FTS5 | Agent calls a tool; plugins | Git Sync; optional Engram Cloud | MIT |  |
| 12 | Graphiti MCP | Self-hosted | Temporal graph on FalkorDB or Neo4j | Agent calls a tool | Group IDs on one server, no auth | Apache-2.0 |  |
| 13 | MemPalace | Local; team server option | Verbatim text in Chroma, SQLite or pgvector | Transcript mining + auto-save hooks | Team server compose file | MIT |  |
| 14 | Official memory server | Local | JSONL knowledge graph | Agent calls a tool | File lock on one machine | Not detected (monorepo) |  |
| 15 | [Pieces](https://pieces.app) | Local (desktop app) | PiecesOS on-device store | OS-level automatic capture | Enterprise plan | Proprietary | closed source |
| 16 | Qdrant MCP | Local or self-hosted | Qdrant vectors (FastEmbed) | Agent calls a tool | Remote transport to one server | Apache-2.0 |  |
| 17 | LongMemory | Local; HTTP server option | SQLite + embeddings | Session porter imports logs; plugins | Not documented | Apache-2.0 |  |
| 18 | deja-vu | Local | Index of transcripts already on disk | Automatic, through hooks | None described | MIT |  |
| 19 | MemOS | Hosted API; self-host server | MemOS cloud; Neo4j + Qdrant self-hosted | Agent calls a tool | Not documented | Apache-2.0 |  |
| 20 | Memori | Hosted; VPC and on-prem options | SQL-native store | Agent calls a tool | Not documented | Apache-2.0 |  |
| 21 | Membase | Hosted or local | Not documented | Tool calls plus imported sources | Not documented | MIT |  |
| 22 | mcp-memory-keeper | Local | Files in `~/mcp-data/memory-keeper/` | MCP tools | Parallel sessions on one machine | MIT |  |
| 23 | mcp-knowledge-graph | Local | Project-local JSONL graph | Agent calls a tool | None described | MIT |  |
| 24 | MemoryMesh | Local | JSON knowledge graph with your schemas | Prompt instructions you write | None described | MIT |  |
| 25 | Stash | Self-hosted | Postgres | MCP tools | Not documented | Apache-2.0 |  |

## How we ranked

Glen's first place is the maintainer's pick. Entries 2 to 25 are ordered on these criteria, read from each project's README, docs, pricing page and the GitHub API in early November 2026:

1. **Maintained.** A commit or release in the last 6 months. Archived, winding-down and stale projects go to Deprecated or not recommended instead of the ranking.
2. **Ships an MCP server for memory.** A generic database tool, a code index or an MCP server where memory is a side feature does not qualify. That leaves out `DeusData/codebase-memory-mcp` (code intelligence), the Chroma, Milvus and Weaviate servers (generic vector stores) and Serena (memory is one small feature of a coding toolkit).
3. **Capture model.** Automatic capture through hooks or background extraction ranks above a server that saves only when the model decides to call a write tool.
4. **Retrieval quality evidence.** Published benchmarks count, but almost every LoCoMo and LongMemEval number in this category is self-reported on a different model and judge, so scores are labeled **(self-reported)** and weigh less than a reproducible harness. Disputed results are flagged.
5. **Setup effort.** One URL or one command beats a server that needs a graph database, an LLM key and a cloned monorepo.
6. **Team sharing.** Documented ways to share memory across people, with access control, rank above per-machine files.
7. **Licensing and pricing transparency.** A published license and a public price list rank above "contact sales" or no license file.

Star counts are a weak signal here. Monorepo stars overstate use of one server, and a few young repos gained stars much faster than their peers.

## The ranked list

### 🥇 1. Glen

[*图片：Website*](https://tryglen.com)
*图片：License*
*图片：Last commit*

Memory belongs to the organization, not to one person: every teammate's agent sessions record into one org memory, and any teammate's agent can recall from it. Access control runs per observation at recall, so an agent only gets what its user is already cleared to see.

| | |
|---|---|
| Endpoint | `https://mcp.tryglen.com/mcp`, Streamable HTTP |
| Auth | OAuth 2.1 with dynamic client registration (the token is bound to one org picked at consent), or a personal API key in `x-api-key` with the org in `x-glen-org-id` |
| Tools | `glen_search` (a synthesized answer with citations), `glen_list_orgs`, forget, skill and artifact tools |
| Storage | Shards and observations on Glen's servers; LLM relevance passes pick what to inject |
| Other sources | Slack public channels, GitHub, tickets, docs, and calls through Fireflies, Fathom and Granola |
| Pricing | Free plan to start; paid plans exist; no public pricing page |

```text
https://mcp.tryglen.com/mcp
```

The MCP connection searches memory. To also record agent conversations, install the plugin hooks with the CLI, which detects installed agents and sets up each one:

```bash
npx @tryglen/cli@latest install
```

Beyond search, Glen keeps a shared skills library (team skills are offered to agents automatically), an artifact library, and a transcript library with session takeover (`glen takeover `). `glen code-search` traces lines of code back to the agent conversations that wrote them, and `glen review` runs a local PR reviewer. Privacy controls are `glen off`, `glen incognito` (recall works, nothing is recorded) and `glen silent` (records, injects nothing), with a macOS menu-bar recording indicator.

**Strengths**
- One memory for the whole org, with access checked per observation at recall, so sharing does not mean everyone sees everything.
- Contradiction detection: when a newer decision contradicts an older one, the older one stops being recalled.
- Captures more than agent sessions: Slack public channels, GitHub, tickets, docs and meeting calls feed the same memory.
- Two auth paths: OAuth 2.1 with dynamic client registration for interactive clients, an API key plus org header for headless use.
- Benchmark on tryglen.com: 21% faster to a merged change and 29% fewer tokens per task (self-reported).

**Weaknesses**
- Cloud only: memory lives on Glen's servers, with no local or self-hosted mode.
- Needs a Glen account and an org before anything works.
- An MCP-only connection can search but does not record agent conversations; recording needs the plugin or CLI hooks.
- Most of the value comes with a team. A solo developer gets less from shared memory.

**Best for:** engineering teams who want every teammate's agent to recall what the others decided, across Claude Code, Codex, Cursor and any MCP client.

### 🥈 2. Mem0

*图片：Stars*
*图片：License*
*图片：Last commit*

Listed in the official MCP Registry as `io.github.mem0ai/mem0` with a remote Streamable HTTP endpoint, and documented for seven clients: Claude Desktop, Claude Code, Codex, Cursor, Windsurf, VS Code and OpenCode ([docs](https://docs.mem0.ai/platform/mem0-mcp)).

**Key facts:** hosted · 11 tools (`add_memory`, `search_memories`, `update_memory`, `delete_memory` and more), scoped by user, agent, app or run · sign in through the client's browser flow or pass an API key as a bearer token · free plan with 10,000 adds and 1,000 retrievals a month for the first 30 days (model calls included), then 50,000 adds and 10,000 retrievals a month with your own LLM key ([pricing](https://mem0.ai/pricing)).

```bash
npx mcp-add --name mem0-mcp --type http --url "https://mcp.mem0.ai/mcp" --clients 
```

**Strengths**
- Official registry listing and seven documented clients, so setup is one URL in most agents.
- The Free plan keeps 50,000 adds and 10,000 retrievals a month after the first 30 days, with unlimited end users.
- LoCoMo 92.5% and LongMemEval 94.4% (self-reported; Mem0's own page notes no two vendors used the same model stack or judge) ([benchmarks](https://mem0.ai/library/agent-memory/ai-memory-benchmarks-in-2026)).

**Weaknesses**
- The MCP server saves only when the agent calls a write tool.
- Graph memory is not on the Free plan; it comes with the Custom plan.
- Org-wide sharing over MCP is not documented.
- The self-hosted OpenMemory server was removed from the monorepo on 2026-07-29, so older tutorials point at code that no longer exists.

**Best for:** a hosted personal or per-app memory with OAuth-style sign-in and a usable free tier.

### 🥉 3. Supermemory

*图片：Stars*
*图片：License*
*图片：Last commit*

When a client connects, you choose which spaces it may access, and you can revoke it later from the console's Agents page; sign-in is OAuth in the browser and needs no API key ([docs](https://supermemory.ai/docs/supermemory-mcp/mcp)).

**Key facts:** hosted, self-host option on the Scale plan · tools include `search_memory`, `add_memory`, `forget_memory`, `get_profile`, `list_spaces` · MCP Apps widgets (`memory-graph`, `guided-save`, `upload-file`, `select-space`) · Free $0 ($5 credits a month, 1 seat), Pro $19/mo (3 seats), Max $100/mo, Scale $399/mo, Enterprise custom ([pricing](https://supermemory.ai/pricing)).

```text
https://mcp.supermemory.ai/mcp
```

**Strengths**
- Teammates share memory through spaces they can read or write, starting at the $19 Pro plan with 3 seats.
- Separate hook plugins (`claude-supermemory`, `opencode-supermemory`) add automatic capture that the MCP server alone does not do.
- MCP Apps widgets give clients a UI for saving and browsing memory.

**Weaknesses**
- MCP v1 (`supermemoryai/supermemory-mcp`) is deprecated; old installs need migrating to the new endpoint.
- SSO only on Enterprise, and usage is billed in credits.
- Not in the official MCP Registry under its own namespace, and the docs page does not name the transport.
- Benchmark figures found (LongMemEval 81.6% with GPT-4o, 85.2% with Gemini-3) come from a competitor's table, Hindsight's.
- The 31,522 stars (as of 2026-11-03) are for the whole monorepo.

**Best for:** a small team that wants hosted shared memory and is willing to add Supermemory's plugins for automatic capture.

### 4. Zep Context MCP

*图片：Source*
*图片：Last commit*

The most enterprise-shaped auth in this list: OAuth 2.1 with PKCE, Google Workspace sign-in by default, custom OIDC (Entra ID, Okta) on Enterprise, attribute-based access on shared graphs, read-only connections and an account-level write kill switch ([docs](https://help.getzep.com/context-mcp-server)).

**Key facts:** hosted, BYOC uses its own host · temporal knowledge graph built on Graphiti · 12 tools (`search_graph`, `get_user_summary`, `add_memory`, `add_memory_to_graph` and more) · documented for Claude, ChatGPT, Claude Code, Codex CLI and Cursor, installed through the Zep Context plugin from each host's org catalog · Free trial 10,000 credits a month with 1 MCP seat, Flex $125/mo (5 seats), Flex Plus $375/mo (15 seats), Enterprise custom ([pricing](https://www.getzep.com/pricing)). Zep Cloud is proprietary; examples and SDK tooling live in getzep/zep (Apache-2.0).

```text
https://api.getzep.com/mcp
```

**Strengths**
- Every user has a personal graph, and shared Context Graphs give project-wide or group-based access.
- Admins can make a connection read-only.
- Access tokens last about 5 minutes.

**Weaknesses**
- MCP access is metered by seat, and the cheapest paid plan is $125/mo.
- Capture is explicit tool calls guided by a skill; no automatic capture is described.
- Benchmark claims are disputed: Zep reports LoCoMo 94.7% (self-reported), while a run by ByteRover got 75.1%.
- Not in the official MCP Registry, and the docs do not state the transport.

**Best for:** companies that need identity-provider sign-in and per-group access on shared agent memory.

### 5. Hindsight

*图片：Stars*
*图片：License*
*图片：Last commit*

Recall runs four searches in parallel (semantic, BM25, graph and temporal), fuses them with reciprocal rank fusion and reranks with a cross-encoder (README).

**Key facts:** self-hosted (Docker, pip, Helm, embedded Python) or Hindsight Cloud, usage-based with free credits and no per-seat fee · Postgres + pgvector, or Oracle AI Database 23ai · MCP enabled by default at `/mcp`, one endpoint per memory bank, HTTP · needs an LLM key (25+ providers).

```bash
claude mcp add --transport http hindsight http://localhost:8888/mcp//
```

**Strengths**
- MIT license and frequent releases (v1.2.0 on 2026-11-03).
- `@vectorize-io/hindsight-coding-agents` adds automatic ingestion from git history and past sessions for 13 coding agents.
- LongMemEval 89.0% (self-reported); the README says Virginia Tech's Sanghani Center and The Washington Post reproduced results, and there is a paper (arXiv 2512.12818).

**Weaknesses**
- MCP auth is off by default; API-key bearer auth is an extension you turn on.
- Each MCP connection is scoped to one bank; cross-bank sharing is not described.
- Needs a Postgres server and an LLM key, heavier than file-based servers.
- 58,593 stars as of 2026-11-03 for a repo created 2025-10-30, a growth rate well above its peers; read the badge with that in mind.

**Best for:** self-hosting a server-grade memory with hybrid retrieval that several people's agents can reach.

### 6. mcp-memory-service

*图片：Stars*
*图片：License*
*图片：Last commit*

An individual maintainer's project with the widest self-hosted surface here: MCP plus a REST API, OAuth 2.0 with dynamic client registration, remote MCP, SSE events, a CLI and a dashboard (README).

**Key facts:** local or self-hosted, free · SQLite (single user), Cloudflare, or Hybrid (local reads with background cloud sync, the recommended mode) · embeddings run locally through ONNX, no API key · knowledge graph and automatic consolidation · documented for Claude Code, Gemini CLI, OpenCode, Codex CLI, Goose, Aider, Amp, Claude Desktop, VS Code, Cursor, Windsurf, Zed, JetBrains and more · v12.5.0 released 2026-11-03.

```bash
pip install mcp-memory-service
```

**Strengths**
- Configurable Claude Code hooks capture sessions automatically, and `python3 codex/install_hooks.py` does the same for Codex.
- Built to be shared: "Memory is shared across all agents and runs", and a self-hosted team setup syncs Hybrid to another HTTP instance.
- OAuth with dynamic client registration on a server you run.

**Weaknesses**
- Many backends and configuration paths, so there are more decisions to make at setup.
- The cloud-sync option depends on Cloudflare.
- `BENCHMARKS.md` explains how to run LongMemEval, DevBench and LoCoMo, but we found no headline scores to compare.

**Best for:** a self-hosted team memory server with OAuth and hooks, without a vendor cloud.

### 7. Basic Memory

*图片：Stars*
*图片：License*
*图片：Last commit*

Memory is plain Markdown on disk, with wikilinks and frontmatter, that you, the agent and Obsidian all edit; a local SQLite index sits beside the files (README).

**Key facts:** v1.0.0 released 2026-10-29 · official MCP Registry listing `io.github.basicmachines-co/basic-memory` · stdio locally, HTTPS for the cloud · documented for Claude Desktop, Claude Code, Codex CLI, Cursor, VS Code and ChatGPT · Cloud $15/mo beta price (regular $19), 7-day trial; Teams shared workspace at the same price.

```bash
uv tool install basic-memory --prerelease=allow
```

**Strengths**
- Memory you can read, diff and version in git.
- Semantic vector search with optional cross-encoder rerank over the notes.
- A Claude Code plugin adds session-start briefings and pre-compaction checkpoints.

**Weaknesses**
- AGPL-3.0 limits embedding it in a closed product.
- Without `--prerelease=allow`, the README says the install silently picks an older release.
- Capture is mostly manual: you or the agent ask for a note to be written.
- Team sharing goes through the paid cloud; no LoCoMo or LongMemEval numbers were found.

**Best for:** people who want to read and edit their agent's memory as notes, Obsidian users especially.

### 8. claude-mem

*图片：Stars*
*图片：License*
*图片：Last commit*

112,227 stars as of 2026-11-03, the most of any single-purpose memory project in this list. Its MCP side is four search tools; capture comes from six lifecycle hooks, so a client without hooks gets search only (README).

**Key facts:** local SQLite with FTS5 plus a Chroma vector DB, served by a Bun worker with a web viewer · hooks on SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, Stop and SessionEnd · Claude Code plugin plus installer targets for OpenCode, T3 Code, Antigravity, Pi, DeepSeek Harness, Grok Bot and OpenClaw · optional TeamBrain shared workspace and Cloud Sync to cmem.ai.

```bash
npx claude-mem install
```

**Strengths**
- Capture and injection at session start are automatic.
- Hybrid keyword and vector search over past observations.
- `` tags keep content out of storage.

**Weaknesses**
- The installer asks you to sign in and starts a hosted observer on a 30-day free trial; after that, compression falls back to your Anthropic plan unless you subscribe. Use `--provider host` to keep inference local.
- Many moving parts: Bun worker, Chroma, SQLite.
- 125 open issues as of 2026-11-03.
- `npm install -g claude-mem` installs only the SDK and registers no hooks, a common setup mistake.

**Best for:** Claude Code users who want local automatic capture and will configure the observer themselves. See the plugins list for its hook side.

### 9. agentmemory

*图片：Stars*
*图片：License*
*图片：Last commit*

Runs with no API key: keyless mode searches with BM25, and local or remote embeddings add semantic search when you configure them (README).

**Key facts:** local, Node 20+ · API on `localhost:3111` and viewer on `:3113`, both bound to loopback · 12 automatic hooks and 54 MCP tools · documented for Claude Code, Copilot CLI, Cursor, Gemini CLI, Codex CLI, OpenCode, pi and any MCP client; "All agents share the same memory server."

```bash
npx -y @agentmemory/agentmemory@latest
```

**Strengths**
- Hooks record session events with secret scrubbing and offline replay.
- A live viewer for editing and forgetting memories.
- No key needed to start.

**Weaknesses**
- 54 tools is a large tool list to load into a model's context.
- The "#1 ... based on real-world benchmarks" description is self-published, and we could not verify the numbers.
- 528 open issues for a repo created 2026-02-25.

**Best for:** one developer running several agents against one local memory without any API key.

### 10. Cognee MCP

*图片：Stars*
*图片：License*
*图片：Last commit*

Supports all three MCP transports (stdio, SSE, Streamable HTTP) and three modes: local embedded databases, a Cognee API server, or Cognee Cloud (README).

**Key facts:** graph plus vector memory (SQLite, LanceDB, Ladybug; Kuzu + LanceDB for per-dataset isolation) · tools `remember`, `recall`, `forget`, `cognify_status` · `ENABLE_BACKEND_ACCESS_CONTROL` is on by default and isolates datasets per user · stars cover the whole Cognee framework.

```bash
docker run -e TRANSPORT_MODE=http --env-file ./.env -p 8000:8000 cognee/cognee-mcp:main
claude mcp add cognee -t http http://localhost:8000/mcp
```

**Strengths**
- Per-user dataset access control on by default, plus a DNS-rebinding guard.
- Fully local option with embedded databases.

**Weaknesses**
- Needs `LLM_API_KEY`; Claude Code does not grant MCP sampling, so it cannot borrow the host model.
- Saves only on tool calls.
- Cognee Cloud pricing is not on the MCP page, and it is not in the official MCP Registry.

**Best for:** a self-hosted graph and vector memory where each user's data stays separate.

### 11. Engram

*图片：Stars*
*图片：License*
*图片：Last commit*

A single Go binary storing memory in SQLite with FTS5 at `~/.engram/engram.db`, with no embeddings and no API key (README).

**Key facts:** local · CLI, HTTP API, MCP over stdio and a TUI · 14 setup targets including Claude Code, Codex, Windsurf, Cursor, OpenCode and Gemini CLI · Git Sync exports compressed chunks for sharing; optional project-scoped Engram Cloud.

```bash
brew install gentleman-programming/tap/engram
engram setup claude-code
```

**Strengths**
- Zero dependencies to install or run.
- Team sharing through Git with no server.
- Flags related or conflicting memories.

**Weaknesses**
- Keyword search only; semantic search is not documented.
- The README does not say how much the plugins capture without a tool call.
- The Codex integration has version preconditions.

**Best for:** a minimal local memory that a team syncs through Git.

### 12. Graphiti MCP

*图片：Stars*
*图片：License*
*图片：Last commit*

A bi-temporal knowledge graph: facts carry dates, `search_memory_facts` filters by them, and historical queries work without recomputing the graph (README). It is the open engine behind Zep.

**Key facts:** self-hosted · HTTP by default at `http://localhost:8000/mcp/`, or stdio · FalkorDB (default, bundled in one container) or Neo4j 5.26+ · OpenAI by default, also Anthropic, Gemini, Groq, Azure and Ollama · 13 tools · namespaces through `--group-id` · stars cover the whole Graphiti framework.

```bash
cd graphiti/mcp_server && docker compose up
```

**Strengths**
- Temporal edges and date-filtered fact search.
- Active parent project (v0.31.2 on 2026-10-20).

**Weaknesses**
- The README calls it a reference implementation, says not to use it as a production deployment, and states it has no authentication, no authorization and no prompt-injection protection.
- Needs an LLM call on every ingest.
- Saves only on tool calls; Claude Code is not among the documented clients.

**Best for:** experimenting with temporal graph memory on a trusted local machine.

### 13. MemPalace

*图片：Stars*
*图片：License*
*图片：Last commit*

Stores conversations verbatim, organized into wings (people and projects), rooms (topics) and drawers (original content), on a retrieval backend you pick: embedded Chroma (default), `sqlite_exact`, `rust_exact` or `pgvector` (README).

**Key facts:** local, Python · MCP over stdio · Docker image and a compose file for a team server · raw mode makes no API calls · the README warns about impostor sites; official sources are the GitHub repo, PyPI and the docs.

```bash
pip install mempalace
mempalace mine ~/.claude/projects/ --mode convos
```

**Strengths**
- No API key needed in raw mode.
- pgvector backend for a shared server.
- Per-question benchmark result files are committed in the repo.

**Weaknesses**
- The headline LongMemEval figure (96.6% R@5, self-reported) is retrieval recall, shown next to other systems' end-to-end QA scores; an [arXiv paper](https://arxiv.org/pdf/2604.21284) argues the results come from standard vector-DB operations and verbatim storage rather than the palace structure.
- 823 open issues as of 2026-11-03.
- Heavy Python dependencies (chromadb, numpy, grpcio, ONNX Runtime), with PEP 668 errors noted on some platforms.
- Auto-save hooks are a separate step; the README warns that Claude Code sessions expire in 30 days without them.

**Best for:** local verbatim recall of past agent conversations, if you run the benchmarks yourself.

### 14. Official MCP memory server

*图片：Stars*
*图片：Last commit*

The reference server from the MCP organization keeps a knowledge graph of entities, relations and observations in one JSONL file, with no database and no API key (README).

**Key facts:** local, stdio, Node.js 24+ or Docker · npm `@modelcontextprotocol/server-memory` · serves both the 2026-07-28 MCP spec and the older one from one process · last commit touching `src/memory` on 2026-10-28 · the 91,777 stars belong to the whole servers monorepo.

```json
{"mcpServers":{"memory":{"command":"npx","args":["-y","@modelcontextprotocol/server-memory"],"env":{"MEMORY_FILE_PATH":"/path/to/custom/memory.jsonl"}}}}
```

**Strengths**
- Nothing to install beyond Node.
- Maintained by the MCP org on the current spec.
- Several clients can share one file: every write takes an exclusive lock, and stale locks clear on their own.

**Weaknesses**
- `read_graph` returns the entire graph.
- `search_nodes` matches the query against names, types and observations; no embeddings or ranking are described.
- No automatic capture: the README supplies a system prompt that tells the model to use the tools.
- The lock relies on exclusive file creation, so a network filesystem that does not honor it cannot be shared safely.

**Best for:** a baseline to compare against, or a small personal graph you can read by hand.

### 15. Pieces

*图片：Source*

Captures at the operating-system level: PiecesOS records code, browser history, notes and app data on the device, and the MCP tool `ask_pieces_ltm` queries it ([docs](https://docs.pieces.app/products/mcp/get-started)).

**Key facts:** local desktop app, closed source · "All data stays local"; remote sharing goes through ngrok · documented for 19 clients including Cursor, Claude Code, Codex CLI, Gemini CLI, Copilot, Windsurf, Zed and JetBrains · Pro $18.99/user/mo, Enterprise $22.99/user/mo with org-governed memory, 7-day trial with a card ([pricing](https://pieces.app/pricing)).

**Strengths**
- No save tool needed; capture runs in the background.
- The widest documented client list in this ranking.
- Processing stays on the device.

**Weaknesses**
- Closed source, and PiecesOS must be running on the desktop.
- No free tier listed.
- Memory is per user unless you buy Enterprise.

**Best for:** individual developers who want automatic capture across their whole desktop, kept on the device.

### 16. Qdrant MCP

*图片：Stars*
*图片：License*
*图片：Last commit*

Two tools, `qdrant-store` and `qdrant-find`, over a Qdrant collection, with local FastEmbed embeddings (default `sentence-transformers/all-MiniLM-L6-v2`) and no API key (README).

**Key facts:** official Qdrant server · stdio, SSE or Streamable HTTP · documented for Claude Desktop, Claude Code, Cursor, Windsurf and VS Code.

```bash
claude mcp add code-search -e QDRANT_URL=... -e COLLECTION_NAME=... -e EMBEDDING_MODEL="sentence-transformers/all-MiniLM-L6-v2" -- uvx mcp-server-qdrant
```

**Strengths**
- Maintained by the database vendor.
- The README recommends SSE for Cursor and Windsurf so one server can be shared with a team.

**Weaknesses**
- Store and find only: no update, delete or graph.
- FastEmbed is the only embedding provider.
- Needs a Qdrant instance or local mode, and the agent decides when to save.

**Best for:** teams that already run Qdrant.

### 17. LongMemory

*图片：Stars*
*图片：License*
*图片：Last commit*

A session porter imports existing logs from Claude Code, Codex, OpenCode, Gemini CLI, Copilot Chat and Cline, so memory starts with your history instead of empty (README).

**Key facts:** local-first SQLite · embeddings through OpenAI-compatible APIs, Gemini, Bedrock, Ollama or local models · stdio, or authenticated Streamable HTTP with `LONGMEMORY_API_KEY` · Claude Code plugin, Codex and ChatGPT desktop plugin, VS Code extension · formerly CaviraOSS OpenMemory.

```bash
longmemory mcp --db .longmemory/project.db --project current
```

**Strengths**
- Back-fills memory from six agents' logs.
- Both a local stdio server and an authenticated HTTP server.

**Weaknesses**
- The rename from OpenMemory, plus Mem0's separate and now removed OpenMemory, makes the name easy to confuse.
- Large scope beyond memory (skills, LLM wiki, CodeGraph).

**Best for:** importing existing agent history into one local store.

### 18. deja-vu

*图片：Stars*
*图片：License*
*图片：Last commit*

Indexes the session transcripts that 43 agents already save on disk, so recall works on day one from history you have (README).

**Key facts:** local, one Go binary, no LLM calls · credentials redacted at index time · prior sessions offered at session start, before a file edit or command, and when a command fails · indexing takes about 10 seconds · created 2026-07-14.

```bash
deja install --auto
```

**Strengths**
- No cloud and no model calls.
- One command connects every detected agent.

**Weaknesses**
- Recalls raw transcripts, not curated facts.
- Per machine only; no team sharing is described.

**Best for:** zero-config local recall across many agents on one machine.

### 19. MemOS

*图片：Stars*
*图片：License*
*图片：Last commit*

A stdio wrapper with three tools (`add_message`, `search_memory`, `get_message`) in front of the hosted MemOS cloud API ([docs](https://memos-docs.openmem.net/dashboard/mcp)).

**Key facts:** needs `MEMOS_API_KEY` and `MEMOS_USER_ID` from the MemOS API Console · documented for Claude Desktop, Cursor, Cline and Chatbox · self-hosted server mode runs API + Neo4j + Qdrant through `docker compose up` · LoCoMo 88.83 and LongMemEval 89.20 (self-reported).

```bash
npx -y @memtensor/memos-api-mcp
```

**Strengths**
- Quick to set up against the hosted API.
- Active open-source core.

**Weaknesses**
- stdio only: no remote MCP URL and no OAuth.
- Only three tools, and pricing or quotas are not on the MCP page.
- The name collides with unrelated "Memos" note-app MCP servers.

**Best for:** Cursor or Cline users trying MemOS's hosted memory.

### 20. Memori

*图片：Stars*
*图片：License*
*图片：Last commit*

Includes tools aimed at coding agents: `memori_compaction` returns a post-compaction brief, next to `memori_recall`, `memori_recall_summary` and `memori_feedback` (README).

**Key facts:** hosted at `https://api.memorilabs.ai/mcp/`, stateless HTTP · headers `X-Memori-API-Key` and `X-Memori-Entity-Id` required, `X-Memori-Process-Id` optional · core product is SQL-native and deploys on managed cloud, single-tenant, VPC or on-prem · the star badge is the core Memori repo; the MCP repo has 2 stars.

```text
https://api.memorilabs.ai/mcp/
```

**Strengths**
- A compaction-recovery tool built for long coding sessions.
- Enterprise deployment options for the core product.

**Weaknesses**
- API-key headers only, no OAuth.
- The MCP README names no clients.
- Pricing not published.

**Best for:** teams already using Memori that want its memory inside a coding agent.

### 21. Membase

*图片：Stars*
*图片：License*
*图片：Last commit*

Listed in the official MCP Registry as `ai.membase/membase` (v1.0.1, 2026-10-20) with a remote Streamable HTTP endpoint, and also runs locally from pip (README).

**Key facts:** hosted with `MEMBASE_API_KEY`, or local with `pip install 'unibaseio-membase[local]'` and an OpenAI key · documented for Claude Code, Cursor, Codex and ChatGPT · sources include a web app, a browser extension, Notion, Telegram and Claude or ChatGPT chat exports · LoCoMo 93.1%, LongMemEval_S 92.6%, DMR 92.2% (self-reported).

```text
https://api.app.membase.com/mcp-http
```

**Strengths**
- Registry listing with a remote endpoint.
- Imports chat exports and other sources, not only agent writes.

**Weaknesses**
- Small community: 100 stars as of 2026-11-03, and no GitHub releases.
- Auth method, pricing and team sharing are not documented on the docs index.

**Best for:** trying a registry-listed hosted memory that also imports your chat history.

### 22. mcp-memory-keeper

*图片：Stars*
*图片：License*
*图片：Last commit*

Built for parallel Claude Code sessions: the README calls it a shared board that several sessions read and write (README).

**Key facts:** local · storage in `~/mcp-data/memory-keeper/` · last push 2026-09-03.

```bash
claude mcp add memory-keeper npx mcp-memory-keeper
```

**Strengths**
- One-line install in Claude Code.
- Parallel sessions on one machine see the same memory.

**Weaknesses**
- Small project: 136 stars as of 2026-11-03.
- Storage is a folder in your home directory, so sharing across machines is up to you.

**Best for:** coordinating several Claude Code sessions on one machine.

### 23. mcp-knowledge-graph

*图片：Stars*
*图片：License*
*图片：Last commit*

A fork of the official memory server that picks up a project-local `.aim/memory.jsonl` automatically and supports named contexts such as `memory-work.jsonl` (README).

**Key facts:** local, npx · same entity, relation and observation model as the official server · last push 2026-05-29.

**Strengths**
- Memory per project without editing config for each repo.
- Separate files for separate contexts.

**Weaknesses**
- Keeps the official server's model: the agent decides when to write.
- Last push 2026-05-29, close to our 6-month cutoff.

**Best for:** users of the official server who want one graph per project.

### 24. MemoryMesh

*图片：Stars*
*图片：License*
*图片：Last commit*

You write `.schema.json` files, and MemoryMesh generates typed add, update and delete tools for each node type (README).

**Key facts:** local, Node/TypeScript, stdio, Docker · knowledge graph in a JSON file (`/data/memory.json` in Docker) · based on the official server · v0.4.0 · aimed at RPG worlds, CRM and org charts.

**Strengths**
- Schema-enforced structure for domain data.
- Active (push on 2026-11-03).

**Weaknesses**
- Every schema adds more tools to the model's context.
- No semantic search, and capture depends on instructions you write into the prompt.

**Best for:** structured domain memory where you control the schema.

### 25. Stash

*图片：Stars*
*图片：License*
*图片：Last commit*

Episodes, facts and working context stored in Postgres, from a self-hosted single binary with an MCP server included (repo).

**Key facts:** self-hosted · Postgres · last push 2026-06-14.

**Strengths**
- One binary on a database many teams already run.

**Weaknesses**
- Needs a Postgres instance.
- Last push 2026-06-14, slower than most entries here.
- Supported clients and capture model: not published in the project summary.

**Best for:** self-hosters who want memory in their own Postgres.

## Deprecated or not recommended

Not counted in the 25. Links point at the old projects so you can recognize them in older tutorials.

- **mem0ai/mem0-mcp:** archived; its README says it is no longer maintained and points to Mem0's hosted MCP.
- **Mem0 OpenMemory (self-hosted):** removed from the mem0 monorepo on 2026-07-29; the `openmemory/` path is gone. `mem0ai/openmemory` is now an unrelated CLI for porting coding sessions.
- **coleam00/mcp-mem0:** a template with no push since 2025-04-13.
- **[Graphlit](https://www.graphlit.com/pricing):** winding down; new signups are closed.
- **Letta `@letta-ai/memory-mcp`:** last npm publish in October 2025, and its source repo returns 404. Letta now puts its memory work into Letta Code and claude-subconscious.
- **Rememberizer MCP:** last release 0.1.2 in December 2024.
- **ByteRover CLI (formerly Cipher):** repo archived since June 2026, and licensed under the Elastic License 2.0, which is source-available rather than OSI open source.
- **supermemoryai/supermemory-mcp:** MCP v1, deprecated in favor of `https://mcp.supermemory.ai/mcp`.
- **Redis agent-memory-server V0:** kept as a research artifact, not the supported production distribution; the managed Redis Agent Memory does not document MCP.
- **Elastic MCP server:** its README says it is deprecated and will get only critical security updates.
- **Memento MCP:** no default-branch commit since 2025-05-10.
- **Memory Bank MCP:** no push since 2025-08-20.
- **Chroma MCP:** no commit since 2025-09-17, and it is a generic database tool rather than memory.
- **ConPort:** no push since 2026-01-27.
- **Neo4j memory server:** the monorepo is active, but no commit has touched the memory server since 2026-02-23, outside our 6-month window.

## FAQ

### What is an agent memory MCP server?

An MCP server that stores what an agent learns (facts, decisions, past conversations) and exposes tools to save and search it, so a later session or a different agent can recall it. Most servers here save only when the model calls a write tool; a few capture automatically through hooks or background extraction.

### Which memory MCP server is best for Claude Code, Cursor or Codex?

All 25 speak MCP, but documented support varies. Mem0 documents Claude Code, Codex and Cursor; Zep documents Claude Code, Codex CLI and Cursor; Basic Memory, Membase and Glen work across all three. For automatic capture in Claude Code, look at entries with hooks (Glen, claude-mem, agentmemory, mcp-memory-service, deja-vu), or see the plugins list.

### What are the best Mem0 MCP alternatives?

For hosted memory with OAuth: Supermemory and Zep Context MCP. For self-hosting: Hindsight, mcp-memory-service or Cognee. For memory shared by a whole team with per-observation access control: Glen. If you were using Mem0's self-hosted OpenMemory or `mem0-mcp`, both are gone; see Deprecated.

### Local vs hosted memory MCP: which should I pick?

Local servers (Engram, deja-vu, the official server, Basic Memory, agentmemory) keep data on your machine and often need no API key, but sharing across people is up to you (Git, a shared server). Hosted servers (Glen, Mem0, Supermemory, Zep) handle sign-in, sharing and storage for you, and your memory lives on the vendor's servers. Hindsight, Cognee, MemPalace and mcp-memory-service sit in between: self-host a server your team can reach.

### Do I need a vector database?

No. Engram uses SQLite full-text search, deja-vu indexes transcripts without an LLM, the official server keeps a JSONL graph, and agentmemory runs keyless on BM25. Vector search helps when queries do not share words with the stored text; Qdrant MCP, Hindsight (pgvector) and claude-mem (Chroma) use one.

### MCP tools vs plugin hooks: what is the difference?

An MCP tool runs only when the model decides to call it, so a save can be skipped. A plugin hook runs on agent events (session start, each prompt, stop) whether or not the model thinks of memory. That is why several servers here pair an MCP server with a separate hook plugin, and why Glen records only when its plugin hooks are installed.

### Is the official MCP memory server enough?

For a small personal graph, yes: it needs only Node and stores a readable JSONL file. It has no embeddings or ranking described, `read_graph` returns the whole graph, and nothing is saved unless the model calls a tool, so it gets harder to use as memory grows.

### Which memory MCP servers support shared team memory?

Glen (org-wide, access checked per observation), Zep (shared Context Graphs with group-based access), Supermemory (team spaces), Basic Memory Teams (paid cloud), mcp-memory-service (self-hosted sync), Engram (Git Sync), and any server you can host centrally such as Hindsight or Qdrant. Graphiti's MCP server can be shared but has no authentication.

### Which memory MCP servers use a knowledge graph?

Zep and Graphiti (temporal graph), Cognee (graph plus vector), the official memory server and its forks mcp-knowledge-graph and MemoryMesh (JSON or JSONL graph), and mcp-memory-service (a knowledge graph next to embeddings).

## Related

- Best Memory Plugins: the companion list, ranking 24 memory plugins for Claude Code, Codex, Cursor and other coding agents, with built-in agent memory compared separately.

## Contributing

Additions and corrections are welcome. Read CONTRIBUTING.md first: entries must be maintained, must ship an MCP server for memory, and every fact needs a source link.

## License

CC0-1.0. To the extent possible under law, the contributors have waived all copyright and related rights to this list.

Last updated: November 2026
