---
title: "fujc683/ai-video-api-gateway"
owner: "fujc683"
name: "ai-video-api-gateway"
fullName: "fujc683/ai-video-api-gateway"
description: "One OpenAI-compatible endpoint for Seedance, Kling, Wan, PixVerse and Veo."
sourceUrl: "https://github.com/fujc683/ai-video-api-gateway"
stars: 110
forks: 0
language: "未知"
topics: ["ai-api", "ai-video", "api-gateway", "api-proxy", "apimart", "awesome", "cheap-api", "openai-compatible"]
license: "NOASSERTION"
homepage: "https://gola.apimart.ai/k-rQYkFg"
defaultBranch: "main"
snapshotDate: "2026-11-17"
pushedAt: "2026-11-16T09:43:18Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# AI Video API Gateway — one endpoint for every video model

> Route Seedance, Kling, Wan, PixVerse and Veo through one OpenAI-compatible endpoint.

*图片：Awesome* *图片：License: CC BY 4.0*

**[👉 Get a video API key](https://gola.apimart.ai/k-rQYkFg)**

`https://gola.apimart.ai/k-rQYkFg`

[💰 Pricing](https://gola.apimart.ai/k-rQYkFg) · [🔑 API key](https://gola.apimart.ai/k-DT5JKW) · [📘 Docs](https://gola.apimart.ai/k-bZLhVV)

---

## One endpoint, every video model

Instead of integrating Seedance, Kling, Wan, PixVerse and Veo separately, point
everything at one gateway and switch with a model string.

| Model | Strength | Price / s |
|---|---|---:|
| Seedance 2.5 Flash | long clips (30 s), fast | $0.1836 |
| Seedance 2.0 | motion realism | $0.20 |
| Kling 4.0 Flash | stylized motion | $0.19 |
| Wan 3.0 | cheap drafts | $0.09 |
| PixVerse 6 | creative transitions | $0.12 |
| Veo 3 | 1080p + native audio | $0.35 |

## Routing pattern

```python
MODELS = {
    "draft":   ("seedance-2-5-flash", "480p"),
    "final":   ("seedance-2-5-flash", "720p"),
    "audio":   ("veo-3",              "1080p"),
    "cheap":   ("wan-3-0",            "480p"),
}

def make(prompt, tier="draft", seconds=4):
    model, res = MODELS[tier]
    return submit(model=model, prompt=prompt, duration=seconds, resolution=res)
```

## Fallback on failure

```python
try:
    return submit("seedance-2-5-flash", ...)
except UpstreamError:
    return submit("kling-4-0-flash", ...)   # same payload shape
```

## What the gateway handles for you

- **Unified auth** — one key, per-model quota
- **Unified billing** — one balance, one invoice, per-second metering
- **Unified retry** — transient upstream errors are retried before you see them
- **Unified schema** — `duration` / `ratio` / `resolution` mean the same thing

## Migration cost

Existing OpenAI-style clients:

```python
client = OpenAI(base_url="https://api.apimart.ai/v1", api_key=KEY)
```

That is the entire migration.

---

## Related

- Seedance prompt library: awesome-seedance-2-5-flash-prompts
- Seedance API docs: seedance-2-5-flash-api

## License

CC BY 4.0
