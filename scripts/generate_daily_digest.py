#!/usr/bin/env python3
"""自动生成 GitHub 每日精选博客文章。

从 GitHub Search API 获取最近 24 小时内新建的高星项目，
生成一篇中文精选文章 + SVG 封面图。

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


def github_search(query: str, per_page: int = 30) -> list[dict]:
    """Call GitHub Search API."""
    params = urllib.parse.urlencode({"q": query, "sort": "stars", "order": "desc", "per_page": per_page})
    url = f"https://api.github.com/search/repositories?{params}"
    req = urllib.request.Request(url, headers={"Accept": "application/vnd.github.v3+json", "User-Agent": "blog-daily-digest"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read())["items"]
    except Exception as e:
        print(f"⚠️ GitHub API 请求失败: {e}")
        return []


def get_trending_repos() -> list[dict]:
    """Fetch trending repos from the last 24 hours."""
    yesterday = (today - timedelta(days=1)).strftime("%Y-%m-%d")
    query = f"created:>{yesterday} stars:>20"
    repos = github_search(query, per_page=30)

    if len(repos) < 6:
        # Fallback: last 3 days, lower threshold
        three_days_ago = (today - timedelta(days=3)).strftime("%Y-%m-%d")
        query = f"created:>{three_days_ago} stars:>50"
        extra = github_search(query, per_page=30)
        seen = {r["full_name"] for r in repos}
        for r in extra:
            if r["full_name"] not in seen:
                repos.append(r)

    # Sort by stars descending, take top 10
    repos.sort(key=lambda r: r.get("stargazers_count", 0), reverse=True)
    return repos[:10]


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
    """Generate markdown blog post content."""
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

    content = f"""---
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
    return content


def generate_svg(repos: list[dict]) -> str:
    """Generate SVG hero image."""
    hue = (today.timetuple().tm_yday * 37) % 360
    hue2 = (hue + 45) % 360
    day_label = today.strftime("%m.%d")

    # Top 3 repo names for display
    top3 = []
    for r in repos[:3]:
        short = r["name"]
        if len(short) > 18:
            short = short[:16] + ".."
        top3.append(short)

    top3_text = " · ".join(top3) if top3 else "Loading..."

    # Repo list lines (right side)
    repo_y_start = 230
    repo_lines_svg = []
    for i, r in enumerate(repos[:6]):
        y = repo_y_start + i * 34
        name = r["name"][:20]
        stars = format_stars(r.get("stargazers_count", 0))
        lang = r.get("language") or "?"
        color = LANG_COLORS.get(lang, "#888")
        repo_lines_svg.append(f'''
    <circle cx="530" cy="{y - 4}" r="5" fill="{color}" opacity="0.8"/>
    <text x="545" y="{y}" font-family="system-ui, sans-serif" font-size="14" fill="white" opacity="0.9">{name}</text>
    <text x="780" y="{y}" font-family="system-ui, sans-serif" font-size="12" fill="white" opacity="0.5" text-anchor="end">⭐ {stars}</text>''')

    repos_svg = "\n".join(repo_lines_svg)

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 506" width="900" height="506">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="hsl({hue}, 60%, 18%)"/>
      <stop offset="100%" stop-color="hsl({hue2}, 50%, 12%)"/>
    </linearGradient>
  </defs>
  <rect width="900" height="506" rx="16" fill="url(#bg)"/>
  <!-- Decorative circles -->
  <circle cx="800" cy="50" r="120" fill="white" opacity="0.04"/>
  <circle cx="120" cy="460" r="80" fill="white" opacity="0.03"/>
  <!-- Category badge -->
  <rect x="120" y="30" width="100" height="28" rx="14" fill="hsl({hue}, 70%, 50%)" opacity="0.8"/>
  <text x="170" y="49" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="white" text-anchor="middle">DAILY</text>
  <!-- Date -->
  <text x="130" y="110" font-family="system-ui, sans-serif" font-size="48" font-weight="700" fill="white" opacity="0.15">{day_label}</text>
  <!-- Title -->
  <text x="130" y="165" font-family="'Noto Serif SC', 'LXGW WenKai', Georgia, serif" font-size="36" font-weight="700" fill="white">GitHub 每日精选</text>
  <!-- Subtitle (top 3) -->
  <text x="130" y="210" font-family="system-ui, sans-serif" font-size="16" fill="white" opacity="0.6">{top3_text}</text>
  <!-- Repo list -->
  {repos_svg}
  <!-- Bottom line -->
  <line x1="130" y1="466" x2="850" y2="466" stroke="white" stroke-width="1" opacity="0.1"/>
  <text x="130" y="490" font-family="system-ui, sans-serif" font-size="11" fill="white" opacity="0.3">github.com/trending · {date_str}</text>
</svg>'''
    return svg


def main():
    print(f"📡 正在获取 GitHub Trending ({date_str})...")

    repos = get_trending_repos()
    if not repos:
        print("❌ 未获取到 trending 项目，跳过生成。")
        return

    print(f"✅ 获取到 {len(repos)} 个项目:")
    for r in repos[:5]:
        print(f"   ⭐ {format_stars(r['stargazers_count']):>6}  {r['full_name']}")

    # Generate post
    post_content = generate_post(repos)
    filename = f"daily-{date_str}.md"
    filepath = os.path.join(POSTS_DIR, filename)

    if DRY_RUN:
        print(f"\n--- DRY RUN: {filename} ---")
        print(post_content[:500])
        print("...")
        return

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(post_content)
    print(f"📝 文章: src/content/posts/{filename}")

    # Generate SVG hero
    svg_content = generate_svg(repos)
    svg_path = os.path.join(HERO_DIR, f"daily-{date_str}.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"🎨 SVG 封面: public/hero/daily-{date_str}.svg")

    print(f"\n✨ 今日 GitHub 精选已生成！共 {len(repos)} 个项目。")


if __name__ == "__main__":
    main()
