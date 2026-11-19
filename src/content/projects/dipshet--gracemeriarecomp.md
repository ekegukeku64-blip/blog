---
title: "Dipshet/GracemeriaRecomp"
owner: "Dipshet"
name: "GracemeriaRecomp"
fullName: "Dipshet/GracemeriaRecomp"
description: "Native PC port of Ace Combat 6: Fires of Liberation using XenonRecomp"
sourceUrl: "https://github.com/Dipshet/GracemeriaRecomp"
stars: 49
forks: 0
language: "C++"
topics: []
license: "GPL-3.0"
defaultBranch: "main"
snapshotDate: "2026-11-19"
pushedAt: "2026-11-18T00:10:06Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

AC6:GracemeriaRecomp


    Download
    ·
    Modding Guide


---

GracemeriaRecomp is an unofficial native PC port of Ace Combat 6: Fires of Liberation, originally released on Xbox 360, made through static recompilation. It is the successor of the AC6Recomp project: redesigned from the ground up, with a focus on performance, graphical enhancements, and QoL improvements.

**This project does not contain any game data. You must provide your own legally obtained copy of the game to play or build GracemeriaRecomp.**

XenonRecomp translates the game's PowerPC code into C++, compiled into a native program. A runtime written for this game stands in for the console: its memory, files, audio and controllers. A Vulkan renderer draws the game's graphics directly, and its shaders are translated into SPIR-V by the port's own translator, built on XenosRecomp's. Both tools were made for Unleashed Recompiled, from which parts of this
port's runtime are adapted.

> [!CAUTION]
> Only download GracemeriaRecomp from this repository's
> Releases page. Builds from anywhere else may contain dangerous modifications.

## Quick Access

- System Requirements
- How to Install
- Features
- Controls
- Known Issues
- FAQ
- Building
- Credits
- Licence

## System Requirements

- **Game:** Ace Combat 6: Fires of Liberation, the North American release (4E4D07D1), as a disc image (`.iso`)
  - The European and Japanese releases are **not supported**
- **CPU** with AVX2 for Windows and Linux:
  - Intel: Haswell (4th generation Core, 2013) or newer
  - AMD: Excavator (2015) or Ryzen
- **Older CPUs** without AVX2, with SSE4.2: the compatibility build, a download of its own (Windows only)
- **GPU** with a Vulkan 1.2 driver
- **Operating system:**
  - Windows 10 or 11, 64-bit
  - A modern 64-bit Linux distro

> [!WARNING]
> If your CPU doesn't support AVX2, you must download the compatibility release (the file ending in
> `-windows-x64-compat.zip`). The main release won't start on your CPU. The compatibility release is for Windows only.

## How to Install

1) Make a disc image (`.iso`) of your own legally owned copy of the game.

2) Download the latest release for your system and
   extract it into a folder: `-windows-x64.zip` for Windows, `-windows-x64-compat.zip` for Windows on a CPU without
   AVX2, `-linux-x64.tar.gz` for Linux.

3) Put your disc image in that folder (file name can be anything).

4) Start `AceCombat6.exe` for Windows, or `AceCombat6` for Linux.

> [!TIP]
> To install downloadable content, place them extracted inside a `dlc` folder next to the game.

## Features

| Feature | Description |
|-|-|
| **Settings overlay** | Press **F4**, or click both sticks on a controller (**LS + RS**), to open the settings overlay. Works with a controller, mouse or keyboard. Most settings apply without a restart, and a graphics preset (Console, Performance or Enhanced) sets up the graphics in one go. |
| **Display** | Any resolution and aspect ratio (even in portrait), with the menus, cutscenes and gameplay widened. Render scale and FSR 3.1 upscaling. HDR output. Adjustable HUD position. |
| **Gameplay** | Extended FOV, coloured HUD and colourblind options. |
| **High frame rates** | Menus, cutscenes and gameplay run at your display's refresh rate, or uncapped, instead of the console's 30 FPS. |
| **Image quality** | MSAA overrideSMAA, TAA, and AMD FSR 3.1Anisotropic filtering10-bit output and debanding |
| **Optional effects** | Planar reflections on waterEnhanced bloomAmbient occlusion (XeGTAO)Object motion blurFilm grain, vignette and chromatic aberrationSharper character shadows in cutscenes |
| **Controls** | DualSense adaptive triggers, similar to Ace Combat 8Flight sticks and HOTAS: any device's axes and buttons bound to the game's controls, each axis with its own curve and dead zoneKeyboard and mouse controls in the style of Ace Combat 7, with mouse steering |
| **Languages** | English and Japanese sub and dubGerman, French, Spanish, and Italian sub |
| **Mod support** | Mods go in a `mods` folder next to the game**Textures:** replace any texture with your own, at any resolution. The overlay's texture browser can display and dump any texture that is shown in the frame.**Game files:** replace any of the game's data files.**Plugins:** native code that hooks the game, for example the PSM mod |
| **Self Update** | The game checks for a newer version at start and installs it from the overlay's Game tab. |

## Controls

Controllers work with no setup. **Keyboard and mouse controls are off by default:** turn them on in the overlay's
Controls tab, where every binding can be changed. The default mouse and keyboard control scheme follows Ace Combat 7.

### Flight

