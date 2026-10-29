#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PORTABLE EDGE NEURAL TTS AUDIO GENERATOR
Tạo giọng nói trí tuệ nhân tạo Microsoft Edge Neural TTS cho Chip English Adventure.
- 100% Miễn phí, không cần GPU, hoạt động độc lập trên mọi máy tính.
- Tự động trích xuất các câu thoại từ data.js và lưu vào audio/quang_minh/
- Cập nhật audio_manifest.js để game tự động nhận diện và phát âm thanh.
"""

import sys
import os
import re
import json
import asyncio
from pathlib import Path

# Đảm bảo UTF-8 trên Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

CHIP_DIR = Path(__file__).resolve().parent.parent
AUDIO_OUT_DIR = CHIP_DIR / "audio" / "quang_minh"
AUDIO_OUT_DIR.mkdir(parents=True, exist_ok=True)
MANIFEST_JS_PATH = CHIP_DIR / "audio_manifest.js"

# Emoji and symbol cleaner for clean TTS reading
EMOJI_RE = re.compile(r"[\U00010000-\U0010ffff]|[\u2600-\u27bf]|[\u2300-\u23ff]|[\u2b50-\u2b55]|[\u200d\ufe0f]", flags=re.UNICODE)

def clean_tts_text(raw_text: str) -> str:
    if not raw_text:
        return ""
    text = EMOJI_RE.sub(" ", raw_text)
    text = re.sub(r"_{2,}", " chỗ trống ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def extract_all_items():
    items = []
    
    # 1. Global Core Lines
    items.append({
        "key": "welcome_greeting",
        "text": "Chào mừng con gái Hà My lớp 5C4 đến với Trường Tiểu Học Ngô Quyền! Hôm nay thầy trò mình cùng làm bài tập bổ trợ trong sách giáo khoa nhé. Con hãy chọn một khu vực bài học bên dưới để thầy trò mình cùng bắt đầu nào!"
    })
    items.append({
        "key": "flag_salute",
        "text": "Nghiêm! Chào cờ! Tự hào Lớp 5C4 Việt Nam!"
    })
    items.append({
        "key": "generic_prompt",
        "text": "Hà My hãy suy nghĩ thật kỹ để chọn bục đáp án đúng nhé!"
    })
    items.append({
        "key": "generic_praise",
        "text": "Chính xác xuất sắc Hà My ơi!"
    })
    items.append({
        "key": "generic_correction",
        "text": "Chưa đúng rồi con yêu, hãy cùng thầy phân tích nhé!"
    })

    # 2. Extract Grade 5 textbook islands from data.js
    data_js_path = CHIP_DIR / "data.js"
    if data_js_path.exists():
        data_content = data_js_path.read_text(encoding="utf-8")
        match = re.search(r"const GRADE_5_ISLANDS\s*=\s*(\[[\s\S]*?\n\];)", data_content)
        if match:
            g5_text = match.group(1)
            quiz_blocks = re.split(r"\{\s*question:", g5_text)[1:]
            for idx, block in enumerate(quiz_blocks, start=1):
                q_match = re.search(r'^\s*"([^"]+)"', block)
                intro_match = re.search(r'teacherIntro:\s*"([^"]+)"', block)
                praise_match = re.search(r'teacherPraise:\s*"([^"]+)"', block)
                corr_match = re.search(r'teacherCorrection:\s*"([^"]+)"', block)

                q_num = f"{idx:02d}"
                if intro_match:
                    items.append({"key": f"g5_q{q_num}_intro", "text": intro_match.group(1)})
                if praise_match:
                    items.append({"key": f"g5_q{q_num}_praise", "text": praise_match.group(1)})
                if corr_match:
                    items.append({"key": f"g5_q{q_num}_correction", "text": corr_match.group(1)})
                if q_match:
                    items.append({"key": f"g5_q{q_num}_question", "text": q_match.group(1)})

    # 3. Classmates and Campus NPCs quotes
    npc_quotes = [
        ("npc_bac_ba_1", "Chào cháu Hà My 5C4! Cứ yên tâm học tập nhé, bác Ba trông xe và bảo vệ an toàn 100% cho toàn trường!"),
        ("npc_bac_ba_2", "Hôm nay cháu vào lớp đúng giờ lắm, rất đáng khen! Nhớ xếp xe đạp gọn gàng vào hàng nhé!"),
        ("npc_bac_ba_3", "Bác thấy Thầy Tuấn khen Hà My học tiếng Anh siêu lắm đó, ráng giật trọn 10 điểm nghen con!"),
        ("npc_co_bay_1", "Hà My ơi tan học ghé cô Bảy làm ly trà tắc khổng lồ với bịch bánh tráng trộn full topping nghen con!"),
        ("npc_co_bay_2", "Học tiếng Anh với Thầy Tuấn tốn nhiều năng lượng lắm, cô khuyến mãi thêm xiên cá viên chiên giòn rụm nè!"),
        ("npc_co_bay_3", "Bé Hà My 5C4 là khách VIP của gánh ăn vặt cô Bảy đó nha, học giỏi cô tặng thêm bịch me ngào đường!"),
        ("npc_bao_ngoc_1", "Thôi đi mày, để yên tao cày 10 câu ngữ pháp kiếm sao tím nào!"),
        ("npc_khanh_chi_1", "Bài này dễ ợt à, nhìn công thức trên bảng đen của Thầy Tuấn là ra ngay!"),
        ("npc_vy_1", "Thôi đi bà ơi, để yên cho tôi học kẻo Thầy Tuấn gọi lên bảng bây giờ!"),
        ("npc_vy_2", "Gen Z trường Ngô Quyền là không sợ bài tập khó, quậy lên bạn ơi!"),
        ("npc_tung_duong_1", "Hà My ơi ráng làm chuỗi Streak 5 câu đúng để được Thầy Tuấn khen nha!")
    ]

    for key, text in npc_quotes:
        items.append({"key": key, "text": text})

    return items

def build_manifest(items):
    manifest_obj = {}
    text_map_obj = {}

    aliases = {
        "Chào mừng con gái Hà My lớp 5C4 đến với Trường Tiểu Học Ngô Quyền! Hôm nay cô trò mình cùng làm bài tập bổ trợ trong sách giáo khoa nhé. Con hãy chọn một khu vực bài học bên dưới để cô trò mình cùng bắt đầu nào!": "welcome_greeting",
        "Chào mừng con gái Hà My lớp 5C4 đến với Trường Tiểu Học Ngô Quyền! Hôm nay thầy trò mình cùng làm bài tập bổ trợ trong sách giáo khoa nhé. Con hãy chọn một khu vực bài học bên dưới để thầy trò mình cùng bắt đầu nào!": "welcome_greeting"
    }

    count = 0
    for item in items:
        key = item["key"]
        # Check both .mp3 and .wav
        wav_path = AUDIO_OUT_DIR / f"{key}.wav"
        mp3_path = AUDIO_OUT_DIR / f"{key}.mp3"

        chosen_rel = None
        if mp3_path.exists() and mp3_path.stat().st_size > 500:
            chosen_rel = f"audio/quang_minh/{key}.mp3"
        elif wav_path.exists() and wav_path.stat().st_size > 500:
            chosen_rel = f"audio/quang_minh/{key}.wav"

        if chosen_rel:
            manifest_obj[key] = chosen_rel
            raw_text = item["text"].strip()
            norm_text = clean_tts_text(raw_text)
            text_map_obj[raw_text] = chosen_rel
            text_map_obj[norm_text] = chosen_rel
            count += 1

    for alias_text, target_key in aliases.items():
        if target_key in manifest_obj:
            text_map_obj[alias_text] = manifest_obj[target_key]

    js_content = f"""// Auto-generated audio manifest
