---
title: "staryone/motlab"
owner: "staryone"
name: "motlab"
fullName: "staryone/motlab"
description: "Video as code: canvas scenes rendered with WebCodecs in headless Chrome, a review viewer, and agent skills that build the video from your references."
sourceUrl: "https://github.com/staryone/motlab"
stars: 118
forks: 11
language: "JavaScript"
topics: ["agent-skills", "canvas", "claude-code", "headless-chrome", "motion-graphics", "video", "webcodecs"]
license: "MIT"
defaultBranch: "main"
snapshotDate: "2026-11-17"
pushedAt: "2026-11-16T19:27:58Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# motlab

A video engine where every scene is code, and an agent skill that writes the scenes for you.

npm install -g @motlab/cli && npx @motlab/cli setup

Demo · Install · Quick start · Speed · How it works · Docs · FAQ · Roadmap

*图片：CI*
*图片：MIT license*
*图片：Node.js 24+*


---

Every scene is a canvas page with one function, `renderAt(t)`, that draws the frame at time `t`. motlab plays the pages in a web viewer where you step through them frame by frame, and renders them to MP4 in headless Chrome. You hand your agent a folder of references (logos, screenshots, footage, fonts, music, voice) and a direction, and it builds every scene, opens the viewer and revises from your notes. No AI image or video model is involved.

The ad above (19 seconds, 7 scenes) was made with motlab and its skill, reviewed in the viewer and exported at 4K. The preview is silent; watch it with sound.

## What it does

- Your agent writes each scene as a canvas page, from your references and a short brief.
- The viewer plays the real pages with their audio, frame by frame, with a timeline you can zoom and step through.
- You point at what to change: click a frame, drag a box over a part of it, or mark a time range, and type a note on it. The agent reads every note from `selection.json` and works through them by number.
- Versions of a project sit side by side in the viewer, so a second cut does not overwrite the first.
- Export renders 720p, 1080p, 1440p or 4K MP4, with the scenes' transitions, music and voice mixed in.
- Frames are encoded with WebCodecs inside the page, so they never leave Chrome as images. On a GPU that made it 2 to 4 times as fast as Remotion and HyperFrames on the benchmark scene.
- A second skill, `motlab-assets`, builds reusable asset kits the same way: icons, illustrations, 2D characters with a rig, transitions, 3D objects and textures, rendered to transparent PNG plus SVG, or GLB, FBX and OBJ with PBR textures. Every video that uses the kit shares one look.

## Watch the demo

Two minutes in English, made with motlab too: the install, the brief to the agent, the build, playing it in the viewer, notes on frames, versions, the revision and the export.

https://github.com/user-attachments/assets/522d1db2-a0bd-43bd-84b7-9f071f224854

## Install

You need Node 24 or newer, Google Chrome or Chromium, and ffmpeg with ffprobe on PATH. Python 3 is optional and only used by the skills' helper scripts. Blender is optional too, for the asset skill's main 3D path.

```bash
npm install -g @motlab/cli
npx @motlab/cli setup
```

npm installs the engine. Setup copies both skills to your agent's skill folder, checks the machine, and makes sure the `motlab` command works: where npm's folder is not on PATH (nvm for Windows), it adds the command to `~/.local/bin`. After that it is `motlab` everywhere, and `motlab doctor` checks the machine again at any time.

Setup installs the skills for Claude Code unless you name another agent:

| Your agent | Setup command |
|---|---|
| Claude Code | `npx @motlab/cli setup` |
| Codex, Cursor, OpenCode, GitHub Copilot, Gemini CLI, Amp, Windsurf | `npx @motlab/cli setup --skill agents` |
| Antigravity (App and CLI) | `npx @motlab/cli setup --skill antigravity` |
| Several of them | `npx @motlab/cli setup --skill claude,agents,antigravity` |
| Any other agent | `npx @motlab/cli setup --skill-dir ` |

Running it again for another agent adds the skills there too. `--dry-run` shows every step first, and `--link` links the skills instead of copying them. Start a new agent session afterwards so it loads them.

From a clone instead, to work on motlab


```bash
git clone https://github.com/staryone/motlab.git
cd motlab
node install.js
```

The installer runs `npm ci`, puts a `motlab` command in `~/.local/bin` and copies the skills. It takes the same options, plus `--skill none` for no skills.


Later, `motlab update` tells you when a new version is out and how to get it (from a clone it pulls it from GitHub itself), and `motlab uninstall` removes the skills and motlab's own files again.

Install guide and per-OS notes · Instructions for an agent doing the install

## Quick start

1. Run `motlab edit example` in a folder that holds the sample project. In a clone that is the clone itself; after an npm install, copy `example/` out of the engine folder that `motlab --help` prints. It starts the viewer in the background, opens the sample project and prints its address, `http://127.0.0.1:4173/p/example/`. Space plays, the arrow keys on the timeline step one frame, Ctrl+scroll zooms the timeline, and a drag on the preview marks a box.
2. To make your own video, put your references in a folder and ask your agent, for example:

   ```text
   Make a 20 second portrait promo for my app with motlab. The references are in ./promo-refs.
   ```

3. The agent plans the shots, writes the scenes and starts the viewer. Click the frame you mean, or drag a box over the part and type a note right on it. Notes can be left all over the video and handed over at once, so "this one" or "all the notes" is enough.
4. When you are happy, press Export in the top right. The video goes to the project's `out/` folder.

The viewer keeps running in the background for every project: `motlab stop` ends it, `motlab restart` starts it again, and `motlab start` starts it without opening a project. Its text is in English or Indonesian, following your browser, and the project menu switches it. You can also render from the command line:

```bash
motlab render example --scale 1
```

## Speed

The same scene (a moving gradient, 160 animated cards with numbers, text) at 1080p, 300 frames, rendered by three tools on one laptop (Ryzen 7 5800H, RTX 3060 Laptop, Windows 11) with the same Chrome:

| Tool | Render time | Frames per second | Compared with motlab |
|---|---|---|---|
| **motlab** | 9.5 s (`--encoder sw`), 12.6 s (default) | 31.5, 23.7 | |
| HyperFrames 0.9.52, fastest setting (1 worker) | 27.2 s | 11.0 | 2.2 to 2.9 times as long |
| Remotion 4.0.543, fastest setting (concurrency 1) | 30.7 s | 9.8 | 2.4 to 3.2 times as long |

Time is the whole command, the median of three runs. At 4K the same scene took motlab 13.1 to 19.4 s and the fastest of the other two 48.9 s.

Remotion and HyperFrames drew on the laptop's integrated Radeon. motlab on the same Radeon took 8.0 to 12.0 s at 1080p and 13.2 to 22.5 s at 4K. With Chrome drawing in software instead of on a GPU, motlab was still the fastest at 1080p (19.2 s against 28.3 s for HyperFrames), but at 4K HyperFrames was faster (43.4 s against 60.7 s).

This is one scene on one machine; macOS and Linux were not measured. The other settings, quality (SSIM) and file sizes are in the benchmark, and bench/ runs it again.

## How it works

1. A project is a `project.json` that lists scene pages and audio files.
2. A scene page is plain HTML with a ``, `window.renderAt(t)`, `window.TOTAL` and `window.ready`. Everything visible is a function of time, so the preview, the stills and the render draw the same frames.
3. The viewer (`motlab start`, or `motlab edit` to open a project in it) shows the real pages in iframes with their audio through WebAudio, and saves your clicks and notes to `selection.json`.
4. `motlab render` opens headless Chrome per scene and encodes the frames with `VideoEncoder` inside the page. ffmpeg only copies streams, joins the parts, sets the colour tags and adds the audio.

```text
project.json + scene pages (canvas, renderAt(t)) + audio files
  |
  +-- motlab edit    viewer: the real pages in iframes, WebAudio audio, selection.json
  +-- motlab render  headless Chrome per scene -> VideoEncoder in the page -> MP4 parts
                     -> ffmpeg -c copy: join, colour tags, audio -> out/.mp4
```

Footage is decoded inside the page with Mediabunny, so a scene can cut and trim video files and draw over them. DOM-based engines take a screenshot of every frame and pipe the images to ffmpeg; encoding inside the page skips that, which is where the gap in Speed comes from. The encoder rules and the measured quirks are in rendering.

## Documentation

| Need | Read |
|---|---|
| Install, update, per-OS notes | Install, Agent install |
| Projects, scenes, audio and footage | Projects |
| The viewer, keys and `selection.json` | Viewer |
| Commands, options and the page contract | Command line |
| How a render works, encoders, measurements, quirks | Rendering |
| What the skill does and its references | SKILL.md, skill references |
| Asset kits: tokens, 2D, 3D | motlab-assets SKILL.md, its references |
| The viewer's visual design | DESIGN.md |
| What is not built or not tested yet | Roadmap |
| Changes | Changelog |

## FAQ

Does motlab use AI image or video models?


> No. Your agent writes every scene as code, and motlab draws it frame by frame in Chrome. The pictures come from your references and from what the code draws.


Which agents does the skill work with?


> `motlab setup` and the installer copy it for Claude Code by default. `--skill agents` covers Codex, Cursor, OpenCode, GitHub Copilot, Gemini CLI, Amp and Windsurf, and `--skill antigravity` the Antigravity App and CLI. `--skill-dir` takes any other agent's skill folder.


Do I need a GPU?


> It renders faster with one, and every render prints the GPU it got on its first line. On the test laptop, with Chrome drawing in software instead, renders took 2.8 to 4.5 times as long. A machine that has no GPU at all, such as a cloud server, has not been tested, and neither has a 3D scene without a GPU.


Does it run on macOS and Linux?


> Not tested properly yet. CI runs the tests, the end-to-end renders among them, on an Ubuntu runner, but no real video has been made on Linux, and nothing has run on macOS (the Chrome paths and the Metal flag are in the code). Everything else was built and measured on one Windows laptop.


Can I use it without an agent?


> Yes. A scene is a plain HTML page you can write by hand, `motlab edit` opens the viewer, and `motlab render` exports from the command line. The page contract is in the command line docs.


Where do my notes go?


> Into `selection.json` in the project folder, with a picture of each box or point in `selection/`. The agent reads that file, so you do not have to describe the frame in chat.


## Status

motlab is young and has been built and measured on one Windows laptop with an RTX 3060. The skill has made two real videos from start to finish, a 2-minute demo of motlab in 10 scenes and a 19-second ad in 7, both rendered at 4K, and the viewer has been tried with a 45-scene project. Alpha output is not built. The Blender path has rendered a whole test sequence on Blender 5.2, played by a scene page into an MP4, and the asset skill has baked, exported and re-imported test assets, a Rigify rig among them. The roadmap lists what is open.

## Contributing

Read CONTRIBUTING.md first. Agents working in this repository follow AGENTS.md. Report security issues privately, as described in SECURITY.md.

```bash
npm test
```

## License

MIT. The scene transitions come from gl-transitions (MIT); THIRD_PARTY_NOTICES.md has their licence and the libraries motlab installs or loads. Fonts, footage, music and other files you bring into a project keep their own licences.
