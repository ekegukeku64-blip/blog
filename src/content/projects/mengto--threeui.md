---
title: "MengTo/threeui"
owner: "MengTo"
name: "threeui"
fullName: "MengTo/threeui"
description: "Open-source ThreeUI Community catalog with live interactive components and complete Community source."
sourceUrl: "https://github.com/MengTo/threeui"
stars: 542
forks: 62
language: "HTML"
topics: ["react", "shaders", "threejs", "ui-components", "webgl"]
license: "MIT"
homepage: "https://threeui.com"
defaultBranch: "main"
snapshotDate: "2026-08-22"
pushedAt: "2026-08-21T17:43:38Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# ThreeUI Community

The open-source, login-free edition of ThreeUI. It uses the same application shell, layout, navigation, browse grid, search, themes, responsive behavior, component pages, live renderers, controls, variant picker, and source tabs as the main project.

The catalog is the only product-level difference: Pro and Beta components are removed. Every Community component keeps all of its free variants and controls.

[Browse ThreeUI](https://threeui.com) · View the source on GitHub

*图片：ThreeUI Community preview*

## Included

- 50 Community parent components
- 111 Community routes
- 141 free variant records, plus 23 singleton components (164 browse results)
- Complete Community implementation source and required assets
- No authentication, account state, checkout runtime, Pro implementation, or Beta implementation
- `Get Pro` links to `https://threeui.com/pricing`

## Run locally

```bash
npm install
npm run dev
```

Run the complete publication boundary, type, and production-build checks:

```bash
npm run build
```

## Synchronization

The checked-in repository runs independently. Maintainers can refresh its Community subset from a separately held main-project snapshot:

```bash
npm run sync:community -- /path/to/main-threeui
```

The sync fails closed, filters Pro and Beta before generating the public import graph, preserves all free metadata and options, removes restricted font assets, and writes:

- `public/community-sync-report.json` — counts plus per-component variant/control parity
- `public/source-code.json` — Community source bundles used by the Code tab
- `src/data/shaders.tsx` — Community-only catalog and renderer imports

## License

Application code, Community component code, and ThreeUI-authored Community imagery are MIT licensed. Bundled open fonts remain under the SIL Open Font License 1.1, and bundled Three.js runtime files remain MIT licensed. Remote catalog thumbnails and previews loaded from `https://threeui.com` are not redistributed by this repository. See `ASSET-LICENSES.md`, `FONT-LICENSES.md`, and `THIRD_PARTY_NOTICES.md`.
