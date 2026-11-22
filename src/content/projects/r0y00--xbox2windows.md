---
title: "R0Y00/Xbox2Windows"
owner: "R0Y00"
name: "Xbox2Windows"
fullName: "R0Y00/Xbox2Windows"
description: "GTA VI static recompilation research for x64 Windows. Source-built EXEs run on Windows, and two translated pixel shaders match reference outputs on hardware and WARP. Full-game startup is unverified."
sourceUrl: "https://github.com/R0Y00/Xbox2Windows"
stars: 1014
forks: 97
language: "Python"
topics: ["d3d12", "directx-raytracing", "scarlett", "static-recompilation", "windows", "xbox", "xbox-series-x"]
license: "MIT"
defaultBranch: "main"
snapshotDate: "2026-11-22"
pushedAt: "2026-11-22T06:10:46Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# Xbox2Windows

Xbox2Windows researches **GTA VI static recompilation** from Xbox Series X|S (Scarlett) to x64 Windows. Windows, the mapped original and the recompiled build agree on output and exit codes for source-built programs. Two pixel shaders from the inspected package compiled to desktop DXIL and matched reference pixels on an RTX 4060 Laptop GPU and WARP. Execution of the title's CPU code, full-game startup and frame rate remain unverified.

**Help wanted on Windows:** Claim a batch of GPU reports in #1. Link the reports you will cover, check each original log against the hardware table, and submit one README PR for the batch. You can do this without a GPU or a local copy of the package.

The CPU experiments translate source-built x64 functions from PE machine code through C++ to Windows executables and DLLs. A source-built EXE runs from its translated entry through a nested call that reads and writes globals in a relocated image, then through a named DLL import. Windows, the mapped original and the recompiled EXE agree on the import arguments, output and exit code for two inputs and two initial data states. A CRC-32 console program also runs from its PE entry through a separately compiled C++ checksum routine and Windows UCRT stream I/O, with matching output and exit codes on all three runners. A multi-record archive reader runs from standard Zig startup through recompiled blast decompression to process exit, including the callback sequence and partial-record cleanup. The shader experiment translates selected gfx1013 pixel shaders through HLSL to desktop DXIL. Other experiments test the Windows runtime, render recovered texture levels and read script state data.

New to the project? The pinned guide in GitHub Discussions will help you choose a first contribution. Ask build and debugging questions in Development Q&A.

*图片：Instruction-form coverage of source-built fixtures, not a measure of port completion*

Snapshot measured at c04e65a. For the latest chart, open the newest successful Windows checks run on main and download `coverage-dashboard` from Artifacts.

## Current results and open work

