---
title: "wideeyededi/uncensored-nsfw-ai-video-api"
owner: "wideeyededi"
name: "uncensored-nsfw-ai-video-api"
fullName: "wideeyededi/uncensored-nsfw-ai-video-api"
description: "Uncensored NSFW AI video API — Seedance Spicy & Wan NSFW docs for 18+ text-to-video / image-to-video: async tasks, webhooks, credits billing. 成人向 AI 视频生成 API：Seedance Spicy、Wan NSFW、文生/图生视频、异步任务、积分计费、接入指南。"
sourceUrl: "https://github.com/wideeyededi/uncensored-nsfw-ai-video-api"
stars: 322
forks: 0
language: "未知"
topics: ["123vips", "ai-api", "ai-companion", "ai-video", "ai-video-api", "ai-video-generator", "comfyui", "image-to-video"]
license: "MIT"
homepage: "https://123vips.com/"
defaultBranch: "main"
snapshotDate: "2026-11-02"
pushedAt: "2026-11-02T03:01:26Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Uncensored NSFW AI Video API — Vipeak AI (123vips.com)


**English** | **中文**

> Main site: 
>
> This repository only collects product documentation, screenshots and integration notes. It does not contain the site's production code, user data, keys or deployment configuration.
>
> GitHub account details: GITHUB_ACCOUNT.md

**Uncensored NSFW AI Video API** — developer documentation for the 18+ AI video generation API at 123vips.com (Vipeak AI), covering the Seedance Spicy and Wan NSFW model lines, async tasks, webhook callbacks, credit billing, server-side security and how to obtain the official API documentation.

## At a glance

Vipeak AI is an AI character video and companion creation platform. Users browse characters, chat with them, generate video from an image or a prompt, and use image generation, cases, workflows and API Access.

- Main site: 
- Brand page: 
- Character and creation workspace: 
- Character library: 
- Tags: 
- Categories: 
- Telegram community: 
- Telegram support: 
- X: 

> The site is for adults. The character and creation pages show an 18+ confirmation before entry.

## Positioning and developer keywords

**One-liner:** 123vips.com (Vipeak AI) is an AI character video and companion generation platform for adults. This repository is written for developers and covers the public entry point of the 18+ video generation API, integration preparation, async task architecture, webhooks, credit billing and server-side security requirements.

**Primary keywords:**

- Model and API: `uncensored ai video api`, `nsfw ai video api`, `uncensored video api`, `seedance spicy api`, `seedance uncensored api`, `wan nsfw api`, `wan uncensored api`, `seedance api`, `wan api`
- Colloquial and long tail: `seedance sexy api`, `wan sexy api`, `adult ai video api`, `18+ ai video generation api`, `uncensored image to video api`
- Capabilities: `text-to-video`, `T2V`, `image-to-video`, `I2V`, `AI character video`, `AI character chat`, `consistent character`, `character templates`, `creative workflow`
- Adjacent models and stack: `Kling API`, `Veo API`, `Runway API`, `Pika API`, `Hailuo API`, `ComfyUI`, `LoRA`, `Stable Diffusion`, `async generation task`, `webhook`, `PostgreSQL`
- Product and repo: `Vipeak AI`, `123vips`, `18+ AI platform`, `API integration`, `API documentation`

**Note:** the terms above describe search and integration directions. They do not mean that every model or endpoint is publicly documented. The actual models, parameters, pricing and endpoint paths come from the official API documentation obtained after signing in. Do not infer unpublished endpoints from keywords.

Structured summary for AI search and coding assistants: llms.txt.

## What developers find here

- `API_INTEGRATION.md`: API Access entry, integration flow, server architecture and security requirements
- `llms.txt`: structured product summary for AI search, coding assistants and automation tools
- `screenshots/`: redacted screenshots of the site and the API Access page
- `README.md`: product capabilities, page entry points, stack and integration boundaries

## Developer search keywords

