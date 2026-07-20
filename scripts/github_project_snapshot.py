#!/usr/bin/env python3
"""Create safe, static project metadata and README snapshots for the blog."""

import argparse
import base64
import json
import os
import re
import urllib.parse
import time
import urllib.request
import urllib.error
from datetime import datetime, timezone, timedelta

MAX_README_CHARS = 50_000
RETRYABLE_HTTP_STATUS = {429, 500, 502, 503, 504}
POLICY_PATH = os.path.join(
    os.path.dirname(__file__), "..", "config", "project-safety.json"
)
PROJECT_LINK_RE = re.compile(
    r"https://github\.com/([A-Za-z0-9_.-]+)/([A-Za-z0-9_.-]+)/?$",
    re.IGNORECASE,
)

with open(POLICY_PATH, "r", encoding="utf-8") as policy_file:
    PROJECT_SAFETY_POLICY = json.load(policy_file)

MIRROR_BLOCK_RE = re.compile(
    "|".join(
        f"(?:{pattern})"
        for pattern in PROJECT_SAFETY_POLICY["restrictedProjectPatterns"]
    ),
    re.IGNORECASE,
)

def safe_https_url(value: object, allow_github: bool = True) -> str:
    text = str(value or "").strip()
    try:
        parsed = urllib.parse.urlsplit(text)
    except ValueError:
        return ""
    if parsed.scheme != "https" or not parsed.hostname:
        return ""
    if not allow_github and parsed.hostname.lower() in {
        "github.com", "www.github.com", "raw.githubusercontent.com"
    }:
        return ""
    return urllib.parse.quote(text, safe="/:#?[]@!$&'*+,;=%")


def sanitize_readme_markdown(value: str) -> str:
    text = value.replace("\r\n", "\n").replace("\r", "\n").replace("\x00", "")
    text = re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL)
    text = re.sub(r"</?[A-Za-z][^>]*>", "", text, flags=re.DOTALL)
    text = re.sub(
        r"!\[([^\]]*)\]\((?:[^()]|\([^)]*\))*\)",
        lambda match: f"*图片：{match.group(1).strip()}*" if match.group(1).strip() else "",
        text,
    )
    text = re.sub(r"^\s*\[[^\]]+\]:\s*data:[^\n]+$", "", text,
                  flags=re.MULTILINE | re.IGNORECASE)

    def clean_link(match: re.Match) -> str:
        label = match.group(1).strip()
        url = match.group(2).strip().strip("<>")
        safe_url = safe_https_url(url, allow_github=False)
        return f"[{label}]({safe_url})" if safe_url else label

    text = re.sub(r"(?<!!)\[([^\]\n]+)\]\(([^)\n]+)\)", clean_link, text)
    text = re.sub(r"(?i)javascript\s*:", "blocked:", text)
    text = re.sub(r"\n{4,}", "\n\n\n", text).strip()
    text = text[:MAX_README_CHARS].rstrip()
    if text.count("```") % 2:
        text += "\n```"
    return text


def api_get(url: str, headers: dict, attempts: int = 3) -> dict:
    request = urllib.request.Request(url, headers=headers)
    for attempt in range(attempts):
        try:
            with urllib.request.urlopen(request, timeout=20) as response:
                return json.loads(response.read())
        except urllib.error.HTTPError as error:
            if error.code not in RETRYABLE_HTTP_STATUS or attempt == attempts - 1:
                raise
            delay = 2 ** attempt
        except (urllib.error.URLError, ConnectionError, TimeoutError):
            if attempt == attempts - 1:
                raise
            delay = 2 ** attempt
        print(f"  GitHub API retry in {delay}s: {url}")
        time.sleep(delay)

    raise RuntimeError(f"GitHub API failed without an error: {url}")


def fetch_readme(repo: dict, headers: dict) -> str:
    full_name = str(repo.get("full_name") or "")
    if not PROJECT_LINK_RE.match(f"https://github.com/{full_name}"):
        return ""
    path = urllib.parse.quote(full_name, safe="/")
    try:
        payload = api_get(f"https://api.github.com/repos/{path}/readme", headers)
        raw = base64.b64decode(payload.get("content") or "", validate=False)
        return sanitize_readme_markdown(raw.decode("utf-8", errors="replace"))
    except Exception as error:
        print(f"  README snapshot skipped for {full_name}: {error}")
        return ""


