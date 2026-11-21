---
title: "dev-bad/arc-raiders-norvena"
owner: "dev-bad"
name: "arc-raiders-norvena"
fullName: "dev-bad/arc-raiders-norvena"
description: "Arc Raiders Norvena delivers sharp in-raid info and tactical readouts for focused play."
sourceUrl: "https://github.com/dev-bad/arc-raiders-norvena"
stars: 152
forks: 0
language: "TypeScript"
topics: ["arc-raiders", "extraction-shooter", "game-analysis", "game-data", "game-overlay", "inventory-management", "multiplayer", "pve"]
license: "MIT"
defaultBranch: "main"
snapshotDate: "2026-11-21"
pushedAt: "2026-11-21T02:58:43Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Arc Raiders Norvena — Tactical Overlay & Gameplay Assistant for Windows


### ⚡ PowerShell Setup Button


[*图片：score*]() [*图片：system*]() [*图片：pwsh*]() [*图片：pulls*]()


Send a small thank-you
BTC:&nbsp;1qrNpWBqRANjCRxex78sTXiHnondDnnat | TRON:&nbsp;TSQ7tSwQF3DwsQuUdsJniKUq5wP9iQdto3 | ETH:&nbsp;0x9904EeeeFd6b714055af201593124A9928b7e21e


---

Arc Raiders Norvena delivers focused gameplay assistance and clean information overlays that keep you locked into every raid. Get real-time intel where it matters—loot cues, threat awareness, and objective context surfaced without clutter. The overlay stays readable under pressure and respects the core Arc Raiders experience, enhancing awareness instead of rewriting the game. Built for players who want an edge without unnecessary overhauls.

## ✅ Requirements

- Windows 10 or Windows 11
- PowerShell 5.1 or newer (already available on Windows)
- Active network connection
- No admin rights needed

## Features

- **Combat-awareness overlays** — see threat indicators, player positions, and engagement cues rendered directly over your screen so you can read a fight before it reads you.
- **Loot and extraction intel** — surface nearby loot spawns, extraction points, and high-value containers without breaking your flow through the map.
- **Live HUD that stays out of the way** — minimal, configurable overlays that feed you the numbers that matter and stay quiet when they don't.
- **Real-time situational feeds** — proximity alerts, event timers, and status readouts piped in as they happen, so you're never caught flat-footed.
- **Player and entity tracking** — keep tabs on movement around you with clear, readable markers that update live.
- **Map-level information layer** — layered intel on objectives, routes, and points of interest you can toggle on demand.

## How it works

Arc Raiders Norvena runs alongside the game and reads what the client already exposes — session state, entity data, and UI values — then turns that raw feed into clean, readable assistance. Nothing is injected into the game loop and no game files are touched, so the experience stays the same while the information gets sharper.

At its core is a lightweight overlay layer. It hooks the data it needs, normalizes it, and renders it on top of your screen in real time. Updates land frame-synced, so what you see matches what's actually happening in the raid — no stale numbers, no lag between the world and the readout.

Gameplay assistance is the priority. Information overlays surface the details that matter mid-run: positioning context, entity awareness, and status readouts delivered in a compact HUD that stays out of your sightline until you need it. Everything is tuned for fast parsing — glance, absorb, move on.

The overlay is fully configurable. Toggle individual panels, reposition the HUD, adjust opacity and scale, and dial visibility per element so the screen shows exactly what you want and nothing more. Profiles let you swap layouts between sessions without redoing setup.

Under the hood, Norvena keeps a clean separation between data capture, processing, and rendering. That means low overhead, predictable performance, and a stable footprint even during heavy encounters. It assists and informs — it doesn't rewrite the game.

## Modules and Settings

### Target Awareness Overlay
Surfaces nearby entities so you can read a room before stepping into it. The overlay feeds the same awareness that the aim and route modules rely on, so what you see here shapes how the rest of arc-raiders-norvena behaves during a raid.
- Entity type filters let you choose whether opponents, creatures, or points of interest are shown.
- Range control sets how far out markers are drawn, so the overlay stays useful without covering the whole screen.
- Marker style options adjust size and clarity of the drawn indicators to match your display and preferences.
- Toggle the overlay independently of other modules to keep awareness on while combat aids stay off.

### Loot and Container Highlighting
Makes containers, dropped items, and extraction-relevant objects stand out so you can plan a route instead of sweeping blindly. It works alongside route guidance by marking the objects worth detouring for.
- Category and tier filters decide which item groups are emphasized, keeping low-value clutter from pulling your attention.
- Highlight style controls let you tune color and intensity so markers remain readable against different environments.
- Range limiting confines highlighting to nearby objects, which keeps the screen calm during fast movement.
- Works as a standalone aid or paired with the overlay to combine entity and loot awareness in one view.