| Area | Result on Windows | Open question or contribution |
|---|---|---|
| FidelityFX upscaler | The recompiled provider creates 11 resources at 720p → 1080p and a twelfth with the debug flag. On RTX 4060 Laptop and WARP, both the per-resource indices and the returned loader and provider handles passed. Recompiled graph pass 26 wrote the RCAS intermediate and the recompiled RCAS shader read it with five integer texel loads per output. Passes 24 and 25 supplied all 72 scratch reads on the 8×4 tile. Both adapters passed the zero and nonzero input comparisons through the final 256 pixels. Scratch writers · Dispatch trace and replay · RCAS format test · Provider loop and desktop mappings · Recurrent texture pixel readback | Exercise the full-wave LDS path of pass 26 with a larger tile using the verified scratch producers. |
| x64 context callbacks | The recompiled FidelityFX loader destroy function calls the bound provider and preserves its 32-bit result across both cleanup paths on Windows. The upscaler slot was identified in the local package. Provider and Windows comparison | Verify the upscaler's internal effect teardown with a successfully created graphics context. |
| CPU translation | The source-built EXE matches native import arguments, output bytes and process status when its entry selects between two internal callers of the same named import. A leaf function, a direct call, a caller that calls one callee twice or two different callees, and cross-DLL imports by name and by ordinal match the original fixtures on Windows. Switch dispatch through jump tables in the MSVC and LLVM layouts, including from a loop, matches the original fixture on Windows. The same translator supports overflow/parity conditions and lifts `SETcc` and `CMOVcc` that read the flags of an earlier compare or test in the same straight-line run, and matches the original fixture on Windows. It also translates functions with a fixed stack frame, saved nonvolatile registers and spilled locals, which match the original fixture on Windows. Direct calls and tail jumps to verified primary runtime functions or code exports of the same image translate each callee once into the same source and match the original fixture on Windows; callees without an unwind entry are accepted only through an opt-in range manifest bound to the image hash, and indirect calls, recursion and frame addresses passed to a callee stay rejected. The import fixtures and a relocated variant also run from an image mapped without LoadLibrary, with imports bound through a host resolver. Mapped images also handle SEH and receive TLS-callback and entry-point notifications in the order Windows uses. The recompiled Bink allocation and release callers passed size, alignment, null fallback and release checks on Windows. Blocks allocated through a custom callback retained their release function after callback replacement. A grouped caller rounds a prefix to 32 bytes and places payload pointers inside the allocation or in caller-owned slots. The frame allocator now reaches the shared Windows heap with success, injected failure and retry checks. | Trace the producer of odd tagged strides. |
| Shader translation | Supported pixel programs sample a texture, read constants, apply arithmetic, and export color. Arithmetic coverage includes absolute-value operands and `v_trunc_f32` rounding toward zero. All 16 floating-point comparison predicates have D3D12 readback coverage, including NaN inputs. D3D12 readback is checked against a CPU reference. Translation and bindings | Supply a source-built instruction case with known register inputs and an expected color. |
| BC7 textures | A translated shader samples recovered mip levels on hardware and WARP. Requests for missing high-resolution levels use the first resident level. Mip fallback tests | Match a variable BCPack lane against independently known BC7 blocks. Issue #15 |
| Script states | A native x64 probe follows state-tree links and reproduces distinct camera limits for front and rear selections. The replay supplies the selection requests. State replay | Identify an event or caller that supplies a context and state ID, with a control input that takes a different branch. Issue #19 |
| Windows runtime and GPU | Source-built checks cover PE imports, heap operations, root signatures, compute and ray tracing. 20 Radeon GPU models passed the native wave64 BVH test. Hardware coverage · Experiment notes | Share a run on a new adapter or a driver retest in the hardware thread. |

The public suite builds its own fixtures. A contributor can reproduce the checks below on a PC without a game installation. The standalone release packages the GPU check. To run the script, shader and texture development suite, build from source.

## Run the GPU check

Download the Windows x64 GPU check and SHA-256, verify and extract the ZIP, then run this in PowerShell from the extracted folder. The package contains its own shaders and needs no compiler, console or game files.

```powershell
.\Run-GpuCheck.ps1
```

With a package built from current source, use `.\Run-GpuCheck.ps1 -Adapter Radeon` to select a hardware adapter by part of its name. For source builds, set `XBOX2WINDOWS_ADAPTER` before running CTest.

