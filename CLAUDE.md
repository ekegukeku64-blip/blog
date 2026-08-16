# Blog Project

Astro v6 个人博客，部署到 GitHub Pages。

## 技术栈

- **框架**: Astro v6
- **CSS**: Tailwind CSS v4
- **内容**: MDX + Markdown
- **部署**: GitHub Pages（GitHub Actions Pages）
- **站点**: https://ekegukeku64-blip.github.io/blog/

## 项目结构

```
blog/
├── src/
│   ├── components/     # Astro 组件
│   ├── layouts/        # 页面布局
│   ├── pages/          # 路由页面
│   ├── content/        # 博客文章 (MDX/MD)
│   ├── styles/         # 全局样式
│   └── lib/            # 工具函数
├── public/             # 静态资源
├── scripts/            # 构建脚本
└── .github/workflows/  # CI/CD
```

## 常用命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建（含 pagefind 索引）
npm run preview      # 预览构建结果
npm run daily        # 本地手动补跑：技术日报 + 成长草稿（Windows 使用 py -3）
npm run daily:dry    # 只预览今日技术日报，不写文件
npm run indexnow     # 手动提交 sitemap URL 到 IndexNow
```

## 自动更新

博客日常更新不依赖打开 Claude Code。GitHub Actions 会在云端自动执行：

- `Daily Auto Update`：每天北京时间 08:00 生成 GitHub 每日精选和成长记录草稿，若有变化会自动提交并触发部署。
- `Update Daily Links`：每天定时重建站点，用于刷新静态内容和检查构建状态。
- `Deploy to GitHub Pages`：推送到 `main` 后自动构建并部署。

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
- 格式：MDX 或 Markdown
- 前置元数据：title, date, description, tags, category

### 分类

- 成长记录
- 技术教程
- 工具推荐
- 随笔

### 写作风格

- 面向普通人，减少技术术语
- 强调共鸣和实用性
- 用具体例子说明抽象概念

## 部署

推送到 main 分支后，GitHub Actions 自动构建并部署到 GitHub Pages。

```bash
git add .
git commit -m "feat: xxx"
git push origin main
```

## 注意事项

- Astro v6 使用 glob() loader 而非 type:'content'
- 使用 `trailingSlash: 'always'` 确保链接一致性
- dist/ 目录不应提交到 git
