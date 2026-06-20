#!/usr/bin/env python3
"""自动生成 GitHub 每日精选博客文章。

从 GitHub Search API 获取最近热度最高的新建开源项目，
过滤垃圾/盗版/加密诈骗后，生成一篇中文精选文章 + SVG 封面图。

用法:
    python scripts/generate_daily_digest.py          # 生成今天的文章
    python scripts/generate_daily_digest.py --dry-run # 只打印不写入
"""

import io
import json
import os
import re
import sys
import urllib.request
import urllib.parse
from datetime import datetime, timezone, timedelta

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

POSTS_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "content", "posts")
HERO_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "hero")

BJT = timezone(timedelta(hours=8))
today = datetime.now(BJT)
date_str = today.strftime("%Y-%m-%d")

DRY_RUN = "--dry-run" in sys.argv

# ── Spam detection ──────────────────────────────────────────────

SPAM_PATTERNS = [
    # Keyword-stuffed descriptions (repeated phrases)
    (r"(\b\w+\b).*\1.*\1.*\1.*\1.*\1", "keyword_stuffing"),
    # Crypto trading bots
    (r"(?i)(trading\s*bot|arbitrage\s*bot|sniper\s*bot|meme[\s-]*coin)",
     "crypto_bot"),
    # Pirated software / warez
    (r"(?i)(keygen|activator|crack|license\s*key|patcher|pre[\s-]*activated)",
     "warez"),
    # Roblox executors
    (r"(?i)(roblox\s*(script|execut|hub)|blox\s*fruit)",
     "roblox_executor"),
    # Fake QuickBooks / cracked desktop software
    (r"(?i)(quickbooks\s*desktop.*workflow|\b(lsfg|reiboot|tenorshare)\b)",
     "fake_desktop_soft"),
    # Crypto sportsbook / betting
    (r"(?i)(crypto\s*sportsbook|world\s*cup.*bet|betting\s*platform)",
     "crypto_betting"),
    # Stock/template spam with no real description
    (r"^(暂无描述)?$", "no_description"),
    # Description too short + suspicious name pattern
    (r"^[A-Z][a-z]+ [A-Z][a-z]+$", "suspicious_brief"),
    # "Professional" seed phrase / wallet "toolkit" (usually scams)
    (r"(?i)(seed\s*(phrase|generator)|mnemonic.*(generator|recovery|brute))",
     "crypto_scam"),
    # "Lossless Scaling" / game performance cracks
    (r"(?i)(lossless\s*scaling.*activator|frame\s*generation.*keygen)",
     "game_crack"),
]

SPAM_TOPIC_KEYWORDS = [
    "polymarket", "pumpfun", "pump-fun", "sportsbook",
    "trading-bot", "arbitrage", "sniper", "meme-coin",
    "keygen", "activator", "cracked", "warez",
    "roblox", "blox-fruit", "delta-exec",
    "seed-phrase", "mnemonic", "brute-force",
    "quickbooks", "lossless-scaling", "reiboot",
]

QUALITY_TOPICS = [
    "ai", "agent", "llm", "ml", "framework", "tool", "sdk",
    "rust", "python", "typescript", "go", "react", "vue",
    "cli", "api", "server", "database", "compiler",
    "language", "model", "inference", "training",
    "web", "browser", "editor", "vscode", "plugin",
    "open-source", "library", "utility",
]


def is_spam(repo: dict) -> tuple[bool, str]:
    """Check if a repo looks like spam/scam. Returns (is_spam, reason)."""
    name = repo.get("full_name", "").lower()
    desc = (repo.get("description") or "暂无描述").lower()
    topics = [t.lower() for t in repo.get("topics", [])]

    # Check description patterns
    for pattern, reason in SPAM_PATTERNS:
        if re.search(pattern, desc):
            return True, reason

    # Check topic keywords
    spam_score = 0
    for kw in SPAM_TOPIC_KEYWORDS:
        if kw in name or kw in desc:
            spam_score += 1
        for t in topics:
            if kw in t:
                spam_score += 1

    if spam_score >= 3:
        return True, "topic_spam_accumulated"

    # Duplicate descriptions (exact match across repos)
    # handled at the collection level

    return False, ""


def repo_quality_score(repo: dict) -> int:
    """Higher score = more likely a quality project."""
    score = 0
    name = repo.get("full_name", "").lower()
    desc = (repo.get("description") or "").lower()
    lang = (repo.get("language") or "").lower()
    topics = [t.lower() for t in repo.get("topics", [])]
    stars = repo.get("stargazers_count", 0)

    # Bonus for having a real description
    if len(desc) > 30:
        score += 2
    # Bonus for quality topics
    for kw in QUALITY_TOPICS:
        if kw in name or kw in desc:
            score += 1
        for t in topics:
            if kw in t:
                score += 1
    # Bonus for real language
    if lang and lang != "未知":
        score += 1
    # Bonus for organic-looking star range
    if 30 <= stars <= 5000:
        score += 1

    return score