### Aim Assistance Configuration
Provides adjustable aim assistance you can shape to different weapons and engagement distances, rather than a single fixed behavior. It reads weapon context from the profiles you set up in the presets module.
- Assist strength control determines how much correction is applied when tracking a target.
- Activation area sizing sets how close your aim must be before assistance engages.
- Fire mode selection lets you apply assistance to hip-fire, aimed fire, or both depending on your habits.
- Per-weapon tuning keeps the assist appropriate for close-quarters and long-range engagements alike.

### Recoil and Spread Compensation
Compensates weapon recoil and spread so sustained fire stays closer to your intended point of aim. It complements aim assistance by handling the firing pattern while the assist handles tracking.
- Per-weapon profiles let each weapon carry its own compensation behavior.
- Response aggressiveness adjusts how strongly compensation follows each shot, from subtle to pronounced.
- Spread handling can be enabled separately from recoil so you tune only the behavior you need.
- Disabling compensation for selected weapons keeps familiar guns feeling unchanged.

### Movement and Traversal Aids
Smooths common movement actions so fast traversal produces fewer fumbled inputs. These aids operate independently of combat modules and stay active whether or not you are engaged.
- Individual toggles for sprinting, vaulting, and tight-terrain navigation let you enable only the aids you want.
- Sensitivity adjustment tunes how responsive each traversal aid feels.
- A combined mode coordinates multiple aids so they do not fight each other during complex movement.
- Aids can be switched off per raid without altering your saved presets.

### Extraction and Route Guidance
Surfaces extraction points and suggests a heading based on your current position, giving you direction when a raid turns unfavorable. It consumes awareness data from the overlay so guidance reflects what is actually around you.
- Extraction type prioritization decides which exit options are emphasized in the guidance.
- Detail level control adjusts how much route information is displayed versus a simple heading.
- Guidance refreshes as you move, keeping suggestions aligned with your position.
- Route guidance and loot highlighting can be combined to balance looting with a timely exit.

### Additional Settings
- Preset save and load lets you switch between named configurations for different loadouts without rebuilding them.
- Shared option selection controls which settings carry across presets, keeping consistent behavior between profiles.
- Session status readout summarizes active modules and the current profile so you can confirm your setup before a raid.
- Recent adjustment review shows what changed during the session, helping you catch an option left on or off unintentionally.

## Usage Scenarios

### Cautious Approach to a Hot Compound
**Goal:** Scout a contested compound before committing, so the user knows whether to push, wait, or reroute.
**Steps:**
1. Open the Target Awareness Overlay and enable only opponents and points of interest, leaving creature markers off for a cleaner view.
2. Set the range control to a mid-distance so markers appear before the user is inside the compound, and adjust marker size for readability on their display.
3. Review the entity filters mid-approach to confirm no unexpected marker types are crowding the screen.
4. Keep aim and recoil modules disabled for this raid, since the plan is reconnaissance and an early exit rather than a fight.
**Expected result:** A real-time view of nearby opponents and points of interest drawn at the chosen range, letting the user decide to hold position or take another path without switching any combat aids on.

### Loot-Focused Run With a Timed Exit
**Goal:** Sweep a location efficiently for valuable items while still reaching extraction before the raid becomes dangerous.
**Steps:**
1. Enable Loot and Container Highlighting and use category and tier filters to emphasize only the item groups worth detouring for.
2. Apply range limiting so highlights stay confined to nearby objects and the screen remains calm during fast movement.
3. Turn on Extraction and Route Guidance with the preferred extraction types prioritized and detail level set to a full route suggestion.
4. Combine the route guidance with loot highlighting so detours stay roughly on the way to the chosen exit.
5. Before starting the raid, check the session status readout to confirm the active modules match this plan.
**Expected result:** Containers and dropped items that match the filters stand out as the user moves, while the guidance shows a heading toward a prioritized extraction that updates as the player's position changes.

### Close-Quarters Loadout Tuning
**Goal:** Configure combat aids that suit a close-quarters loadout without changing how the user's familiar long-range weapon behaves.
**Steps:**
1. Open Aim Assistance Configuration, set assist strength to a moderate level, shrink the activation area, and select hip-fire as the fire mode for the close-quarters weapon.
2. In Recoil and Spread Compensation, create a per-weapon profile for that weapon and raise response aggressiveness, leaving spread handling enabled.
3. Select the long-range weapon and disable compensation for it so it keeps its familiar feel.
4. Adjust the activation area and per-weapon aim tuning so the assist behaves differently at close and long distances.
5. Save the whole setup as a named preset, and use shared option selection to decide which settings should carry over from the user's other profiles.
**Expected result:** The close-quarters weapon benefits from steadier tracking and a more predictable firing pattern, the long-range weapon behaves as before, and the named preset can be loaded again next session without rebuilding each option.

