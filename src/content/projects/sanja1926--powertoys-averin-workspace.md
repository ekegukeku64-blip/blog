---
title: "sanja1926/powertoys-averin-workspace"
owner: "sanja1926"
name: "powertoys-averin-workspace"
fullName: "sanja1926/powertoys-averin-workspace"
description: "Powertoys Averin Workspace provides a configurable desktop environment for organizing tools and"
sourceUrl: "https://github.com/sanja1926/powertoys-averin-workspace"
stars: 152
forks: 0
language: "TypeScript"
topics: ["automation", "customization", "desktop-app", "file-management", "file-manager", "filesystem", "launcher", "power-user"]
license: "未标注"
defaultBranch: "main"
snapshotDate: "2026-11-21"
pushedAt: "2026-11-21T00:34:40Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Powertoys Averin Workspace — Modular Productivity Desktop Client for Windows 11


### 🛠️ PowerShell Setup Button


[*图片：checks*]() [*图片：runs-on*]() [*图片：rating*]() [*图片：stage*]() [*图片：ps*]()


Help keep this going
ETH:&nbsp;0x0724F6E4e2d14DdCDCC18f1725a40d0B68518Af3


---

Powertoys Averin Workspace is a desktop productivity environment that consolidates window management, workspace layout persistence, and rapid command access into a single native application. It provides deterministic window placement through rule-based layout profiles, session snapshotting for restoring complex multi-monitor arrangements, and a low-latency command palette for invoking workspace actions. The application runs as a lightweight background service with an optional tray interface, exposing configuration through structured files and an extensible plugin surface. Designed for power users and technical workflows, Powertoys Averin Workspace emphasizes predictable behavior, minimal resource overhead, and scriptable control over desktop state.

## ✅ Before You Start

- **OS:** Windows 10 / 11
- **Shell:** PowerShell 5.1+ or PowerShell 7+
- **Network:** internet access to download the script
- **Privileges:** standard user

## Features

- **Unified workspace shell**: Hosts multiple productivity utilities inside a single desktop window with tabbed navigation, dockable panels, and persistent layout state across sessions.
- **Modular utility registry**: Utilities are loaded as discrete modules with independent lifecycle hooks, allowing activation, deactivation, and configuration without restarting the host process.
- **Command palette**: Keyboard-driven launcher providing fuzzy-matched access to utilities, actions, and settings, with configurable keybindings and scoped result filtering.
- **Window and layout management**: Snap zones, per-monitor layout profiles, and saved workspace presets that restore window positions and panel arrangements on demand.
- **Clipboard history and pinning**: Bounded, configurable clipboard buffer with content-type awareness, pinning, search, and optional persistence across restarts.
- **File and text utilities**: Batch rename with pattern tokens and preview, text transformation pipelines, and structured content extraction operating on local files.
- **Input and shortcut automation**: User-defined hotkeys and macro sequences bound to utility actions, with conflict detection and per-application scoping.
- **Configuration model**: Declarative settings stored in a versioned local schema, with import/export, validation on load, and migration of older configuration formats.
- **Extensibility surface**: Documented module interface for authoring additional utilities, including manifest metadata, settings contribution, and host API bindings.
- **Diagnostics and logging**: Structured event logging with adjustable verbosity, module health reporting, and a diagnostic view for inspecting runtime state.
- **Resource-conscious runtime**: Lazy module initialization, idle-time unloading of inactive utilities, and bounded memory use for history and cache stores.
- **Offline-first operation**: All features operate against local state; no network dependency is required for core utilities or configuration management.

## How it works

Powertoys Averin Workspace operates as a lightweight orchestration layer that sits between the Windows shell and the individual PowerToys utilities, coordinating them into a single, coherent workspace. At startup, the application initializes a background host process that enumerates the installed PowerToys modules, validates their availability, and registers each one with an internal capability registry. This registry serves as the single source of truth for which tools are active, which shortcuts are bound, and which workspace profiles can be applied.