// Support both Edge Neural TTS (.mp3) and Quang Minh Voice Clone (.wav)
// Total generated audio files mapped: {count}

window.QUANG_MINH_VOICE_MANIFEST = {json.dumps(manifest_obj, ensure_ascii=False, indent=2)};

window.QUANG_MINH_TEXT_MAP = {json.dumps(text_map_obj, ensure_ascii=False, indent=2)};
"""
    MANIFEST_JS_PATH.write_text(js_content, encoding="utf-8")
    print(f"  📝 Đã cập nhật audio_manifest.js: liên kết {count} tệp âm thanh.")

async def synthesize_item(communicate_cls, item, semaphore, total, current_idx):
    key = item["key"]
    text = clean_tts_text(item["text"])
    out_file = AUDIO_OUT_DIR / f"{key}.mp3"

    async with semaphore:
        try:
            # Chọn giọng đọc: vi-VN-NamMinhNeural (giọng nam truyền cảm chuẩn miền Bắc)
            comm = communicate_cls(text, voice="vi-VN-NamMinhNeural")
            await comm.save(str(out_file))
            print(f"  [{current_idx[0] + 1}/{total}] ✅ {key}.mp3 ({out_file.stat().st_size // 1024} KB)")
        except Exception as e:
            print(f"  [{current_idx[0] + 1}/{total}] ⚠️ Lỗi tạo {key}: {e}")
        finally:
            current_idx[0] += 1

async def async_main(items, force=False, limit=0):
    try:
        import edge_tts
    except ImportError:
        print("  ❌ Thư viện edge-tts chưa được cài đặt!")
        print("  👉 Chạy: pip install edge-tts")
        return

    # Lọc danh sách cần sinh
    pending = []
    for item in items:
        key = item["key"]
        wav_file = AUDIO_OUT_DIR / f"{key}.wav"
        mp3_file = AUDIO_OUT_DIR / f"{key}.mp3"
        already_exists = (mp3_file.exists() and mp3_file.stat().st_size > 500) or \
                         (wav_file.exists() and wav_file.stat().st_size > 500)
        if force or not already_exists:
            pending.append(item)

    print(f"  📊 Tổng số câu thoại      : {len(items)}")
    print(f"  ✅ Đã có sẵn              : {len(items) - len(pending)}")
    print(f"  ⏳ Cần sinh âm thanh mới  : {len(pending)}")

    if not pending:
        print("  🎉 Tất cả file âm thanh đã đầy đủ! Không cần sinh thêm.")
        build_manifest(items)
        return

    if limit > 0:
        pending = pending[:limit]
        print(f"  ⚠️ Giới hạn chỉ sinh {limit} file đầu tiên theo yêu cầu...")

    semaphore = asyncio.Semaphore(4)  # 4 luồng song song để tải nhanh mà không bị nghẽn mạng
    total = len(pending)
    current_idx = [0]

    tasks = [synthesize_item(edge_tts.Communicate, item, semaphore, total, current_idx) for item in pending]
    await asyncio.gather(*tasks)

    print("\n  🎉 Quá trình sinh giọng đọc Neural hoàn tất!")
    build_manifest(items)

def main():
    import argparse
    parser = argparse.ArgumentParser(description="Edge Neural TTS Portable Audio Generator")
    parser.add_argument("--force", action="store_true", help="Sinh lại toàn bộ ngay cả khi file đã tồn tại")
    parser.add_argument("--limit", type=int, default=0, help="Giới hạn số file cần sinh")
    args = parser.parse_args()

    items = extract_all_items()
    asyncio.run(async_main(items, force=args.force, limit=args.limit))

if __name__ == "__main__":
    main()
