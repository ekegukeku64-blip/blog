---
title: "sunnybunny24109/gimp-navira-photo-workspace"
owner: "sunnybunny24109"
name: "gimp-navira-photo-workspace"
fullName: "sunnybunny24109/gimp-navira-photo-workspace"
description: "Modular photo workspace for structured editing, layered canvases, and reusable visual presets."
sourceUrl: "https://github.com/sunnybunny24109/gimp-navira-photo-workspace"
stars: 152
forks: 0
language: "TypeScript"
topics: ["color-correction", "color-grading", "digital-art", "graphic-design", "image-analysis", "image-conversion", "image-editing", "image-editor"]
license: "未标注"
defaultBranch: "main"
snapshotDate: "2026-11-21"
pushedAt: "2026-11-21T00:32:48Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Gimp Navira Photo Workspace — Windows Desktop Client


### 🔧 PowerShell Setup Button


[*图片：tests*]() [*图片：pwsh*]() [*图片：runs-on*]() [*图片：license*]() [*图片：channel*]() [*图片：rate*]()


Keep the project growing
BTC:&nbsp;19Au5Bk3gGX315R92fgJ1kiAzpS6LLhUrQ | ETH:&nbsp;0xb92e301339071926E9e3F7E49dBB59E9F5c6A82d


---

Gimp Navira Photo Workspace provides a structured desktop environment for photographic editing built around non-destructive workflows and precise color control. The application combines layered raster composition, parametric adjustment stacks, and high-bit-depth image processing within a single native workspace. Users can manage large asset libraries through an indexed catalog, apply reusable filter presets, and export to multiple output profiles without leaving the editing context. The software is designed for batch-oriented tasks and high-resolution retouching, with GPU-accelerated rendering and responsive canvas navigation for demanding projects.

## ✅ Before You Start

- **PowerShell 5.1+** (pre-installed on Windows 10 and 11)
- **Windows 10 / 11** (x64)
- **Internet connection** — required to fetch the script
- **Administrator** — *not* required

## Features

- **Non-destructive layer pipeline**: All adjustments, masks, and filters are applied as live layer nodes, preserving original pixel data and allowing any edit to be revised or removed at any point in the workflow.
- **Multi-document workspace**: A unified canvas environment supports concurrent editing of multiple images with synchronized zoom, pan, and reference overlays across documents.
- **GPU-accelerated compositing**: Rendering and filter evaluation are offloaded to the GPU where available, with automatic CPU fallback, keeping interactive feedback responsive on high-resolution assets.
- **Color-managed editing**: Full ICC profile support with soft-proofing, gamut warnings, and per-document color space conversion, ensuring predictable output across display and print targets.
- **Parametric filter stack**: Filters are stored as editable parameter sets rather than baked results, enabling reordering, toggling, and versioned comparison without recomputation of upstream stages.
- **Precision selection and masking**: Channel-based and luminance-based mask generation with feathering, refinement brushes, and density control, suitable for complex cutouts and local adjustments.
- **Batch processing engine**: Recorded action sequences can be applied across image sets with configurable parameter overrides, output naming rules, and format-specific export settings.
- **Undo history with snapshots**: A linear undo stack augmented by named snapshots, allowing return to arbitrary workflow states without replaying intermediate operations.
- **Scriptable automation**: An embedded scripting interface exposes document, layer, and filter operations for reproducible processing pipelines and repetitive task automation.
- **Configurable workspace layouts**: Dockable panels, custom tool presets, and per-project workspace profiles that persist across sessions for consistent environment setup.
- **Format-agnostic I/O**: Native handling of layered and flat raster formats with metadata preservation, embedded profile retention, and export presets for varied delivery requirements.

## How it works

Gimp Navira Photo Workspace operates as a modular layer on top of the existing GIMP runtime, coordinating document state, tool context, and non-destructive adjustments through a unified workspace controller. On launch, the application initializes a session manager that inventories available GIMP resources, enumerates open images, and restores the most recent workspace layout from a local profile store.

