---
title: "PhiloLabs/fable51-worlds"
owner: "PhiloLabs"
name: "fable51-worlds"
fullName: "PhiloLabs/fable51-worlds"
description: "worlds via code, from fable 5.1"
sourceUrl: "https://github.com/PhiloLabs/fable51-worlds"
stars: 155
forks: 5
language: "TypeScript"
topics: ["3d-reconstruction", "ai-agents", "claude", "digital-twin", "openstreetmap", "procedural-generation", "san-francisco", "threejs"]
license: "MIT"
defaultBranch: "main"
snapshotDate: "2026-09-03"
pushedAt: "2026-09-02T22:39:03Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# fable51-worlds

**Worlds via code.** Explorable, browser-native reconstructions of real places — researched, modelled, and quality-checked end to end by autonomous [Claude Fable 5.1](https://www.anthropic.com/claude/fable) agent swarms, then shipped as plain [Three.js](https://threejs.org) apps you can run with `npm run dev`.

No game engine. No proprietary 3D tiles. Every building, storefront, sign, tree and traffic light is generated from open data and public reference imagery by code that lives in this repo.

---

## Worlds

### 🌉 Union Square, San Francisco


▶ Watch the full 59-second walkthrough · 1920×1080 · aerial, plaza, Nintendo, lower level, Apple

The square and its surrounding blocks — Powell, Geary, Post and Stockton — on real terrain and a real street grid, with 129 identified storefronts, working traffic lights and cable cars, day/sunset/night, and two explorable interiors: **Apple Union Square** (300 Post St) and **Nintendo SAN FRANCISCO** (331 Powell St).

| | |
|---|---|
| **Run it** | `cd union-square-sf && npm install && npm run dev` |
| **Buildings** | 453 OSM footprints · 75 hand-authored façades · 129 named storefronts |
| **Life** | 220 pedestrians on a 1,398-node nav graph · 109 vehicles incl. Powell St cable cars |
| **Interiors** | Apple + Nintendo, 23 interactive objects |
| **Validation** | 34 camera-matched viewpoints vs. real photographs · 147 comparison sheets · 9 independent reviewer reports |

More worlds coming.

---

## How these are made

Each world follows the same pipeline, and every stage is in the repo so you can re-run it:

1. **Reconnaissance** — parallel research agents pull OpenStreetMap geometry, USGS elevation, transit and street specs, and a storefront census with per-fact sources and confidence levels.
2. **Offline asset generation** — Blender-as-a-library (`bpy`) scripts emit optimised GLB kits: façade modules, street furniture, vehicles, vegetation, retail fixtures, pedestrian body parts.
3. **Runtime** — a pure Three.js app assembles terrain, streets, façades, props, crowds and traffic from JSON specs.
4. **Camera-match QA** — Playwright drives the real app, screenshots fixed viewpoints, and diffs them against free-licensed photographs taken from the same spot; independent reviewer agents (architect, geographer, technical artist, interaction) file reports that drive the next fix cycle.

## License

Code and generated assets: MIT. Geometry is derived from [OpenStreetMap](https://www.openstreetmap.org/copyright) (ODbL) and USGS 3DEP (public domain). Reference photographs are not redistributed here — their provenance is recorded per sector in each world's `refs/*/SOURCES.md`. Brand names and logos identify the real businesses at their real locations and belong to their owners.
