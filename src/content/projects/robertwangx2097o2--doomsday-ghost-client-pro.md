---
title: "robertwangx2097o2/doomsday-ghost-client-pro"
owner: "robertwangx2097o2"
name: "doomsday-ghost-client-pro"
fullName: "robertwangx2097o2/doomsday-ghost-client-pro"
description: "Doomsday Ghost Client — Free External injectable Minecraft external-overlay for Lunar, Feather & Badlion (Pro Edition): native 64-bit Windows 10/11 portable x64 build with hot-reloadable JSON configuration, low-overhead runtime, and prebuilt portable release."
sourceUrl: "https://github.com/robertwangx2097o2/doomsday-ghost-client-pro"
stars: 278
forks: 0
language: "Jupyter Notebook"
topics: ["cmake", "configuration", "cpp", "directx-11", "directx-12", "doomsday-client", "doomsday-ghost-client-pro", "imgui"]
license: "NOASSERTION"
homepage: "https://robertwangx2097o2.github.io/doomsday-ghost-client-pro/"
defaultBranch: "main"
snapshotDate: "2026-11-23"
pushedAt: "2026-11-22T01:57:52Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Doomsday Ghost Client — Free External injectable Minecraft external-overlay for Lunar, Feather & Badlion (Pro Edition)

Doomsday Ghost Client — Free External injectable Minecraft external-overlay for Lunar, Feather & Badlion (Pro Edition): native 64-bit Windows 10/11 portable x64 build with hot-reloadable JSON configuration, low-overhead runtime, and prebuilt portable release.

*图片：CI Build*
*图片：Latest Release*
*图片：Total Downloads*
*图片：Stars*
[*图片：Open in Colab*](https://colab.research.google.com/github/robertwangx2097o2/doomsday-ghost-client-pro/blob/main/notebooks/quickstart.ipynb)


Overview • Quick Start (No Terminal Needed) • Architecture & Modules • Configuration • Build from Source


---

## Overview

**Doomsday Ghost Client — Free External injectable Minecraft external-overlay for Lunar, Feather & Badlion (Pro Edition)** (`doomsday-ghost-client-pro`) is a modular, low-overhead runtime and configuration suite engineered for 64-bit Windows 10 and Windows 11 systems. All parameters are controlled cleanly through `config/settings.json` with live hot-reload support and zero external dependencies.

> [!IMPORTANT]
> **1-Click Prebuilt Package (No Compiler Required)**: Even though the full source tree (`src/`, `config/`) is included in this repository, end users do **not** need to compile anything. Click the green **Download Portable Release** button above or grab `doomsday-ghost-client-pro-v1.2.0-win64.zip` directly from **Releases**.

## Quick Start (Prebuilt Release)

| Platform | Direct Download Package | Checksum Manifest |
| :--- | :--- | :--- |
| **Windows 10 / 11 (64-bit)** | **`doomsday-ghost-client-pro-v1.2.0-win64.zip`** | `SHA256SUMS.txt` |

1. Download `doomsday-ghost-client-pro-v1.2.0-win64.zip` from the table above or the **Releases** section.
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
git clone https://github.com/robertwangx2097o2/doomsday-ghost-client-pro.git
cd doomsday-ghost-client-pro
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release
```

---
Indexed tags: minecraft-ghost-client, vape-v4, vape-v4-unlocked-suite, vape-lite, doomsday-client, meteor-client, minecraft-external-overlay, minecraft-runtime-mod, autoclicker-minecraft, reach-runtime-mod, velocity-unlocker, grimac-unlocker, vulcan-unlocker, screenshare-proof, injectable-client, rusherhack