# ── GitHub API ──────────────────────────────────────────────────

def github_api_headers() -> dict:
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "blog-daily-digest",
    }
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers


def github_search(query: str, per_page: int = 30) -> list[dict]:
    url = f"https://api.github.com/search/repositories?{
        urllib.parse.urlencode({
            'q': query, 'sort': 'stars', 'order': 'desc',
            'per_page': per_page
        })
    }"
    req = urllib.request.Request(url, headers=github_api_headers())
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read())["items"]
    except Exception as e:
        print(f"  GitHub API error: {e}")
        return []


# ── Trending fetch ──────────────────────────────────────────────


def get_trending_repos() -> list[dict]:
    """Fetch trending repos, with spam filtering and weekend fallback."""
    is_weekend = today.weekday() >= 5  # Saturday=5, Sunday=6

    if is_weekend:
        window_days = 3
        min_stars = 50
    else:
        window_days = 1
        min_stars = 30

    since = (today - timedelta(days=window_days)).strftime("%Y-%m-%d")
    query = f"created:>={since} stars:>={min_stars}"
    print(f"  Query: {query} (weekend={is_weekend}, window={window_days}d)")

    repos = github_search(query, per_page=30)

    # If results are thin, widen
    if len(repos) < 15:
        wider_since = (today - timedelta(days=window_days + 2)).strftime("%Y-%m-%d")
        query2 = f"created:>={wider_since} stars:>={max(min_stars - 20, 20)}"
        extra = github_search(query2, per_page=20)
        seen = {r["full_name"] for r in repos}
        for r in extra:
            if r["full_name"] not in seen:
                repos.append(r)

    # Filter spam
    filtered = []
    seen_descs = {}
    for r in repos:
        spam, reason = is_spam(r)
        if spam:
            print(f"  Filtered: {r['full_name']} ({reason})")
            continue
        # Deduplicate by description
        desc = (r.get("description") or "").strip()
        if desc and desc in seen_descs:
            print(f"  Filtered: {r['full_name']} (dup desc with "
                  f"{seen_descs[desc]})")
            continue
        if desc:
            seen_descs[desc] = r["full_name"]
        filtered.append(r)

    # Sort by quality score then stars, interleaved
    for r in filtered:
        r["_quality"] = repo_quality_score(r)
    filtered.sort(key=lambda r: (r["_quality"], r.get(
        "stargazers_count", 0)), reverse=True)

    return filtered[:10]


# ── Formatting ──────────────────────────────────────────────────


def format_stars(n: int) -> str:
    if n >= 1000:
        return f"{n / 1000:.1f}k"
    return str(n)


LANG_COLORS = {
    "Python": "#3572A5", "JavaScript": "#f1e05a", "TypeScript": "#3178c6",
    "Go": "#00ADD8", "Rust": "#dea584", "Java": "#b07219",
    "C++": "#f34b7d", "C": "#555555", "Ruby": "#701516",
    "PHP": "#4F5D95", "Swift": "#F05138", "Kotlin": "#A97BFF",
    "Shell": "#89e051", "Lua": "#000080", "Zig": "#ec915c",
    "Dart": "#00B4AB", "Vue": "#41b883", "Svelte": "#ff3e00",
}


def generate_post(repos: list[dict]) -> str:
    repo_lines = []
    for i, repo in enumerate(repos, 1):
        name = repo["full_name"]
        desc = repo.get("description") or "暂无描述"
        stars = repo.get("stargazers_count", 0)
        lang = repo.get("language") or "未知"
        url = repo["html_url"]
        topics = repo.get("topics", [])[:5]

        topic_tags = " ".join(f"`{t}`" for t in topics) if topics else ""

        repo_lines.append(f"""### {i}. [{name}]({url})

> {desc}

⭐ **{format_stars(stars)}** stars · 语言: **{lang}** {topic_tags}""")

    repos_md = "\n\n".join(repo_lines)

    return f"""---
title: "GitHub 每日精选 {date_str}"
description: "今天 GitHub 上最火的开源项目，从 AI 工具到系统编程，每日精选不容错过。"
pubDate: {date_str}
heroImage: "/hero/daily-{date_str}.svg"
category: "技术日报"
tags: ["GitHub", "开源", "每日精选", "技术"]
featured: false
---

每天从 GitHub 挖掘最值得关注的新开源项目。这些项目在过去 24 小时内获得了大量 Star 关注，代表了社区的最新热点方向。

<!--more-->

{repos_md}

---

> 数据来源: GitHub Trending · 更新时间: {today.strftime("%Y-%m-%d %H:%M")} CST
"""