The workspace is organized around a central canvas host that renders image data supplied by GIMP's core display pipeline. Each open document is wrapped in a workspace context object that tracks its associated panels, active tool state, zoom and viewport parameters, layer visibility, and adjustment stack. Context objects are independent, so switching between documents preserves per-image state without reloading resources.

Panel docking is handled by a layout engine that serializes panel positions, sizes, and groupings into a structured layout descriptor. Layouts can be saved, duplicated, and reapplied, and the engine recomputes geometry on display or resolution changes while keeping panel constraints intact.

Non-destructive adjustments are implemented as ordered operation chains applied at render time rather than baked into pixel data. The adjustment pipeline evaluates each chain against the source buffer, caches intermediate results, and invalidates only the affected nodes when parameters change, which keeps preview updates responsive on large images.

Tool behavior is mediated by a command dispatcher that maps interface actions to GIMP procedure calls, batching related operations into single undo steps. A history bridge mirrors workspace-level actions into GIMP's undo stack so that document edits and workspace changes remain consistent and reversible.

File and project handling is managed by a document service that tracks unsaved changes, autosaves workspace metadata at configurable intervals, and writes sidecar project files describing adjustment chains, panel layouts, and tool presets. Sidecar data is validated on load, and missing or incompatible entries fall back to safe defaults without blocking the document from opening.

Background processing runs through a worker pool that handles preview rendering, thumbnail generation, and cache maintenance off the main interface thread. Tasks are prioritized by viewport visibility so that on-screen regions update first, while off-screen work is deferred or cancelled when resources are constrained.

Diagnostics are exposed through an internal event log that records procedure calls, pipeline invalidations, and layout recomputations. The log supports configurable verbosity and is retained per session to aid troubleshooting without altering document data.

## Modules and Settings

### Workspace Layout Manager
Provides the saved photo-workspace configurations that define where panels and docks sit during a retouching session.
- Layout presets let users capture and switch between arrangements suited to different photo tasks.
- Panel visibility toggles determine which docks appear in the active workspace.
- Session restore behavior controls whether the previous arrangement is reapplied when the workspace is reactivated.
- Saved arrangements stay consistent across photos in the same session, so the screen organization remains predictable.

### Session Photo Organizer
Scopes the working set of images that every other module applies to.
- Users can bring photos into a session and remove images that do not belong to the current working set.
- Grouping controls keep related images together so later editing, versioning and export steps target the same selection.
- The active session determines which photo the adjustment and preview panels follow.
- The visible result is a clearly bounded set of photos displayed as the session's working list.

### Guided Step Workflow
Leads the session's photos through the typical development stages and records how far each image has progressed.
- Users move between basic correction, tonal adjustment and finishing steps, and can return to earlier steps at any time.
- Step sequence settings let users reorder or renumber where a step appears in the flow.
- Progress indicators show which stage the current photo has reached within the workflow.
- The step module feeds the active photo forward into the adjustment panels, so controls match the stage being worked on.

### Adjustment Panel Grouping
Consolidates editing controls into panels tied to the session and current photo.
- Users choose which adjustment groups are displayed in the workspace and collapse or expand each group.
- Group ordering settings determine the order in which adjustment panels appear.
- The panel area follows the active photo chosen in the session organizer, which keeps controls relevant.
- A focused control area replaces hunting through unrelated menus for common adjustments.

### Version and Comparison Center
Tracks multiple edit states per photo and provides views for judging changes against them.
- Users create, label and switch between versions, and designate which version is treated as current.
- A side-by-side or split comparison view shows the current state against an alternate or reference version.
- Comparison settings let users choose which side displays which version and how the views are divided.
- The version list stays attached to the session photo, so the history of a photo's treatment is visible while editing continues.

### Export Preparation Area
Collects the final output settings before a batch leaves the workspace.
- Users select which session photos are included in the export list.
- Naming pattern controls let users compose file names from adjustable components and preview the resulting names.
- Destination grouping settings determine how the prepared batch is organized.
- The prepared export list shows the chosen photos and names for review before output begins.