`uncensored ai video api`, `nsfw ai video api`, `uncensored video api`, `seedance spicy api`, `seedance uncensored api`, `wan nsfw api`, `wan uncensored api`, `seedance api`, `wan api`, `uncensored image to video api`, `nsfw image to video api`, `adult ai video api`, `18+ ai video generation api`, `seedance sexy api`, `wan sexy api`, `ai video generation api`, `text to video api`, `image to video api`, `i2v api`, `t2v api`, `ai character api`, `ai companion api`, `comfyui nsfw api`, `wan lora nsfw`, `kling api`, `veo api`, `runway api`, `hailuo api`, `async task`, `webhook`, `credits billing`.

## Model and API entry points: Seedance / Wan

`uncensored ai video api` and `nsfw ai video api` are the two most common terms for this category, while `seedance spicy api` and `wan nsfw api` are the per-model entries. They describe the **direction of 18+ AI video generation API integration**; they do not mean that a complete public contract for either model is already published.

| Model line | Common developer terms | What to verify before integration |
|---|---|---|
| Seedance | `seedance spicy api`, `seedance uncensored api`, `seedance api`, `seedance sexy api` (colloquial) | Actual model versions, T2V/I2V support, reference images, duration, resolution, billing and moderation rules |
| Wan | `wan nsfw api`, `wan uncensored api`, `wan api`, `wan sexy api` (colloquial) | Actual model versions, T2V/I2V support, first/last frame control, duration, resolution, billing and moderation rules |

> The modifiers differ on purpose. Seedance is a hosted closed model, so developers follow the gateway's **Spicy** tier naming; Wan can be self-hosted, so developers follow the open-source **nsfw** LoRA and workflow naming. Mixing the two loses both audiences.

Shared engineering requirements:

- **Async tasks:** persist a task id after creation, then poll or receive results through a webhook.
- **Parameter whitelisting:** restrict model, resolution, duration, ratio and reference-image count server-side.
- **Auditable billing:** store price snapshots, pre-authorisation and refund records, and keep reconciliation evidence.
- **Content compliance:** an 18+ gate, regional restrictions and upstream moderation policy must be implemented on the business side.

> Model versions, endpoint paths, authentication, parameters, concurrency limits and credit pricing are defined by the official documentation inside **API Access** after signing in to 123vips.com. This repository does not guess unpublished endpoints.

## What the site does

### 1. Character browsing and the character library

The site provides character browsing with tags and categories. You can view featured characters, character profiles, the videos and templates attached to a character, and start a creation flow directly from a character.

Good for:

- Finding a character template quickly
- Browsing by tag, category or character traits
- Starting an image, video or chat task from a character

### 2. AI video generation

The site provides a video creation entry point. Visible capabilities include:

- Image to video
- Text to video
- Video generation from character templates
- Viewing video tasks and history

The template dialog in the video workspace asks for a reference image and a prompt, then shows the credit cost before the task is submitted.

### 3. AI image generation

The site has a separate Image entry for AI image generation. Models, sizes, credit prices and parameters are shown on the page after signing in.

### 4. AI character chat and interaction

The site offers Chat, character interaction and voice/video companionship directions. The brand describes characters as having long memory: they remember what the user mentioned and the relationship develops over time.

Directions available to try:

- Text chat
- Character interaction
- Video/voice companionship (subject to what the page actually opens)
- Continuous relationship and memory experience

### 5. Cases, workflows and advanced generation

The site also provides:

- **Cases**: creation examples with their prompts and parameters
- **Workflow**: workflow and composable creation
- **Advanced**: advanced generation and parameter entry
- **Generate**: a unified generation entry

Useful when you want to reuse cases, produce at volume, or combine several generation steps.

### 6. Account, credits, top-up and history

The workspace includes:

- Sign in / sign up
- Current credit balance for Video and Image
- Top-up entry
- Generation history
- Referral mechanism
- Support entry (email and Telegram)

### 7. In-site generation and API access are separate

**Generating on 123vips.com does not require buying API documentation access.** In-site generation is billed against account credits; the exact consumption is shown on the page after signing in.

