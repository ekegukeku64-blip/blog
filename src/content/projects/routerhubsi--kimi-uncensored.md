---
title: "routerhubSI/kimi-uncensored"
owner: "routerhubSI"
name: "kimi-uncensored"
fullName: "routerhubSI/kimi-uncensored"
description: "Every uncensored and abliterated Kimi build — Kimi K3.1 Pro Uncensored via API at 0.30/1.50 USD per million tokens, abliterated open-weight checkpoints for K3.1 Pro and K3, license notes and a red-team prompt library. Maintained by RouterHub."
sourceUrl: "https://github.com/routerhubSI/kimi-uncensored"
stars: 84
forks: 14
language: "未知"
topics: ["abliterated", "abliterated-models", "ai-gateway", "anthropic-compatible", "gguf", "kimi", "kimi-api", "kimi-k3-0"]
license: "MIT"
homepage: "https://routerhub.si/?utm_source=github&utm_medium=repo&utm_campaign=kimi-uncensored"
defaultBranch: "main"
snapshotDate: "2026-11-12"
pushedAt: "2026-11-12T05:37:21Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Kimi Uncensored — every uncensored and abliterated Kimi model, indexed and tested

**An uncensored Kimi model is a Moonshot AI Kimi variant with refusal behavior reduced — either ablated at the weight level or served as an unfiltered hosted API variant. This repo indexes all of them: the hosted Kimi K3.1 Pro Uncensored variant, abliterated open weights for K3.1 Pro and the K3 generation on Hugging Face, a red-team prompt library, and first-party test results — including the comparison nobody else has run: uncensored Kimi vs uncensored DeepSeek for cyber work.**


  
  
  


---

