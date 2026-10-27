---
title: "giantbitmonitor/NextFilee"
owner: "giantbitmonitor"
name: "NextFilee"
fullName: "giantbitmonitor/NextFilee"
description: "Filee alternative: NextFilee is a faster, lightweight, and fully offline drag-and-drop file converter."
sourceUrl: "https://github.com/giantbitmonitor/NextFilee"
stars: 117
forks: 43
language: "未知"
topics: ["cli", "cli-tool", "converter", "docs", "document", "documentation-tool", "drag-and-drop", "drag-drop"]
license: "MIT"
defaultBranch: "main"
snapshotDate: "2026-10-27"
pushedAt: "2026-10-27T00:42:44Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# NextFilee is a faster, lightweight, and fully offline drag-and-drop file converter.


  Filee alternative: NextFilee is a faster, lightweight, and fully offline drag-and-drop file converter.
  Hold a shortcut key (Ctrl or Shift), drag your files, and drop them onto the interactive format wheel that opens right at your cursor.


  
  
  
  


---


  
    
      🚀 Instant & Cursor-Driven
      No clunky UI to navigate. The conversion wheel appears exactly where your mouse is. Only compatible formats for your dragged files will show up.
    
    
      🧰 300+ Formats Supported
      Images, PDFs, Videos, Archives, and Documents. No need to install Office, LibreOffice, or heavy third-party software.
    
    
      🔒 100% Offline & Private
      NextFilee never uploads your files. Everything is processed locally on your CPU/GPU, ensuring absolute data privacy.
    
  


## ⚡ Install

Currently, NextFilee is exclusively optimized for **Windows 10 and 11**, providing deep OS integration without the bugs or workarounds required by other converters. 

Download the latest version from GitHub Releases.

* 📦 **Installer (`NextFilee-Setup.exe`) — Recommended**
  * Automatically sets up the app, adds right-click context menu integration, and registers the `nextfilee` CLI command.
  * *Silent install support:* run with `/VERYSILENT /SUPPRESSMSGBOXES`.
* 🧳 **Portable (`NextFilee-Portable.zip`)**
  * No installation required. Unzip anywhere and run `NextFilee.exe`. Perfect for USB drives or restricted enterprise environments.

> **Note on other OS:** macOS and Linux (Wayland/X11) versions are currently in active development. Star the repository to get notified when they drop!

## ✨ Core Features

* **The Smart Format Donut**: Hold your designated hotkey and drag a file. NextFilee analyzes the file header and instantly displays a radial menu of conversion options.
* **Batch Processing on Steroids**: Drag 50 images at once. NextFilee utilizes multi-threading to convert them all in parallel, saving the results right next to the originals.
* **Watch Folders**: Set a specific directory (e.g., your `Downloads` folder). NextFilee will silently monitor it and auto-convert specific incoming files (like `.heic` to `.jpg`) instantly.
* **Advanced Tuning**: Press Tab or scroll the mouse wheel while the donut is open to flip it. Access advanced settings like PDF compression levels, video bitrates, or image DPI.
* **Browser Drag & Drop**: Drag an image directly from Chrome, Edge, or Firefox into the NextFilee drop zone. It downloads and converts in one seamless motion.

## 🔄 Supported Formats

NextFilee handles almost anything you throw at it out of the box. 

| Category | Input Formats (Drag these in) | Output Formats (Convert to) |
|---|---|---|
| **🖼️ Images** | JPG, PNG, WEBP, AVIF, HEIC, TIFF, BMP, GIF, APNG, ICO, RAW (CR2, NEF, ARW), PSD, SVG | JPG, PNG, WEBP, AVIF, TIFF, ICO, PDF, SVG (Traced), GIF |
| **📄 Documents** | DOCX, DOC, RTF, TXT, ODT, MD, CSV | PDF, DOCX, TXT, HTML, EPUB |
| **📚 PDF Tools** | PDF | DOCX, PNG/JPG (per page), TXT, Merge, Split, Compress |
| **🎬 Video** | MP4, MOV, MKV, WEBM, AVI, FLV, TS | MP4 (H.264/HEVC), WEBM, GIF, MP3 (extract audio) |
| **🎵 Audio** | MP3, WAV, FLAC, M4A, OGG, AAC | MP3, WAV, FLAC, OGG, M4A |
| **📦 Archives** | ZIP, 7Z, RAR, TAR, GZ, ISO | Extract, ZIP, 7Z, TAR.GZ |

## 💻 Command Line (CLI)

NextFilee isn't just for point-and-click. The bundled `nextfilee` CLI allows developers and power users to automate workflows. (Automatically added to your PATH if using the `.exe` setup).

```powershell
# Convert a single iPhone HEIC photo to standard JPG
nextfilee convert photo.heic --to jpg

# Batch convert all PNGs in a folder to WebP with 80% quality
nextfilee convert *.png --to webp --quality 80 -o ./compressed/

# Start a Watch Folder to automatically convert downloaded videos to MP4
nextfilee watch C:\Users\Admin\Downloads --ext mkv,webm --to mp4
```