API access is a separate developer capability. After signing in, the left navigation **API Access** explains how to obtain the API documentation; purchase method, scope and cost are shown on the site. The public page currently shows `Sign in to unlock` and does not expose the API Base URL, authentication scheme, endpoint paths or callback format.

Full integration steps: API_INTEGRATION.md.

## Typical flow

```text
Open 123vips.com
    ↓
Complete the 18+ confirmation
    ↓
Sign in / sign up
    ↓
Browse characters and cases, or go straight to the workspace
    ↓
Choose Video / Image / Chat / Advanced / Workflow
    ↓
Upload a reference image or write a prompt
    ↓
Confirm the credit cost and submit
    ↓
Check the task and result in History
```

## Screenshots

### API Access page (amounts redacted)

Taken from `https://123vips.com/#access`, showing the official API documentation entry and the test-credit note. The public version does not display amounts.

*图片：123vips.com API Access (safe preview)*

### Character and creation workspace

The screenshots below come from `https://123vips.com/` and were redacted for public display. Navigation, feature entries and layout remain recognisable.

**Desktop**

*图片：123vips.com workspace desktop (safe preview)*

**Mobile**

*图片：123vips.com workspace mobile (safe preview)*

## Site pages

| Page | URL |
|---|---|
| Home |  |
| Brand page |  |
| Character and creation workspace |  |
| Character library |  |
| Tags |  |
| Categories |  |
| Privacy policy |  |
| Terms of service |  |

## Integration architecture

If you plan to integrate through the API, put an independent business gateway on your own server first:

```text
Browser / App
    |
    | HTTPS
    v
Your backend  --->  PostgreSQL (users, tasks, credits, orders, generation records)
    |
    | Vipeak AI API (address per official documentation)
    v
Vipeak AI
```

Key principles:

- Keep the API key server-side only; never ship it to browser code.
- Write business data, credits, orders and generation records to PostgreSQL.
- Images and videos can live in object storage, but asset metadata and ownership must be written to the database.
- Treat generation as asynchronous: handle queueing, polling or callbacks, timeouts and retries.
- Complete age gating, content compliance, payment and regional availability reviews before going live.

## Who it is for

- Users who want to try AI character video and companionship
- Creators who need character templates plus image/video generation
- Developers who want to plug character generation into their own product
- Teams that need workflows, batch generation or unified credit management

## FAQ (Seedance / Wan API integration)

**Q: How do I integrate the `uncensored ai video api` / `nsfw ai video api` at 123vips.com?**
A: Sign in to 123vips.com, complete the 18+ confirmation, open **API Access** in the left navigation to get the full documentation and test credits, then call it from your server following the official docs. The public page does not expose the Base URL or authentication details.

**Q: What is the difference between `seedance spicy api` and `wan nsfw api`?**
A: They are two model lines with different naming habits. Seedance follows the gateway's Spicy tiers; Wan follows the open-source nsfw LoRA naming. Choose based on the versions, input modes and durations the official docs actually open. The colloquial forms `seedance sexy api` and `wan sexy api` refer to the same directions.

**Q: How is in-site generation different from API access?**
A: In-site generation is billed against account credits and does not require buying API documentation access. The API is a separate developer capability, suited to embedding generation into your own product or a batch pipeline.

**Q: What should I prepare before integrating?**
A: A server (never the frontend), PostgreSQL for tasks and credit ledgers, object storage for assets, async task and callback handling, failed-job refund logic, and a compliance review for your target market.

**Q: Is there a free tier?**
A: API documentation access includes test credits. The exact amount and billing rules are shown on the site.

## Notes

- This is an independent public documentation repository and does not contain the site's source code.
- This repository stores no tokens, API keys, database connections, user data or payment credentials.
- Availability, payment methods and regional restrictions for adult content follow the site and local regulations.
- In-site generation, API access, models, parameters and billing rules follow the official pages after signing in.

---

# 中文版

**English** | **中文**

