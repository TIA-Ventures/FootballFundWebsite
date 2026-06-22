import csv
import os
import re
import urllib.request
import urllib.parse
from pathlib import Path

BASE = Path(__file__).parent
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"


def slugify(name):
    s = name.strip().lower()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"\s+", "_", s)
    return s


def ext_from_url(url, fallback=".jpg"):
    path = urllib.parse.urlparse(url).path.lower()
    for e in (".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif"):
        if path.endswith(e):
            return e
    if "ui-avatars.com" in url:
        return ".png"
    if "unsplash.com" in url:
        return ".jpg"
    return fallback


def download(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = resp.read()
    dest.write_bytes(data)
    return len(data)


def process_team():
    csv_path = BASE / "Team_export.csv"
    results = []
    with csv_path.open() as f:
        for row in csv.DictReader(f):
            name = row["name"].strip()
            url = row["photo_url"].strip()
            if not name or not url:
                continue
            folder_name = slugify(name)
            folder = BASE / folder_name
            folder.mkdir(exist_ok=True)
            ext = ext_from_url(url)
            dest = folder / f"{folder_name}{ext}"
            try:
                size = download(url, dest)
                results.append((name, "OK", size, str(dest.relative_to(BASE))))
            except Exception as e:
                results.append((name, f"FAIL: {e}", 0, ""))
    return results


def process_logos():
    csv_path = BASE / "Portfolio_export.csv"
    logos_dir = BASE / "company_logos"
    logos_dir.mkdir(exist_ok=True)
    results = []
    seen = {}
    with csv_path.open() as f:
        for row in csv.DictReader(f):
            name = row["name"].strip()
            url = row["logo_url"].strip()
            if not name:
                continue
            if not url:
                results.append((name, "no logo url", 0, ""))
                continue
            base = slugify(name)
            if seen.get(base) == url:
                continue
            seen[base] = url
            ext = ext_from_url(url)
            dest = logos_dir / f"{base}{ext}"
            i = 2
            while dest.exists():
                dest = logos_dir / f"{base}_{i}{ext}"
                i += 1
            try:
                size = download(url, dest)
                results.append((name, "OK", size, str(dest.relative_to(BASE))))
            except Exception as e:
                results.append((name, f"FAIL: {e}", 0, ""))
    return results


if __name__ == "__main__":
    print("=== TEAM ===")
    for r in process_team():
        print(r)
    print()
    print("=== LOGOS ===")
    for r in process_logos():
        print(r)
