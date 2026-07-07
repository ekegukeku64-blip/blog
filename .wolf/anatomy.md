# Blog Project Anatomy

Concise file map for OpenWolf navigation. Token estimates are approximate and intended to avoid unnecessary full-file reads.

## Project config

- `package.json` — npm scripts and dependencies for Astro v6/Tailwind/Pagefind/Firebase tooling. ~1k tokens
- `package-lock.json` — locked dependency tree; avoid reading unless diagnosing install/version issues. ~80k tokens
- `astro.config.mjs` — Astro site config, integrations, build settings. ~1k tokens
- `tsconfig.json` — TypeScript compiler config. ~200 tokens
- `.gitignore` — ignored local/build artifacts. ~300 tokens
- `CLAUDE.md` — project instruction entrypoint that imports OpenWolf protocol. ~1k tokens
- `README.md` — public project overview and setup/deploy docs. ~2k tokens
- `firestore.rules` — Firebase/Firestore security rules. ~1k tokens
- `deploy.sh` — local deployment helper script. ~400 tokens

## OpenWolf

- `.wolf/cerebrum.md` — persistent project learnings, preferences, do-not-repeat list; read before code generation. ~2k tokens
- `.wolf/buglog.json` — known bugs/fixes; read before fixing user-reported or command errors. ~1k tokens
- `.wolf/memory.md` — chronological session/action log; append one-line entries after significant actions. ~1k tokens
- `.wolf/designqc-captures/` — screenshots produced by `openwolf designqc` for UI review. Images ~2.5k tokens each
- `.wolf/capture.mjs` — local screenshot capture helper. ~1k tokens
- `.wolf/*.png` / `.wolf/*.jpg` — historical visual check screenshots; read only when comparing specific UI states. Images vary

## Source entrypoints

- `src/pages/index.astro` — homepage route assembling home components and page data. ~2k tokens
- `src/pages/home.astro` — alternate/home route if used by navigation. ~1k tokens
- `src/pages/blog/index.astro` — blog listing page. ~2k tokens
- `src/pages/blog/[...slug].astro` — dynamic blog post route. ~2k tokens
- `src/pages/rss.xml.ts` — RSS feed endpoint. ~1k tokens
- `src/content.config.ts` — Astro content collection schema. ~1k tokens

## Layouts

- `src/layouts/BaseLayout.astro` — global HTML shell, metadata, shared background/effects/scripts. ~4k tokens
- `src/layouts/PostLayout.astro` — article page layout and post-specific structure. ~5k tokens

## Global styles

- `src/styles/global.css` — main stylesheet imports/design tokens/global rules. ~3k tokens
- `src/styles/base.css` — base element styling and root/body defaults. ~3k tokens
- `src/styles/components.css` — reusable component classes/surfaces/buttons/cards. ~5k tokens
- `src/styles/effects.css` — visual effects/background/ambient/ripple-like details. ~4k tokens
- `src/styles/motion.css` — animations/transitions/reduced-motion rules. ~3k tokens
- `src/styles/prose.css` — article markdown/prose typography and content styling. ~4k tokens

## Header/footer and global components

- `src/components/Header.astro` — top navigation/header. ~3k tokens
- `src/components/Footer.astro` — site footer. ~2k tokens
- `src/components/MusicPlayer.astro` — ambient audio player using local forest/rain/stream sounds. ~4k tokens
- `src/components/BackToTop.astro` — back-to-top affordance. ~1k tokens
- `src/components/PageProgress.astro` — global/page progress indicator. ~1k tokens
- `src/components/SearchBar.astro` — Pagefind/search UI. ~3k tokens
- `src/components/Analytics.astro` — analytics integration. ~1k tokens

## Homepage components

- `src/components/home/HomeHero.astro` — homepage hero, intro copy, visual hierarchy. ~4k tokens
- `src/components/home/HomeFeaturedPost.astro` — featured post block/card on homepage. ~3k tokens
- `src/components/home/HomeRecentPosts.astro` — recent posts section on homepage. ~3k tokens
- `src/components/home/HomeTechDaily.astro` — GitHub/tech daily section. ~3k tokens
- `src/components/home/HomeTaxonomy.astro` — category/tag/taxonomy homepage section. ~2k tokens
- `src/components/home/HomeFootnote.astro` — closing note/footer-like homepage section. ~1k tokens

## Blog/post components

- `src/components/PostCard.astro` — reusable post preview card/list item. ~3k tokens
- `src/components/PostNav.astro` — previous/next post navigation. ~2k tokens
- `src/components/PostStamp.astro` — post metadata/stamp treatment. ~1k tokens
- `src/components/PostAISummary.astro` — AI summary panel for posts. ~2k tokens
- `src/components/ReadingProgress.astro` — article reading progress bar. ~1k tokens
- `src/components/RelatedPosts.astro` — related articles section. ~2k tokens
- `src/components/SeriesNav.astro` — series navigation for linked posts. ~2k tokens
- `src/components/RightSidebar.astro` — article right sidebar/TOC area. ~3k tokens
- `src/components/AuthorCard.astro` — author profile card. ~2k tokens
- `src/components/Sidebar.astro` — general/sidebar widgets. ~3k tokens
- `src/components/TagCloud.astro` — tag cloud widget. ~2k tokens

## Interaction/share components