> 主站地址：
>
> 本仓库只做产品介绍、截图和对接资料整理，不包含主站业务代码、用户数据、密钥或部署配置。
>
> GitHub 账号资料见 GITHUB_ACCOUNT.md。

**Uncensored NSFW AI Video API** — 123vips.com（Vipeak AI）面向开发者整理的 18+ AI 视频生成 API 对接资料：Seedance（Spicy 档）与 Wan（NSFW 方向）、异步任务、Webhook、积分计费、服务端安全与官方文档获取方式。

## 一眼看懂

Vipeak AI 是一个 AI 角色视频与陪伴创作平台。用户可以在主站浏览角色、与角色聊天、用图片或文字生成视频，也可以使用图片生成、案例、工作流和 API Access 等能力。

- 主站：
- 品牌落地页：
- 角色与创作工作台：
- 角色库：
- 标签：
- 分类：
- Telegram 社区：
- Telegram 客服：
- X：

> 主站面向成年人。进入角色与创作页面时会先显示 18+ 年龄确认。

## 项目定位与开发者关键词

**一句话定位：** 123vips.com（Vipeak AI）是面向成年人的 AI 角色视频与陪伴生成平台。本仓库面向开发者，整理 18+ 视频生成 API 的公开入口、对接准备、异步任务架构、Webhook、积分计费和服务端安全要求。

**重点检索词：**

- 模型与 API（主）：`uncensored ai video api`、`nsfw ai video api`、`uncensored video api`、`seedance spicy api`、`seedance uncensored api`、`wan nsfw api`、`wan uncensored api`、`seedance api`、`wan api`
- 俗称与长尾（次）：`seedance sexy api`、`wan sexy api`、`adult ai video api`、`18+ ai video generation api`、`uncensored image to video api`
- 生成能力：`text-to-video`、`T2V`、`image-to-video`、`I2V`、`AI character video`、`AI character chat`、`consistent character`、`character templates`、`creative workflow`
- 相邻模型与技术栈：`Kling API`、`Veo API`、`Runway API`、`Pika API`、`Hailuo API`、`ComfyUI`、`LoRA`、`Stable Diffusion`、`async generation task`、`webhook`、`PostgreSQL`
- 产品和仓库：`Vipeak AI`、`123vips`、`18+ AI platform`、`API integration`、`API documentation`、开发者对接、生成任务、积分计费

**说明：** 以上是面向开发者的检索关键词和对接方向，不等于主站已公开全部模型或接口。实际可调用模型、参数、计费和接口路径，以登录后获取的官方 API 文档为准。不要根据关键词猜测未公开接口。

面向 AI 搜索与代码助手的结构化摘要见 llms.txt。

## 开发者能在这里找到什么

- `API_INTEGRATION.md`：API Access 入口、接入流程、服务端架构和安全要求
- `llms.txt`：给 AI 搜索、代码助手和自动化工具读取的结构化产品摘要
- `screenshots/`：主站和 API Access 的脱敏截图
- `README.md`：产品能力、页面入口、技术栈和对接边界

## Developer Search Keywords

`uncensored ai video api`, `nsfw ai video api`, `uncensored video api`, `seedance spicy api`, `seedance uncensored api`, `wan nsfw api`, `wan uncensored api`, `seedance api`, `wan api`, `uncensored image to video api`, `nsfw image to video api`, `adult ai video api`, `18+ ai video generation api`, `seedance sexy api`, `wan sexy api`, `ai video generation api`, `text to video api`, `image to video api`, `i2v api`, `t2v api`, `ai character api`, `ai companion api`, `comfyui nsfw api`, `wan lora nsfw`, `kling api`, `veo api`, `runway api`, `hailuo api`, `async task`, `webhook`, `credits billing`.

## 模型与 API 检索入口：Seedance / Wan

