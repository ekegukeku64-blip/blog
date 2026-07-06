<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ekegukeku64-blip/blog/main/public/favicon.svg">
    <img width="64" height="64" alt="墨迹" src="https://raw.githubusercontent.com/ekegukeku64-blip/blog/main/public/favicon.svg">
  </picture>
</p>

<h1 align="center">墨迹博客</h1>

<p align="center">
  <i>又逢雨季的个人技术博客 — AI 工具 · 开发日常 · 技术思考</i>
</p>

<p align="center">
  <a href="https://ekegukeku64-blip.github.io/blog/">🌐 访问博客</a>
  ·
  <a href="#✨-功能特色">功能特色</a>
  ·
  <a href="#️-技术栈">技术栈</a>
  ·
  <a href="#-快速开始">快速开始</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-v6-BC52EE?logo=astro&logoColor=white" alt="Astro">
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?logo=githubpages&logoColor=white" alt="GitHub Pages">
</p>

---

## ✨ 功能特色

<details open>
<summary><b>🎨 设计</b></summary>

- **深幽冷寂暗黑主题** — 冷墨蓝色系 `#070A13`，毛玻璃效果
- **入口粒子世界** — Canvas 萤火虫 + 枫叶动画，鼠标规避，时间色温
- **平滑过渡** — View Transitions API 模糊/缩放交叉淡入淡出
- **滚动揭示** — IntersectionObserver 逐字/逐元素浮现
- **胶片颗粒 + 暗角 + 暖底光** — 全局氛围层
</details>

<details>
<summary><b>📝 文章</b></summary>

- **内链预览** — 悬停显示文章摘要
- **AI 摘要** — 自动提取文章核心内容
- **目录导航** — 滚动高亮指示器
- **代码块增强** — 行号、语言标签、一键复制
- **阅读统计** — 字数、阅读时间、浏览次数
- **前后篇导航** — 毛玻璃卡片悬停发光
</details>

<details>
<summary><b>🔧 交互</b></summary>

- **3D 地球** — Three.js 中国景点交互地图
- **文章内链预览** — 悬停弹出摘要卡片
- **图片灯箱** — 平滑缩放过渡
- **阅读进度条** — 渐变流光
- **字号调节** — 自由调整正文大小
- **专注模式** — 沉浸阅读
</details>

## 🛠️ 技术栈

| 层 | 技术 |
|---|---|
| **框架** | [Astro](https://astro.build) v6 — Content Collections, View Transitions, Client Router |
| **样式** | Tailwind CSS v4 + 自定义 CSS 变量 + 毛玻璃 (`backdrop-filter`) |
| **字体** | Noto Serif SC (标题/正文), Inter (UI), JetBrains Mono (代码) — 均通过 @fontsource 自托管 |
| **特效** | Canvas 粒子系统, Three.js (3D 地球), SVG 滤镜 (胶片颗粒) |
| **搜索** | Pagefind (离线全文搜索) |
| **图标** | Font Awesome 6 (免费版) |
| **统计** | 不蒜子 (busuanzi) 访问计数 |
| **部署** | GitHub Pages + GitHub Actions (CI/CD 自动构建) |

## 🚀 快速开始

```sh
# 安装
npm install

# 开发
npm run dev
# 访问 http://localhost:4321/blog/

# 构建
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
src/
├── components/     # 20+ UI 组件
│   ├── PostCard.astro
│   ├── TagCloud.astro
│   ├── Footer.astro
│   └── ...
├── content/        # 博客文章 (Markdown)
│   └── posts/
├── layouts/        # 页面布局
│   ├── BaseLayout.astro
│   └── PostLayout.astro
├── pages/          # 路由页面
│   ├── index.astro      # 入口页 (粒子特效)
│   ├── home.astro        # 首页 (文章列表)
│   ├── blog/[...slug].astro  # 文章详情
│   └── ...
├── styles/         # 全局样式
│   └── global.css
└── utils/          # 工具函数
    └── ...
```

## ☁️ 部署

推送到 `main` 分支后，GitHub Actions 自动构建并部署到 GitHub Pages。

```sh
# 手动部署
bash deploy.sh
```

## 📄 许可

MIT © 又逢雨季
