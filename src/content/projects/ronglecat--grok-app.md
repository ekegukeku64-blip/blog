---
title: "RongleCat/grok-app"
owner: "RongleCat"
name: "grok-app"
fullName: "RongleCat/grok-app"
description: "Desktop workbench for Grok Build CLI — sessions, projects, media, automations (Tauri 2 · unofficial)"
sourceUrl: "https://github.com/RongleCat/grok-app"
stars: 76
forks: 7
language: "TypeScript"
topics: []
license: "MIT"
defaultBranch: "main"
snapshotDate: "2026-07-24"
pushedAt: "2026-07-24T00:21:44Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

Grok App

本机 Grok Build 的桌面指挥台
Sessions, projects, media, automations — for the real grok CLI


  中文 ·
  English


  
  
  
  
  


  
  


  关注作者 · Follow
  X / Twitter → 铁柱AGI @cgnot996
  微信公众号搜索 「铁柱AGI」 · 扫码或搜一搜关注


  


  仓库 ·
  RongleCat/grok-app


---

> [!NOTE]
> ## 说明
>
> **Grok App 不是 xAI 官方产品。** 它把本机 [Grok Build](https://x.ai) CLI（`grok agent stdio`）收成桌面工作台：会话、项目、权限、媒体预览与已安排任务。
>
> 真 Agent 能力依赖本机已安装并可登录的 **Grok Build CLI**。没有 CLI 时可用首次向导安装，或开发态 `GROK_APP_ACP=mock` 做 UI 联调。

---

## 目录

1. 简介
2. 功能特性
3. 界面预览
4. 安装与使用
5. macOS 无法打开 / 提示已损坏
6. 配置目录
7. 开发与构建
8. 文档与贡献
9. 关注作者

---

## 简介

在终端里跑 `grok` 很强，但日常工作台还缺一块：多项目、多会话、权限条、富媒体预览、定时任务、中英文界面。

**Grok App** 解决的是「指挥台」问题：

1. 安装 App，准备好 Grok Build CLI  
2. 添加项目 / 新建会话  
3. 连接 Agent，用 Ask 或 YOLO 发消息  
4. 预览产物、安排自动化、在设置里管账号与中转  

技术栈：**Tauri 2 + Rust · React + TypeScript + Vite · Tailwind CSS**

---

## 功能特性

| 类别 | 说明 |
|------|------|
| **真 Build 会话** | 默认 `grok agent stdio`（ACP）；Host 独占会话 FSM |
| **项目与会话** | 多项目信任目录、侧栏会话、orphan「其他会话」 |
| **权限** | 默认 Ask；Allow once / session / Deny；可选 YOLO |
| **斜杠与技能** | Composer 斜杠面板、技能标签、Goal / Doctor 入口 |
| **媒体与文件** | 图 / 视频 / PDF / Office / 代码预览；资源窗 + 内嵌浏览器 |
| **自动化** | 已安排任务列表；对话里自然语言创建（静默 fence，不展示 JSON） |
| **账号与额度** | 官方登录面、SuperGrok 额度与热力图 |
| **自定义中转** | 独立 `GROK_HOME` agent 配置，避免污染默认 `~/.grok` |
| **i18n** | 界面与托盘中英切换 |
| **跨平台打包** | macOS ARM / Intel + Windows x64（GitHub Actions） |

---

## 界面预览

> 截图来自当前开发版（macOS）。

| 工作台 · SuperGrok | 账户与额度 |
|:---:|:---:|
| *图片：Workbench* | *图片：Account* |

| 浅色主题 | 会话与媒体 |
|:---:|:---:|
| *图片：Light* | *图片：Chat* |

---

## 安装与使用

### 1. 下载

从 Releases 下载对应平台安装包：

| 平台 | 文件 |
|------|------|
| macOS Apple Silicon | `Grok_*_aarch64.dmg` |
| macOS Intel | `Grok_*_x64.dmg` |
| Windows x64 | `.msi` / `.exe` |

安装包产品名为 **Grok**（与窗口标题一致）。

### 2. 首次使用

1. 启动 App → **Setup 向导** 确认 CLI 已安装（可一键多镜像安装）  
2. （可选）登录官方账号 / 填 API Key / 配置自定义中转；可跳过  
3. **添加项目** → 选择并信任文件夹  
4. **连接 Agent** → Ready 后发消息  
5. 权限条默认 **Ask**；需要无人值守时再开 YOLO  

### 3. 依赖

- 本机 **Grok Build CLI**（`grok`），常见路径：`~/.grok/bin/grok` 或 PATH  
- Windows：`%USERPROFILE%\.grok\bin\grok.exe` 或 PATH  

---

## macOS 无法打开 / 提示已损坏

当前 Release **未做 Apple 公证**（需付费开发者账号）。从 GitHub 下载后，Gatekeeper 可能提示「已损坏」「无法验证开发者」等，属预期行为。

**推荐处理：**

```bash
# 将 App 拖到「应用程序」后执行
xattr -cr /Applications/Grok.app
open /Applications/Grok.app
```

**其他方式：**

- Finder 中 **右键** App → **打开** → 再次确认打开  
- **系统设置 → 隐私与安全性** → 对拦截项点 **仍要打开**  

请仅从本仓库官方 Releases 下载。

---

## 配置目录

默认数据根（可用环境变量 **`GROK_APP_HOME`** 覆盖）：

| 平台 | 典型路径 |
|------|----------|
| macOS | `~/Library/Application Support/com.grokapp.grok-app/` |
| Windows | `%APPDATA%\grokapp\grok-app\` |
| 回退 | `~/.grok-app/` |

```text
/
  projects.json
  sessions_index.json
  settings.json
  secrets.json          # 0600；请勿提交
  automations.json
  projects/
  sessions/
  logs/
  agent-home/           # 独立模式 GROK_HOME（providers / config.toml）
```

Grok Build 自身配置仍在 **`~/.grok`**（CLI 登录、`auth.json` 等）。  
**shared** 会话模式可与 CLI 共用 `~/.grok`；**independent** 模式使用 `agent-home/`。

---

## 开发与构建

```bash
# 依赖：Node 22+、pnpm 9、Rust stable、Xcode CLT (macOS)
pnpm install

# 开发（前端 + Tauri，默认真 CLI）
pnpm dev

# 仅前端
pnpm dev:ui

# 无 CLI 的 mock 联调
GROK_APP_ACP=mock pnpm dev

# 检查
pnpm typecheck && pnpm test
cd src-tauri && cargo test

# 生产构建
pnpm build
```

交叉编译、发版与可选签名见 docs/BUILD.md。

发版（需先写好 `CHANGELOG.md` 对应章节）：

```bash
./scripts/release-tag.sh 0.1.1          # 本地 tag
./scripts/release-tag.sh 0.1.1 --push   # 推送后触发 CI 打安装包
```

---

## 文档与贡献

| 对象 | 入口 |
|------|------|
| AI Agent / 产品规则 | `docs/llm-wiki/` |
| 构建与发布 | docs/BUILD.md |
| 更新日志 | CHANGELOG.md |
| 贡献指南 | CONTRIBUTING.md |
| 行为准则 | CODE_OF_CONDUCT.md |
| 安全披露 | SECURITY.md |

欢迎 Issue 与 PR。

## License

MIT © RongleCat

---

## 关注作者

项目更新、用法拆解与 AI 实战内容，优先看作者主页：

| 渠道 | 入口 |
|------|------|
| **X / Twitter** | [铁柱AGI @cgnot996](https://x.com/cgnot996) ← 强烈推荐关注 |
| **微信公众号** | 搜索 **「铁柱AGI」**，或扫下方码 / 搜一搜卡片 |


  


  如果 Grok App 对你有帮助，请给仓库点个 Star，并在
  X @cgnot996
  与微信公众号 铁柱AGI 关注作者 🙏
