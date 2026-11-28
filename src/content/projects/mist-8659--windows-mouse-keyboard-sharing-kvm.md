---
title: "mist-8659/windows-mouse-keyboard-sharing-kvm"
owner: "mist-8659"
name: "windows-mouse-keyboard-sharing-kvm"
fullName: "mist-8659/windows-mouse-keyboard-sharing-kvm"
description: "Free open-source KVM software to share one keyboard and mouse across multiple Windows, macOS and Linux computers."
sourceUrl: "https://github.com/mist-8659/windows-mouse-keyboard-sharing-kvm"
stars: 905
forks: 0
language: "C++"
topics: ["c-plus-plus", "clipboard", "cross-platform", "desktop", "desktop-app", "input-sharing", "keyboard", "keyboard-sharing"]
license: "MIT"
defaultBranch: "main"
snapshotDate: "2026-11-28"
pushedAt: "2026-11-27T15:28:38Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

*图片：Windows Mouse & Keyboard Sharing KVM*


  
  
  
  
  


**Control multiple computers using a single keyboard and mouse with free, open-source KVM software.** Turn your Windows PC into a seamless multi-computer workstation, share input across Windows, macOS and Linux, and move between desktops without purchasing additional hardware or using complicated command-line tools.

## ⬇️ Installation

**Download the Windows application**

1. Open the repository's Releases page.
2. Download the latest release archive **`Windows Mouse & Keyboard Sharing KVM 4.4.1.zip`**.
3. Extract the archive into a folder of your choice.
4. Keep **`Windows Mouse & Keyboard Sharing KVM 4.4.1.exe`** and `libvlc.dll` together in that folder.
5. Double-click **`Windows Mouse & Keyboard Sharing KVM 4.4.1.exe`** to launch the application.


## ✨ Features

- 🖱️ **Seamless Mouse Switching** — Move your cursor beyond the edge of one monitor to access another connected computer, creating a natural multi-monitor workflow across separate machines.

- ⌨️ **Shared Keyboard Control** — Type on multiple computers using one physical keyboard, with keyboard input automatically following the machine currently controlled by your mouse.

- 🖥️ **Multi-Computer KVM** — Connect one primary workstation to multiple secondary computers and manage their screens from a centralized desktop setup.

- 🌐 **Cross-Platform Connectivity** — Share keyboard and mouse input between compatible Windows, macOS and Linux computers over your local network.

- 📋 **Clipboard Sharing** — Transfer copied text between connected computers without repeatedly switching applications or manually retyping information.

- ⚙️ **Visual Screen Configuration** — Arrange connected computers in a graphical screen layout that reflects their actual physical monitor positions.

- 🔄 **Automatic Focus Switching** — Switch control between computers through screen boundaries or configured keyboard shortcuts, without a physical KVM switch.

- 🛠️ **Simple Desktop Management** — Configure server and client computers through a graphical interface without requiring terminal commands.

## 🖼️ Overview

*图片：Features*

### A software KVM for your entire workstation

Traditional KVM hardware requires physical connections and a button or switch to change the computer being controlled.

This desktop KVM software takes a different approach: computers communicate over your network, allowing your existing keyboard and mouse to control multiple systems.

**Typical workstation setup:**

| Computer | Role | Function |
|---|---|---|
| Main Windows PC | Server | Shares keyboard and mouse |
| Secondary PC | Client | Receives input remotely |
| Additional workstation | Client | Receives input remotely |
| Laptop | Client | Joins the shared workspace |

Each computer keeps running its own operating system and applications. Only the keyboard and mouse interaction is shared.

### Server and client architecture

- **Server:** The computer physically connected to your preferred keyboard and mouse.
- **Client:** A computer receiving keyboard and mouse input from the server.
- **Network:** Connects the participating computers and carries input events between them.

This architecture makes it possible to build a multi-PC workstation without dedicated KVM hardware.

## 🚀 Usage

### 1. Install on every computer

Install and launch the application on every computer that will participate in the shared workstation.

All participating machines need a compatible installation.

### 2. Configure your primary computer

On the computer connected to your physical keyboard and mouse:

- Select the **Server** operating mode.
- Open the server configuration interface.
- Add the computers you want to control.
- Arrange their screen positions to match your physical desk setup.

### 3. Configure secondary computers

On each secondary computer:

- Select the **Client** operating mode.
- Enter the server computer's network address.
- Configure the appropriate screen name.
- Start the client connection.

Make sure the configured screen names match the names reported by the corresponding client installations.

### 4. Connect your workstation

Start the server and client services.

Once the connections are established, the application should report that it is running on the participating computers.

### 5. Move between computers

Move your mouse toward the edge of the current screen corresponding to the position of another configured computer.

The pointer should move to the neighboring computer, and keyboard input should follow the active screen.

### 6. Share clipboard content

Copy supported text on one connected computer and paste it on another when clipboard sharing is available.

**Tip:** Check your screen arrangement and connection status if the pointer does not switch computers as expected. Also check whether Scroll Lock is enabled, as it can interfere with screen switching.

## 💡 Why Use Software KVM Instead of Hardware?

A software-based keyboard and mouse sharing solution offers several advantages for multi-computer workstations.

| Capability | Software KVM | Traditional KVM |
|---|---|---|
| Physical switching button | Not required | Usually required |
| Mouse-based switching | Yes | Depends on hardware |
| Multiple computers | Supported | Depends on hardware |
| Clipboard sharing | Supported | Depends on hardware |
| Network connectivity | Required | Usually not required |
| Additional KVM hardware | Not required | Required |
| Cross-platform support | Supported | Depends on device |

