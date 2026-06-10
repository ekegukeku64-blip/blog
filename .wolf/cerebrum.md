## User Preferences

- 推送代码前必须构建验证
- 博客内容面向普通人，减少技术术语
- 设计风格：暗墨绿森林风

## Key Learnings

- **WeChat 内置浏览器不支持 data: URL 显示图片** — base64 编码的图片在微信中不渲染，必须用普通 HTTPS URL 或内嵌 SVG
- **WeChat 扫码对 api.qrserver.com 等外部服务生成的 QR 码识别不稳定** — "暂不支持展示二维码中的文本"
- **QR 码最佳方案：`qrcode` npm 库的 `toString({ type: 'svg' })`** — 输出 SVG 字符串直接 innerHTML 插入 DOM，不经过任何 URL，微信完全兼容
- Astro 中带 `import` 的 `<script>` 标签不加 `is:inline`，由 Vite 打包
- GitHub Pages 推送偶尔需要 `git config http.sslVerify false` 绕过网络问题
- **2026-06-09: Astro 视图过渡白屏修复** — `::view-transition-old/new(root) { background: #070a13 }` + `html { background-color: #070a13 !important }` 消除过渡期间的白色闪烁
- **2026-06-09: backdrop-filter blur 性能** — 从 `blur(12px)` 降到 `blur(4px)` 减少 GPU 持续合成开销。同时移除未使用的 `@keyframes bgFlicker`、`--mouse-x/--mouse-y` mousemove handler
- **2026-06-09: 文本对比度三层体系** — `text-primary: #fafaf9`, `text-secondary: #d6dae1`, `text-muted: #a8afba`，替代原来 `#E2E8F0/#B0BEC5/#94A3B8` 的偏暗色系

## Do-Not-Repeat

- **2026-06-08: 不要用 data URL 作为 img src** — 微信浏览器不支持
- **2026-06-08: 不要用外部 API 生成 QR 码** — 微信扫码识别不稳定
- **2026-06-07: 不要在 Astro frontmatter 中做服务端 fetch** — 会阻塞整个页面 SSR 渲染
- **2026-06-09: 改文本颜色时不要只改 CSS 变量** — 7 个组件文件中用 Tailwind 任意值如 `text-[#94A3B8]` 写死了颜色，CSS 变量更新不生效。必须同时全局搜索替换所有硬编码色值。
- **2026-06-09: body `isolation: isolate` 会创建层叠上下文** — 配合 `z-index: 0` + opaque background 会让 `z-index: -10` 的视频/背景层完全不可见。视频背景需 body `background: transparent` 或把视频层 z-index 提升到 body 之上。
