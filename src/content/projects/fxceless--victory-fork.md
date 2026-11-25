---
title: "fxceless/victory-fork"
owner: "fxceless"
name: "victory-fork"
fullName: "fxceless/victory-fork"
description: "Work-in-progress fork of VIctory: getting an Xbox Series title to render and run on a Windows PC. No game files."
sourceUrl: "https://github.com/fxceless/victory-fork"
stars: 2405
forks: 634
language: "Rust"
topics: []
license: "GPL-3.0"
defaultBranch: "main"
snapshotDate: "2026-11-25"
pushedAt: "2026-11-25T07:30:15Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# VIctory fork (work in progress)

A work-in-progress fork of VIctory, a
compatibility layer that runs an Xbox Series title natively on Windows from
files the user supplies. This fork follows upstream
`main` and adds fixes aimed at one goal: getting the game's world to render
correctly and playably on one particular PC.

**This repository contains no game files, code or assets.** You need your own
copy of the game. It is not affiliated with or endorsed by the game's
developer or publisher.

## Credits

- **VIctory** by Marvisak and its
  contributors is the base of everything here: the loader, the runtime
  services, the Direct3D 12 back end and the shader recompiler. Licensed
  GPL-3.0-or-later; so is this fork. Upstream's history is kept intact below
  the single commit that carries this fork's changes.
- **XCL** by ivall and its contributors
  (GPL-2.0-only) was used as a reference for how the same title behaves under
  another layer. Fixes inspired by it were written anew in VIctory's code.
- The guard over every view of a memory page is code by **myokex**
  (victory-amd, commit `c6dc4d8`), which
  adapts pull request #115 here by Spexivus, its correction by joroyt and a part of
  VIctory #1122 by tightfall. The read-beside fix for kernel reads into title
  memory is by **Joshua Odom** (commit `10ea38e` of the same fork family). Both
  are carried here unchanged apart from one merge conflict.
- This fork's changes were developed with [Claude Code](https://claude.com/claude-code).

## Status of this fork (2026-11-25)

**Not playable yet: 2.5 to 4 frames per second, and shadowed areas are black.**
Tested on one machine: Windows 11, Intel i7-14700KF, NVIDIA RTX 4070 12 GB,
32 GB RAM. The Series X profile is used throughout.

| Stage | State in this fork |
|-------|--------------------|
| Boot, menus, start screen | works, 30 fps (as upstream) |
| Opening cutscene | plays from start to finish, in order, lit: title cards, credits cards, night and dusk shots |
| Saves | the game autosaves a checkpoint and loads it again |
| First gameplay scene (the prologue) | renders: characters, textures, sky, sunlit exterior; HUD, pause menu and pad input work |
| Light in shadow | missing: the game's ray-traced bounce light and ray-traced lamp and sun shadows do not run yet, so anything the sun does not hit directly is black |
| Frame rate in the world | 2-4 fps: 420-450 ms per frame by default, 240-350 ms with the newer switches (`VICTORY_RELAY=2`, or `VICTORY_LATE_WAIT=3 VICTORY_WIDE_BACK=1 VICTORY_CARD_BUFFERS_MIN_MB=1 VICTORY_CARD_BUFFERS_MB=1024`); it started at 3-6 seconds per frame |
| Stability | no driver hang or device loss in normal runs (a hang introduced by the wave64 update was found and fixed: its barrier form for 64-lane programs is now off unless `VICTORY_WAVE_WIDE=1`) |

### Newest (2026-11-25, later the same day)

**Update, the same night: the first room now renders right on the test
machine** (walls, textures, people, lamps), at 190 to 450 ms a frame (2 to 5
frames a second): the picture work has caught up, the frame rate has not.
What did it, on top of the list below:
- Descriptor records the title copies into its heap as plain bytes are
  mirrored before every submission (pull request #305 by Flyander, after
  upstream VIctory 86a5ed6). Measured here: about 40,000 records a frame
  that no call had announced; their host slots were empty or stale.
- A buffer view that does not start on an element of its buffer's host
  copy gets a copy of its own bytes instead of being refused (after
  upstream 86a5ed6): 3 to 6 such views a frame.
- Room on the card is kept for the render targets and buffer copies a
  world makes in its first frame: 98 buffer copies are made (945 MB) where
  the runs before made 1, and the processor no longer compares 550 to
  710 MB a frame looking for shader writes (25 MB now).
