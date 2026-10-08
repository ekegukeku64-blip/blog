---
title: "bas3line/ascii"
owner: "bas3line"
name: "ascii"
fullName: "bas3line/ascii"
description: "Animated ascii art for web pages, in TypeScript: React, Next.js, Astro, or one HTML tag"
sourceUrl: "https://github.com/bas3line/ascii"
stars: 283
forks: 16
language: "TypeScript"
topics: ["animation", "ascii", "ascii-art", "astro", "nextjs", "react", "typescript", "web-components"]
license: "MIT"
homepage: "https://ascii.rest"
defaultBranch: "main"
snapshotDate: "2026-10-08"
pushedAt: "2026-10-07T18:10:32Z"
---

> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。

# ascii.rest


  
    
    
  


Sponsored by  Cloudflare


Animated ascii art for web pages.
169 pieces for React, Next.js, Astro or plain HTML.

[ascii.rest](https://ascii.rest) · install · pieces · contributing

*图片：by @bas3line*
*图片：CI*
*图片：MIT*
*图片：TypeScript*


Written in TypeScript by @bas3line. 191 pieces, from full-colour scenes to loaders, charts, language logos, Linux distros, spinning shapes and physics. The donut above turns on a page with one tag: ``. See them all at [ascii.rest](https://ascii.rest).


  
  
  
  
  
  


## Why

I've always been a fan of Markdown files and terminal-style websites: plain text, one monospace face, nothing that moves without a reason. The kind of quiet web that [planetscale.com](https://planetscale.com) does well. So I made this, a way to put a little motion on pages like that without giving up the style. If you like minimalism, this library is for you.

## Install

```sh
npm install github:bas3line/ascii
```

It installs as `ascii.rest` and builds itself on install. Or skip installing: the HTML tag loads everything from ascii.rest.

## React and Next.js

```tsx
import { Ascii } from "ascii.rest/react";
import { donut } from "ascii.rest/pieces";


                          // fetched by name when it mounts

                            // a logo in one ink
```

`Ascii` is a client component (`"use client"`), so it goes straight into the Next.js app router. Text pieces draw into a `` in its colour and font size; the coloured ones, scenes, logos and distros, draw onto a `` as wide as its container, or into a `` in one ink with `mono`.

## Astro

```astro
---
import Ascii from "ascii.rest/astro";
---


```

The first frame is rendered on the server, so the page is whole before any script runs; the piece starts playing once the page loads.

## HTML, no build step

```html


```

Style it like text: `ascii-art { font-size: 10px; color: teal; }`. The logos and distros come in their own colours; add `mono`, ``, to draw one in the text's colour instead. In a bundled app, `import "ascii.rest/element"` defines the same tag.

## TypeScript, anywhere

```ts
import { mount } from "ascii.rest";
import { donut } from "ascii.rest/pieces";

const stop = mount(document.querySelector("pre")!, donut, { fps: 12 });
```

## API

### `mount(element, piece, options?)`

Plays `piece` in `element` and returns a function that stops it.

- `element`: a `` for text pieces, a `` for the coloured ones (`canvas.has(name)` tells you which). A coloured piece in a `` is drawn in one ink.
- `piece`: a piece module, such as `donut` from `ascii.rest/pieces`.
- `options`: overrides the piece's option defaults, plus `fps` to change its frame rate, and `motion: true` to play even when the reader prefers reduced motion. Pieces hold their first frame for those readers by default; set `motion` only behind a control the reader chooses, like the site's `[play anyway]`.

### `load`, `names`, `canvas`, `isPiece`

From `ascii.rest`. `load["night-coast"]()` imports any piece by name, `names` lists every name, `canvas` is the set of pieces drawn on a canvas, and `isPiece(name)` narrows a string to a piece name.

### `` (React)

| prop | type | |
| --- | --- | --- |
| `piece` | piece module or name | a module is bundled, a name is fetched when it mounts |
| `options` | object | option overrides, and `fps` |
| `label` | string | what it shows, for screen readers; the piece's name by default |
| `mono` | boolean | draws a coloured piece in one ink, in a `` |
| `className`, `style` | | passed to the `` or `` |

### `` (Astro)

`piece` (a name), `options`, `fps`, `label`, `mono` and `class`.

### ``

| attribute | |
| --- | --- |
| `piece` | a piece's name: `donut`, `night-coast` |
| `src` | or the URL of any module that follows the piece contract |
| `fps` | overrides the frame rate |
| `options` | JSON overriding the option defaults: `'{"text":"hello"}'` |
| `label` | what it shows, for screen readers |
| `mono` | draws a coloured piece in one ink, the text's colour |

## Browser support

Any current browser: it needs ES modules, custom elements and `IntersectionObserver`, plus `ResizeObserver` for the coloured pieces. Importing any module on a server, for server rendering, is safe: nothing touches the DOM until a piece is mounted.

Many pieces draw with box drawing and block glyphs (`─ │ ╭ █ ▄ ░`). Where the system monospace face has none, as on Android, the tag and the Astro component take them from "ascii.rest mono", a 3 KB cut of JetBrains Mono (OFL) served by ascii.rest, so every row keeps its width. Only a browser that lacks the glyphs fetches it. With React, put it in your own ``'s font stack:

```css
@font-face {
  font-family: "ascii.rest mono";
  src: url("https://ascii.rest/fonts/ascii-rest-mono.woff2") format("woff2");
  unicode-range: U+00B0, U+00B7, U+2022, U+2500-259F, U+25CF;
}
pre.art { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", "ascii.rest mono", monospace; }
```

## Pieces

| category | pieces |
| --- | --- |
| scenes | [alpine dawn](https://ascii.rest/alpine-dawn/), [aurora fjord](https://ascii.rest/aurora-fjord/), [deep reef](https://ascii.rest/deep-reef/), [desert night](https://ascii.rest/desert-night/), [earthrise](https://ascii.rest/earthrise/), [kyoto dusk](https://ascii.rest/kyoto-dusk/), [marine drive](https://ascii.rest/marine-drive/), [misty forest](https://ascii.rest/misty-forest/), [night coast](https://ascii.rest/night-coast/), [ocean sunset](https://ascii.rest/ocean-sunset/), [storm plains](https://ascii.rest/storm-plains/), [taj dawn](https://ascii.rest/taj-dawn/), [varanasi ghats](https://ascii.rest/varanasi-ghats/) |
| ui | [boot log](https://ascii.rest/boot-log/), [box frames](https://ascii.rest/box-frames/), [calendar](https://ascii.rest/calendar/), [digital clock](https://ascii.rest/digital-clock/), [dividers](https://ascii.rest/dividers/), [file tree](https://ascii.rest/file-tree/), [form controls](https://ascii.rest/form-controls/), [not found](https://ascii.rest/not-found/), [progress bar](https://ascii.rest/progress-bar/), [skeleton](https://ascii.rest/skeleton/), [spinners](https://ascii.rest/spinners/), [terminal](https://ascii.rest/terminal/) |
| data | [bar chart](https://ascii.rest/bar-chart/), [candlesticks](https://ascii.rest/candlesticks/), [cpu meters](https://ascii.rest/cpu-meters/), [equalizer](https://ascii.rest/equalizer/), [gauge](https://ascii.rest/gauge/), [heartbeat](https://ascii.rest/heartbeat/), [heatmap](https://ascii.rest/heatmap/), [radar](https://ascii.rest/radar/), [sparkline](https://ascii.rest/sparkline/), [uptime bar](https://ascii.rest/uptime-bar/) |
| type | [big text](https://ascii.rest/big-text/), [dissolve](https://ascii.rest/dissolve/), [glitch](https://ascii.rest/glitch/), [marquee](https://ascii.rest/marquee/), [morse](https://ascii.rest/morse/), [scramble](https://ascii.rest/scramble/), [split-flap](https://ascii.rest/split-flap/), [typewriter](https://ascii.rest/typewriter/), [wave text](https://ascii.rest/wave-text/) |
| logos | [c](https://ascii.rest/c/), [c#](https://ascii.rest/csharp/), [c++](https://ascii.rest/cpp/), [clojure](https://ascii.rest/clojure/), [css](https://ascii.rest/css/), [dart](https://ascii.rest/dart/), [elixir](https://ascii.rest/elixir/), [erlang](https://ascii.rest/erlang/), [go](https://ascii.rest/go/), [haskell](https://ascii.rest/haskell/), [html](https://ascii.rest/html/), [java](https://ascii.rest/java/), [javascript](https://ascii.rest/javascript/), [julia](https://ascii.rest/julia/), [kotlin](https://ascii.rest/kotlin/), [lua](https://ascii.rest/lua/), [ocaml](https://ascii.rest/ocaml/), [perl](https://ascii.rest/perl/), [php](https://ascii.rest/php/), [python](https://ascii.rest/python/), [r](https://ascii.rest/r/), [ruby](https://ascii.rest/ruby/), [rust](https://ascii.rest/rust/), [scala](https://ascii.rest/scala/), [swift](https://ascii.rest/swift/), [typescript](https://ascii.rest/typescript/), [zig](https://ascii.rest/zig/) |
| distros | [almalinux](https://ascii.rest/almalinux/), [alpine linux](https://ascii.rest/alpine-linux/), [arch linux](https://ascii.rest/arch-linux/), [centos](https://ascii.rest/centos/), [debian](https://ascii.rest/debian/), [deepin](https://ascii.rest/deepin/), [elementary os](https://ascii.rest/elementary-os/), [endeavouros](https://ascii.rest/endeavouros/), [fedora](https://ascii.rest/fedora/), [gentoo](https://ascii.rest/gentoo/), [kali linux](https://ascii.rest/kali-linux/), [linux mint](https://ascii.rest/linux-mint/), [manjaro](https://ascii.rest/manjaro/), [nixos](https://ascii.rest/nixos/), [opensuse](https://ascii.rest/opensuse/), [pop!_os](https://ascii.rest/pop-os/), [red hat](https://ascii.rest/red-hat/), [rocky linux](https://ascii.rest/rocky-linux/), [tux](https://ascii.rest/tux/), [ubuntu](https://ascii.rest/ubuntu/), [void linux](https://ascii.rest/void-linux/), [zorin os](https://ascii.rest/zorin-os/) |
| shapes | [cube](https://ascii.rest/cube/), [dna helix](https://ascii.rest/dna-helix/), [donut](https://ascii.rest/donut/), [glxgears](https://ascii.rest/glxgears/), [gyroscope](https://ascii.rest/gyroscope/), [heart](https://ascii.rest/heart/), [icosahedron](https://ascii.rest/icosahedron/), [mobius strip](https://ascii.rest/mobius-strip/), [spring](https://ascii.rest/spring/), [tesseract](https://ascii.rest/tesseract/), [torus knot](https://ascii.rest/torus-knot/), [twisted ring](https://ascii.rest/twisted-ring/) |
| space | [black hole](https://ascii.rest/black-hole/), [earth](https://ascii.rest/earth/), [eclipse](https://ascii.rest/eclipse/), [galaxy](https://ascii.rest/galaxy/), [moon phases](https://ascii.rest/moon-phases/), [planet](https://ascii.rest/planet/), [rocket](https://ascii.rest/rocket/), [saptarishi](https://ascii.rest/saptarishi/), [solar system](https://ascii.rest/solar-system/), [starfield](https://ascii.rest/starfield/), [three-body](https://ascii.rest/three-body/) |
| physics | [bouncing balls](https://ascii.rest/bouncing-balls/), [chladni plate](https://ascii.rest/chladni/), [double pendulum](https://ascii.rest/double-pendulum/), [falling sand](https://ascii.rest/falling-sand/), [flag](https://ascii.rest/flag/), [fountain](https://ascii.rest/fountain/), [harmonograph](https://ascii.rest/harmonograph/), [lorenz attractor](https://ascii.rest/lorenz/), [newton's cradle](https://ascii.rest/newtons-cradle/), [pendulum wave](https://ascii.rest/pendulum-wave/), [plucked string](https://ascii.rest/plucked-string/), [pond ripples](https://ascii.rest/pond-ripples/), [smoke](https://ascii.rest/smoke/), [wave interference](https://ascii.rest/wave-interference/) |
| nature | [aurora](https://ascii.rest/aurora/), [bonsai](https://ascii.rest/bonsai/), [campfire](https://ascii.rest/campfire/), [cherry blossom](https://ascii.rest/cherry-blossom/), [contour map](https://ascii.rest/contour-map/), [fern](https://ascii.rest/fern/), [fireflies](https://ascii.rest/fireflies/), [fractal tree](https://ascii.rest/fractal-tree/), [landscape](https://ascii.rest/landscape/), [lightning](https://ascii.rest/lightning/), [rain](https://ascii.rest/rain/), [ruled mountains](https://ascii.rest/ruled-mountains/), [sea swell](https://ascii.rest/sea-swell/), [snowfall](https://ascii.rest/snowfall/), [sunrise](https://ascii.rest/sunrise/), [wind](https://ascii.rest/wind/) |
| creatures | [aquarium](https://ascii.rest/aquarium/), [butterfly](https://ascii.rest/butterfly/), [cat](https://ascii.rest/cat/), [fox](https://ascii.rest/fox/), [jellyfish](https://ascii.rest/jellyfish/), [owl](https://ascii.rest/owl/), [snake](https://ascii.rest/snake/), [spider](https://ascii.rest/spider/), [starlings](https://ascii.rest/starlings/), [whale](https://ascii.rest/whale/) |
| objects | [analog clock](https://ascii.rest/analog-clock/), [candle](https://ascii.rest/candle/), [coffee](https://ascii.rest/coffee/), [ferris wheel](https://ascii.rest/ferris-wheel/), [hawa mahal](https://ascii.rest/hawa-mahal/), [hourglass](https://ascii.rest/hourglass/), [kite](https://ascii.rest/kite/), [lava lamp](https://ascii.rest/lava-lamp/), [lighthouse](https://ascii.rest/lighthouse/), [skyline](https://ascii.rest/skyline/), [sundial](https://ascii.rest/sundial/), [train](https://ascii.rest/train/), [vinyl](https://ascii.rest/vinyl/), [windmill](https://ascii.rest/windmill/) |
| generative | [epicycles](https://ascii.rest/epicycles/), [flow field](https://ascii.rest/flow-field/), [glider gun](https://ascii.rest/glider-gun/), [hilbert curve](https://ascii.rest/hilbert-curve/), [julia set](https://ascii.rest/julia-set/), [langton's ant](https://ascii.rest/langtons-ant/), [mandelbrot](https://ascii.rest/mandelbrot/), [maze](https://ascii.rest/maze/), [plasma](https://ascii.rest/plasma/), [reaction diffusion](https://ascii.rest/reaction-diffusion/), [rule 30](https://ascii.rest/rule-30/), [sierpinski](https://ascii.rest/sierpinski/), [voronoi](https://ascii.rest/voronoi/) |
| effects | [doom fire](https://ascii.rest/doom-fire/), [fireworks](https://ascii.rest/fireworks/), [matrix rain](https://ascii.rest/matrix-rain/), [rotozoomer](https://ascii.rest/rotozoomer/), [sparks](https://ascii.rest/sparks/), [synthwave](https://ascii.rest/synthwave/), [tunnel](https://ascii.rest/tunnel/), [tv static](https://ascii.rest/tv-static/) |

The logos and distros are drawn from devicon (MIT) and Simple Icons (CC0). Each is a trademark of its owner, shown here to name the language or the distribution.

## Contributing

New pieces, fixes and ideas are welcome. CONTRIBUTING.md covers the piece contract, the checks and how to open a pull request, and the code of conduct applies everywhere. Found a security problem? See SECURITY.md.

## Author

Made by @bas3line. If you use it, a link back is appreciated, and so is a star.

## License

MIT, © @bas3line