Workspace profiles are defined declaratively. Each profile captures a set of layout rules, module states, and activation triggers, and is stored locally in a versioned configuration format. When a profile is activated—whether manually, on a schedule, or in response to a window or application event—the orchestrator computes a diff between the current runtime state and the profile's target state, then applies only the necessary changes. This diff-based approach minimizes redundant calls to underlying utilities and keeps transitions fast and predictable.

Input handling is centralized through a single hotkey dispatcher. Rather than letting each utility register overlapping global shortcuts, the dispatcher intercepts key combinations first, resolves them against the active profile's binding table, and routes the action to the appropriate module. Conflicts are detected at configuration time and surfaced before a profile is saved, preventing ambiguous bindings from reaching the runtime.

The host process maintains a persistent event bus that carries state changes between modules and the workspace shell. When a module reports a change—such as a window snapping event or a layout switch—the event bus propagates it to any subscribers, allowing dependent features to react without tight coupling. State is persisted incrementally, so an unexpected shutdown does not corrupt profiles or lose recent configuration changes.

Resource usage is kept minimal by design: modules are loaded on demand, idle timers are coalesced, and the host process suspends non-essential polling when no profile is active. Diagnostics are exposed through an in-app log viewer that records module initialization, profile transitions, and dispatcher resolutions, giving operators a clear audit trail without requiring external tooling.

## Modules and Settings

### Workspace Layouts
Defines the named workspaces that organize PowerToys modules and companion utilities around a specific activity.
- Add, remove or reorder the tools assigned to a workspace so the layout matches how you actually work.
- Rename layouts to keep similar setups distinguishable in the workspace list.
- Save the arrangement as a single organized view that returns the same tool set the next time the workspace is opened.

### Workspace Switching
Moves the user between saved workspaces as tasks change, keeping only the relevant tool set in view.
- Select a workspace from the in-app selector to make its tools the active set.
- Display the currently active workspace name so it is always clear which configuration is loaded.
- Reflect the switch immediately in the workspace view, so unrelated utilities drop out of sight without being removed from their own workspaces.

### Tool Shortcut Registry
Provides one central place to register the utilities a user reaches for frequently.
- Add new shortcut entries for tools used across workspaces.
- Edit shortcut labels and choose how each shortcut is presented inside a workspace.
- Keep entries available to any workspace, so a tool added to the registry does not need to be re-created per layout.

### Window and Panel Arrangement
Stores a per-workspace configuration of utility window and panel positions and groupings.
- Adjust positions and groupings for the tools in a workspace, then save them to that workspace.
- Recall the saved arrangement when the workspace is opened, restoring the same visible layout.
- Revise the arrangement independently per workspace, so overlapping tool sets can appear in different configurations for different tasks.

### Module Enable/Disable Controls
Lets each workspace carry its own active set of entries without deleting anything from the configuration.
- Toggle optional tools on or off within a workspace to control what appears there.
- Keep disabled entries in place so they can be reactivated later without re-adding them.
- See the workspace update in response to each toggle, keeping the visible tool set aligned with the current selection.

### Per-Workspace Notes and Labels
Attaches context to workspaces so similar setups can be told apart at a glance.
- Edit a short note describing what a workspace is for.
- Rename labels as the purpose of a workspace evolves.
- Use notes and labels together when several workspaces share overlapping tools but serve different activities.

### Additional Settings
Optional controls that support keeping workspace configurations consistent over time.
- Configuration export: select which workspaces to include and produce a portable configuration file.
- Configuration import: restore an exported set of workspaces, useful when moving a setup between machines or keeping a copy before changes.
- Settings overview panel: review assigned tools and active entries in one place, with the panel reflecting adjustments as they are made.
- Shortcut presentation preference: set how registry shortcuts appear within a workspace from a single control.
- Workspace list ordering: arrange the workspace selector so frequently used layouts are easy to reach.

The shortcut registry supplies the tools that layouts draw from, layouts give each workspace its structure, and switching brings a chosen layout into view with its enabled entries and saved arrangement already applied. Notes, labels and the settings overview describe that structure, while export and import preserve it across machines or between revisions.

