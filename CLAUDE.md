# Blog Project

Astro v6 个人博客，静态站点部署到 GitHub Pages，评论与账号系统由自建的 Cloudflare Pages Functions + D1 API 提供。

## 技术栈

- **框架**: Astro v6
- **CSS**: Tailwind CSS v4
- **内容**: MDX + Markdown
- **搜索**: Pagefind
- **评论/账号**: 自建 API（Cloudflare Pages Functions + D1），替代了早期的 Firebase
- **部署**: GitHub Pages（站点）+ Cloudflare Pages（API）
- **站点**: https://ekegukeku64-blip.github.io/blog/

## 项目结构

```
blog/
├── src/
│   ├── components/     # Astro 组件
│   ├── layouts/        # 页面布局
│   ├── pages/          # 路由页面
│   ├── content/        # 博客文章与项目快照
│   ├── content.config.ts # Content Collections 的 schema
│   ├── scripts/        # 客户端脚本
│   ├── styles/         # 全局样式
│   ├── utils/          # 阅读时长、摘要等
│   └── lib/            # API 客户端与领域逻辑
├── functions/          # 评论 API（Pages Functions）
├── migrations/         # D1 建表 SQL
├── tests/              # node:test 单元测试
├── public/             # 静态资源
├── scripts/            # 构建与内容生成脚本
└── .github/workflows/  # CI/CD
```

## 常用命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建（含 pagefind 索引）
npm run check        # Astro 类型检查与内容集合校验（不构建）
npm run test         # 单元测试（node:test）
npm run lint         # ESLint 检查
npm run format:check # Prettier 格式检查
npm run verify       # lint + 格式 + 测试 + 检查 + 构建（提交前跑这个）
npm run preview      # 预览构建结果
npm run daily        # 本地手动补跑：技术日报 + 成长草稿
npm run daily:dry    # 只预览今日技术日报，不写文件
npm run indexnow     # 手动提交 sitemap URL 到 IndexNow（需 Git Bash）
```

> `npm run daily` 走 `scripts/run-python.mjs`，会自动探测可用的 Python 解释器（Windows 上用 `py -3`，其他平台用 `python3`），无需手动切换。

## 自动更新

博客日常更新不依赖打开 Claude Code。GitHub Actions 会在云端自动执行：

- `Daily Auto Update`：每天北京时间 08:00 生成 GitHub 每日精选、成长记录草稿和项目快照，有变化就提交到 `main`。
- `Update Daily Links`：每天定时重建站点，用于刷新静态内容和检查构建状态。
- `Deploy to GitHub Pages`：推送到 `main` 后自动构建并部署站点。
- `Deploy API`：`functions/**`、`migrations/**` 或 `wrangler.toml` 变更时应用 D1 迁移并部署评论 API。
- `CI`：PR 阶段跑 lint / 格式 / 测试 / 类型检查门禁。

**注意**：`Daily Auto Update` 用 `GITHUB_TOKEN` 推送提交，而 GitHub 不会让这类推送触发 `on: push` 工作流。所以日更提交不会立刻部署，站点会在当天 02:00 UTC 的 `Update Daily Links` 运行时刷新（最多滞后约 18 小时）。

需要临时补跑时，在 GitHub Actions 页面手动触发 `workflow_dispatch`；本地的 `npm run daily` 只是备用入口。

## 自定义 Skills

项目包含两个自定义 skill：

### /auto-dev（全自动开发助手）

自动完成开发全流程：检测 → 诊断 → 规划 → 实现 → 验证 → 审查 → 报告

**触发词**：

- "帮我给博客添加xxx功能"
- "帮我修复xxx问题"
- "帮我优化xxx"

**示例**：

```
帮我给博客添加一个搜索功能
帮我修复首页加载慢的问题
帮我优化图片加载性能
```

### /check（代码审计）

检查代码质量、安全漏洞、性能问题、测试覆盖、最佳实践

**触发词**：

- "/check" 或 "/audit"
- "检查代码"、"代码审计"
- "看看代码有没有问题"

**示例**：

```
/check
检查 src/components/ 目录
代码有什么问题吗？
```

## 内容规范

### 博客文章

- 位置：`src/content/posts/`
- 格式：Markdown（loader 的 pattern 是 `**/*.md`）
- 前置元数据（以 `src/content.config.ts` 的 schema 为准）：
  - 必填：`title`、`description`、`pubDate`
  - 常用：`tags`、`category`、`draft`、`noindex`、`heroImage`
  - 其他：`featured`（schema 已定义，但目前没有任何组件读取它）
  - `updatedDate`：schema 有定义，但实际一篇都没用；`blog/[...slug].astro` 会回退到文件 mtime，而 CI 每次 checkout 后 mtime 等于构建时间，所以「更新于」目前不可靠。

### 分类

实际在用的 `category` 取值：`成长记录`、`技术日报`、`风险观察`、`技术`、`工具`、`随笔`。

> 这个字段没有 `enum` 约束，历史上出现过带引号/不带引号混用，新增文章时请与上述取值完全一致。

### 写作风格

- 面向普通人，减少技术术语
- 强调共鸣和实用性
- 用具体例子说明抽象概念

## 部署

推送到 main 分支后，`Deploy to GitHub Pages` 工作流自动构建并部署站点；评论 API 由独立的 `Deploy API` 工作流部署到 Cloudflare Pages。

```bash
npm run verify   # 提交前先在本地跑通
git add .
git commit -m "feat: xxx"
git push origin main
```

评论 API 依赖的仓库配置：

- 变量 `PUBLIC_API_BASE`：API 地址，构建时写入 `.env` 供 Astro 读取
- 密钥 `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`：供 `Deploy API` 使用

## 注意事项

- Astro v6 使用 glob() loader 而非 type:'content'
- 使用 `trailingSlash: 'always'` 确保链接一致性
- dist/ 目录不应提交到 git
