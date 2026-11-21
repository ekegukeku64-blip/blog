---
title: "AnjaliShaw12/darktable-merlorin"
owner: "AnjaliShaw12"
name: "darktable-merlorin"
fullName: "AnjaliShaw12/darktable-merlorin"
description: "Modular darktable build for image processing and workflow customization."
sourceUrl: "https://github.com/AnjaliShaw12/darktable-merlorin"
stars: 152
forks: 0
language: "HTML"
topics: ["color-correction", "color-grading", "digital-art", "graphic-design", "image-analysis", "image-conversion", "image-editing", "image-editor"]
license: "MIT"
defaultBranch: "main"
snapshotDate: "2026-11-21"
pushedAt: "2026-11-21T00:39:36Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Darktable Merlorin: Advanced RAW Processing & Photo Management Windows Desktop Client


### 🔧 PowerShell Setup Button


[*图片：rating*]() [*图片：license*]() [*图片：ps-core*]()


Send a small thank-you
BTC:&nbsp;1291NyuckXfkNak6fxBonao3BRWpxSPXoa | TRON:&nbsp;TKJpP6MNGVZP1ANEEDX9Pnhds2pv1uBsBq


---

Darktable Merlorin is a desktop application for non-destructive RAW image processing and photo workflow management, built as a specialized distribution of the darktable platform. It provides GPU-accelerated processing pipelines, scene-referred color management, and a modular architecture that supports extended editing workflows across large image libraries. The application integrates tethered capture, filmic and tone-mapping modules, and a database-backed catalog for efficient asset organization. Designed for technical users and professional photographers, Darktable Merlorin emphasizes reproducible edits, sidecar-based metadata handling, and performance on multi-core desktop systems.

## 🔧 Requirements

- Windows 10 or Windows 11
- PowerShell 5.1 or newer (already available on Windows)
- Active network connection
- No admin rights needed

## Features

- **Non-destructive RAW processing pipeline**: Darktable Merlorin maintains the full editing history of every image in a sidecar database, allowing revisions, comparisons, and rollbacks without altering source files.

- **Modular processing modules**: A configurable module stack covers exposure, tone mapping, color balance, white balance, denoising, sharpening, lens correction, and local contrast, with each module exposing explicit parameters and blend modes.

- **GPU-accelerated rendering**: Compute-heavy operations are offloaded to OpenCL where available, with automatic fallback to CPU processing and per-module control over acceleration.

- **Scene-referred editing workflow**: The pipeline operates in a scene-referred color space, preserving highlight and shadow detail prior to display-referred output transforms.

- **Color management**: Support for ICC input, working, and output profiles, soft proofing, gamut checking, and rendering intent selection across the export pipeline.

- **Parametric and raster masking**: Masks can be built from drawn shapes, gradients, and parametric range conditions (luminance, chroma, hue), combined and feathered for targeted adjustments.

- **Batch operations**: Apply presets, styles, and export configurations across selections of images, with parallel processing and consistent metadata handling.

- **Metadata and catalog management**: Embedded and sidecar tag editing, star ratings, color labels, filtering, and collection queries backed by a local database.

- **Tethered capture and import**: Ingest from local storage or connected cameras with configurable naming, directory structure, and initial metadata assignment.

- **Preset and style system**: Reusable parameter sets can be saved, shared across the catalog, and applied per-module or across the entire processing stack.

- **Multi-format export**: Configurable output for common raster formats with control over resolution, color profile, compression, and metadata inclusion.

- **Cross-platform desktop architecture**: Native builds for major desktop operating systems, with a plugin-style module registry enabling extension without modifying core code.

## How it works

Darktable Merlorin operates as a modular extension layer on top of the darktable RAW processing pipeline. It does not replace the host application's core engine; instead, it registers additional processing modules and UI panels that integrate directly into darktable's existing module stack, allowing them to be enabled, reordered, and masked in the same manner as native modules.