`uncensored ai video api` 与 `nsfw ai video api` 是这条赛道最常用的两个检索词，`seedance spicy api` / `wan nsfw api` 则是按模型拆开后的具体入口。它们代表 **18+ AI 视频生成 API 的对接方向**，不表示公开页面已经披露了这两个模型的完整接口、版本、参数或价格。

| 模型线 | 常见开发者检索词 | 对接时需要核对 |
|---|---|---|
| Seedance | `seedance spicy api`、`seedance uncensored api`、`seedance api`、`seedance sexy api`（俗称） | 实际模型版本、是否支持 T2V/I2V、参考图、时长、分辨率、计费与审核规则 |
| Wan | `wan nsfw api`、`wan uncensored api`、`wan api`、`wan sexy api`（俗称） | 实际模型版本、是否支持 T2V/I2V、首尾帧、时长、分辨率、计费与审核规则 |

> 两条线的修饰词不一样不是笔误：Seedance 是托管闭源模型，开发者跟着网关的 **Spicy** 档位命名；Wan 可本地部署，开发者跟着开源社区 LoRA / workflow 的 **nsfw** 习惯命名。混用会两边都搜不到。

共同工程要点：

- **异步任务**：创建任务后保存任务 ID，再通过轮询或 Webhook 接收结果。
- **参数白名单**：模型、分辨率、时长、比例和参考图数量由服务端限制。
- **计费可追溯**：保存价格快照、预扣和退款记录，并保留对账依据。
- **内容合规**：18+ 门槛、地区限制和上游审核策略必须在业务侧实现。

> 具体模型版本、接口路径、鉴权方式、参数、并发限制和积分单价，以登录 123vips.com 后 **API Access** 提供的官方文档为准。本仓库不猜测未公开接口。

## 主站能做什么

### 1. AI 角色浏览与角色库

主站提供角色浏览、标签和分类入口。可以查看推荐角色、角色资料、角色关联的视频和模板，并直接使用角色进入创作流程。

适合：

- 快速找到想使用的角色模板
- 按标签、分类或角色特征浏览内容
- 从角色直接发起图片、视频或聊天任务

### 2. AI 视频生成

主站提供视频创作入口，页面可见的能力包括：

- 图片生视频（Image to Video）
- 文字生视频
- 使用角色模板生成视频
- 查看视频任务与历史记录

视频工作台中的模板弹窗会要求上传参考图、填写 Prompt，然后显示生成成本并提交任务。

### 3. AI 图片生成

主站有独立的 Image 入口，可用于 AI 图片生成。具体模型、尺寸、积分价格和参数以登录后的实际页面为准。

### 4. AI 角色聊天与互动

主站提供 Chat、角色互动、语音/视频陪伴方向的能力。品牌介绍将其描述为“有长记忆的 AI 角色”，强调角色会记住用户提到的事情，关系会随着互动推进。

可体验的方向：

- 文字聊天
- 角色互动
- 视频/语音陪伴（以实际页面开放情况为准）
- 角色关系和记忆连续体验

### 5. 案例、工作流与高级生成

主站还提供：

- **Cases**：查看创作案例与相关提示词、参数
- **Workflow**：工作流和组合式创作能力
- **Advanced**：高级生成与参数入口
- **Generate**：统一的生成入口

适合需要复用案例、批量生产或组合多个生成步骤的场景。

### 6. 账户、积分、充值与历史记录

主站工作台包含：

- 登录/注册
- Video、Image 的当前积分显示
- 充值入口
- 生成历史记录
- Referral 推荐机制
- 客服入口（邮件与 Telegram）

### 7. 站内生成与 API 对接是两回事

**直接在 123vips.com 网站里生成，不需要购买 API 文档权限。** 站内生成按主站账户积分计费，具体消耗以登录后页面显示为准。

API 对接是面向开发者的独立能力。登录主站后，可从左侧 **API Access** 查看 API 文档获取方式；购买方式、可用范围和费用以站内实际页面为准。当前公开页面显示 `Sign in to unlock`，尚未公开 API Base URL、鉴权协议、接口路径或回调格式。

完整对接步骤见 API_INTEGRATION.md。

