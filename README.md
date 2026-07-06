# 墨迹博客

> 又逢雨季的个人技术博客 — AI 工具、开发日常、技术思考

🔗 [**blog.raincoast.me**](https://ekegukeku64-blip.github.io/blog/) (GitHub Pages)

---

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | [Astro](https://astro.build) v6 — Content Collections, View Transitions |
| 样式 | Tailwind CSS v4 + 自定义 CSS 变量 |
| 字体 | Noto Serif SC (标题/正文), Inter (UI), JetBrains Mono (代码) |
| 部署 | GitHub Pages + GitHub Actions (自动 CI/CD) |
| 搜索 | Pagefind (全文搜索) |

## 功能特色

- 🎨 **暗色主题** — 深幽冷寂暗黑极简风格 (冷墨蓝色系 `#070A13`)
- 🏠 **入口页** — Canvas 粒子系统 (萤火虫 + 枫叶)、时间色温、点击涟漪
- 🌐 **3D 地球** — world-globe 中国景点交互地图 (Three.js)
- 📝 **文章内链预览** — 鼠标悬停显示标题和摘要
- 📖 **文章目录** — 滚动高亮跟随
- 🔍 **全文搜索** — Pagefind 离线搜索
- 📊 **阅读统计** — 阅读时间、字数、浏览次数 (不蒜子)
- 🏷️ **标签分类** — 按标签筛选文章
- 📱 **响应式** — 桌面/移动端适配

## 快速开始

```sh
npm install
npm run dev
# 访问 http://localhost:4321/blog/
```

## 构建

```sh
npm run build
# 输出在 dist/ 目录
```

## 部署

推送到 `main` 分支后，GitHub Actions 自动构建并部署到 GitHub Pages。

手动部署：

```sh
bash deploy.sh
```

## 项目结构

```
src/
├── components/    # UI 组件
├── content/       # 博客文章 (Markdown)
├── layouts/       # 页面布局
├── pages/         # 路由页面
├── styles/        # 全局样式
└── utils/         # 工具函数
```

## 许可

MIT