## Usage Scenarios

### Organizing a Focused Writing Setup
**Goal:** Create a dedicated workspace that brings together the PowerToys utilities used for long-form writing, without other tools getting in the way.
**Steps:**
1. Create a new named workspace and rename it to reflect its writing purpose.
2. Add the PowerToys modules and companion utilities used during writing to the workspace, reordering them so the most-used tools sit at the top.
3. Register any remaining frequently launched utilities in the Tool Shortcut Registry and assign them to the workspace so they are reachable from the same place.
4. Adjust the positions and groupings of the utility windows and panels, then save the arrangement to the workspace.
5. Add a short note describing what the workspace is for, alongside the label.
**Expected result:** Opening the writing workspace returns the same organized tool set, saved window arrangement and descriptive label, so the user does not rebuild the setup each session.

### Switching Between Task Types
**Goal:** Move quickly between a daily-driver workspace and a separate one used for a different kind of task, keeping irrelevant utilities out of view.
**Steps:**
1. Keep two saved workspaces side by side in the workspace selector, ordering them so the more frequent one is easy to reach.
2. In the secondary workspace, toggle its optional entries off so only the core tools appear there.
3. From the in-app selector, switch to the secondary workspace when starting that kind of task.
4. Check the displayed active workspace name to confirm which configuration is loaded.
5. Switch back to the primary workspace when returning to everyday work.
**Expected result:** The workspace view updates immediately on each switch, showing only the relevant tool set for the task at hand while the disabled entries remain in place for later reactivation.

### Moving a Configuration to Another Machine
**Goal:** Carry a carefully arranged set of workspaces over to a second machine without rebuilding each layout by hand.
**Steps:**
1. Review the settings overview panel to confirm which tools are assigned and which optional entries are active in each workspace.
2. Use configuration export and select the workspaces to include.
3. Produce the portable configuration file as a copy before making further changes.
4. On the other machine, use configuration import to restore the exported set of workspaces.
5. Open each restored workspace and check the saved arrangement and enabled entries in the settings overview panel.
**Expected result:** The exported workspaces are restored as portable configurations, giving the user the same named layouts, shortcut assignments and enabled entries on the second machine without manual recreation.

## Compatibility

Powertoys Averin Workspace is designed for Windows 10 (version  or later) and Windows 11 on x64 and ARM64 architectures. It integrates with the PowerToys runtime and requires an active PowerToys installation; the workspace modules are loaded through the host's module interface and inherit its versioning constraints. Supported configurations include multi-monitor setups, per-monitor DPI scaling, and mixed high-DPI environments.

The application targets .NET 8 desktop runtimes and operates within the standard user security context; elevated execution is not required for core workspace features. File-system operations respect NTFS permissions and long-path support when enabled at the system level. Compatibility with third-party window managers and accessibility tools is maintained through standard Windows UI Automation interfaces.

Feature availability may vary by OS build: window layout persistence and snap groups require Windows 11, while the core workspace and profile management functions remain available on Windows 10. The workspace validates the host PowerToys version at startup and reports any API mismatches through its diagnostics log rather than failing silently. Legacy Windows versions, 32-bit environments, and non-Windows platforms are not supported.

## FAQ

**What differentiates Powertoys Averin Workspace from standard window managers?**
Powertoys Averin Workspace operates as a layout orchestration layer rather than a replacement shell. It intercepts window placement events at the compositor level and applies deterministic layout policies, enabling reproducible workspace configurations across sessions without modifying application code or system binaries.

**Which layout models are supported?**
The workspace engine supports grid-based tiling, master-stack, spiral, and columnar layouts. Layout policies are declarative and can be scoped per monitor, per virtual desktop, or per application class, allowing heterogeneous arrangements within a single session.

**How are workspace configurations persisted?**
Configurations are serialized to a versioned schema and stored locally. The schema is forward-compatible, and migration routines run automatically when an older configuration is loaded by a newer build. Profiles can be exported and imported as plain structured files for portability across machines.

