# Blog Project

Astro v6 个人博客，部署到 GitHub Pages。

## 技术栈

- **框架**: Astro v6
- **CSS**: Tailwind CSS v4
- **内容**: MDX + Markdown
- **部署**: GitHub Pages (gh-pages 分支)
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
npm run dev      # 启动开发服务器
npm run build    # 构建（含 pagefind 索引）
npm run preview  # 预览构建结果
npm run daily    # 更新技术日报
```

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

推送到 main 分支后，GitHub Actions 自动构建并部署到 gh-pages 分支。

```bash
git add .
git commit -m "feat: xxx"
git push origin main
```

## 注意事项

- Astro v6 使用 glob() loader 而非 type:'content'
- 使用 `trailingSlash: 'always'` 确保链接一致性
- dist/ 目录不应提交到 git