def snapshot_filename(full_name: str) -> str:
    owner, name = full_name.split("/", 1)
    return f"{owner.lower()}--{name.lower()}.md"
def is_safe_snapshot(repo: dict) -> bool:
    searchable = " ".join([
        str(repo.get("full_name") or ""),
        str(repo.get("description") or ""),
        " ".join(str(topic) for topic in (repo.get("topics") or [])),
    ])
    return MIRROR_BLOCK_RE.search(searchable) is None



def project_markdown(repo: dict, readme: str, snapshot_date: str) -> str:
    full_name = str(repo.get("full_name") or "")
    owner, name = full_name.split("/", 1)
    description = str(repo.get("description") or f"开源项目 {full_name} 的站内资料。")
    source_url = safe_https_url(repo.get("html_url")) or f"https://github.com/{full_name}"
    homepage = safe_https_url(repo.get("homepage"), allow_github=False)
    license_name = (repo.get("license") or {}).get("spdx_id") or "未标注"
    topics = [str(topic)[:80] for topic in (repo.get("topics") or [])[:8]]
    body = readme or f"## 项目简介\n\n{description}\n\n当前仅保存了项目摘要，完整 README 将在后续快照更新时补充。"

    fields = {
        "title": full_name,
        "owner": owner,
        "name": name,
        "fullName": full_name,
        "description": description,
        "sourceUrl": source_url,
        "stars": int(repo.get("stargazers_count") or 0),
        "forks": int(repo.get("forks_count") or 0),
        "language": str(repo.get("language") or "未知"),
        "topics": topics,
        "license": str(license_name),
        "homepage": homepage or None,
        "defaultBranch": str(repo.get("default_branch") or "main"),
        "snapshotDate": snapshot_date,
        "pushedAt": repo.get("pushed_at") or None,
    }
    frontmatter = "\n".join(
        f"{key}: {json.dumps(value, ensure_ascii=False)}"
        for key, value in fields.items()
        if value is not None
    )
    return (
        f"---\n{frontmatter}\n---\n\n"
        "> 本页保存的是公开项目资料快照，阅读过程不需要连接 GitHub。\n\n"
        f"{body}\n"
    )


def write_project_snapshots(repos: list[dict], output_dir: str,
                            headers: dict, snapshot_date: str) -> list[str]:
    os.makedirs(output_dir, exist_ok=True)
    written = []
    for repo in repos:
        full_name = str(repo.get("full_name") or "")
        if not PROJECT_LINK_RE.match(f"https://github.com/{full_name}"):
            continue
        if not is_safe_snapshot(repo):
            print(f"  Project snapshot blocked by safety policy: {full_name}")
            continue
        path = os.path.join(output_dir, snapshot_filename(full_name))
        readme = fetch_readme(repo, headers)
        if not readme and os.path.exists(path):
            print(
                f"  Existing snapshot preserved after README fetch failure: {full_name}"
            )
            continue
        with open(path, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(project_markdown(repo, readme, snapshot_date))
        written.append(path)
        print(f"  Project snapshot: {full_name}")
    return written


def repos_from_post(path: str) -> list[str]:
    with open(path, "r", encoding="utf-8") as handle:
        content = handle.read()
    return list(dict.fromkeys(
        f"{owner}/{name}"
        for owner, name in re.findall(
            r"https://github\.com/([A-Za-z0-9_.-]+)/([A-Za-z0-9_.-]+)\)?",
            content,
        )
    ))


def main() -> None:
    parser = argparse.ArgumentParser()
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--from-post")
    source.add_argument("--repo", action="append", default=[])
    parser.add_argument("--output", default=os.path.join(
        os.path.dirname(__file__), "..", "src", "content", "projects"))
    parser.add_argument("--limit", type=int, default=10)
    args = parser.parse_args()

    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "blog-project-snapshot",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"

    repos = []
    requested_repos = args.repo or repos_from_post(args.from_post)
    for full_name in requested_repos[:args.limit]:
        path = urllib.parse.quote(full_name, safe="/")
        try:
            repos.append(api_get(f"https://api.github.com/repos/{path}", headers))
        except Exception as error:
            print(f"  Project metadata skipped for {full_name}: {error}")

    bjt = timezone(timedelta(hours=8))
    write_project_snapshots(repos, args.output, headers,
                            datetime.now(bjt).strftime("%Y-%m-%d"))


if __name__ == "__main__":
    main()
