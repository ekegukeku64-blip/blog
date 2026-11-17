---
title: "fujc683/seedance-2-5-flash-reference-video"
owner: "fujc683"
name: "seedance-2-5-flash-reference-video"
fullName: "fujc683/seedance-2-5-flash-reference-video"
description: "Control Seedance 2.5 Flash motion with a first frame or reference clip."
sourceUrl: "https://github.com/fujc683/seedance-2-5-flash-reference-video"
stars: 98
forks: 0
language: "未知"
topics: ["ai-video", "ai-video-generation", "api", "apimart", "awesome", "prompt-engineering", "seedance", "text-to-video"]
license: "NOASSERTION"
homepage: "https://gola.apimart.ai/k-8S8XMN"
defaultBranch: "main"
snapshotDate: "2026-11-17"
pushedAt: "2026-11-16T09:42:36Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Seedance 2.5 Flash Reference Video & Image-to-Video

> Control motion with a first frame or a reference clip, and how billing changes.

*图片：Awesome* *图片：License: CC BY 4.0*

**[👉 Try Seedance 2.5 Flash on APIMart](https://gola.apimart.ai/k-8S8XMN)**

`https://gola.apimart.ai/k-8S8XMN`

[💰 Pricing](https://gola.apimart.ai/k-eVte0o) · [🔑 Get an API key](https://gola.apimart.ai/k-zoHePu)

---

## Two ways to control motion

| Input | Field | What it does |
|---|---|---|
| First frame | `reference_image` | starts the clip from your still |
| Motion reference | `reference_video` | borrows motion from an existing clip |

## Image-to-video

```bash
curl -X POST https://api.apimart.ai/v1/videos/generations \
  -H "Authorization: Bearer $APIMART_API_KEY" -H "Content-Type: application/json" \
  -d '{"model":"seedance-2-5-flash","prompt":"the product slowly rotates, studio light",
       "reference_image":"https://.../still.jpg","duration":4,"ratio":"16:9","resolution":"720p"}'
```

Tips:
- Use a 16:9 still for a 16:9 clip — mismatched ratios get cropped
- Describe **what changes**, not what is in the frame (the model already sees it)
- Keep motion small; the model interpolates less convincingly on big moves

## Reference video

Reference-video requests are billed at a **separate, higher rate**, so budget
accordingly. Use it when you need an exact motion signature (camera rent,
dance choreography, product turntable).

## Prompting for image-to-video

| Weak | Strong |
|---|---|
| `make it move` | `the fabric ripples in a light breeze` |
| `cinematic` | `slow dolly-in, 85mm, window light` |
| `animate the scene` | `the candle flame flickers, camera locked off` |

## Common failure

If the clip drifts or morphs, the model is being asked to invent too much.
Lower ambition, shorten duration to 4 s, and re-render.

---

## Related

- Prompt library: awesome-seedance-2-5-flash-prompts
- Other video models: all collections

## License

CC BY 4.0