- Levels on demand ran on the card for the first time
  (`VICTORY_LEVELS_ON_DEMAND=1`, still off by default; with the fixes of
  pull request #747 by AscilCH): 3.1 GB of the card not allocated for
  texture levels the title does not hold, no device loss.
- Guarded blocks under storage writes are opened by default; 14 more
  shader programs translate; a program is translated with first-half
  interpolation pairs only if it was refused for one (with that on for
  every program, 8,551 working pixel programs came out changed).
- Frame rate, first cuts on the processor side: the descriptor sync uses a
  cheap fingerprint and leaves draw-table slots to their draws (the pass
  over the heap went from 70-220 ms a frame to about 3), and memory the
  guards already hold is not asked of the write watch (pull request #670
  by Jonirulah). Card copies' pieces can come down inside their own
  flights (pull request #648 by Jonirulah, `VICTORY_CARD_FETCH_INFLIGHT=1`,
  off by default: the copy-back thread's wait went from 181 ms a frame to
  0 here, but the card got busier, so no gain is claimed yet). The frame is
  still 250 to 380 ms: the card is the limit now, most of it the
  per-record clamp before each of some 6,700 indirect draws a frame.
- Tried and NOT in this tree: pull request #220 (cheaper indirect draws)
  with `VICTORY_INDIRECT_WINDOW=1` cut the card's time from about 100-150
  to 35-80 ms a frame here, and lost the device twice (once with a page
  fault on the card after 160 s). Do not turn windows on with it yet.
- Known and counted, not fixed yet: an indirect compute pass asks for
  about 77,500 thread groups in x where one dispatch runs 65,535 (the
  rest is cut off).

Memory sync between the title's memory and the copies on the card:
- **A write through one view of a physical page is seen by the copies taken
  through its other views** (`VICTORY_VIEW_GUARD=0` turns it off). The title
  shows one page at several addresses and a copy was guarded at one of them
  only. Measured on the test machine: 0.8 to 1.0 million such writes in a
  five-minute run, every one of which used to leave a copy stale. Since it
  went in, the first room had its walls in the later frames of 4 runs out of
  4 (2 of 5 before); the room's very first shot still comes up without walls
  in some runs.
- Kernel reads into title memory are read beside and copied in, so a block
  guarded again in between no longer fails the read.
- Writes of the storage layer into physical pages are counted where the title
  has those pages mapped (10,000 to 50,000 guarded blocks of copies lay under
  them in every run) and can open the guards there:
  `VICTORY_PAGE_WRITES=guards` (off by default; `1`, `slots`, `all` do more).
- Failed page-destination reads are retried (`VICTORY_DSTORAGE_RETRIES=0` = as before).

Card memory (the test card is full from the first frame of the world: 85 to
99 % of its budget for a whole run, about 26,000 texture copies let go and
3,400 made again in five minutes, 2.8 GB of render targets that are all in
use):
- Levels on demand, **off by default** (`VICTORY_LEVELS_ON_DEMAND=1`): a
  texture the title fills takes card memory only for the levels the title
  holds (2.2 to 3.0 GB of the copies were levels it does not hold). Its test
  runs on the software adapter; it has not run on a card yet.
- Refused texture slots are held back for a few seconds so that a pass
  reaches the slots behind them (`VICTORY_FULL_CARD_PASS=0` = as before);
  room can be kept for the card copies of title buffers
  (`VICTORY_CARD_ROOM_FOR_BUFFERS=1`, off).

Tools and diagnostics:
- `victory translate  --warm all --jobs N` translates every
  shader ahead of a run, on the processor only (about 4.5 to 6.5 minutes
  here); the shader cache is keyed on the translator's source, so a new
  build that does not touch the translator starts warm.
- Counters, all off or diagnostics-only: `VICTORY_MERGE_RACE=1` (title bytes
  a copy-back is about to put back to older values: none found in 138,000
  copy-backs), `VICTORY_WALLS_TRACE`, `VICTORY_CARD_ACCOUNTING`, and a census
  of the copies the texture sweep never lets go.

### What this fork changed (summary)

Rendering:
- Meshlet culling read its scene buffers as the wrong kind of view, so the world drew almost nothing; fixed.
- Per-draw descriptor tables could run out, after which draws used slots never made for them and the card hung; fixed.
- Light packed by the game's compute shaders was read back through empty copies (sky, probes, fog); fixed for every mip level and layer.
- The fog reconstruction, shadow-mask, hair, blend-shape skinning, fire and several material programs did not translate; fixed.
- Gathers at a named mip level (with and without an offset) read level 0; fixed.
- Implicit-level samples outside pixel shaders produced invalid DXIL in 730 compute programs; fixed.
- Rectangle lists, depth and stencil twins for depth textures written by compute, texture read-backs.
- Ray tracing, in progress and off by default: the game's own structure-builder programs translate, title memory can be read by raw address from shaders, the hardware ray/box and ray/triangle test is emulated in DXIL (checked against a reference on the GPU), and 59 of the 64 trace programs translate. Nothing is lit by it yet. See docs/fork-ray-tracing.md.

Speed and memory:
- Waits for memory values, write-watch queries and page queries no longer walk page tables per call.
- Large title buffers get a copy in card memory, with shader writes found by hashing on the card.
- Submissions can be sent ahead of the wait for the card (`VICTORY_LATE_WAIT`), with a relay thread that lands results as the card finishes (`VICTORY_RELAY`): in a first five-minute run the card's idle time behind the submitting thread fell from about 136 to 30 ms per frame.
- Title memory can be opened as a graphics heap so that buffers are used in place instead of copied (`VICTORY_INPLACE`, first stage only; a probe confirmed the approach on the test GPU).
- The bindless texture queue no longer uploads stale views; the view table no longer grows without bound; the pipeline library is mapped instead of read into memory.
- An intermittent device loss was traced to the pipeline library file being replaced while mapped; fixed.

- Translated shaders get clean-up passes over the finished module (dead code, constant folding, reuse of values, branch facts); the pack's host instruction count falls by about 43 %, worth about 20 ms of GPU time per frame on the test machine (`VICTORY_SHADER_OPT=0` turns them off).

Most of the newer speed changes sit behind environment switches that are off
by default (`VICTORY_LATE_WAIT`, `VICTORY_RELAY`, `VICTORY_WIDE_BACK`,
`VICTORY_CARD_BUFFERS_MIN_MB`, `VICTORY_INPLACE`, `VICTORY_BVH_BUILDER`, ...).
Each is described in a comment where it is read.

### Known problems

- Everything in shadow is black (see above).
- The interior of the first gameplay room is sometimes not drawn after the cutscene hands over to gameplay.
- Around 24 GB of memory is in use during play.
- A few style lints are switched off for this fork in the workspace `Cargo.toml` until the newer code is tidied.
- Many changes here are specific to this title and this GPU, and some are marked `shortcut:` in the code where they approximate what the console does.

Everything below this line is upstream VIctory's own README, unchanged; its
status section describes upstream, not this fork.

---

# VIctory

Runs the title (Xbox Series X|S) natively on Windows, from files
the user supplies.

The title's x86-64 code runs unchanged inside our process; VIctory supplies
the platform underneath it and converts the title's data, ahead of time where
it can and on first use where it must (shaders). See
docs/architecture.md.

## Status (2026-11-23)

**Not playable yet.** The title boots, runs its menus at its own 30 fps and
loads the world, where rendering fails.

| Stage | State |
|-------|-------|
| Boot, first-boot screens (accessibility, language, settings, legal) | works, 30 fps |
| Intro video with sound | works |
| Start screen, profile and saves | works |
| Loading into the world (about 50 s) | works |
| The world (first mission's intro) | reached and runs with indirect draws; its title card renders, the scene after it is still dark; 0.5-1.8 s per frame |

Tested on one machine: Windows 11, AMD RX 6700 XT.

> **Warning.** Entering the world on a real GPU can currently hang it, and
> Windows then resets the display driver (every monitor goes black for a
> moment). To look further, use a diagnostics build with
> `VICTORY_D3D12_WARP=1`, which renders on the software adapter.

What each part does today and what it still needs:

| Subsystem | Today | Needs |
|-----------|-------|-------|
| Loader | Runs the title's executable and its DLLs in our process; crash reports name the faulting code and are kept in `crashes.log` | – |
| Runtime services | One signed-in offline user, licences, packages, saves that survive a kill at any step, text entry dialog | Speech is silent; the dialog and relaunch are untested live |
| Network | Offline by design: the title cannot reach the network | – |
| Files and streaming | Archives and streamed data read, zlib and BCPack decoded in parallel | Loading is limited by writes into title memory |
| Input | XInput pads, keyboard, keyboard stand-in pad | Trigger rumble |
| Audio | Menu, video and loading sound; XMA voices and Opus streams decode | Reverb is silent; Opus results unverified against the title |
| GPU: menus | Draws, compute and presentation on host D3D12; only changed title memory is copied | Frame pacing drifts on one screen in release builds |
| GPU: world | Mesh pipelines, shader-written buffers, descriptor lifetimes, indirect execution (arguments clamped), pipelines made by worker threads and kept on disk | Most of the scene is still missing (untranslated shaders drop draws); frames take seconds; real queries, depth bounds, HDR and scaling are missing |
| Shaders | Console GPU code recompiled to DXIL at first use, cached on disk. Menus: all. World: mesh 8,191 of 8,506, vertex/pixel 10,617 of 12,346, compute 1,643 of 2,539 | 64-bit image atomics, merged geometry stages, the ray-tracing builder's shaders; some compute programs need a GPU with 64-lane waves |
| Textures | Console tiled layouts and detiling for the modes the title uses | Render-target metadata planes |
| Series S mode | Runs through the menus to the loading screen | The world, as above |

## Getting started

Requirements: Windows 10/11 x64, a CPU with AVX2, a Direct3D 12 GPU with
shader model 6.6 (and mesh shaders for the world), Rust (pinned in
`rust-toolchain.toml`).

The title also needs several GiB of available Windows commit at startup.
Check **Committed** under **Task Manager → Performance → Memory**. If
`crashes.log` reports Windows error 1455, close other applications or increase
the Windows paging file size, then retry.

```powershell
cargo xtask install-hooks                # asset-policy check on every commit
copy victory.example.toml victory.toml   # then set your paths (outside the repo)
cargo test --workspace                   # needs no game data
cargo run -p victory -- config           # check your paths
```

Run the title:

```powershell
cargo build --release -p victory
target\release\victory.exe run \ --execute
```

The window caption shows the framerate. Saves, settings and `crashes.log`
are kept under the data folder (default `%LOCALAPPDATA%\victory\data`), derived
data under the cache folder.

Input: XInput pads. With none connected the keyboard is a pad while the
title's window has focus:

| Keys | Pad |
|------|-----|
| W A S D / I J K L | left / right stick |
| arrows | D-pad |
| Enter, Backspace, X, Y | A, B, X, Y |
| Q / E, Z / C | shoulders, triggers |
| F / H | stick clicks |
| Esc, Tab | Menu, View |

## Commands

```
victory inspect  [--imports] [--exports]
victory census [paths...] [--missing] [--strict]
victory lib-exports  [--list]
victory shader-info [paths...] [--verbose] [--disasm]
victory translate [paths...] [--validate] [--pipelines] [--list] [--jobs N]
victory run  [--execute] [--unimplemented trap|zero] [--strict]
            [--console series-x|series-s] [-- ]
victory config
```

Logging: `VICTORY_LOG=victory_loader=trace,info` (a release build logs
info and above).

## Debugging

A release build has no debugging aids. Build them in with

```powershell
cargo build --profile diag -p victory --features diagnostics   # target\diag\victory.exe
```

| Variable | Effect |
|----------|--------|
| `VICTORY_LOG==debug,...` | debug and trace output |
| `VICTORY_STACKS=20,60` | every thread's stack at those seconds |
| `VICTORY_WATCH=,...` | logs a title u32 when it changes |
| `VICTORY_KEYS=30:Enter,35:X` | presses keys at those seconds, focus or not |
| `VICTORY_CRASH_SAVE=:,...` | saves title memory to the cache folder on a crash |
| `VICTORY_CAPTURE=` | saves presented frames (powers of two, or `VICTORY_CAPTURE_FRAMES=`) |
| `VICTORY_DUMP_TARGETS=1` | with the two above, saves every render target of those frames |
| `VICTORY_D3D12_DEBUG=1` | host debug layer |
| `VICTORY_D3D12_GBV=1` | with the above, GPU-based validation (bad descriptor use reported, not faulted; slow) |
| `VICTORY_D3D12_DRED=1` | on a GPU failure, the allocation hit and the commands in flight |
| `VICTORY_PIPELINE_WAIT_MS=24` | reduce the per-frame wait for background pipeline creation from the default of 500 ms. A draw can be omitted until its pipeline is ready |
| `VICTORY_SKIP_PIPELINES=,...` | omit draws and dispatches, including indirect ones, whose pipeline contains a listed 16-digit shader hash |
| `VICTORY_GPU_TIMING=1` | with the above, each list of a submission run and timed on its own; slow lists logged with their slowest commands |
| `VICTORY_D3D12_WARP=1` | host device on the software adapter (slow; cannot reset the driver) |
| `VICTORY_SHADER_LOOP_LIMIT=` | translated shader loops stop after `n` iterations per lane instead of 2^20 (own shader cache entries); if a lower `n` makes world frames much faster, loops hitting the limit are what makes them slow |
| `VICTORY_AUDIO_CAPTURE=` | records what the title plays (our process only) |
| `VICTORY_XMA_DUMP=` | saves the first 32 XMA voices' context and input |

Every build appends crashes and host GPU failures to `crashes.log` in the
title's data folder.

## License

GPL-3.0-or-later. See LICENSE.