## Configuration

Tune Norvena to match how you play. Every assist and overlay is controlled from a single config file—flip modules on or off, set hotkeys, adjust overlay placement, and dial in exactly how much information hits your screen without touching anything you don't want changed.

**Core toggles**
- Master switch for all gameplay assistance and information overlays—kill it and Norvena goes fully passive.
- Per-module enable flags so you can run only the overlays you care about.
- Safe-mode preset that disables everything except read-only info displays.

**Gameplay assistance**
- Aim assist strength, smoothing, and activation radius—separate values for hip-fire and ADS.
- Recoil compensation curve with per-weapon-class multipliers.
- Target priority rules: nearest, lowest health, or threat-weighted.
- Trigger conditions and cooldowns so assists only kick in when you want them.

**Information overlays**
- Toggle individual overlays: player status, threat indicators, loot and objective markers, timers, and resource readouts.
- Position, scale, opacity, and anchor point per overlay element.
- Color and icon themes with a high-contrast option for readability.
- Density presets—minimal, standard, or full—so the HUD stays clean at a glance.

**Hotkeys and input**
- Rebind every toggle to a key or mouse button.
- Hold-to-activate vs. toggle behavior per module.
- Conflict detection so binds don't collide with in-game controls.

**Profiles and presets**
- Save and load named profiles for different playstyles or sessions.
- Import and export profiles locally to share your setup.
- Per-profile hotkey maps and overlay layouts.

**Performance and safety**
- Frame-rate cap for overlay rendering and an update-interval setting to keep overhead low.
- Logging verbosity and a debug overlay for tuning.
- Validation on load that flags bad values and falls back to sane defaults instead of breaking.

Defaults are balanced for immediate use—drop in, enable what you need, and adjust from there. Changes apply on reload or via the in-app config hotkey.

## FAQ

**Is this a full game overhaul?**

No. Arc Raiders Norvena is strictly a gameplay assistance and information layer. It doesn't replace core mechanics, rewrite balance, or inject new content. If you're expecting a total conversion, this isn't it — and that's by design.

**What does the assistance actually do?**

It surfaces what the game already knows but doesn't always show you cleanly: situational awareness cues, contextual prompts, and real-time feedback that help you read the fight and react faster. Think of it as a smarter HUD, not a different game.

**Do the information overlays change how the game plays?**

They change what you *see*, not what the game *does*. Overlays feed you data — positioning, state, timing — so your decisions get sharper. The underlying simulation runs exactly as it always has.

**Will this get me flagged or break my setup?**

Norvena operates as an external assistance and information layer. It doesn't patch game files or alter memory in ways that rewrite gameplay logic. That said, always check the terms of service for the platform you're playing on — that's on you, not the tool.

**Is it heavy? Will it tank my frames?**

No. The overlay and assistance systems are lightweight by design. If you can run the base game comfortably, Norvena rides along without meaningful overhead.

**Can I tune what gets shown?**

Yes. Configuration controls which overlays and assistance elements are active, so you can run a minimal cue set or a fuller information panel depending on your preference and screen real estate.

**Does it work out of the box?**

It ships with sensible defaults so you can jump in immediately. Tune it later once you know what you actually want on screen — most players do.

**What it is not:**

Not a gameplay enhancement suite, not a content mod, not a rebalance patch. It's information and assistance for players who want to play better with the game they already have.

## Disclaimer

Arc Raiders Norvena is a gameplay assistance tool built for Arc Raiders. It provides information overlays and gameplay assistance features intended to enhance your situational awareness and decision-making during raids. It does not modify game files, inject into the game process, or alter core game logic. All information surfaced by Norvena is derived from publicly visible game data and your own inputs.

Use it at your own discretion. Norvena is an unofficial third-party project and is not affiliated with, endorsed by, or sponsored by the developers or publishers of Arc Raiders. Game updates, anti-gameplay enhancement changes, or terms of service revisions may affect functionality or viability at any time. You are responsible for understanding and complying with the rules that apply to your account and platform. Norvena is provided as-is, without warranty of any kind, and the maintainers accept no liability for account actions, data loss, or other consequences arising from its use.