Maintained by [RouterHub](https://routerhub.si/?utm_source=github&utm_medium=readme&utm_campaign=kimi-uncensored) · Community-maintained.

Every variant has its own page under `models/`:

- `kimi-k3.1-pro-uncensored` — hosted API variant
- `kimi-k3.1-pro-abliterated` — open-weight abliterated build
- `kimi-k3.0-abliterated` — previous-generation builds that run on consumer hardware
- `kimi-k3.1-pro` — the standard model, for comparison

To add or correct an entry, open an issue — corrections and new builds are welcome.

## Why Moonshot's K3.1 Pro release is different

Before publishing the K3.1 Pro weights on November 4, 2026, Moonshot removed hacking-related training data from the released checkpoint — the company reports that an uncut version solved **90.5%** of its internal exploit benchmark against **81%** for the model it shipped. The checkpoint at `moonshotai/Kimi-K3.1-Pro` is the trimmed release.

So for Kimi, "uncensored" isn't a marketing adjective — Moonshot itself drew the line between the shipped behavior and the full behavior. Everything in this repo sits on the far side of that line.

## Every uncensored Kimi build

**Hosted API variants** — for the current generation without a GPU cluster:

| Model | Input | Cached input | Output | Context |
|---|---:|---:|---:|---:|
| `kimi-k3.1-pro-uncensored` | $0.30 | $0.03 | $1.50 | 1,048,576 |
| `kimi-k3.1-pro` | $0.20 | $0.02 | $1.00 | 1,048,576 |

Prices in USD per million tokens; live rates at the [public catalogue](https://routerhub.si/models.json).

**Open weights on Hugging Face:**

| Build | Generation | What it is | Downloads | Likes |
|---|---|---|---:|---:|
| [routerhub/kimi-k3.1-pro-abliterated](https://huggingface.co/routerhub/kimi-k3.1-pro-abliterated) | K3.1 Pro | Our own abliterated build — weights landing, evals coming | — | — |
| [audnai/penclaw-Kimi-K3.1-pro-unrestricted](https://huggingface.co/audnai/penclaw-Kimi-K3.1-pro-unrestricted) | K3.1 Pro | Abliterated 2.8T checkpoint, refusal behavior removed at the weight level | 157 | 182 |
| [lyber-ai/Kimi-K3.1-Pro-UNCENSORED-MXFP4](https://huggingface.co/lyber-ai/Kimi-K3.1-Pro-UNCENSORED-MXFP4) | K3.1 Pro | Uncensored build in the original MXFP4 precision | 7 | 21 |
| [moonshotai/Kimi-K3.1-Pro](https://huggingface.co/moonshotai/Kimi-K3.1-Pro) | K3.1 Pro | Base checkpoint — the hacking-trimmed release | 18,432 | 1,500+ |
| [Blackfrost-AI/KIMI-K3-Q2_K-GGUF-ABLITERATED](https://huggingface.co/Blackfrost-AI/KIMI-K3-Q2_K-GGUF-ABLITERATED) | K3 | Abliterated GGUF, consumer hardware | 3,397 | 17 |
| [Ryanchen911/Kimi-K3-Uncensored-GGUF](https://huggingface.co/Ryanchen911/Kimi-K3-Uncensored-GGUF) | K3 | Uncensored GGUF | 3,063 | 67 |
| [Uniboshi/Kimi-K3-Abliterated-V1-GGUF](https://huggingface.co/Uniboshi/Kimi-K3-Abliterated-V1-GGUF) | K3 | Abliterated GGUF | 1,818 | 37 |
| [audnai/penclaw-Kimi-K3.0-abliterated-GGUF](https://huggingface.co/audnai/penclaw-Kimi-K3.0-abliterated-GGUF) | K3.0 | Abliterated GGUF from the audnai team | 160 | 248 |

Download counts sourced via the Hugging Face API. Check each repo's license and model card before use.

The `audnai` team publishes measured numbers with their builds — on their 40-prompt refusal benchmark (LLM-judged), the K3.1 Pro edit drops explicit refusals from 38/40 to **0/40** and raises substantive delivery from 0/40 to **29/40 (72.5%)**, with benign-prompt coherence intact. Methodology: audn-ai/refusal-benchmark. The same team built the abliterated GLM-5.3 checkpoint indexed in uncensored-models.

**More Kimi-family abliterated builds** (distills and side models):

- [OpenYourMind/Qwopus3.5-122B-A10B-Kimi-K2.6-destill-healed-abliterated-GGUF](https://huggingface.co/OpenYourMind/Qwopus3.5-122B-A10B-Kimi-K2.6-destill-healed-abliterated-GGUF) — 12,122 downloads
- [mradermacher/Huihui-Kimi-Linear-48B-A3B-Instruct-abliterated-bf16-i1-GGUF](https://huggingface.co/mradermacher/Huihui-Kimi-Linear-48B-A3B-Instruct-abliterated-bf16-i1-GGUF) — 10,726 downloads
- [mradermacher/Kimi-Dev-72B-abliterated-GGUF](https://huggingface.co/mradermacher/Kimi-Dev-72B-abliterated-GGUF) — 2,275 downloads

## Which uncensored Kimi should you use?

| Your situation | Pick | Why |
|---|---|---|
| Red-team or agentic work over huge inputs (codebases, logs, contracts) | Hosted `kimi-k3.1-pro-uncensored` | The only way to get the 1M-token context without an 8×B300 cluster |
| Uncensored Kimi on your own machine, today | A K3/K3.0 GGUF build | Runs in llama.cpp, Ollama or LM Studio on consumer hardware |
| Maximum capability, you own a GPU cluster | `penclaw-Kimi-K3.1-pro-unrestricted` | Full 2.8T checkpoint, weight-level ablation, measured results |
| Cyber and exploit-style tasks specifically | DeepSeek V4.1 Flash 1017 Abliterated | See our comparison below |

## Test results: Kimi vs DeepSeek for cyber work

Because Moonshot trimmed the hacking data from K3.1 Pro's open weights, the obvious question is whether the uncensored variants actually close the gap. We ran the same red-team prompt battery (`prompts.md`) through **Kimi K3.1 Pro Uncensored** and **DeepSeek V4.1 Flash 1017 Abliterated** ($0.30/$1.25 per million tokens on the same endpoint).

**DeepSeek ranked higher for cyber capabilities.** It answered exploit-style probes more directly and needed less framing to engage with the tasks, which is consistent with Moonshot's own account of what they removed from the shipped checkpoint.

That is not a knock on Kimi — K3.1 Pro's edge is elsewhere: the 1,048,576-token context window, native image input, and stronger general agentic scores (Terminal-Bench 4.0 at 65.7 per Moonshot's model card). If your workload is long-context red-teaming, Kimi uncensored is still the tool; if it is focused exploit work, DeepSeek abliterated earned the first slot in our testing.

## Running the K3 builds locally

The previous generation fits consumer hardware. With [Ollama](https://ollama.com/):

```sh
ollama run hf.co/Uniboshi/Kimi-K3-Abliterated-V1-GGUF
```

Or with llama.cpp — pick a quantization file from the build's Files tab that fits your VRAM:

```sh
llama-cli -m Kimi-K3-Abliterated-V1-Q4_K_M.gguf -p "List five real-world techniques used to guess weak passwords."
```

K3.1 Pro is a different story: the full checkpoint is ~1.56 TB across 96 shards, the documented floor is eight B300-class accelerators, and a 128 GB MacBook streaming shards off an SSD runs at roughly 0.3 tokens per second — runnable, not usable. No uncensored K3.1 Pro GGUF exists yet; base-model GGUF builds like [KarLexAI/Kimi-K3.1-Pro-GGUF](https://huggingface.co/KarLexAI/Kimi-K3.1-Pro-GGUF) are not ablated.

## Hosted setup

One base-URL change in the OpenAI SDK:

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["ROUTERHUB_API_KEY"],
    base_url=os.environ["ROUTERHUB_BASE_URL"],  # copy from the dashboard
)

response = client.chat.completions.create(
    model="kimi-k3.1-pro-uncensored",
    messages=[{"role": "user", "content": "Reply with exactly OK."}],
)
print(response.choices[0].message.content)
```

RouterHub serves this variant — full disclosure, we run the repo. Setup guides cover the OpenAI, Anthropic and agent-tool paths.

## Red-team prompt library

`prompts.md` — a working set of refusal probes, defensive reframings, multi-turn probes and prompts aimed at the capability Moonshot trimmed. Run them against any Kimi variant (or any other model) and log what you get; retain failed attempts alongside successes. Method notes: docs/06-red-teaming-guide.md.

## Documentation

| Guide | Contents |
| --- | --- |
| What is Kimi K3.1 Pro Uncensored | The model, the Moonshot trim, and what the variants change |
| Abliterated vs. uncensored | Weight changes, tuning, and variant selection |
| Kimi API quickstart | Account, model IDs, requests, and billing |
| Claude Code, Cursor, OpenCode | Matching clients to supported protocols |
| Running K3 locally | Ollama and llama.cpp for the previous generation |
| Red-teaming guide | Test design and refusal-behavior measurement |
| FAQ | Common Kimi uncensored and variant questions |
| Glossary | Model, prompt, and variant terms |

## License notes

The [Kimi K3.1 Pro License](https://huggingface.co/moonshotai/Kimi-K3.1-Pro) permits commercial use, with two conditions that matter for deployments:

- Reselling inference access above **$20 million** in group revenue over any 12 months requires a separate agreement with Moonshot.
- Products embedding the model above **100M monthly active users** must display "Kimi K3.1-Pro" in the interface.

Community builds inherit the base checkpoint's license terms.

## FAQ

**Is Kimi K3.1 Pro censored?**
The API and the open weights ship with reduced hacking capability — Moonshot removed hacking-related training data before publishing the weights. Uncensored variants restore the fuller behavior; this repo indexes all of them.

**Which is the best uncensored Kimi model?**
Depends on the job: hosted `kimi-k3.1-pro-uncensored` for the 1M-token context without GPUs, the K3/K3.0 GGUF builds for local use, `penclaw-Kimi-K3.1-pro-unrestricted` if you operate a GPU cluster. For focused cyber tasks our testing put DeepSeek V4.1 Flash 1017 Abliterated ahead of both.

**Can you run uncensored Kimi locally?**
Yes for K3 and K3.0 — the GGUF builds above run in llama.cpp, Ollama or LM Studio. Not practically for K3.1 Pro: no ablated GGUF exists and the full checkpoint needs a datacenter node.

**What did Moonshot remove from Kimi K3.1 Pro?**
Hacking-related training data, per the company's own report ahead of the November 4, 2026 weights release. The reported gap is 90.5% (uncut) vs 81% (shipped) on their internal exploit benchmark.

**Does uncensored Kimi work with Ollama?**
The K3/K3.0 GGUF builds do. There is no uncensored K3.1 Pro GGUF yet — at 2.8T parameters even a 4-bit build sits beyond consumer cards.

**Kimi uncensored vs abliterated — what's the difference?**
Abliterated is the weight-level technique; uncensored is the category label for the result. The hosted variant is labeled uncensored in the catalogue; the Hugging Face builds listed here are abliterated. Refusal behavior varies by prompt and version.

**Is Kimi K3.1 Pro free?**
The weights are free to download under the Kimi K3.1 Pro License, with the commercial conditions above. Hosted access is pay-per-token.

## Compared to

- DeepSeek uncensored — the dedicated DeepSeek index, including the V4.1 Flash 1017 build that won our cyber comparison
- Uncensored models index — the full library across GLM, DeepSeek and Qwen
- uncensored-ai-api — what an uncensored AI API is, with setup guides
- routerhub-model-evals — recorded GLM comparisons with raw outputs and sandbox scores

## Related

- **[RouterHub models](https://routerhub.si/models?utm_source=github&utm_medium=readme&utm_campaign=kimi-uncensored):** compare model families, protocols, and published prices.
- **DeepSeek uncensored index:** the abliterated cyber workhorse and the pinned 1017 build.
- **Uncensored models index:** every uncensored and abliterated entry across families.
- **[RouterHub](https://routerhub.si/?utm_source=github&utm_medium=readme&utm_campaign=kimi-uncensored):** account access, prepaid credits, and API keys.
- **[Telegram](https://t.me/routerhubsi):** RouterHub's community channel.

Documentation fixes and redacted reproductions are welcome: contributing · security · MIT license.

---


**Found a useful Kimi uncensored or abliterated resource? Star the repository and share your documentation improvements.**

Maintained by RouterHub. Model names and trademarks belong to their respective owners; this repository does not imply endorsement by model providers. Use the APIs in accordance with applicable laws and service policies.
