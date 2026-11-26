---
title: "uxpilot-ai/frontend-design-skill"
owner: "uxpilot-ai"
name: "frontend-design-skill"
fullName: "uxpilot-ai/frontend-design-skill"
description: "Free frontend design skill for Claude Code, Codex and Cursor: designs your UI on a UX Pilot canvas, then builds it in your code"
sourceUrl: "https://github.com/uxpilot-ai/frontend-design-skill"
stars: 187
forks: 2
language: "未知"
topics: ["agent-skills", "claude-code", "claude-skills", "codex", "cursor", "design-to-code", "frontend-design", "mcp"]
license: "Apache-2.0"
homepage: "https://uxpilot.ai/skills/frontend-design-skill"
defaultBranch: "main"
snapshotDate: "2026-11-26"
pushedAt: "2026-11-25T19:40:41Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Frontend Design skill for Claude Code, Codex and Cursor

A free agent skill that designs your UI before your agent builds it. It sends a short brief from your codebase to UX Pilot, which designs real screens on a canvas you can open and edit. Your agent then builds the screens you pick in your own stack, with your components and tokens. It works in Claude Code, Codex, Cursor and any agent that supports skills and MCP.

## Install

```bash
npx skills add uxpilot-ai/frontend-design-skill
```

Or copy the `skills/ui-design` folder into your agent's skills folder (for Claude Code, `~/.claude/skills/`).

Then connect UX Pilot once. In Claude Code:

```bash
claude mcp add --transport http uxpilot https://mcp.uxpilot.net/mcp
```

Run `/mcp` in Claude Code and sign in. In Cursor and other agents, add the MCP server `https://mcp.uxpilot.net/mcp` and sign in. If you skip this, the skill walks you through it. A free UX Pilot account is enough to start.

## What it does

- Reads your project first: product, audience, routes, colors, fonts and copy, so the brief uses your real content.
- Designs the screens with UX Pilot and gives you a link to the canvas, where you can compare, edit and comment on them.
- Shows each screen in the chat and fixes common problems such as low contrast or clipped text.
- Builds the chosen screens in your code with your existing components, then checks the result against the design.
- Asks before every design run, because runs use UX Pilot credits.

## Example prompts

- "Design a better landing page for this app, then build it."
- "Redesign our pricing page. Keep our brand colors."
- "Design the onboarding screens for this mobile app."
- "Make this dashboard look less generic."

## What's inside

| File | What it covers |
|---|---|
| `SKILL.md` | Connecting UX Pilot, writing the brief, running and showing the design |
| `references/implementing.md` | Building the design in your stack and checking it |

## Made by UX Pilot

[UX Pilot](https://uxpilot.ai/?utm_source=frontend-design-skill&utm_medium=readme) is an AI UI design tool for screens, user flows, prototypes and UX reviews.

## License

Apache License 2.0: use, change and share it freely. Keep the NOTICE file when you do.
