---
title: "fujc683/cheap-video-api"
owner: "fujc683"
name: "cheap-video-api"
fullName: "fujc683/cheap-video-api"
description: "Every video model ranked by price per second, with a realistic workflow budget."
sourceUrl: "https://github.com/fujc683/cheap-video-api"
stars: 109
forks: 0
language: "未知"
topics: ["ai-api", "ai-video", "api-gateway", "api-proxy", "apimart", "awesome", "cheap-api", "openai-compatible"]
license: "NOASSERTION"
homepage: "https://gola.apimart.ai/k-D2q4BP"
defaultBranch: "main"
snapshotDate: "2026-11-17"
pushedAt: "2026-11-16T09:44:19Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Cheap Video Generation API — price per second, ranked

> Every video model on APIMart ranked by cost per second, with a realistic workflow budget.

*图片：Awesome* *图片：License: CC BY 4.0*

**[👉 Get a video API key](https://gola.apimart.ai/k-D2q4BP)**

`https://gola.apimart.ai/k-D2q4BP`

[💰 Pricing](https://gola.apimart.ai/k-D2q4BP) · [🔑 API key](https://gola.apimart.ai/k-BQA114) · [📘 Docs](https://gola.apimart.ai/k-6qifPe)

---

## Cheap video generation, ranked

Prices are per output second; a 4-second clip is the usual comparison unit.

| Model | $/s | 4s clip | Max length | Notes |
|---|---:|---:|---:|---|
| Wan 3.0 | $0.09 | $0.36 | 5 s | cheapest usable draft |
| PixVerse 6 | $0.12 | $0.48 | 8 s | creative transitions |
| **Seedance 2.5 Flash** | **$0.18** | **$0.57** | **30 s** | best value for length |
| Kling 4.0 Flash | $0.19 | $0.76 | 10 s | stylized |
| Seedance 2.0 | $0.20 | $0.80 | 12 s | motion realism |
| Veo 3 | $0.35 | $1.40 | 8 s | 1080p + audio |

## How to actually cut cost

1. **Draft at 480p** — roughly 30% cheaper than 720p for the same clip
2. **Iterate at 4 seconds**, extend only after the prompt is right
3. **Use Wan 3.0 for storyboards**, Seedance for the final
4. **Never re-submit on timeout** — poll the task instead

## Cost of a realistic workflow

| Stage | Model | Clips | Cost |
|---|---|---:|---:|
| Storyboard | Wan 3.0 (480p, 4s) | 20 | $7.20 |
| Refine | Seedance 2.5 Flash (480p, 4s) | 10 | $4.40 |
| Final | Seedance 2.5 Flash (720p, 6s) | 3 | $2.57 |
| **Total** | | 33 | **$14.17** |

One finished 6-second spot, 33 generations, under $15.

## What "cheap" costs you

- 480p is not delivery quality — always re-render the pick at 720p
- Cheap models drift more on long clips; keep them under 6 s
- No model in this table does native audio except Veo 3

---

## Related

- Seedance prompt library: awesome-seedance-2-5-flash-prompts
- Seedance API docs: seedance-2-5-flash-api

## License

CC BY 4.0