def generate_svg(repos: list[dict]) -> str:
    hue = (today.timetuple().tm_yday * 37) % 360
    hue2 = (hue + 45) % 360
    day_label = today.strftime("%m.%d")

    top3 = []
    for r in repos[:3]:
        short = r["name"]
        if len(short) > 18:
            short = short[:16] + ".."
        top3.append(short)

    top3_text = " · ".join(top3) if top3 else "Loading..."

    repo_lines_svg = []
    for i, r in enumerate(repos[:6]):
        y = 230 + i * 34
        name = r["name"][:20]
        stars = format_stars(r.get("stargazers_count", 0))
        lang = r.get("language") or "?"
        color = LANG_COLORS.get(lang, "#888")
        repo_lines_svg.append(f"""
    <circle cx="530" cy="{y - 4}" r="5" fill="{color}" opacity="0.8"/>
    <text x="545" y="{y}" font-family="system-ui, sans-serif" font-size="14"
          fill="white" opacity="0.9">{name}</text>
    <text x="780" y="{y}" font-family="system-ui, sans-serif" font-size="12"
          fill="white" opacity="0.5" text-anchor="end">⭐ {stars}</text>""")

    repos_svg = "\n".join(repo_lines_svg)

    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 506"
     width="900" height="506">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="hsl({hue}, 60%, 18%)"/>
      <stop offset="100%" stop-color="hsl({hue2}, 50%, 12%)"/>
    </linearGradient>
  </defs>
  <rect width="900" height="506" rx="16" fill="url(#bg)"/>
  <circle cx="800" cy="50" r="120" fill="white" opacity="0.04"/>
  <circle cx="120" cy="460" r="80" fill="white" opacity="0.03"/>
  <rect x="120" y="30" width="100" height="28" rx="14"
        fill="hsl({hue}, 70%, 50%)" opacity="0.8"/>
  <text x="170" y="49" font-family="system-ui, sans-serif" font-size="12"
        font-weight="600" fill="white" text-anchor="middle">DAILY</text>
  <text x="130" y="110" font-family="system-ui, sans-serif" font-size="48"
        font-weight="700" fill="white" opacity="0.15">{day_label}</text>
  <text x="130" y="165"
        font-family="'Noto Serif SC', 'LXGW WenKai', Georgia, serif"
        font-size="36" font-weight="700" fill="white">GitHub 每日精选</text>
  <text x="130" y="210" font-family="system-ui, sans-serif" font-size="16"
        fill="white" opacity="0.6">{top3_text}</text>
  {repos_svg}
  <line x1="130" y1="466" x2="850" y2="466" stroke="white"
        stroke-width="1" opacity="0.1"/>
  <text x="130" y="490" font-family="system-ui, sans-serif" font-size="11"
        fill="white" opacity="0.3">github.com/trending · {date_str}</text>
</svg>'''


# ── Main ────────────────────────────────────────────────────────


def main():
    print(f"  GitHub Daily Digest ({date_str})")

    # Skip if today's file already exists (avoid Actions conflict)
    post_path = os.path.join(POSTS_DIR, f"daily-{date_str}.md")
    if os.path.exists(post_path):
        print(f"  Post already exists: {post_path}, skipping.")
        return

    print(f"  Fetching trending repos...")

    repos = get_trending_repos()
    if not repos:
        print("  No repos found, skipping.")
        return

    print(f"  {len(repos)} repos selected:")
    for r in repos:
        print(f"     "
              f"{format_stars(r['stargazers_count']):>6}  "
              f"{r['full_name']}")

    if DRY_RUN:
        print(f"\n  --- DRY RUN: daily-{date_str}.md ---")
        print(generate_post(repos)[:500])
        print("  ...")
        return

    with open(post_path, "w", encoding="utf-8") as f:
        f.write(generate_post(repos))
    print(f"  Post: src/content/posts/daily-{date_str}.md")

    svg_path = os.path.join(HERO_DIR, f"daily-{date_str}.svg")
    os.makedirs(HERO_DIR, exist_ok=True)
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(generate_svg(repos))
    print(f"  SVG:  public/hero/daily-{date_str}.svg")

    print(f"  Done! {len(repos)} projects.")


if __name__ == "__main__":
    main()