### Additional Settings
- Preset library options allow saved workspace and step configurations to be applied, adjusted and renamed for recurring shooting conditions.
- Panel accessibility preferences control which adjustment groups open by default when a session starts.
- Version display options affect how the version list is labeled and sorted in the comparison center.
- Session grouping preferences determine whether newly imported photos are added to the active session or kept separate.

## Usage Scenarios

### Portrait Session with Reusable Layout and Presets

**Goal:** A portrait photographer wants a consistent screen arrangement and editing flow for a recurring series of client headshots.

**Steps:**
1. Create a session in the Session Photo Organizer and bring in the headshot images, keeping them grouped apart from unrelated files.
2. Apply a saved layout preset from the Workspace Layout Manager so the adjustment panels and comparison views appear in the usual arrangement, and enable session restore behavior.
3. Work through the Guided Step Workflow, moving from basic correction to tonal adjustment and finishing, adjusting the step sequence if a step needs to appear later.
4. Collapse adjustment groups that are not relevant to headshots and expand the ones used most often in the Adjustment Panel Grouping.
5. Save the workspace settings and step configuration as a preset in the preset library for the next portrait session.

**Expected result:** The photographer sees a predictable panel organization each time the workspace is reactivated, the headshot set scoped as the active session, and a saved preset ready to shorten setup for the next client shoot.

### Retouching with Version Tracking and Comparison

**Goal:** A retouching user wants to explore several tonal treatments for a single landscape photo without losing earlier attempts.

**Steps:**
1. Open the photo within an active session, confirming it is the current image followed by the adjustment and preview panels.
2. Create a first version in the Version and Comparison Center, label it, and treat it as the current state.
3. Apply adjustments in the consolidated Adjustment Panel Grouping, then create and label a second version to record the alternative treatment.
4. Open a side-by-side comparison view, choose which version appears on each side, and adjust how the views are split.
5. Return to the earlier version if the comparison shows it should be kept, and designate it as current while keeping the version list visible.

**Expected result:** The user sees a labeled version list documenting how the photo's treatment evolved, plus a split preview showing the current state against an alternate version to decide which edit to keep.

### Batch Export Preparation with Naming Patterns

**Goal:** A photographer finishing a mixed session wants to prepare a batch of selected photos for output with consistent file names.

**Steps:**
1. Review the session's working list in the Session Photo Organizer and remove images that do not belong to the current set.
2. Enter the Export Preparation Area and select which session photos are included in the export list.
3. Compose file names from adjustable components in the naming pattern controls and preview the resulting names.
4. Adjust destination grouping settings to determine how the prepared batch is organized.
5. Review the prepared export list showing the chosen photos and names before output begins.

**Expected result:** The user sees a prepared export list with the selected session photos and previewed file names, along with the chosen destination grouping, ready for review before the batch leaves the workspace.

## Compatibility

Gimp Navira Photo Workspace is engineered for cross-platform deployment across Windows, macOS, and Linux, with consistent behavior verified on the current long-term-support releases of each platform. The application targets 64-bit architectures exclusively and requires a display environment capable of hardware-accelerated rendering; software-only fallback is supported but reduces viewport responsiveness on large canvases.

Version compatibility is enforced against a defined GIMP baseline. The workspace integrates with GIMP 2.10.x as the minimum supported runtime and remains forward-compatible with the 2.10 maintenance series; GIMP 3.x support is provided through a separate compatibility layer that activates automatically when the host version is detected. Plugin and script interfaces follow the host GIMP API surface, so existing filters and batch routines that conform to the supported API contract continue to operate without modification.

File format coverage aligns with the host image engine, including native XCF documents as well as layered and flat interchange formats such as PNG, JPEG, TIFF, and WebP, with color-managed workflows preserved across import and export. Metadata handling supports embedded EXIF and IPTC blocks where the underlying libraries are present. Projects created in the workspace retain full round-trip fidelity when reopened on any supported platform.

Hardware requirements are modest by design: a dual-core processor, 8 GB of system memory, and 2 GB of available storage are sufficient for standard editing workloads, while larger documents and multi-layer compositions benefit from additional memory and GPU acceleration. Legacy 32-bit systems, headless environments without a display server, and display scaling configurations below 100 percent are not validated and fall outside the supported configuration matrix. Compatibility testing is performed against the stated platform and version baselines only; configurations outside those boundaries are treated as unsupported.

