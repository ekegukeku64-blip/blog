---
title: "xikhar/persona"
owner: "xikhar"
name: "persona"
fullName: "xikhar/persona"
description: "Bringing real-time voice to life."
sourceUrl: "https://github.com/xikhar/persona"
stars: 92
forks: 13
language: "JavaScript"
topics: []
license: "NOASSERTION"
defaultBranch: "main"
snapshotDate: "2026-07-29"
pushedAt: "2026-07-28T21:24:14Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

Persona


  A realtime character presence for desktop voice experiences.


---

Persona is a cross-platform desktop character that gives voice conversations
an expressive visual identity alongside your work.

## Platform support

| Platform    | Automatic voice output listener | Distribution               |
| ----------- | ------------------------------- | -------------------------- |
| Linux       | PipeWire process-stream capture | AppImage and DEB           |
| Windows     | WASAPI process-loopback capture | NSIS installer             |
| macOS 14.2+ | Core Audio process tap          | DMG and ZIP, arm64 and x64 |

Linux requires `pw-dump` and `pw-record` on `PATH`. Windows process-loopback
requires Windows 10 build 20348 or newer. macOS asks once for System Audio
Recording permission.

Each listener is scoped to the supported application's playback process. Persona
does not capture the microphone, save audio, produce speech, transcribe content,
or send audio over the network.

## Try Persona locally

Requirements:

- Node.js 24 or newer
- npm
- A desktop session with hardware-accelerated graphics

Character media is not part of the repository. Before launching, place local
test media or redistributable media in the exact slots documented below.

```bash
npm install
npm run demo
```

`npm run demo` builds the current renderer and launches Persona with normal
automatic voice-output detection.

For a background launch:

```bash
npm start -- --background
```

## Connect Persona to Codex

With Persona running, register its local MCP server:

```bash
codex mcp add persona --url http://127.0.0.1:47831/mcp
```

New Codex sessions can then ask Persona to play an installed animation, show or
hide its window, and report whether the local character and voice listener are
active. Persona remains a separate desktop application; the MCP connection
only exposes its own visual controls.

The window intentionally contains no controls:

- Scroll to zoom.
- Left-drag to orbit.
- Right-drag to pan.
- Use your window manager's move gesture to reposition the window.

On Hyprland, Persona also applies floating, pinned, topmost, full-opacity,
no-blur, no-shadow, and decoration-free properties. macOS uses an all-Spaces
topmost window. Other desktops use the strongest supported Electron window
hints.

## Build native packages

Build on the operating system you are targeting:

```bash
npm run dist:linux
npm run dist:windows
npm run dist:mac
```

Outputs are written to `release/`. Windows needs Visual Studio Build Tools with
the C++ desktop workload. macOS needs Xcode Command Line Tools and macOS 14.2+
SDK support.

GitHub Actions runs the full JavaScript, renderer, native compile, and native
self-test suite on Linux, Windows, and macOS. Prerelease tags shaped like
`v0.1.0-beta.0` create native packages and a checksum file, but only after the
asset release gate passes. See Releasing.

## Replace the character assets before publishing

Character media is intentionally excluded from Git. Local test files must not
be distributed. Persona's stable replacement slots are:

```text
assets/
├── model.vrm
├── manifest.json
└── animations/
    ├── idle.vrma
    ├── talk1.vrma
    ├── talk2.vrma
    ├── talk3.vrma
    ├── greeting.vrma
    ├── happy.vrma
    ├── finger-gun.vrma
    └── dance.vrma
```

Replace files in place, then complete every license and source field in
`manifest.json` and set `distributionAllowed` to `true`. Remove the VRM and
VRMA ignore rules only when those exact files are safe to publish. The release
workflow will fail closed until then. Read Asset licenses.

## Development

```bash
npm run check
npm run native:build
npm run native:test
```

The native listener is required before running Persona from source on macOS or
Windows. Linux captures activity through PipeWire and does not build a helper.

More detail:

- Architecture and development
- Codex and integration API
- Release process
- Security policy

Persona application source is licensed under the MIT License.
Bundled character assets are excluded from that license and remain test-only
until replaced and documented.
