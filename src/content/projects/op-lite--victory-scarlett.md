---
title: "Op-lite/victory-scarlett"
owner: "Op-lite"
name: "victory-scarlett"
fullName: "Op-lite/victory-scarlett"
description: "Local fork of the victory layer: memory emulation, streaming, submit path and visual fixes, with tools and notes"
sourceUrl: "https://github.com/Op-lite/victory-scarlett"
stars: 120
forks: 32
language: "Rust"
topics: []
license: "GPL-3.0"
defaultBranch: "scarlett-fox"
snapshotDate: "2026-11-27"
pushedAt: "2026-11-27T00:52:37Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Scarlett fork (branch `scarlett-fox`), state of 2026-11-26

## How to start the game (the short version)

You need your own dump of the game: a folder that has `game_scarlett_master.exe` in it. **This repository contains
no game files, code or assets.**

1. **Install the tools once:** [Rust](https://rustup.rs) and the Visual Studio C++ build tools with a Windows SDK.
2. **Build once.** Open PowerShell in this folder and run:

   ```powershell
   cargo build --profile diag -p victory --features diagnostics --locked
   ```

3. **Start the game.** Drag your game folder onto **`Play-Scarlett.cmd`**.
   After the first time, just double-click `Play-Scarlett.cmd`: it remembers the folder.

That is all. `Play-Scarlett.cmd` sets every setting this branch runs with, in Series X mode. The first start
takes a few extra minutes while it prepares the game's shaders (see below); after that it starts straight away.

Good to know:

- **Shaders are prepared ahead, by itself.** Before the game starts, the launcher translates all of the game's
  shaders once (`victory.exe shaders \shaders.rpf`). You will see a console window counting
  for a few minutes. It happens only when it is needed:
  - on the first start,
  - after you build a new `victory.exe`,
  - after you change a setting that changes the shaders (`-RayTracing`, `-NoProbeRays`).

  It is remembered in the cache folder (`scarlett-shaders-ahead.txt`), so every other start skips it. Without
  this step the game would translate shaders while you play: slow, with objects missing and faces drawn wrong
  for that session. To run only this step: `.\scripts\play-scarlett.ps1 -OnlyPrecompile`. To skip it:
  `-NoPrecompile`. To force it again, delete `scarlett-shaders-ahead.txt` from the cache folder
  (`%LOCALAPPDATA%\victory-scarlett\cache` unless you chose another).
- **The first session still stutters a little** while the graphics driver builds its own pipelines; later
  sessions are smoother.
- **Controls:** an Xbox controller works. On the keyboard: W A S D move, I J K L camera, Enter = A, Backspace = B,
  X and Y, Z / C = left / right trigger, Q / E = LB / RB, arrows = D-pad, Esc = Menu, Tab = View.
- **Do not use `Play-VIctory.cmd`** for this: that is the base's launcher, with Series S and other settings.
- **Ray tracing** is off by default (the game's own, much slower). To turn it on, start it from PowerShell:

  ```powershell
  .\scripts\play-scarlett.ps1 -RayTracing
  ```

- **The violet glow on bushes, trees and palms** that the base shows with ray tracing off is gone by default
  (`-NoProbeRays` brings the base's picture back). The first start after this update re-translates shaders.
- **More speed:** `.\scripts\play-scarlett.ps1 -Hooks` turns the memory hooks on (about 10-15 ms a frame less in
  the opening scenes). They are off by default: they can show a few small textures with old contents for a moment.
- More options are listed at the top of `scripts\play-scarlett.ps1` (other cache or save folders, a release build,
  automatic start-screen presses, any single setting through `-More`).

## What this is

This branch is codec-d/cool_fox at `f4b48ad` (itself avatarmanz/VIctory-7900XTX `0a43566` plus six commits) with the
work of a local fork ("Scarlett") ported onto it. Target PC: Ryzen 7 9800X3D, 32 GB RAM, RTX 4080 SUPER 16 GB,
2560x1440, Series X mode. Goal: a stable 30 frames a second with no loss of picture. It is not there yet.

## Measured (6-minute opening route, diagnostics build, ray tracing off, hooks off)

| | cool_fox as it was (floor) | this branch, current settings |
|---|---|---|
| ms per frame, 1,000-2,500 draws | 50-55 | 34-35 |
| ms per frame, 2,500-4,000 draws | 50-53 | 38-41 |
| ms per frame, over 4,000 draws | 59-66 | 46-49 |
| frames over 1.5x the usual | 7-8 % | 0.8 % |
| 5-second periods with a frame over 500 ms | 18-21 | 3 |
| frames drawn in the 6 minutes | 4,400-5,900 | 8,300-9,400 |
| texture copies made again in the first 4 minutes | about 6.4 GB | under 15 MB |
| memory commit, peak | 37 GB | 33 GB |

Heavier hand-played scenes (a prison yard at 5,500-8,600 draws, the open world) run at about 48-62 ms a frame
(16-21 fps). Identical runs on the test PC differ by 13-18 ms a frame at the same draw count, so single-run frame
times prove little; the memory, re-upload and freeze figures and each switch's own counter line are what is solid.

Where the time goes now (ray tracing off): the graphics card is mostly idle. One thread of the layer, the one that
hands each frame's work to the card, is busy for the whole frame (32-44 ms: buffer refreshes 12-14, copies in the
card's memory 7-8, other list steps about 6, write-watch asks about 4).

## The settings `Play-Scarlett.cmd` uses

All settings are environment variables read at start; `scripts\play-scarlett.ps1` holds the list, in groups:

- cool_fox's launcher set, **without** Series S, `VICTORY_THIN` and the stand-in ambient light, and with the
  keep-the-card-busy loop off (`VICTORY_CARD_AWAKE=0`: it held the card at 97-99 % in menus for no gain).
- `VICTORY_LEVELS_ON_DEMAND=0`: textures keep only the levels their views show. cool_fox's launcher set it to 1,
  which made every texture keep its whole chain on the card. Off: re-uploads near zero, about 4 GB less commit,
  fewer freezes. This was the largest single gain.
- The memory hooks, only with `-Hooks` (see "The memory hooks" below).
- `VICTORY_POOL_DISCARD=1`, `VICTORY_FILL_TITLE=1`, `VICTORY_PARTIAL_DELTA=1`, `VICTORY_BAKE_DELTA=1`,
  `VICTORY_MAP_LOCK_FINE=1`, `VICTORY_POOL_CAP=1`: unused pool pages given back under low RAM, no read waits for
  fills, unchanged texture levels not uploaded again, the mapping lock taken per range, the texture pool capped.
- `VICTORY_TABLE_MEMO=1`: a descriptor-table entry made ready earlier in a command list is not made ready again
  (81 % of about 54,000 entries a frame; verified against the full path). `VICTORY_LIST_ALIAS_EXACT=1`: a texture
  read through a view in another format follows its source's writes within a list (the base read a stale copy once
  a frame in the title's lighting filter). `VICTORY_LIST_HOLD=1`: a view copied into a new table is held once
  per list, not once per slot.
- Picture waits: `VICTORY_BAKE_TEXTURES_MS=10000` (the title's character bake waits up to 10 s for its textures;
  1.5 s by default: faces and skin came out wrong in some runs) and `VICTORY_PIPELINE_WAIT_MS=500` (a draw waits
  for a pipeline still being made instead of being dropped after 20 ms).

- `VICTORY_SOFT_VIEWS=copies` (the freeze fix): the views made by the title's batch page-mapping copies are
  kept in the layer's books and mapped only if something touches them (the title's CPU never did in 6 minutes).
  Tens of thousands of map and unmap system calls a second are spared at loads: long frames 2.7 % -> 0.8 %,
  5-second periods with a freeze 10-12 -> 3. Its check mode (`=verify`) found no differing page.
- `VICTORY_SAMPLERS_MADE=1`: pipelines with static samplers are not loaded from the saved pipeline library, where
  they could sample through another run's samplers (wrong light or faces in some runs only). They are compiled
  each run instead. `VICTORY_TABLE_NAMED_ONLY=1`: a new descriptor table gets only the slots its program can read
  (about 27,000 slots a frame less; check mode found none missing). `VICTORY_QUEUE_MARKS=1`: texture-queue notes
  that change nothing leave its lock alone (about 14,000 a frame).

## What was added to cool_fox

Always on:
- Unattended runs: `VICTORY_AUTO_INPUT` (a script of pad presses keyed on draws per frame, to pass the start
  screens), a window caption with fps, ms and draws, `VICTORY_FRAME_LOG` (per-frame breakdown by thread, long frames
  listed with their cause), `VICTORY_HANG_WATCH_S`, `VICTORY_PRESENT_SKIP` for runs with the display off.
- Picture: 16-bit float values moved through unsigned-integer views (`VICTORY_HALF_VIEWS`, `VICTORY_D16_BITS`; fixes
  frozen facial animation and a blurred disc in cutscenes), a NaN guard on colour exports (`VICTORY_NAN_GUARD`),
  early depth, pipelines made for the render-target formats actually bound (`VICTORY_TARGET_VARIANTS`), an alias copy
  after an upload earlier in the same list, views keep the title's minimum LOD. 26 compute programs the base refused
  now translate (hair shadow masks, water volumetrics, particle emits, decals).
- Meters (diagnostics builds): uploads by cause, read waits by reason, mapping-lock readers, memory housekeeping,
  texture detail, the game's chunk pool, page kinds by the title's own table, per-pass GPU times
  (`VICTORY_PASS_TIMES=1`, `=2` serial), list calls and draw set-up by part (`VICTORY_LIST_CALLS=1`).

Switches, off by default (the base's behaviour is kept unless a run showed a gain); the ones in the launcher are
described above. Others:
- `VICTORY_PAGE_POOL=1`: textures on pages of reserved resources (about 1.2 GB less texture memory, no frame cost).
  Its page mover `VICTORY_PAGE_MIGRATE` loses the device on the test card and must stay off (`tools/docs/fox-port-V.md`).
- `VICTORY_STAGING_REST_MS`, `VICTORY_STAGING_PACK`, `VICTORY_SEND_SPARE_MB`, `VICTORY_WINDOW_KB`,
  `VICTORY_WINDOW_TAILS`, `VICTORY_HOLDERS`: memory trims; about 1-2 GB less commit, not in the launcher.
- `VICTORY_CLEAN_STAMP`, `VICTORY_ASK_KEPT_EARLY`, `VICTORY_FILL_FROM_PLACED`, `VICTORY_SIGNATURE_LOCAL`,
  `VICTORY_BIND_SAME`, `VICTORY_LIST_BATCH`, `VICTORY_FAULT_NOTE_ONCE`, `VICTORY_BASE_REUSE`, `VICTORY_MAP_DEFER`,
  `VICTORY_REMAP_SAME`, `VICTORY_CHUNK_FINAL`, `VICTORY_BIND_FILTER`, `VICTORY_HOIST_LOADS` and more: built, exact,
  no gain shown (or a loss: `VICTORY_LIST_BATCH`), or untested. `tools/docs` says which.
- Tried and rejected on this base: `VICTORY_THIN=1` (no gain here, twice the long frames), `VICTORY_WINDOWS_BAR_MB`
  (game memory in VRAM through Resizable BAR: no gain while the card is idle, 1.4 GB of VRAM), a release build
  without diagnostics (no faster), `VICTORY_DISPLAY_MODE=2560x1440` (the title still builds its 4K targets),
  `VICTORY_SHADER_LOOP_LIMIT=1024` (black faces), `VICTORY_BVH_COUNT32` (breaks ray tracing), `VICTORY_UNMAP_EXACT`,
  `VICTORY_TEXTURE_RAM_CAPS=0`, `VICTORY_VRAM_RAW_PCT`.

## The memory hooks: what they are and how they work

The console title keeps textures, vertex data and constants in memory that it writes itself, and the layer keeps
a copy of every range on the PC's card. Each frame the layer must know which pages the title wrote since the
copy was taken. Without hooks it asks about all of them: Windows write-watch on some regions and read-only
"guard" pages (a write faults once, is noted, and the page opens) on the rest. That asking and re-arming is a
large part of the layer's CPU time. The hooks use what the title itself tells us to ask less. Both are off by
default (`-Hooks` turns them on) and both are source in this repository; nothing of the title's is included,
they only name addresses inside the user's own copy of the program and check a few bytes there before attaching.

**`VICTORY_GPU_ONLY`** (`crates/victory-hle/src/modules/pagekinds.rs`, `crates/victory-gpu/src/pagekinds.rs`).
The title keeps its own table of what each 64 KiB page is mapped for: the CPU, the card, or both. The hook
attaches to the title's page-mapping call, reads that table, and keeps a journal of every event that can change
a card-only page: our own DirectStorage writes into it, mapping changes, a texture level allocation, a block
entering or leaving the rule. A range lying wholly on card-only pages is then answered from the journal: no
write-watch ask, no guard, no fault. `=verify` tracks as before and counts every write the rule would have
missed; with `=1` a safety net compares texture copies and counts stale ones.
State: not safe yet. 6-minute runs still find 4-11 small textures (8-12 KiB) drawn with old contents. The
title maps such a page at a second address and writes through that view; taking blocks off the rule at the
moment a second view is mapped did not close it. Until both counts are 0 it stays off.

**`VICTORY_KNOWN_WRITES`** (`crates/victory-hle/src/lockhook.rs`, `crates/victory-gpu/src/knownwrites.rs`).
The hook attaches to the title's buffer lock and unlock calls, so the layer learns the windows in which the
title writes a buffer; with the layer's own writes (landings, copy steps, copy-backs) that is a ledger of
"written, by a known event". A page covered by events and not marked since its copy was taken is not asked
about at all. First form: 300-400 MB a frame spared, but it drew stale data in streaming regions, where the
title remaps pages through the card's view and no lock call tells us. With the rule narrowed to what is safe it
spares 1.7 MB a frame. Retired: kept in the source, off, not worth turning on.

How the two compose when both are on, per refresh of a buffer copy: pages the ledger covers are spared first;
of the rest, runs wholly on card-only pages are answered from the journal; everything else goes to write-watch
and guards as without hooks. Every journal note also marks the ledger, so neither can spare a page the other
calls written. `tools/docs/fox-merge-hooks.md` has the full composition and the always-on additions;
`tools/docs/pc-like-memory.md` the wider plan they belong to.

Related, not a hook: **`VICTORY_SOFT_VIEWS=copies`** (in the launcher) uses the same knowledge the other way
round. The views the title's batch page-mapping copies create for the card are never read by its CPU, so they
are kept in the layer's books and mapped only on a touch (a fault maps the view and retries).

## Everything done on this branch, in order

1. **Base and measuring.** Moved from the older tree (branch `scarlett`) to cool_fox; unattended runs with a
   watchdog, scripted start-screen input, frame logs by thread, a fixed 6-minute route and a floor to compare
   against, so every change is one run against a known base instead of an A/B pair.
2. **Texture memory.** `VICTORY_LEVELS_ON_DEMAND=0` (the base launcher kept every texture's whole chain):
   re-uploads 6.4 GB -> under 15 MB, about 4 GB less commit. Bake and partial deltas, pool cap, pool discard
   under low RAM, fills that do not wait for reads, the mapping lock per range.
3. **Draw set-up.** Table memo (81 % of entries not rebuilt), list hold, named-only table slots, texture-queue
   marks. Tried without gain: same-bind filter, list batching, cross-frame table reuse, `VICTORY_THIN`.
4. **Submitting thread.** Refresh split meters; exact stale-refresh path; one guard pass per submission and a
   "hot block" rest (both measured and dropped: no gain); card copies from a touched list (no gain shown).
   Found: two thirds of the guard time is waiting for one lock, and the title's threads wait on it too
   (7-20 ms a frame summed). A lock change was written locally but is NOT in this branch: its stress test
   counted missed writes on the unchanged path as well, which is not understood yet.
5. **Freezes.** Cause found by elimination (not our locks, page faults, protection changes or address-space
   queries): the title's page-mapping copies, one map and unmap per 64 KiB page, slow under memory pressure.
   Memory trims did not help; `VICTORY_SOFT_VIEWS=copies` did (freeze periods 10-12 -> 3 in 6 minutes).
   A page mover for the texture pool lost the device four times and is parked.
6. **Picture.** Violet vegetation with ray tracing off (`VICTORY_PROBE_RAYS`); a stale alias read in the
   lighting filter (`VICTORY_LIST_ALIAS_EXACT`); a stale material-class plane (`VICTORY_PLANE_NOW`); bakes and
   pipelines waited for; static-sampler pipelines kept out of the pipeline library (`VICTORY_SAMPLERS_MADE`);
   a use-after-free crash in a meter; a shader-cache key that missed new translator switches. NaN sources
   traced to two compute passes: both translate as the console computes them, the open question is their inputs.
7. **Ray tracing.** Works with `-RayTracing` but costs about 84 ms of card time a frame; parked until 30 fps
   holds without it.
8. **Hooks.** See above: one retired, one not yet safe.
9. **Other forks read for ideas** (source only, nothing of theirs built or run): cool_fox-willy, two NVIDIA
   forks, foxhound. Notes in `tools/docs/*-review.md`.

Still open: 30 fps in heavy scenes (20-21 fps in the prison, lower when driving), the guards' lock, the title's
own mapping calls, lingering purple patches, meshes stretching for a moment, the hooks.

## Known problems

- Fixed by default: the violet glow on bushes, trees and palms and the bright blue awnings with ray tracing off.
  The base leaves out the title's probe-activation program, and the light probes then keep whatever their
  memory held. `VICTORY_PROBE_RAYS=1` (set by the launcher) runs it and answers every ray test as for an empty
  structure, so each ray ends with the title's own miss result; no cost measured.
- Purple patches can linger for a few seconds in some scenes; magenta or blue streaks, shiny skin or a dark band
  across the eyes appear on characters in some runs. Candidates and evidence: `tools/docs/shading-gaps-audit.md`
  (a material-class depth plane was read before it was current, once a frame: fixed by `VICTORY_PLANE_NOW=1`,
  set by the launcher; two compute passes make NaNs: ambient occlusion and a far-depth downsample, being traced).
- Freezes at scene loads are much rarer with `VICTORY_SOFT_VIEWS=copies` (in the launcher), not gone: the
  title's own direct mapping calls still map every page, and all of it gets slower when free RAM falls under
  about 3 GB (the title and the layer commit 31-34 GB). Close other programs before playing on a 32 GB PC.
  `tools/docs/freeze-analysis.md`.
- The memory hooks (`-Hooks`) can draw a few small textures with old contents until their own check catches it
  (4-11 in a 6-minute run; the title writes the pages through a second view). Off by default until fixed.
- Heavy scenes sit at 16-21 fps, and driving in the open world drops lower (50-90 ms a frame at 9-12 thousand
  draws): there the title's five recording threads are the limit, each bind costing about 22 us in the layer.
  On lighter scenes the layer's submitting thread is the limit (`VICTORY_REFRESH_STALE=1` is verified exact but
  gains no time yet).
- Meshes can stretch for a second or two in busy scenes (cause not found).
- Ray tracing (`-RayTracing`) is off by default: sharper and better lit, but the card then needs about 84 ms a
  frame (`tools/docs/rt-parked-T.md`).
- Texture pop-in remains, less than before; the card reaches 14-15 GB of 16 in long sessions.
- Started without the launcher (or with `-NoPrecompile`) on an empty shader cache, a first run can show missing
  or black faces; the launcher's prepare-ahead step avoids that.
- In Series X mode the title always renders at 2560x1440 and upscales to 3840x2160 itself.
- Two pipeline creation methods are not implemented (the title falls back to ordinary containers).
- Fixed since the last state: a crash (a use after free in a meter thread that runs with the hooks).

## Where things are

- `Play-Scarlett.cmd`, `scripts/play-scarlett.ps1`: the launcher.
- `tools/docs/picture-settings-checklist.md`: every picture setting against another cool_fox build's.
- `tools/`: the measuring scripts (`run-auto-coolfox.sh`: hands-off run with watchdog; `run-compare.sh`,
  `run-freezes.sh`, `run-focus.sh`), notes (`tools/docs`: what was measured, tried and rejected; `fox-port-*.md` list
  every ported switch; `cool-fox-willy-review.md` and `left-out-audit.md`: a settings audit and what the layer
  leaves out or approximates), `tools/baseline-coolfox/README.md` (the floor and how to compare against it).
- The older Scarlett tree (soldsawn/victory-nvidia-8gb base) is on branch `scarlett`.

The base's own README follows.

---

# VIctory on an RX 7900 XTX

## Run the codec_d Windows build

Download and extract the Windows x64 ZIP from the private releases. Open PowerShell in the extracted folder and point the launcher at your own complete Xbox dump.

```powershell
$env:VICTORY_GAME_DIR = 'D:\Games\MyDump'
.\Play-VIctory.cmd pareto-residency
```

The launcher selects Series S and the RTX-tested residency settings. It builds its shader cache locally under `%LOCALAPPDATA%\VIctory\cache-pareto`. Set `VICTORY_CACHE_DIR` to reuse an existing cache outside the checkout. Windows x64, an AVX2 CPU, and a Direct3D 12 GPU with shader model 6.6 and mesh shader support are required.

To build from this checkout, install the pinned Rust toolchain and the MSVC C++ build tools with a Windows SDK, then run `cargo build --release --locked -p victory`. The same launcher finds `target\release\victory.exe`. The sections below describe the upstream AMD fork and its separate launcher.

A fork of VIctory, a compatibility layer
that runs an Xbox Series title natively on Windows from files the user supplies.
This one is about **speed on AMD RDNA 3**: the world at 30 frames a second on
one PC, without giving up the picture. It is not there yet.

**This repository contains no game files, code or assets.** You need your own
copy of the game. It is not affiliated with or endorsed by the game's developer
or publisher.

## Where it stands (2026-11-25)

Tested on one machine only: Windows 11, Intel i9-12900K, 64 GB RAM, Radeon
RX 7900 XTX, 1440p, the Series X profile.

| | |
|---|---|
| Menus, videos, loading screens | 30 fps |
| Prologue, indoors | 50-75 ms a frame (13-20 fps) |
| First mission with the boat | 46-53 ms (19-22 fps) |
| Street chase with many cars and people | 100-165 ms (6-10 fps), single frames far longer |
| Outdoors on foot, the camp | 60-90 ms |
| Flying | 42-57 ms |
| Longest session so far | 41 minutes, no crash |
| Memory | 40-46 GB of private memory: **64 GB of RAM recommended** |

It started at 280 ms a frame in the same scenes two days earlier.

What is known to be wrong:

- Trees, plants and far buildings flicker outdoors in some places.
- Rooms with little direct light are too dark without `-RayTracing`.
- Textures of what just came into view appear late while the title streams.
- The first run with a new driver or a new build stutters while the driver makes
  pipelines (`victory warm` makes them ahead).
- Recording a frame in the world makes the title's own watchdog end it.

## How to run it

You need Windows 10/11 x64, a CPU with AVX2, a Direct3D 12 GPU with shader
model 6.6 and mesh shaders, Rust (the toolchain is pinned), the MSVC build
tools, and your own dump of the title.

```powershell
git clone https://github.com/avatarmanz/VIctory-7900XTX
cd VIctory-7900XTX
copy victory.example.toml victory.toml      # then set your paths, outside this folder
cargo build --locked --profile diag -p victory --features diagnostics
scripts\play.ps1 -Exe 
```

`scripts\play.ps1 -Safe` leaves out the newest, faster ways; try it first when
something is wrong. `-RayTracing` turns the title's ray-traced indirect light on.

Before the first run, ahead of time (both can be stopped and go on later):

```powershell
target\diag\victory.exe shaders    # every shader translated, minutes
target\diag\victory.exe warm --used                     # pipelines earlier runs drew with, for a new driver or build
```

Commands, debugging switches and upstream's own description:
docs/README-fxceless.md. Every `VICTORY_...` switch is
described in a comment where it is read.

## What is different here

In short; the reasons and the measurements are in docs/findings.md.

- **List calls are written down, not carried out, on the title's threads**
  (`VICTORY_THIN`): eight threads of ours translate them.
- **Submissions are prepared by a thread of ours and joined**
  (`VICTORY_ASYNC_SUBMIT`, `VICTORY_JOIN_PARTS`), with what can be spread over
  threads spread: refreshes, compares (AVX2), descriptor records, landings.
- **What shaders wrote comes back beside the write guards**, by the dwords that
  changed, on a thread of its own (`VICTORY_RELAY`, `VICTORY_LAND`).
- **Buffer fills that need bytes still on the card are done on the card**
  (`VICTORY_CARD_STEPS`) instead of waiting for it.
- **The title's writes are caught more cheaply**: one view opened at a fault,
  blocks that rest, places in the title's code that look before they write.
- **Textures go up on a copy queue of their own** and a slot shows one only after
  its upload ran, which also ended a device loss that came every 15 minutes or so.
- **Boats float**: textures that shaders write and the title's CPU reads go back
  to title memory (from fxceless and Geckomacabre, on by default here).
- **Frame record and replay** with per-pass times and shader variants compared
  turn by turn (docs/replay.md).

## Credits

This is a tree of other people's work with more on top. The history is kept, and
commits taken from elsewhere name the commit and its author.

- **VIctory** by Marvisak and its
  contributors: the loader, the runtime services, the Direct3D 12 back end and
  the shader recompiler.
- **fxceless/victory-fork**: the fork
  this one started from, and the people whose pull requests it carries.
- **DexNom/VIctory**: ray tracing fixes,
  cube gradients, sparse textures.
- **Belobug/VIctory-Belobug-AMD**:
  the ambient light idea, pipeline workers, and work by romainhedouin.
- **FQY55kai/ZJOU-VICTORY**.
- **myokex/victory-amd**: the guard over
  every view of a page (with Spexivus, joroyt and tightfall), and Joshua Odom's
  reads into title memory.
- **Geckomacabre** and **cxy0072019-sketch**: the texture read-back.
- **XCL** (GPL-2.0-only) was read for how the same
  title behaves under another layer; no code of it is here.
- This fork's changes were made with [Claude Code](https://claude.com/claude-code).

## License

GPL-3.0-or-later, as VIctory. See LICENSE; the one file that is not
covered is named in docs/asset-policy.md.