## 典型使用流程

```text
打开 123vips.com
    ↓
完成 18+ 确认
    ↓
登录 / 注册
    ↓
浏览角色、案例或直接进入生成工作台
    ↓
选择 Video / Image / Chat / Advanced / Workflow
    ↓
上传参考图或填写 Prompt
    ↓
确认积分成本并提交生成
    ↓
在 History 查看任务与结果
```

## 截图

### API Access 页面（金额已遮挡）

截取自 `https://123vips.com/#access`，展示官方 API 文档访问入口和测试积分说明；公开版本不展示具体金额。

*图片：123vips.com API Access（安全预览）*

### 角色与创作工作台

以下截图来自 `https://123vips.com/`，为公开仓库展示做了安全遮挡。导航、功能入口和页面布局保持可辨认。

**桌面端**

*图片：123vips.com 工作台桌面端（安全预览）*

**移动端**

*图片：123vips.com 工作台移动端（安全预览）*

## 站点页面清单

| 页面 | 地址 |
|---|---|
| 首页 |  |
| 品牌落地页 |  |
| 角色与创作工作台 |  |
| 角色库 |  |
| 标签 |  |
| 分类 |  |
| 隐私政策 |  |
| 用户协议 |  |

## 技术对接建议

如果准备通过 API 接入，建议先用独立服务端做一层业务网关：

```text
浏览器 / App
    |
    | HTTPS
    v
你的业务后端  --->  PostgreSQL（用户、任务、积分、订单、生成记录）
    |
    | Vipeak AI API（具体地址以官方文档为准）
    v
Vipeak AI
```

关键原则：

- API Key 只放在服务端，不进入浏览器代码。
- 业务数据、积分、订单和生成记录写入 PostgreSQL。
- 图片和视频可以存对象存储，但素材元数据和归属必须写数据库。
- 生成任务采用异步模型，处理排队、轮询/回调、超时和失败重试。
- 上线前完成年龄限制、内容合规、支付和地区可用性评估。

## 适合谁

- 想体验 AI 角色视频与陪伴的用户
- 需要角色模板、图片/视频生成能力的内容创作者
- 准备把 AI 角色生成能力接入自有产品的开发者
- 需要工作流、批量生成或统一积分管理的团队

## 常见问题（Seedance / Wan API 接入）

**Q：`uncensored ai video api` / `nsfw ai video api` 怎么接入 123vips.com？**
A：登录 123vips.com 完成 18+ 确认后，进入左侧 **API Access** 获取完整对接文档与测试积分，再按官方文档在服务端调用；公开页面不暴露 Base URL 与鉴权细节。

**Q：`seedance spicy api` 和 `wan nsfw api` 有什么区别？**
A：两条模型线，修饰词习惯也不同——Seedance 侧按网关的 Spicy 档位命名，Wan 侧按开源社区的 nsfw 命名。选型看实际文档开放的版本、输入形式和时长；俗称 `seedance sexy api` / `wan sexy api` 指的是同一批方向。

**Q：`wan sexy api` 和站内直接生成有什么区别？**
A：站内生成按账户积分计费，不需要购买 API 文档权限；API 是独立的开发者能力，适合把生成能力接进自有产品或批量生产流水线。

**Q：接入前必须准备什么？**
A：服务端（不要放前端）、PostgreSQL 存任务与积分流水、对象存储放素材、异步任务与回调处理、失败退款逻辑，以及面向目标市场的合规评估。

**Q：有没有免费额度？**
A：开通 API 文档访问后包含 test credits，具体数量与扣费规则以站内实际页面为准。

## 说明

- 本仓库是独立公开介绍仓库，不包含主站源代码。
- 本仓库不保存 Token、API Key、数据库连接、用户数据或支付凭据。
- 成人向内容的可用范围、支付方式和地区限制以主站实际页面及当地法规为准。
- 站内生成、API 接入、模型、接口参数和计费规则以登录后的官方页面及实际开通页面为准。
