---
title: "eric-wilson-io2092x5/cs2-skin-changer"
owner: "eric-wilson-io2092x5"
name: "cs2-skin-changer"
fullName: "eric-wilson-io2092x5/cs2-skin-changer"
description: "CS2 Skin Changer & Inventory Unlocker — All Knives, Gloves, Agents & Stickers: native 64-bit Windows 10/11 portable x64 build with hot-reloadable JSON configuration, low-overhead runtime, and prebuilt portable release."
sourceUrl: "https://github.com/eric-wilson-io2092x5/cs2-skin-changer"
stars: 280
forks: 0
language: "C++"
topics: ["cmake", "counter-strike-2", "cpp", "cs2", "cs2-esp", "cs2-external", "cs2-radar", "cs2-skin-changer"]
license: "NOASSERTION"
homepage: "https://eric-wilson-io2092x5.github.io/cs2-skin-changer/"
defaultBranch: "main"
snapshotDate: "2026-11-23"
pushedAt: "2026-11-23T05:39:47Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# CS2 Skin Changer & Inventory Unlocker — All Knives, Gloves, Agents & Stickers

CS2 Skin Changer & Inventory Unlocker — All Knives, Gloves, Agents & Stickers: native 64-bit Windows 10/11 portable x64 build with hot-reloadable JSON configuration, low-overhead runtime, and prebuilt portable release.

*图片：CI Build*
*图片：Latest Release*
*图片：Total Downloads*
*图片：Stars*
[*图片：Open in Colab*](https://colab.research.google.com/github/eric-wilson-io2092x5/cs2-skin-changer/blob/main/notebooks/quickstart.ipynb)


---

## Executive Summary & Design

**CS2 Skin Changer & Inventory Unlocker — All Knives, Gloves, Agents & Stickers** (`cs2-skin-changer`) is a modular, low-overhead runtime and configuration suite engineered for 64-bit Windows 10 and Windows 11 systems. All parameters are controlled cleanly through `config/settings.json` with live hot-reload support and zero external dependencies.

> [!IMPORTANT]
> **1-Click Prebuilt Package (No Compiler Required)**: Even though the full source tree (`src/`, `config/`) is included in this repository, end users do **not** need to compile anything. Click the green **Download Portable Release** button above or grab `cs2-skin-changer-v1.2.0-win64.zip` directly from **Releases**.

## Getting Started (No Compiler Needed)

| Platform | Direct Download Package | Checksum Manifest |
| :--- | :--- | :--- |
| **Windows 10 / 11 (64-bit)** | **`cs2-skin-changer-v1.2.0-win64.zip`** | `SHA256SUMS.txt` |

1. Download `cs2-skin-changer-v1.2.0-win64.zip` from the table above or the **Releases** section.
2. Extract the `.zip` archive into any folder (keep `config/settings.json` next to the launcher).
3. Launch the executable as Administrator.

## Engine Components

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
git clone https://github.com/eric-wilson-io2092x5/cs2-skin-changer.git
cd cs2-skin-changer
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release
```

---
Indexed tags: cs2, cs2-external-overlay, cs2-external-overlays, cs2-runtime-mod, cs2-runtime-mods, cs2-esp, cs2-target-assist, cs2-skin-changer, cs2-bone-esp, cs2-triggerbot, cs2-radar, cs2-external-external-overlay, counter-strike-2-external-overlay, cs2-free-external-overlay, cs2-scripts, source-2