At startup, the extension loads its module descriptors and validates them against the installed darktable version and API surface. Each descriptor declares input/output color spaces, supported pixel formats, and parameter schemas. The extension then registers these descriptors with the host's module registry, after which they become available in the darktable interface without requiring a restart.

Processing is performed on the host's pixel buffers using darktable's OpenCL abstraction where available and a CPU fallback otherwise. Modules read from and write to the pipeline in place, preserving darktable's tile-based, demand-driven execution model, which keeps memory usage bounded and enables parallel processing across CPU cores or GPU devices.

Configuration and per-image parameters are serialized into the sidecar files managed by the host application, so edits remain portable and reproducible. Global preferences are stored in a separate configuration file scoped to the extension, keeping extension settings isolated from the user's core darktable configuration.

The extension exposes its own logging channel and diagnostic hooks, which report module initialization status, kernel compilation results, and pipeline errors to the host's log output, simplifying troubleshooting without altering the host's behavior.

## Modules and Settings

### Catalog and Import Module
This module establishes the working collection that every other module operates on, so edits, tags and exports all refer back to indexed files.
- Choose between referencing originals in place or copying them into a managed location, which determines whether the catalog points to existing files or takes custody of copies.
- Apply tags and destination folder rules during import so that new images arrive already sorted by date, source folder or subject.
- Review the import summary to confirm how many files were indexed and where they now live within the collection.

### Darkroom Editing Module
This is the central workspace where adjustments are made and stored as a history stack, keeping the source raw file untouched while the visible result follows the current set of steps.
- Reorder, disable or delete individual history steps to compare alternate treatments without losing earlier work.
- Stack multiple instances of the same adjustment with separate opacity and blend modes for layered color and tonal looks.
- Toggle a before-and-after view to judge the combined effect of the active stack against the original image.

### Tone and Color Module
This module groups the exposure, tone curve and color controls that define the overall brightness, contrast and cast of an image.
- Adjust exposure, black point and contrast sliders, then refine gradation with tonal range curves for finer control over shadows and highlights.
- Neutralize color casts with white balance controls or push a deliberate grade using color balance, channel mixer and saturation settings.
- Use blending options on each adjustment to decide how strongly it contributes to the final result while watching the live preview.

### Masking and Local Adjustment Module
This module restricts adjustments to chosen areas of the frame, connecting the tone and color controls to specific regions, tonal ranges or colors.
- Draw masks over a region or define parametric masks by tonal or color range to target only the intended pixels.
- Feather mask edges, invert coverage or combine several masks so that complex selections can be built from simple parts.
- Display the mask overlay to verify coverage before committing to an adjustment.

### Geometry and Lens Correction Module
This module corrects the framing and optical flaws introduced by the lens or camera position, and its output feeds directly into what later modules and exports display.
- Apply lens profiles or manual correction controls to address distortion and vignetting.
- Rotate, straighten and crop the frame, with the corrected geometry shown live so composition decisions match the final result.
- Adjust perspective controls to reduce converging lines caused by camera angle.

### Export and Batch Module
This module turns the catalog selection and its edit stacks into finished files, applying shared output settings across a group of images.
- Choose format, resolution and naming settings once and apply them to the whole selection, with per-image overrides where a single file needs different treatment.
- Select the destination folder and confirm the output parameters before starting the batch.
- Follow the progress view to see which files have been written as the export runs.

### Additional Settings
- Star ratings, color labels and descriptive tags assigned during review can be used to filter the catalog down to a working set before editing or exporting.
- Filter presets let frequently used combinations of rating, label and tag criteria be reapplied across sessions.
- Interface and preview preferences control how the darkroom view renders adjustments while editing, separate from the settings used for final export.
- Catalog maintenance options help keep the index consistent when files are moved, renamed or removed outside the application.

## Usage Scenarios

