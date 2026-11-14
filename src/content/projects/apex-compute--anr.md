---
title: "apex-compute/ANR"
owner: "apex-compute"
name: "ANR"
fullName: "apex-compute/ANR"
description: "Apex Neural Rendering (ANR) by Apex Compute"
sourceUrl: "https://github.com/apex-compute/ANR"
stars: 1547
forks: 23
language: "C++"
topics: []
license: "未标注"
homepage: "https://apexcompute.com/neural-rendering"
defaultBranch: "main"
snapshotDate: "2026-11-14"
pushedAt: "2026-11-12T18:20:33Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Apex Neural Rendering (ANR)

[Apex Neural Rendering](https://apexcompute.com/neural-rendering) by [Apex Compute](https://apexcompute.com).

- **ANR FG**: frame generation. In beta.
- **ANR SR**: super resolution (upscaling). Beta soon.
- **ANR RR**: ray reconstruction (denoising for ray tracing). Beta soon.
- **Source code**: coming soon.
- **nr-record**: records a game's frame generation or upscaler inputs to compare ANR FG, NVIDIA DLSS-G, DLSS, FSR, XeSS and others (below). Source in this repository.

## ANR FG Beta

1. Download a package from Releases:
   - `anr-fg-full`: for games without OptiScaler.
   - `anr-fg-addon`: for games that already use OptiScaler.
2. Close the game, extract the package and run the installer with the folder of the game's `.exe`:
   - Windows: `install.cmd`
   - Linux and Steam Deck (Proton): `sh install.sh ""`, then set the game's launch options to the line it
     prints: `WINEDLLOVERRIDES="dxgi=n,b" %command%`, or `winmm=n,b` in Vulkan games
3. In the game, turn on frame generation (the NVIDIA option where the game offers several).

To uninstall, run `uninstall.cmd` or `sh uninstall.sh` with the same folder.

## Supported GPUs

- NVIDIA GeForce RTX 20, 30, 40 and 50 series, and GTX 16 series
- AMD Radeon RX 5000, 6000, 7000 and 9000 series, and Steam Deck
- Intel Arc A and B series

On Windows 10 and 11, and on Linux and SteamOS with Proton.

## Results and problems

Please post them as issues:
- **Performance results**: run the test kit from the release and attach its result file.
- **Problems**: the game, GPU and driver, operating system, settings and what you saw, with the newest `nr_fg-*.log`
  from under the game's `OptiScaler/custom/Apex Neural Rendering FG` folder.

OptiScaler is GPL-3.0; its source for each release is attached to the release.

## Record and compare frame generation

nr-record records the inputs a game gives its frame generation, losslessly. You can then replay a recording through any frame generation DLL you have (ANR FG, a game's DLSS-G `nvngx_dlssg.dll`) and compare the results as videos or images. nr-record includes no frame generation.

Requirements:
- a D3D12 or Vulkan game with DLSS frame generation, with the `anr-fg-full` package installed (it includes OptiScaler);
- Windows 10 or 11, or Linux with Proton;
- [ffmpeg](https://ffmpeg.org/download.html) and ffprobe on the `PATH`;
- for DLSS-G replays, an NVIDIA RTX 40 or 50 series GPU.

1. **Install.** Download `nr-record-1.1-windows.zip` or `nr-record-1.1-linux.tar.gz` from the FG-V.B15 release and extract it. Close the game and run the installer with the folder of the game's `.exe`:
   - Windows: `install.cmd ""`. No launch option is needed.
   - Linux and Steam Deck (Proton): `sh install.sh ""`. Set the game's Steam launch options to `WINEDLLOVERRIDES="dxgi=n,b" %command%` (the ANR FG installer prints the same line). Do not set this on Windows: the game may not start.

   The installer copies `nr-record` into `OptiScaler/custom/` and sets `FGNvngxReplacement=nr-record` in `OptiScaler.ini` (it keeps the original). When you are not recording, ANR FG generates the frames, or DLSS-G if ANR FG is not installed (`forward` in `nr-record/dlssg/nr_record.ini`). `uninstall.cmd` or `sh uninstall.sh` with the same folder removes nr-record and restores `OptiScaler.ini`. To install by hand: copy `capture/OptiScaler/custom/nr-record` into `OptiScaler/custom/`, set `FGNvngxReplacement=nr-record`, and set `forward` to `..\..\Apex Neural Rendering FG\dlssg\nvngx_dlssg.dll` or `nvidia`.
2. **Record.** Turn on DLSS frame generation in the game. **F6** starts and stops a recording; **F9** records the next 8 frames. Each start and stop beeps. While recording, the game shows only real frames. Recordings go to `%LOCALAPPDATA%\nr-record\` (Windows) or `~/.local/share/nr-record/` (Proton). A frame takes about 26 MB at 3840x2160 and 6 MB at 1806x972. `nr-record/dlssg/nr_record--.log` lists what was recorded.

   To record the upscaler's inputs instead (super resolution, D3D12 games): open OptiScaler's menu (**Insert**), pick `nr-record` in the upscaler list, and press **F6** to start and stop. It upscales with the upscaler `OptiScaler.ini` names (DLSS on NVIDIA, else FSR, or XeSS) and records that output too. Pick your upscaler again afterwards. Replay these recordings with `--generator dlss`, `fsr` or `xess` (replay).
3. **Replay.** On Windows, in the package folder (`REC` is a recording's folder):

   ```bat
   tools\nr-record.exe info REC
   tools\nr-replay.exe --record REC --out out\anr --generator provider --dll "\nvngx_dlssg.dll" --label "ANR FG" --stream - | tools\nr-video.exe video - --out out\anr.mp4
   tools\nr-replay.exe --record REC --out out\dlssg --generator nvidia --dll "\nvngx_dlssg.dll" --label DLSS-G --stream - | tools\nr-video.exe video - --out out\dlssg.mp4
   tools\nr-video.exe project out\anr.mp4 out\dlssg.mp4 --out out\cmp.compare.json --labels "ANR FG" DLSS-G
   ```

   On Linux, one command runs both replays under Proton's Wine and writes both videos, a side-by-side video and the compare project:

   ```bash
   python3 tools/nr_replay_wine.py --record REC --out cmp --video \
       --generator provider --dll "/nvngx_dlssg.dll" --label "ANR FG" \
       --b-generator nvidia --b-dll "/nvngx_dlssg.dll" --b-label DLSS-G
   ```

   For images, replay with `--raw` instead of `--stream` and run `nr-video png`.
4. **Compare.** `viewer/renderer --compare --project cmp/compare.json` (Windows: `viewer\renderer.exe --compare --project out\cmp.compare.json`) plays both videos in sync, with a divider, side by side view, pixel zoom and marks, and exports videos and images. From the command line: `--compare-export PROJECT --out FILE --very-high`. `viewer/renderer --captures` lists your recordings and regenerates their frames with each generator.

Docs: recording, format, replay and videos, viewer.

Build: `bazel build //record:nr-record //record/replay:nr-video //renderer`; Windows parts: `bazel build --config=windows_cross //record/capture:package //record/replay:nr-replay`.

## Citation

```bibtex
@software{apex_neural_rendering,
  author = {{Apex Compute}},
  title  = {Apex Neural Rendering (ANR)},
  year   = {2026},
  url    = {https://github.com/apex-compute/ANR},
  note   = {https://apexcompute.com/neural-rendering}
}
```