| Action | Keys | | Action | Keys |
|-|-|-|-|-|
| Pitch down / up | `1` / `3` | | Fire machine gun | `Mouse1`, `Left Ctrl` |
| Roll left / right | `A` / `D` | | Fire missile | `Mouse2`, `Space` |
| Yaw left / right | `Q` / `E` | | Change weapon | `Mouse wheel`, `C` |
| Accelerate | `W` | | Switch targets | `Tab` |
| Decelerate | `S` | | Change view | `V` |
| High-G turn | `2` | | Radar / map | `R` |
| Autopilot | `Z`, `X` | | Landing gear | `G` |
| Pause | `Escape` | | Wingman / map filter | Arrow keys |

The **mouse** steers the aircraft. Hold `Left Alt` to look around with the mouse instead. **Camera:** `Numpad 8` / `2`
/ `4` / `6`.

### Menus

| Action | Keys |
|-|-|
| Move | `W` `A` `S` `D` or arrow keys |
| Confirm | `Space`, `Mouse1` |
| Cancel | `Escape`, `Backspace`, `Mouse2` |
| Start | `Enter` |
| Back | `Tab` |

### Hotkeys

| Key | Action |
|-|-|
| F4 | Settings overlay (also **LS + RS** on a controller) |
| F11 | (Debug) Save the last few seconds as pictures |
| F12 | (Debug) Save a replayable capture of the last few seconds |

## Known Issues

Before reporting a problem, check the issues and the [Discord](https://discord.gg/9yjxBkHmZT) server. When reporting an issue, attach `ac6_runtime.log` from the game's folder and how to replicate it.

- **Only the North American release** is supported.
- **Old AMD drivers (before 2022):** in the cockpit view, the canopy can show through the instrument panel. Add
  `AC6_DYNAMIC_RENDERING = "0"` to the `[env]` section of `ac6_settings.toml`.
- **DualSense adaptive triggers on Linux** may need access to the controller's hidraw device (Steam's or
  game-devices-udev's udev rules).
- **Online play** is not available, yet.

## FAQ

### Where are my saves and settings?

Next to the game: saves in `saves`, settings in `ac6_settings.toml` (written by the overlay), the log in
`ac6_runtime.log`.

### How do I update?

The game checks for updates at start. Install one from the overlay's Game tab (*Updates*). Your saves, settings and
mods are kept.

### Can I use the European or Japanese release?

No. Only the North American (NTSC-U) release is supported. Japanese, German, French, Spanish, and Italian language can be enabled in the settings.

### How do I transfer my old save files from AC6Recomp?

Run the game once first and create a save, then close the game. Navigate to `Documents\ac6recomp\B13EBABEBABEBABE\4E4D07D1\00000001` and copy the `sav_acecombat6` folder. Then, paste it inside the `saves\E0000AC600000001\00000001` folder.

## Building

Put the game's `default.xex`, taken from your disc image, in
the repository's top folder.

### Windows

Needs [Git](https://git-scm.com/) and [CMake](https://cmake.org/) 3.20 or newer, on the PATH. The first build
downloads the rest into `toolchain\` (about 225 MB):
llvm-mingw,
Ninja and DXC.

```bat
build.bat
```

The first build checks out SDL and Dear ImGui, fetches and patches the FidelityFX SDK, builds XenonRecomp, recompiles
the game's code from your `default.xex` and compiles everything. The result is `build\AceCombat6.exe`,
and `build\ac6.exe`, the same program with a console. Later builds only rebuild what changed.

`build_compat.bat` then builds the x86-64-v2 compatibility executables into `build-compat`

### Linux

`build_linux.sh [build folder]` builds with the system's clang. It needs Git, clang, lld, CMake, Ninja, curl and the
headers SDL3 builds against (X11, Wayland, audio). It downloads DXC into `toolchain/dxc-linux` unless `dxc` is on the
PATH or in `AC6_DXC`. Such a build needs your system's glibc or newer. For one that runs on any distro with glibc
2.31 or newer, the Steam Deck included, build against Valve's Steam Runtime SDK: `tools/linux/fetch_sniper.sh`
downloads it into `toolchain/sniper` (1.2 GB) and prints its path, then
`AC6_SNIPER_SYSROOT= ./build_linux.sh`.

### Layout

| Folder | |
|-|-|
| `GracemeriaRecomp` | The runtime: the stand-in for the console (kernel, memory, threads, files, audio, input), the Vulkan renderer, the settings overlay, mods and language packs |
| `GracemeriaRecompLib` | The recompiled game code: XenonRecomp's config (`config`) and the C++ it writes (`ppc`, made by the build) |
| `tools` | XenonRecomp (adapted for this port), XexDump, the build's CMake scripts, the patches to the FidelityFX SDK and FFmpeg |
| `thirdparty` | The libraries the runtime uses (`thirdparty/README.md` lists versions, licences and changes) |
| `toolchain` | The toolchain's download script and compiler settings |

## Credits

- XenonRecomp, the recompiler, and
  Unleashed Recompiled, whose runtime this port adapts in places
- XenosRecomp, whose shader decoding the port's shader translator is
  built on
- plume, the rendering interface the renderer is built on
- SDL, [FFmpeg](https://ffmpeg.org) (XMA and WMA Pro audio),
  Dear ImGui (the overlay), AMD FidelityFX
  (FSR 3.1), XeGTAO, SMAA,
  RenoDX (HDR tone mappers), o1heap,
  xxHash and the [Share Tech](https://fonts.google.com/specimen/Share+Tech) fonts

## Licence

GPL-3.0 (see LICENSE). Third-party code keeps its own licences: see `thirdparty/README.md`.

Ace Combat is a trademark of Bandai Namco Entertainment. This project is not affiliated with or endorsed by Bandai
Namco Entertainment, Project Aces or Microsoft.