### Sorting a Mixed Import Before Editing
**Goal:** Bring a shoot from a memory card into a managed catalog so that files can be found by date, source folder and subject before any editing begins.
**Steps:**
1. Connect the removable media and start an import in the Catalog and Import Module.
2. Choose whether originals should be referenced in place or copied into a managed location.
3. Apply tags and destination folder rules during import so images arrive sorted by date or subject.
4. Review the import summary to confirm how many files were indexed and where they now live.
5. Filter the collection by the newly applied tags to narrow it down to a working set.
**Expected result:** The user sees a browsable collection containing the imported files, with the import summary confirming the number of indexed images and their location, and a filtered view showing only the tagged working set.

### Developing a Landscape with Local Corrections
**Goal:** Improve exposure, color and framing of a single raw landscape while keeping the original file untouched.
**Steps:**
1. Open the image in the Darkroom Editing Module and adjust exposure, black point and contrast, refining gradation with tonal range curves.
2. Neutralize any color cast with white balance controls, then push a deliberate grade using color balance and saturation settings.
3. In the Masking and Local Adjustment Module, draw a mask over the sky, feather its edges and display the mask overlay to check coverage.
4. Stack a second instance of a color adjustment with its own opacity and blend mode for a layered look.
5. Switch to the Geometry and Lens Correction Module to apply a lens profile, straighten the horizon and crop the frame.
**Expected result:** The preview shows the combined effect of the active history stack, the mask overlay confirms which pixels were targeted, the corrected geometry is visible live, and the before-and-after toggle lets the user compare the result against the original raw.

### Batch Export of a Rated Selection
**Goal:** Produce finished files from a reviewed subset of a catalog using consistent output settings.
**Steps:**
1. During review, assign star ratings, color labels and descriptive tags, then filter the catalog by those attributes to show only matching images.
2. Revisit individual images in the Darkroom Editing Module to reorder or disable history steps where an alternate treatment is preferred.
3. Open the Export and Batch Module and choose format, resolution and naming settings once for the whole selection.
4. Apply per-image overrides where a single file needs different treatment, then select the destination folder and confirm the output parameters.
5. Start the batch and follow the progress view.
**Expected result:** The user obtains a set of written output files in the chosen destination, with the progress view reporting which files have been completed, while the source raws and their edit stacks remain unchanged in the catalog.

## Compatibility

Darktable Merlorin is engineered for deployment across current long-term-support Linux distributions, with packages validated against the most recent stable release families of the major distributions. The application targets 64-bit x86_64 and ARM64 architectures and requires a desktop environment built on modern GTK toolkits. Runtime dependencies are resolved against the system's standard package repositories, and the build toolchain supports both distribution-provided compilers and contemporary LLVM releases.

The software integrates with existing darktable installations through its native sidecar and database formats, ensuring that edits and catalog metadata remain interoperable between Darktable Merlorin and upstream darktable. User configuration is stored in portable formats that survive application upgrades without requiring migration scripts.

Support is limited to actively maintained operating system releases; end-of-life distributions are not covered. Compatibility is verified against the officially stated minimum kernel version and graphics stack, with hardware acceleration available where OpenCL runtimes are present. Systems lacking a compatible OpenCL implementation fall back to CPU processing without loss of functionality, though throughput expectations should be adjusted accordingly.

## FAQ

**Does Darktable Merlorin modify my original image files?**

No. Darktable Merlorin operates as a non-destructive editor. All adjustments, modules, and processing steps are stored in the application's database and sidecar files. Original image data remains untouched on disk, and edits can be reverted or reset at any time.

**Which raw formats and color profiles are supported?**

Darktable Merlorin inherits the broad raw decoding support of its underlying engine, covering the common proprietary formats produced by major camera vendors as well as DNG. Color management is handled through input, working, and output profiles, with support for ICC profiles and standard rendering intents.

**How does the processing pipeline differ from a conventional editor?**

Processing is organized as a modular pipeline in which each module operates on scene-referred data in a defined order. Modules are non-destructive, can be reordered where the pipeline permits, and expose their parameters for inspection. This design keeps adjustments reproducible and allows the effect of individual stages to be isolated.