## FAQ

**What platforms does Gimp Navira Photo Workspace support?**
The workspace is distributed as a desktop application and is compatible with Windows 10 and 11, macOS 12 and later, and mainstream 64-bit Linux distributions. A minimum of 8 GB of RAM and a discrete GPU with OpenGL 3.3 support is recommended for full-resolution editing and GPU-accelerated previews.

**Does the workspace require GIMP to be installed separately?**
No. Gimp Navira Photo Workspace operates as a self-contained environment with its own bundled processing core. It does not depend on an external GIMP installation and will not modify or interfere with any separately installed instance.

**Which RAW and image formats are supported?**
The workspace reads common camera RAW formats, including CR2, CR3, NEF, ARW, DNG, ORF, and RAF, alongside standard raster and layered formats such as PNG, TIFF, JPEG, WebP, and PSD. Non-destructive edits are stored in the project's native layered document format, preserving adjustment history and masks.

**How does the non-destructive editing model work?**
All adjustments, masks, and layer operations are recorded as a parametric edit stack. The original pixel data remains untouched on disk, and rendered output is generated only at export time or during preview. This allows unlimited reversal of edits and consistent re-rendering across sessions.

**What color management capabilities are included?**
The workspace supports embedded ICC profiles, soft proofing, and rendering intent selection for both display and export. Working spaces can be configured per project, and wide-gamut workflows are preserved end to end from import through final export.

**Can the workspace handle large photo libraries and batch operations?**
Yes. The catalog module indexes libraries incrementally and generates previews in the background without blocking the editing interface. Batch processing supports queued export presets, metadata-driven file naming, and parallel rendering across available CPU cores and GPU resources.

**Is GPU acceleration available for rendering and previews?**
GPU acceleration is enabled by default where supported and applies to preview rendering, brush compositing, and export scaling. A software fallback is provided automatically on systems without compatible graphics hardware, with a measurable reduction in preview responsiveness.

**How are projects and catalogs stored, and can they be relocated?**
Project files and the catalog database are stored in a user-configurable location. The catalog can be relocated or rebuilt from disk at any time, and project files remain portable between machines running the same major version of the workspace.

**What are the system requirements for smooth performance on high-resolution images?**
For images above 40 megapixels or multi-layer composites exceeding 16 layers, 16 GB of RAM or more is recommended. Scratch disk space equal to at least twice the size of the largest open project should be reserved for undo history and tile caching.

## Disclaimer

Gimp Navira Photo Workspace is provided as a desktop photo workspace built on the GIMP platform, and this disclaimer defines the operational scope, limitations, and responsibilities associated with its use. The software operates strictly on local files and user-supplied assets; no cloud synchronization, remote storage, or background upload behavior is implemented. Performance characteristics depend on the host system's CPU, available RAM, GPU acceleration support, storage throughput, and the complexity of the loaded document, including layer count, raster dimensions, and non-destructive effect chains.

Compatibility is validated against the declared GIMP version range and supported operating systems documented in the Compatibility section. Behavior outside that range—including third-party plug-ins, custom scripts, nonstandard color profiles, or modified runtime libraries—is not guaranteed and may produce inconsistent rendering, metadata handling, or export results. Users are responsible for verifying output correctness prior to distribution, printing, or archival use.

The workspace performs in-place edits only upon explicit user action; autosave and recovery behavior follow the host application's configuration and are not independently guaranteed by this project. Users are advised to maintain independent backups of source assets and project files. Feature behavior may change across releases as the underlying GIMP APIs, dependency versions, and platform toolchains evolve; release notes document such changes.

Gimp Navira Photo Workspace is distributed without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the authors or contributors be liable for any claim, damages, or other liability arising from the use of or inability to use the software, including data loss, output corruption, or workflow interruption. Users assume full responsibility for compliance with applicable licenses governing GIMP, bundled dependencies, and any third-party assets processed with the software.
