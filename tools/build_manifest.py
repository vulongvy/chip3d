import sys
import os
import re
import json
from pathlib import Path

# Configure UTF-8 for console output
if sys.stdout is not None:
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

CHIP_DIR = Path(__file__).resolve().parent.parent
AUDIO_OUT_DIR = CHIP_DIR / "audio" / "quang_minh"
MANIFEST_JS_PATH = CHIP_DIR / "audio_manifest.js"

sys.path.insert(0, str(CHIP_DIR / "tools"))
import generate_quang_minh_audio as gq

items = gq.extract_all_items()
print(f"Total items extracted: {len(items)}")

manifest_obj = {}
text_map_obj = {}

# Also add special aliases
aliases = {
    "Chào mừng con gái Hà My lớp 5C4 đến với Trường Tiểu Học Ngô Quyền! Hôm nay cô trò mình cùng làm bài tập bổ trợ trong sách giáo khoa nhé. Con hãy chọn một khu vực bài học bên dưới để cô trò mình cùng bắt đầu nào!": "welcome_greeting",
    "Chào mừng con gái Hà My lớp 5C4 đến với Trường Tiểu Học Ngô Quyền! Hôm nay thầy trò mình cùng làm bài tập bổ trợ trong sách giáo khoa nhé. Con hãy chọn một khu vực bài học bên dưới để thầy trò mình cùng bắt đầu nào!": "welcome_greeting"
}

mapped_count = 0
for item in items:
    key = item["key"]
    rel_path = f"audio/quang_minh/{key}.wav"
    wav_file = AUDIO_OUT_DIR / f"{key}.wav"
    if wav_file.is_file() and wav_file.stat().st_size > 1000:
        manifest_obj[key] = rel_path
        
        # Raw text
        raw_text = item["text"].strip()
        text_map_obj[raw_text] = rel_path
        
        # Cleaned text
        norm_text = gq.clean_tts_text(raw_text)
        text_map_obj[norm_text] = rel_path
        
        mapped_count += 1

for alias_text, target_key in aliases.items():
    rel_path = f"audio/quang_minh/{target_key}.wav"
    wav_file = AUDIO_OUT_DIR / f"{target_key}.wav"
    if wav_file.is_file() and wav_file.stat().st_size > 1000:
        text_map_obj[alias_text] = rel_path

js_content = f"""// Auto-generated live manifest
// Voice Clone: Quang Minh (VieNeu-TTS-v3-Turbo)
// Total generated audio files mapped: {mapped_count}

window.QUANG_MINH_VOICE_MANIFEST = {json.dumps(manifest_obj, ensure_ascii=False, indent=2)};

window.QUANG_MINH_TEXT_MAP = {json.dumps(text_map_obj, ensure_ascii=False, indent=2)};
"""

MANIFEST_JS_PATH.write_text(js_content, encoding="utf-8")
print(f"✅ Successfully wrote live audio_manifest.js with {mapped_count} files mapped!")