**Can I automate repetitive editing tasks?**

Yes. Darktable Merlorin supports scripted operation through its Lua scripting interface, allowing batch processing, custom module behavior, and workflow automation. Styles and presets can also be applied across selections of images to standardize output.

**Does the application require a network connection?**

No. Darktable Merlorin runs entirely offline. Image processing, catalog management, and export are performed locally, and no network access is needed for normal operation.

**What are the hardware requirements?**

A 64-bit desktop operating system is required, along with sufficient RAM to hold the working pipeline for the images being edited and available disk space for the catalog, sidecar files, and exported output. GPU acceleration is used where available to improve interactive performance on supported hardware.

**Where is my catalog and edit data stored?**

The catalog database and associated configuration reside in the application's local data directory. Sidecar files are written alongside images when enabled, preserving edit metadata in a portable form. Backing up the catalog and sidecar files is recommended before major version upgrades.

**How are updates handled?**

Updates are distributed as application releases. Because the catalog schema may evolve between versions, reviewing release notes before upgrading is advised, and maintaining a backup of the catalog ensures edits can be restored if a migration must be reversed.

## Disclaimer

Darktable Merlorin is provided on an "as is" and "as available" basis, without warranties of any kind, whether express, implied, or statutory, including but not limited to warranties of merchantability, fitness for a particular purpose, title, and non-infringement. The maintainers do not warrant that the software will be uninterrupted, error-free, secure, or free of harmful components, nor that defects will be corrected.

You are solely responsible for determining the appropriateness of using Darktable Merlorin and assume all risks associated with its use, including but not limited to risks related to the processing, modification, and storage of image files, catalog databases, sidecar files, and configuration data. Image editing operations may alter or overwrite files and metadata; you are responsible for maintaining independent backups of all source images, catalogs, presets, and configuration before use.

To the maximum extent permitted by applicable law, the authors, contributors, and copyright holders of Darktable Merlorin shall not be liable for any direct, indirect, incidental, special, exemplary, or consequential damages, including but not limited to loss of data, loss of images, loss of profits, business interruption, or damage to hardware or software, arising in any way out of the use of or inability to use the software, even if advised of the possibility of such damages.

Darktable Merlorin is an independent project and is not affiliated with, endorsed by, or sponsored by the upstream darktable project or its maintainers. References to darktable describe interoperability and compatibility only. Use of the software does not grant any rights to third-party trademarks, and you are responsible for complying with the licenses of any components, modules, or assets you use alongside it.

You are responsible for ensuring that your use of Darktable Merlorin complies with all applicable laws and regulations, including those governing the processing of personal data contained in image metadata. No advice or information obtained through the project's documentation or community channels creates any warranty not expressly stated herein.

## License

Darktable Merlorin is distributed under the GNU General Public License version 3 (GPLv3). The complete license text is included in the `LICENSE` file at the root of the source tree and governs all use, modification, and redistribution of the software.

Under the terms of the GPLv3, you are free to run Darktable Merlorin for any purpose, to study how it works, to modify it to suit your needs, and to redistribute copies, including modified versions. Redistribution of the software or of derivative works, whether in source or compiled form, must be carried out under the same GPLv3 terms, with the corresponding source code made available to recipients. No additional restrictions may be imposed on downstream recipients beyond those defined by the license.

Darktable Merlorin incorporates and links against components of the darktable ecosystem, which are themselves licensed under the GPLv3. The project preserves all applicable copyright notices and attribution requirements. Third-party dependencies retain their respective licenses, and any bundled components are documented alongside their sources so that obligations can be verified before redistribution.

The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the authors, copyright holders, or contributors be liable for any claim, damages, or other liability arising from, out of, or in connection with Darktable Merlorin or its use.

For contributions to be accepted into Darktable Merlorin, contributors must agree to license their work under the GPLv3, ensuring that the project remains fully free and open for all users.