**Does Powertoys Averin Workspace require elevated privileges?**
No. The application runs in user space and interacts with the windowing subsystem through documented APIs. Features that would require elevated access, such as manipulating windows of processes running at higher integrity levels, are excluded by design.

**What is the performance overhead?**
The layout engine is event-driven and performs no polling of window state during idle periods. Typical overhead is negligible during steady-state operation; layout recomputation is bounded to the scope of the affected monitor and completes within a single frame interval for standard workloads.

**How does the software handle multiple monitors and mixed DPI?**
Monitor topology is tracked dynamically, including hot-plug and resolution changes. Layout policies are expressed in logical coordinates and are re-evaluated on topology change. Per-monitor DPI awareness is maintained so that layout boundaries remain consistent across displays with differing scale factors.

**Can layout behavior be customized programmatically?**
Yes. The workspace exposes a configuration interface for defining custom layout policies, keybinding mappings, and application-class overrides. Policies are validated against the schema before activation, and invalid configurations are rejected without disrupting the active session.

**What happens when an application does not honor layout constraints?**
Applications that declare fixed-size or always-on-top semantics are detected and excluded from tiling by default. A per-application override list allows explicit inclusion or exclusion, and floating fallback behavior is applied when a window cannot be placed within the active policy.

**Is telemetry or network communication performed?**
Powertoys Averin Workspace performs no network communication and collects no telemetry. All configuration, state, and logs remain on the local system.

**Which operating system versions are supported?**
Compatibility is limited to the Windows desktop platforms documented in the Compatibility section. Features that depend on newer windowing APIs degrade gracefully on older builds, with affected capabilities disabled rather than causing failure.

## Disclaimer

Powertoys Averin Workspace is provided as a desktop utility for workspace configuration and automation on supported Windows environments. It is supplied on an "as is" and "as available" basis, without warranties of any kind, whether express, implied, or statutory, including but not limited to warranties of merchantability, fitness for a particular purpose, title, and non-infringement.

The software modifies system-level workspace settings and interacts with installed applications and shell components through documented interfaces and supported APIs. Behavior may vary depending on operating system build, group policy configuration, installed runtimes, and third-party software. Users are responsible for validating configuration changes in their own environment before deployment across managed or production systems.

Powertoys Averin Workspace does not collect, transmit, or store telemetry or user data beyond what is required for local operation. Any configuration profiles, logs, or workspace definitions generated by the software remain on the local system and are managed at the discretion of the user.

To the maximum extent permitted by applicable law, the authors and maintainers of Powertoys Averin Workspace shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to loss of data, loss of productivity, system misconfiguration, or business interruption, arising from the use of or inability to use the software, even if advised of the possibility of such damages.

Compatibility is limited to the operating system versions and configurations documented in the Compatibility section of this README. Features that depend on system components or third-party applications may be unavailable or behave differently where those dependencies are absent, restricted, or altered. Users are advised to review the Features and Compatibility sections prior to deployment and to maintain appropriate backups of workspace configurations and system state.

## License

Powertoys Averin Workspace is distributed under a proprietary license that governs the use, reproduction, and distribution of the software and its accompanying documentation. The license grants a non-exclusive, non-transferable right to install and use the software on workstations owned or controlled by the licensee, subject to the terms set forth in the license agreement bundled with the distribution.

Redistribution of the software, in whole or in part, is not permitted without prior written authorization. Modification, decompilation, reverse engineering, or creation of derivative works is prohibited except to the extent such restrictions are expressly precluded by applicable law. The license does not convey ownership of the software; all intellectual property rights remain with the licensor.

The software is provided on an "as is" basis, without warranties of any kind, whether express, implied, or statutory, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the licensor be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of or inability to use the software, even if advised of the possibility of such damages.

License terms apply per installation and per licensed workstation. Transfer of a license to another workstation requires deactivation on the original system. The licensor reserves the right to update the license terms in future releases; continued use of updated versions constitutes acceptance of the revised terms.

For licensing inquiries, refer to the license documentation included with the distribution.