Review `gpu-report-hardware.md` and paste its full contents as a comment on the hardware coverage thread (#1). Do not open a new GitHub issue. Reports with a failure or capability skip are welcome. Package instructions

### Hardware coverage

| Adapter or backend | Default native lanes | Forced wave64 | BVH differential | Evidence |
|---|---:|---|---|---|
| NVIDIA GeForce RTX 2060 | 32 | Skipped | 408 queries passed | Maintainer baseline |
| NVIDIA GeForce RTX 3070 (driver 32.0.16.1088) | 32 | Skipped, lane range 32–32 | 408 queries passed | RTX 3070 report · 32.0.16.2101 report |
| NVIDIA GeForce RTX 4060 Laptop GPU | 32 | Skipped | 408 queries passed | Second maintainer workstation · Independent Windows run, driver 32.0.16.2124 · 32.0.16.1742 report |
| NVIDIA GeForce RTX 5070 | 32 on every run | Skipped on every run, lane range 32–32 | 408 queries passed per run | 32.0.16.1692, debug layer unavailable · 32.0.16.2135 retest, debug layer enabled · 32.0.16.2124 report · 32.0.16.1686 report · Independent 32.0.16.2135 run |
| AMD Radeon RX 6600 (driver 32.0.21045.16010) | 32 | Passed, 64 lanes | 408 queries passed | RX 6600 report · 32.0.11037.4004 retest · 32.0.21045.29003 report |
| AMD Radeon RX 6750 XT (driver 32.0.21045.29003) | 32 | Passed, 64 lanes | 408 queries passed | RX 6750 XT report |
| AMD Radeon RX 6800 XT (driver 32.0.21043.5001) | 32 | Passed, 64 lanes | 408 queries passed | RX 6800 XT report |
| AMD Radeon RX 9070 (driver 32.0.22042.14002) | 64 | Passed, 64 lanes | 408 queries passed | RX 9070 report · 32.0.32029.2010 report |
| AMD Radeon RX 9070 XT (driver 32.0.32015.16001) | 64 | Passed, 64 lanes | 408 queries passed | RX 9070 XT report · 32.0.32029.2010 retest, D3D12 warning 989 · 32.0.32015.16001 report · 32.0.32015.7029 report · 32.0.32029.2010 report · 32.0.32029.2010 run 3 · 32.0.32029.2010 run 4 · 32.0.32029.2010 run 5 · 32.0.32015.12012 report |
| NVIDIA GeForce RTX 4060 Ti (driver 32.0.16.1742) | 32 | Skipped, lane range 32–32 | 408 queries passed | Hardware report · 32.0.16.2124 report |
| AMD Radeon RX 7900 GRE (driver 32.0.32015.7029) | 32 | Passed, 64 lanes | 408 queries passed | Hardware report |
| NVIDIA GeForce RTX 4070 Ti SUPER (driver 32.0.16.1088) | 32 | Skipped, lane range 32–32 | 408 queries passed | Hardware report · 32.0.15.7270 report, Windows 10 |
| NVIDIA GeForce RTX 5080 (driver 32.0.16.2124) | 32 | Skipped, lane range 32–32 | 408 queries passed | Hardware report · 32.0.16.1088 report · 32.0.16.1664 report · Independent run, same driver |
| AMD Radeon RX 9060 XT (driver 32.0.32029.2010) | 64 | Passed, 64 lanes | 408 queries passed | Hardware report · Independent run, same driver · Third run, same driver · 32.0.31036.15 report |
| NVIDIA GeForce RTX 4060 (driver 32.0.16.1088) | 32 | Skipped, lane range 32–32 | 408 queries passed | Hardware report |
| NVIDIA GeForce RTX 4050 Laptop GPU (driver 32.0.16.1088) | 32 | Skipped, lane range 32–32 | 408 queries passed | Hardware report |
| NVIDIA GeForce RTX 2060 SUPER (driver 32.0.16.2124) | 32 | Skipped, lane range 32–32 | 408 queries passed | Windows hardware report |
| NVIDIA GeForce RTX 3060 (driver 32.0.16.2124) | 32 | Skipped, lane range 32–32 | 408 queries passed | Windows hardware report · 32.0.16.2101 retest, device 2503 · 32.0.15.9636 GPU passthrough retest · 32.0.16.1714 report |
| Intel Arc B570 (driver 32.0.101.9175) | 32 | Skipped, lane range 16–32 | 408 queries passed | Windows hardware report |
| AMD Radeon RX 6600 LE | 32 | Skipped, Shader Model 6.5 | 408 queries passed | 32.0.21045.29003 report |
| NVIDIA GeForce RTX 3080 Ti | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.1742 report · 32.0.16.1088 report |
| NVIDIA GeForce RTX 4070 SUPER | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.2135 report · 32.0.16.2114 report · 32.0.16.1742 source build at ccfa703 · 32.0.16.1088 report |
| NVIDIA GeForce GTX 1080 Ti | 32 | Skipped, lane range 32–32 | Skipped, DXR tier 1.0 | 32.0.15.8266 report |
| AMD Radeon RX 6700 | 32 | Passed, 64 lanes | 408 queries passed | 32.0.21045.16010 report |
| NVIDIA GeForce RTX 5060 | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.1742 report · 32.0.16.1656 report · 32.0.16.2114 report |
| NVIDIA GeForce RTX 4090 | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.2135 report |
| NVIDIA GeForce RTX 3080 Ti Laptop GPU | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.2135 report |
| AMD Radeon RX 6700 XT | 32 | Passed, 64 lanes | 408 queries passed | 32.0.21045.16010 report |
| NVIDIA GeForce RTX 4090 Laptop GPU | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.1656 report |
| NVIDIA GeForce RTX 5070 Ti | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.2124 report · Independent 32.0.16.2124 run · 32.0.16.1664 report |
| NVIDIA GeForce RTX 5050 | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.2101 report |
| AMD Radeon RX 7800 XT | 32 on both drivers | Skipped, Shader Model 6.5 on 32.0.32015.16001; passed, 64 lanes on 32.0.32029.2010 | 408 queries passed per run | 32.0.32015.16001 report · 32.0.32029.2010 report, debug layer enabled · Independent 32.0.32029.2010 run |
| NVIDIA GeForce GTX 1070 | 32 | Skipped, lane range 32–32 | Skipped, DXR tier 1.0 | 32.0.15.8180 report |
| AMD Radeon RX 6650 XT | 32 | Passed, 64 lanes | 408 queries passed | 32.0.21016.1010 report · 32.0.21045.16010 report |
| NVIDIA GeForce RTX 3080 | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.1088 report · 32.0.16.2124 report |
| NVIDIA GeForce RTX 3060 Ti | 32 on every run | Skipped on every run, lane range 32–32 | 408 queries passed per run | 32.0.16.2101 report · 32.0.16.1742 report · Independent 32.0.16.2101 run · 32.0.16.1088 report |
| Intel Arc B580 | 32 | Skipped, lane range 16–32 | 408 queries passed per run | 32.0.101.9175 report · Independent run, same driver |
| AMD Radeon RX 5700 XT | 32 | Passed, 64 lanes | Skipped, DXR unsupported | 32.0.21045.29003 report |
| NVIDIA GeForce RTX 3050 | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.2114 report · 32.0.16.2135 report |
| AMD Radeon RX 7600 | 32 | Passed, 64 lanes | 408 queries passed | 32.0.31021.5001 report · 32.0.31035.1003 report |
| Radeon RX 570 Series | 64 | Skipped, Shader Model 6.5 | Skipped, DXR unsupported | 31.0.21029.6002 report |
| AMD Radeon RX 6900 XT | 32 | Passed, 64 lanes | 408 queries passed | 32.0.21043.19003 report |
| NVIDIA GeForce GTX 1660 Ti | 32 | Skipped, lane range 32–32 | Skipped, DXR tier 1.0 | 32.0.16.2124 report |
| NVIDIA GeForce RTX 4070 | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.1714 report · 32.0.16.2124 report |
| NVIDIA GeForce RTX 2080 | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.1088 report |
| NVIDIA GeForce RTX 4080 | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.2124 report |
| NVIDIA GeForce RTX 5090 | 32 | Skipped, lane range 32–32 | 408 queries passed per run | 32.0.16.2124 report · Full source-built hardware suite at ee39536 · Independent run, same driver |
| AMD Radeon(TM) Graphics (Ryzen 5 7600, device 164e) | 32 | Passed, 64 lanes | 408 queries passed | 32.0.21045.29003 report, package built from #116 at c659916 |
| NVIDIA GeForce GTX 1070 Ti | 32 | Skipped, lane range 32–32 | Skipped, DXR tier 1.0 | 32.0.15.8266 report |
| NVIDIA GeForce RTX 5070 Ti Laptop GPU | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.2135 report |
| NVIDIA GeForce RTX 3050 Ti Laptop GPU | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.2101 report |
| AMD Radeon RX 6600 XT (driver 32.0.21045.29003) | 32 | Skipped, Shader Model 6.5 on build 19045; passed, 64 lanes on build 26200 | 408 queries passed per run | Windows build 19045 report · Windows build 26200 report |
| NVIDIA GeForce RTX 5060 Ti | 32 | Skipped, lane range 32–32 | 408 queries passed per run | 32.0.16.2101 report · 32.0.16.1714 report · 32.0.16.2124 report |
| Radeon RX 590 Series | 64 | Passed, 64 lanes | Skipped, DXR unsupported | 31.0.21923.11000 report |
| NVIDIA GeForce RTX 4070 Ti | 32 | Skipped, lane range 32–32 | 408 queries passed per run | 32.0.16.1088 report · Independent run, same driver |
| AMD Radeon(TM) Graphics (device 164c) | 64 | Passed, 64 lanes | Skipped, DXR unsupported | 31.0.21925.1001 report |
| NVIDIA GeForce GTX 1660 SUPER | 32 | Skipped, lane range 32–32 | Skipped, DXR tier 1.0 | 32.0.16.2101 report |
| NVIDIA GeForce RTX 2070 SUPER | 32 | Skipped, lane range 32–32, Shader Model 6.5 | 408 queries passed | 32.0.16.1088 report |
| NVIDIA GeForce RTX 5090 Laptop GPU | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.2124 report |
| NVIDIA GeForce RTX 3090 | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.2124 report |
| NVIDIA RTX 3500 Ada Generation Laptop GPU | 32 | Skipped, lane range 32–32 | 408 queries passed | 32.0.16.2124 report |
| AMD Radeon Graphics (device 15bf) | 32 | Passed, 64 lanes | 408 queries passed | 32.0.32015.14001 report |
| AMD Radeon RX 5600 XT | 32 | Passed, 64 lanes | Skipped, DXR unsupported | 32.0.21045.16010 report |
| AMD Radeon RX 7900 XTX | 32 | Passed, 64 lanes | 408 queries passed | 32.0.32029.2010 report, debug layer enabled |
| Intel Arc B390 GPU (Panther Lake) | 32 | Skipped, lane range 16–32 | 408 queries passed | 32.0.101.8509 report |
| Microsoft WARP (software) | 4 | Skipped | 408 queries passed | Maintainer baseline |

On CachyOS, an RTX 3060 completed 408 comparisons through Proton and vkd3d-proton with NVIDIA driver 620.70.06. The adapter reported a 32-lane maximum and skipped forced wave64. Linux translation-layer report

The eight community reports cover seven GPU models at commit `def386a`. Each Radeon completed all 38 forced-wave64 groups with zero mismatches. The RX 9070 XT, RTX 3070 and RTX 5070 driver retest reported zero D3D12 debug warnings and errors in their passing checks.

Maintainers link independent results to the original report and record the adapter, driver, commit and outcome. Names or handles are added on request. The hardware-report and independent-build milestones are complete. The remaining community milestone is a fix verified by the contributor who reported the problem.

## First build

On x64 Windows, install Visual Studio's **Desktop development with C++** workload, including x64 MSVC, the C++ CMake tools with Ninja, and Windows SDK 10.0.26100 with DXC. From the repository root in PowerShell, run:

```powershell
.\tools\dev.ps1
cmake --preset dev
cmake --build --preset dev
ctest --preset dev --no-tests=error -R 'desktop_root_signature|era_heap_allocation|offscreen_warp'
```

These three tests exercise a D3D12 root signature, heap allocation and software rendering. CMake warns when the Python executable for the remaining fixture tests is missing. To enable the CPU, script, shader, texture and PE fixture tests, install x64 Python 3.11 or newer and configure again. Windows CI uses Python 3.12.

```powershell
python -m venv out/pe-env
.\out\pe-env\Scripts\python.exe -m pip install -r requirements-dev.txt
cmake --preset dev
cmake --build --preset dev
ctest --preset dev --no-tests=error
```

To build and test at /O2 as Windows CI also does, use the `release` preset in place of `dev`. Its build directory is `out/build/release`.

`shader_metadata_probe` also needs a DXC validator that accepts module-only validation. The DXC 1.7.2308 shipped with the original Windows SDK 10.0.26100 refuses it with `call_hr 0x80070057`, as do releases 1.8.2403 through 1.8.2407, and the test then reports a skip. A serviced SDK can include a newer validator: Windows SDK 10.0.26100.8249 installs DXC 1.8.2502.11, which passes without a separate download. DXC 1.8.2502 is the first release that passes, and the later 1.8 and 1.9 releases through 1.9.2609 pass too. To use a release, extract its zip and configure with `cmake --preset dev -DDXC_EXECUTABLE=C:/path/to/dxc/bin/x64/dxc.exe`. `root_probe` loads `dxil.dll` from the same directory. Report · Results by release

On Windows 10 the in-box D3D12 runtime and WARP lack SM 6.5 and DXR, so the BVH and DXR WARP checks skip. To run them, configure with the app-local Agility SDK and WARP packages. Windows 10 setup

An independent contributor passed all three smoke tests from a clean checkout of `71bb9f4` on Windows 11 build 26300.9974 with VS Build Tools 2022 17.14 and Windows SDK 10.0.26100. The tests passed again after an incremental rebuild at `2465837`. With Python 3.14.10, the full suite had 66 and 68 tests respectively, with zero failures in either run. Each run skipped forced wave64 on the RTX 5080 and WARP because their reported lane ranges excluded 64. Original clean-build report

Contributing from macOS or Linux? See the non-Windows host guide for the platform-independent Python and LLVM 15 checks.

## Choose an experiment

| Area | A contribution you can verify | Focused CTest command |
|---|---|---|
| Static CPU recompilation | Compare leaf, chained-range and cross-function translations with their source-built originals and negative controls, including Bink frame plane requests and the Bink group descriptor builders. | `ctest --preset dev --no-tests=error -R '^cpu_' -V` |
| Script states | Reproduce a parent/child lookup, an ambiguous selection or a damaged sibling link with a synthetic tree. | `ctest --preset dev --no-tests=error -R '^script_(state_literals\|path_links)$' -V` |
| Resource metadata | Check a relocated resource root against its block directory and type schema. | `ctest --preset dev --no-tests=error -R '^resource_relocated_root$' -V` |
| Texture recovery | Check a packed mip tail, a first refill byte, the fields of a generated BC7 block, or a resident mip drawn on the software adapter. Look up a texture key across archives and inspect a matching descriptor. | `ctest --preset dev --no-tests=error -R '^(bcpack_prefix_and_mip_tail\|bc7_block_reference\|bc7_draw_warp\|resource_range_controls)$' -V` |
| Audio metadata | Inventory stream counts, codec IDs and sample rates in a bounded AWC sound-effect bank. | `ctest --preset dev --no-tests=error -R '^audio_awc_metadata$' -V` |
| Static shader recompilation | Translate the single-texture pixel shader fixtures to desktop DXIL and check every output channel. Select a local record by name and, for duplicate names, by decoded DXBC SHA-256. Supported instructions, bindings and record selection | `ctest --preset dev -R '^pixel_aot_' -V` |
| Shader effect metadata | Inventory the candidate programs for a named SGD5 effect using independently located archive ranges. | `ctest --preset dev --no-tests=error -R "^sgd5_effect_candidates$" -V` |
| Pipeline readiness | Join explicit pipeline references to the native shader manifest and identify blockers for PSO creation. Inputs and WARP control | `ctest --preset dev -R '^pso_' -V` |
| D3D12 and ray tracing | Compare the CPU reference, custom BVH shader and DXR on another adapter. Record the driver and native wave width. | `ctest --preset dev -R '^bvh_(differential\|wave64)_hardware$' -V` |
| Upscaler memory accounting | Compare post-query counter writes on success and failure. | `ctest --preset dev --no-tests=error -R 'working_set_delta$'` |
| Windows runtime | Add a source-built allocation case with a measurable Windows result. | `ctest --preset dev -R 'era_heap\|desktop_memory_query'` |
| PE tooling | Reproduce an import-resolution edge case with a DLL or EXE built from source. | `ctest --preset dev --no-tests=error -R 'static_exe_intake\|conditional_import_paths\|bundled_export_forwarders'` |
| Build and documentation | Try the first build from a clean clone. Identify the first missing prerequisite or unclear instruction. | Use the three-test command above. |

For task ownership, evidence requirements and PR review, see the contribution guide. Open an issue · Community conduct · Private security reports

## Case study and provenance

The installation metadata inspected for this case study lists a Scarlett executable. The main executable was absent from the inspected files. The public regression suite uses source-built fixtures and independently built shaders. Intake methods and evidence

Windows Authenticode verification on the local copy reported `HashMismatch` for 12 DLLs and `NotSigned` for four. Three independently compared whole-file SHA-256 values matched the community reports. The cause of the digest mismatch and the original signing path remain undetermined. Methods and fingerprints

## License

Original project code and documentation use the MIT License. Third-party games, assets, SDKs and trademarks belong to their respective owners. Xbox2Windows is an independent community project, unaffiliated with Rockstar Games, Take-Two, Microsoft or AMD.