- `src/components/Bookmarks.astro` — bookmark/save UI. ~2k tokens
- `src/components/Comment.astro` — comments integration/UI. ~4k tokens
- `src/components/CopyLink.astro` — copy link interaction. ~1k tokens
- `src/components/FocusMode.astro` — article focus mode. ~2k tokens
- `src/components/FontSizeControl.astro` — article font-size controls. ~2k tokens
- `src/components/ImageLightbox.astro` — image lightbox behavior. ~3k tokens
- `src/components/ShareLike.astro` — sharing/like controls. ~3k tokens
- `src/components/ShareQR.astro` — inline SVG QR sharing; avoid data URL/external QR APIs. ~3k tokens

## Content pages

- `src/pages/about.astro` — about page. ~2k tokens
- `src/pages/archive.astro` — archive page. ~2k tokens
- `src/pages/category/[category].astro` — category listing route. ~2k tokens
- `src/pages/tag/[tag].astro` — tag listing route. ~2k tokens
- `src/pages/tags/index.astro` — all tags page. ~1k tokens
- `src/pages/github-daily.astro` — daily GitHub/tech digest listing. ~2k tokens
- `src/pages/growth.astro` — growth/learning series page. ~2k tokens
- `src/pages/now.astro` — now page. ~2k tokens
- `src/pages/friends.astro` — friends/links page. ~2k tokens
- `src/pages/guestbook.astro` — guestbook page. ~2k tokens
- `src/pages/stats.astro` — stats page. ~2k tokens
- `src/pages/timeline.astro` — timeline page. ~2k tokens
- `src/pages/sitemap-page.astro` — human-readable sitemap. ~1k tokens
- `src/pages/admin.astro` — admin page for Firebase-backed content/comment management. ~4k tokens
- `src/pages/404.astro` — not-found page. ~1k tokens

## Tool pages

- `src/pages/tools/index.astro` — tools hub. ~2k tokens
- `src/pages/tools/base64.astro` — Base64 tool. ~2k tokens
- `src/pages/tools/color.astro` — color tool. ~2k tokens
- `src/pages/tools/compress.astro` — compression tool. ~2k tokens
- `src/pages/tools/counter.astro` — text counter. ~2k tokens
- `src/pages/tools/diff.astro` — diff tool. ~3k tokens
- `src/pages/tools/github.astro` — GitHub-related utility. ~2k tokens
- `src/pages/tools/gradient.astro` — gradient generator. ~2k tokens
- `src/pages/tools/json.astro` — JSON formatter/validator. ~3k tokens
- `src/pages/tools/markdown.astro` — Markdown preview/formatter. ~3k tokens
- `src/pages/tools/password.astro` — password generator. ~2k tokens
- `src/pages/tools/qrcode.astro` — QR code generator. ~3k tokens
- `src/pages/tools/regex.astro` — regex tester. ~3k tokens
- `src/pages/tools/remove-bg.astro` — remove-background tool page. ~3k tokens
- `src/pages/tools/timestamp.astro` — timestamp converter. ~2k tokens
- `src/pages/tools/url.astro` — URL encode/decode tool. ~2k tokens
- `src/pages/tools/wechat-format.astro` — WeChat formatting tool. ~3k tokens

## Utilities/libs

- `src/lib/firebase.ts` — Firebase client setup; security-sensitive external service config. ~2k tokens
- `src/lib/adminUids.ts` — admin UID allowlist/helper. ~1k tokens
- `src/utils/draftStorage.ts` — draft persistence helper. ~2k tokens
- `src/utils/readingTime.ts` — reading-time calculation. ~1k tokens
- `src/utils/summarize.ts` — summary generation helper. ~1k tokens

## Content

- `src/content/posts/*.md` — Astro Content Collection posts; many daily/growth/blog posts. Read specific files only when editing that post. ~1-5k tokens each
- `public/hero/*` — generated hero images/SVGs for posts. Avoid reading binary images unless visually inspecting. Images vary

## Public assets

- `public/bg.jpg` — site background image. Image tokens vary
- `public/maple.jpg` — maple/forest visual asset. Image tokens vary
- `public/maple.mp4` — video asset; do not read directly unless diagnosing asset presence. Large
- `public/music/forest.wav` / `rain.wav` / `stream.wav` — ambient audio assets. Large
- `public/favicon.*`, `public/apple-touch-icon.svg` — icons. Small/image tokens vary
- `public/robots.txt`, `public/rss-style.xsl`, `public/BingSiteAuth.xml`, `public/*.txt` — SEO/search verification and RSS styling files. ~100-1k tokens each

## Scripts and automation

- `scripts/generate_daily_digest.py` — daily digest generation script. ~4k tokens
- `scripts/generate_growth_draft.py` — growth draft generation script. ~4k tokens
- `scripts/generate_weekly_picks.py` — weekly picks script. ~4k tokens
- `scripts/gen_hero_svgs.py` — hero SVG generation script. ~3k tokens
- `scripts/submit-indexnow.sh` — IndexNow submission helper. ~1k tokens
- `.github/workflows/deploy.yml` — GitHub Pages deploy workflow. ~2k tokens
- `.github/workflows/daily-growth-draft.yml` — scheduled growth draft workflow. ~2k tokens
- `.github/workflows/update-daily-links.yml` — scheduled daily links workflow. ~2k tokens

## Local/generated artifacts

- `dist/`, `dist2/`, `dist-new/`, `.astro/`, `node_modules/` — generated/build/dependency directories; avoid reading except for build artifact debugging.
- Root screenshots like `entrance-*.png`, `hero-check.png`, `glass-check.png`, `card-final-test.png`, `canvas-check.png`, `screenshot-now.png`, `roco-sprites.png` — historical local visual artifacts; read only when comparing visuals.
- `BLOG_PROMPT.md`, `HANDOVER.md` — long prompt/handoff reference docs; read only if the user asks for historical prompts/handoff context. ~8-20k tokens
