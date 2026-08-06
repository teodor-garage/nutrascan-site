#!/usr/bin/env python3
"""
NutraScan content operator - daily TikTok post via Buffer's GraphQL API.

Designed to run inside GitHub Actions (repo already checked out on `main`):
renders a text-overlay variant of the base masse-grasse video, commits it to
this same repo for a public raw.githubusercontent.com URL, then tells Buffer
to publish it immediately to the TikTok channel.

Usage:
  python3 post_to_buffer.py                # pick next hook automatically, post now
  python3 post_to_buffer.py --dry-run       # render + push video, skip the Buffer call
  python3 post_to_buffer.py --text "..."    # force a specific overlay/caption text
"""
import argparse
import datetime
import json
import os
import subprocess
import sys
import time
from pathlib import Path

import requests

ROOT = Path(__file__).parent
BASE_VIDEO = ROOT / "base_video.mov"
MUSIC = ROOT / "music.m4a"
HOOKS_FILE = ROOT / "hooks_massegrasse.json"
LOG_FILE = ROOT / "log.json"
VIDEOS_DIR = ROOT / "videos"
LOCAL_TOKEN_FILE = Path.home() / ".config" / "nutrascan-content-ops" / "buffer_token"

ORG_ID = "6a7490e182a369599f10da68"
CHANNEL_ID_TIKTOK = "6a749ca899afb44349125031"
COOLDOWN_DAYS = 14
API_URL = "https://api.buffer.com"
HASHTAGS = "#nutrascan #bodyfat #fitnessfrance #pertedepoids #massegrasse"
RAW_URL_BASE = "https://raw.githubusercontent.com/teodor-garage/nutrascan-site/main/content-ops/tiktok-bot/videos"


def get_token():
    env_token = os.environ.get("BUFFER_TOKEN")
    if env_token:
        return env_token.strip()
    return LOCAL_TOKEN_FILE.read_text().strip()


def load_json(path, default):
    if path.exists():
        return json.loads(path.read_text())
    return default


def pick_hook(hooks, log):
    now = datetime.datetime.now(datetime.timezone.utc)
    recent = set()
    for entry in log:
        used_at = datetime.datetime.fromisoformat(entry["timestamp"])
        if (now - used_at).days < COOLDOWN_DAYS:
            recent.add(entry["hook"])
    for h in hooks:
        if h not in recent:
            return h
    # everything is on cooldown (shouldn't happen with 60+ hooks / 3-a-day) - fall back to oldest used
    return hooks[0]


def render_video(text, out_path):
    sticker = ROOT / "_tmp_sticker.png"
    subprocess.run(
        [sys.executable, str(ROOT / "make_overlay.py"), str(sticker), text],
        check=True,
    )
    subprocess.run(
        [
            "ffmpeg", "-y",
            "-i", str(BASE_VIDEO),
            "-i", str(sticker),
            "-i", str(MUSIC),
            "-filter_complex", "[0:v][1:v]overlay=0:0:format=auto",
            "-map", "0:v", "-map", "2:a",
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-preset", "medium",
            "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart",
            str(out_path),
        ],
        check=True,
        capture_output=True,
    )
    sticker.unlink(missing_ok=True)


def publish_video(local_video_path, filename):
    VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
    dest = VIDEOS_DIR / filename
    dest.write_bytes(local_video_path.read_bytes())

    def run(cmd):
        subprocess.run(cmd, cwd=ROOT, check=True, capture_output=True, text=True)

    run(["git", "add", f"content-ops/tiktok-bot/videos/{filename}"])
    run(["git", "commit", "-m", f"content-ops: daily TikTok post video {filename}"])
    run(["git", "push"])

    url = f"{RAW_URL_BASE}/{filename}"
    deadline = time.time() + 60
    while time.time() < deadline:
        r = requests.head(url, timeout=10)
        if r.status_code == 200:
            return url
        time.sleep(3)
    raise RuntimeError(f"Video never went live at {url} within timeout")


def buffer_create_post(token, text, video_url):
    query = """
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on PostActionSuccess {
          post { id text status }
        }
        ... on MutationError {
          message
        }
      }
    }
    """
    variables = {
        "input": {
            "channelId": CHANNEL_ID_TIKTOK,
            "text": text,
            "mode": "shareNow",
            "schedulingType": "automatic",
            "needsApproval": False,
            "assets": [{"video": {"url": video_url}}],
        }
    }
    resp = requests.post(
        API_URL,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json={"query": query, "variables": variables},
        timeout=60,
    )
    resp.raise_for_status()
    data = resp.json()
    if "errors" in data:
        raise RuntimeError(f"Buffer GraphQL error: {data['errors']}")
    result = data["data"]["createPost"]
    if "message" in result:
        raise RuntimeError(f"Buffer refused the post: {result['message']}")
    return result["post"]


def poll_until_sent(token, post_id, timeout=180):
    query = 'query { post(input: { id: "%s" }) { id status } }' % post_id
    deadline = time.time() + timeout
    status = None
    while time.time() < deadline:
        resp = requests.post(
            API_URL,
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            json={"query": query},
            timeout=30,
        )
        status = resp.json()["data"]["post"]["status"]
        if status != "sending":
            return status
        time.sleep(8)
    return status


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--text", help="Force a specific overlay/caption text instead of auto-picking one")
    parser.add_argument("--dry-run", action="store_true", help="Render + push video but skip the actual Buffer post")
    args = parser.parse_args()

    hooks_data = load_json(HOOKS_FILE, {"hooks": []})
    log = load_json(LOG_FILE, [])

    text = args.text or pick_hook(hooks_data["hooks"], log)
    print(f"Using hook: {text!r}")

    today = datetime.date.today().isoformat()
    n = sum(1 for e in log if e["timestamp"].startswith(today)) + 1
    filename = f"{today}-{n}.mp4"

    local_out = ROOT / "_tmp_out.mp4"
    render_video(text, local_out)
    print(f"Rendered {local_out}")

    video_url = publish_video(local_out, filename)
    print(f"Video live at {video_url}")
    local_out.unlink(missing_ok=True)

    entry = {
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "hook": text,
        "video_url": video_url,
    }

    if args.dry_run:
        entry["status"] = "dry_run"
    else:
        token = get_token()
        post = buffer_create_post(token, f"{text}\n\n{HASHTAGS}", video_url)
        print(f"Posted to Buffer (initial): {post}")
        final_status = poll_until_sent(token, post["id"])
        print(f"Final Buffer status: {final_status}")
        if final_status != "sent":
            raise RuntimeError(f"Buffer post {post['id']} did not reach 'sent' status (got {final_status!r})")
        entry["status"] = "posted"
        entry["buffer_post"] = {**post, "status": final_status}

    log.append(entry)
    LOG_FILE.write_text(json.dumps(log, indent=2, ensure_ascii=False))

    subprocess.run(["git", "add", "content-ops/tiktok-bot/log.json"], cwd=ROOT, check=True)
    subprocess.run(
        ["git", "commit", "-m", f"content-ops: log entry {filename}"],
        cwd=ROOT, check=True, capture_output=True,
    )
    subprocess.run(["git", "push"], cwd=ROOT, check=True)


if __name__ == "__main__":
    main()