Software KVM is particularly useful when your computers already share a local network and you want a more natural way to switch between them.

## 🎯 Who Is This Software For?

This multi-computer keyboard and mouse sharing application is useful for:

- **Developers:** Control development machines, test systems and personal workstations from one keyboard.
- **IT Professionals:** Manage multiple computers from a centralized desk setup.
- **Remote Workers:** Combine a personal PC and work laptop into one convenient workspace.
- **Content Creators:** Operate several computers without constantly changing input devices.
- **Power Users:** Build multi-monitor-style workflows using independent computers.
- **System Administrators:** Simplify everyday interaction with multiple network-connected machines.

## 🌐 Network and Compatibility

The application is designed around a server-client communication model.

For successful connections:

- Install the application on every participating computer.
- Connect computers to a network that allows communication between them.
- Configure the server address correctly.
- Ensure the configured screen names match.
- Allow the application through the relevant firewall rules.
- Check network restrictions if connections cannot be established.

### Supported operating systems

| Operating System | Intended Role |
|---|---|
| Windows | Server and client |
| macOS | Server and client |
| Linux | Server and client |
| FreeBSD | Platform support where compatible builds are available |

**Platform note:** Actual compatibility depends on the operating system version, available build and desktop environment. Some platform-specific features, including clipboard integration, may have limitations.

Linux Wayland environments may have additional input-sharing and clipboard restrictions.

## 🔒 Security

Security and transparency matter when sharing keyboard and mouse input across computers.

- **Open Source:** The source code can be inspected, reviewed and audited.
- **No Account Required:** The intended workflow does not depend on creating an online user account.
- **No Built-In Telemetry:** No application usage analytics or behavioral tracking are intended.
- **Local Network Operation:** Computers communicate through their configured network connections.
- **Firewall Awareness:** Only allow the network communication required for your workstation.
- **Community Reporting:** Report suspected vulnerabilities or security problems through the repository's security reporting facilities.

### Security recommendations

- Use trusted private networks whenever possible.
- Avoid exposing input-sharing services directly to the public internet.
- Keep all participating computers updated.
- Review firewall permissions and network access.
- Do not connect computers you do not trust.

Open-source availability allows users and developers to inspect how the application operates rather than relying entirely on undocumented behavior.

## 🛠️ Troubleshooting

### Mouse does not switch to another computer

- Verify the server is running.
- Check the configured screen positions.
- Confirm that the client is connected.
- Check whether Scroll Lock is enabled.

### Client cannot connect to the server

- Verify that both computers are on a network that permits communication.
- Check the server IP address.
- Review firewall permissions.
- Confirm that the server is actively running.

### Keyboard input does not follow the mouse

- Verify that the client connection is active.
- Check the configured computer names.
- Restart the connection if necessary.

### Clipboard sharing is unavailable

Clipboard support depends on the operating system and desktop environment. Some Linux Wayland configurations have known limitations.

### Screen configuration does not match the desk

Open the server configuration interface and rearrange the computer screens to reflect their physical positions.

## 🤝 Contributing

Contributions from developers, testers and documentation writers are welcome.

Ways to contribute include:

- 🐛 Reporting reproducible bugs.
- 🔧 Improving cross-platform compatibility.
- 🖥️ Fixing Windows desktop integration issues.
- 📋 Improving clipboard synchronization.
- 🌐 Enhancing network connectivity and reliability.
- 📚 Improving documentation and troubleshooting guides.
- 🧪 Testing new releases across operating systems.

### Contribution guidelines

1. Check existing issues before opening a new report.
2. Describe the operating system and application configuration.
3. Include reproducible steps and relevant diagnostic information.
4. Keep changes focused and easy to review.
5. Include appropriate release notes with significant changes.

Clear bug reports and focused pull requests help improve reliability for everyone.

## 🗺️ Project Roadmap

Potential areas for continued development include:

- Improved Windows desktop integration.
- More reliable clipboard synchronization.
- Better multi-monitor configuration.
- Improved connection diagnostics.
- Additional keyboard shortcut options.
- Expanded operating system compatibility.
- Better error reporting and recovery.
- Documentation for advanced network configurations.

## ❓ Frequently Asked Questions

### Do I need a physical KVM switch?

No. The software provides keyboard and mouse sharing between compatible computers over a network, removing the need for a dedicated hardware KVM switch.

### Can I control multiple PCs with one mouse?

Yes. Configure the primary computer as the server and add the other computers as clients.

### Does it work with Windows?

Yes. Windows is a supported target platform for both server and client operation.

### Can I connect Windows and Linux computers?

Yes, provided compatible builds are available and the operating systems permit the required input and network functionality.

### Do all computers need the application installed?

Yes. Every computer participating in the shared workstation needs its own compatible installation.

### Does it support clipboard sharing?

Yes, clipboard text sharing is supported, although availability depends on platform-specific capabilities.

### Does it replace Remote Desktop?

No. The application focuses on sharing keyboard and mouse input. It does not aim to replace complete remote desktop software or screen streaming applications.

### Does it require an internet connection?

The intended setup uses network communication between participating computers. An internet connection is not inherently required for computers that can communicate over the same local network.

### Is it free?

Yes. The project is distributed as free, open-source software under the MIT License.

## 📄 License

Released under the **MIT License**.

You are free to use, modify, distribute and contribute to the project according to the terms of the license.

---

**Build a cleaner multi-PC workstation with one keyboard, one mouse and open-source KVM software.**
