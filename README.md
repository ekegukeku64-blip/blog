<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ekegukeku64-blip/blog/main/public/favicon.svg">
    <img width="64" height="64" alt="枫迹" src="https://raw.githubusercontent.com/ekegukeku64-blip/blog/main/public/favicon.svg">
  </picture>
</p>

<h1 align="center">枫迹博客</h1>

<p align="center">
  <i>又逢雨季的个人博客 — AI 工具 · 在线工具 · 成长记录</i>
</p>

<p align="center">
  <a href="https://ekegukeku64-blip.github.io/blog/">访问博客</a>
  ·
  <a href="#核心路线">核心路线</a>
  ·
  <a href="#本地开发">本地开发</a>
  ·
  <a href="#维护入口">维护入口</a>
</p>

---

## 核心路线

这个站点目前按三条主线组织：

- **AI 工具**：记录真实使用场景、提示词、踩坑和工作流。
- **在线工具**：沉淀可以直接在浏览器里使用的小工具。
- **成长记录**：记录普通人的试错、复盘、坚持和阶段状态。

主要页面：

| 页面       | 作用                          |
| ---------- | ----------------------------- |
| `/`        | 入口页，负责品牌和氛围        |
| `/home/`   | 主首页，承接三条阅读/使用路线 |
| `/blog/`   | 全部文章归档                  |
| `/tools/`  | 在线工具箱                    |
| `/growth/` | 成长记录                      |
| `/now/`    | 此刻状态                      |
| `/about/`  | 关于我                        |

## 技术栈

| 层   | 技术                                       |
| ---- | ------------------------------------------ |
| 框架 | Astro v6                                   |
| 样式 | Tailwind CSS v4 + 自定义 CSS 变量          |
| 内容 | Markdown / MDX + Astro Content Collections |
| 搜索 | Pagefind                                   |
| 字体 | `@fontsource` 自托管字体                   |
| 部署 | GitHub Pages + GitHub Actions              |
| 评论 | 自建 API：Cloudflare Pages Functions + D1  |

## 本地开发

```sh
npm install
npm run dev
```

开发地址通常是：

```text
http://localhost:4321/blog/
```

常用命令：

```sh
npm run dev           # 启动开发服务器
npm run build         # 构建站点并生成 Pagefind 索引
npm run check         # Astro 类型检查与内容集合校验（不构建）
npm run test          # 运行单元测试
npm run lint          # ESLint 检查
npm run format:check  # Prettier 格式检查
npm run verify        # lint + 格式 + 测试 + 检查 + 构建（提交前跑这个）
npm run preview       # 预览构建产物
npm run daily         # 本地补跑每日内容生成
npm run build:api     # 构建评论 API（Pages Functions）产物
```

## 项目结构

```text
src/
├── components/          # 通用组件
│   └── home/            # 首页模块
├── content/
│   ├── posts/           # 博客文章
│   ├── projects/        # GitHub 项目快照（脚本生成）
│   └── templates/       # 内容模板
├── content.config.ts    # Content Collections 的 schema（posts / projects）
├── layouts/             # 全站布局和文章布局
├── pages/               # 页面路由
│   ├── index.astro      # 入口页
│   ├── home.astro       # 主首页
│   ├── blog/            # 博客列表和文章详情
│   └── tools/           # 在线工具页面
├── scripts/             # 客户端脚本（入口动效、背景、交互反馈等）
├── styles/              # 全局样式
├── utils/               # 阅读时长、摘要、草稿存储等
└── lib/                 # API 客户端与领域逻辑

functions/               # 评论 API（Cloudflare Pages Functions）
├── _lib/                # 鉴权、限流、校验、CORS、D1 访问
└── api/                 # auth / comments / admin 三组路由

migrations/              # D1 建表 SQL
tests/                   # node:test 单元测试
scripts/                 # 构建与内容生成脚本（Node + Python）
.github/workflows/       # CI/CD（含 PR 门禁、站点部署、API 部署、日更）
```

## 维护入口

### 新增文章

文章放在：

```text
src/content/posts/
```

可以复制模板：

```text
src/content/templates/post-template.md
```

发布前把 `draft` 改成 `false` 或删除该字段。

### 新增工具

工具页面放在：

```text
src/pages/tools/
```

具体步骤见：

```text
docs/add-tool.md
```

### 评论与账号 API

自建的评论 / 账号接口（Cloudflare Pages Functions + D1）的接口清单、环境变量、
一次性初始化步骤和已知缺口见：

```text
docs/comment-api.md
```

### 部署

站点与评论 API 分开部署：

- 推送到 `main` 分支后，`Deploy to GitHub Pages` 工作流自动构建并部署静态站点到 GitHub Pages。
- `functions/**`、`migrations/**` 或 `wrangler.toml` 有改动时，`Deploy API` 工作流会应用 D1 迁移并部署 Pages Functions。
- PR 会先经过 `CI` 工作流的 lint / 格式 / 测试 / 类型检查门禁。

## 许可

- 原创程序代码、配置、脚本和工作流采用 [MIT License](./LICENSE)。
- `src/content/posts/**` 中的原创文章和 `public/hero/**` 中的原创封面保留所有权利。
- `src/content/projects/**` 中的第三方 README 快照仍遵循各自上游许可证，不由本仓库重新授权。
- 依赖包、字体及其他第三方资源遵循其各自许可证。

完整边界说明见 [LICENSE-SCOPE.md](./LICENSE-SCOPE.md)。
