import sys
import os
import re
import json
import time
from pathlib import Path

# Configure UTF-8 for Windows console
if sys.stdout is not None:
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
if sys.stderr is not None:
    try:
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

CHIP_DIR = Path(__file__).resolve().parent.parent
VOICE_CLONE_DIR = Path(r"H:\toollong\13- Voice Clone\VoiceClone_SRT_Studio_3.1.0_PORTABLE\VoiceClone_SRT_Studio_3.1.0_Beginner_Edition")

if str(VOICE_CLONE_DIR) not in sys.path:
    sys.path.insert(0, str(VOICE_CLONE_DIR))

import voice_clone_backend as vcb

AUDIO_OUT_DIR = CHIP_DIR / "audio" / "quang_minh"
AUDIO_OUT_DIR.mkdir(parents=True, exist_ok=True)

MANIFEST_JS_PATH = CHIP_DIR / "audio_manifest.js"

# Emoji and symbol cleaner for clean TTS reading
EMOJI_RE = re.compile(r"[\U00010000-\U0010ffff]|[\u2600-\u27bf]|[\u2300-\u23ff]|[\u2b50-\u2b55]|[\u200d\ufe0f]", flags=re.UNICODE)

def clean_tts_text(raw_text: str) -> str:
    if not raw_text:
        return ""
    # Strip emojis
    text = EMOJI_RE.sub(" ", raw_text)
    # Replace blanks like ____ with "chỗ trống" or "blank"
    text = re.sub(r"_{2,}", " chỗ trống ", text)
    # Collapse multiple whitespace
    text = re.sub(r"\s+", " ", text).strip()
    return text

def normalize_key(text: str) -> str:
    cleaned = clean_tts_text(text).lower()
    cleaned = re.sub(r"[^\w\s]", "", cleaned)
    return re.sub(r"\s+", "_", cleaned)[:50]

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
    data_content = data_js_path.read_text(encoding="utf-8")

    # Find GRADE_5_ISLANDS block
    match = re.search(r"const GRADE_5_ISLANDS\s*=\s*(\[[\s\S]*?\n\];)", data_content)
    if match:
        g5_text = match.group(1)
        # Parse quizzes by regex
        quiz_blocks = re.split(r"\{\s*question:", g5_text)[1:]
        for idx, block in enumerate(quiz_blocks, start=1):
            q_match = re.search(r'^\s*"([^"]+)"', block)
            intro_match = re.search(r'teacherIntro:\s*"([^"]+)"', block)
            praise_match = re.search(r'teacherPraise:\s*"([^"]+)"', block)
            corr_match = re.search(r'teacherCorrection:\s*"([^"]+)"', block)

            q_num = f"{idx:02d}"
            if intro_match:
                items.append({
                    "key": f"g5_q{q_num}_intro",
                    "text": intro_match.group(1)
                })
            if praise_match:
                items.append({
                    "key": f"g5_q{q_num}_praise",
                    "text": praise_match.group(1)
                })
            if corr_match:
                items.append({
                    "key": f"g5_q{q_num}_correction",
                    "text": corr_match.group(1)
                })
            if q_match:
                items.append({
                    "key": f"g5_q{q_num}_question",
                    "text": q_match.group(1)
                })

    # 3. Classmates and Campus NPCs quotes
    npc_quotes = [
        # Bác Ba Bảo Vệ
        ("npc_bac_ba_1", "Chào cháu Hà My 5C4! Cứ yên tâm học tập nhé, bác Ba trông xe và bảo vệ an toàn 100% cho toàn trường!"),
        ("npc_bac_ba_2", "Hôm nay cháu vào lớp đúng giờ lắm, rất đáng khen! Nhớ xếp xe đạp gọn gàng vào hàng nhé!"),
        ("npc_bac_ba_3", "Bác thấy Thầy Tuấn khen Hà My học tiếng Anh siêu lắm đó, ráng giật trọn 10 điểm nghen con!"),
        # Cô Bảy Quà Vặt
        ("npc_co_bay_1", "Hà My ơi tan học ghé cô Bảy làm ly trà tắc khổng lồ với bịch bánh tráng trộn full topping nghen con!"),
        ("npc_co_bay_2", "Học tiếng Anh với Thầy Tuấn tốn nhiều năng lượng lắm, cô khuyến mãi thêm xiên cá viên chiên giòn rụm nè!"),
        ("npc_co_bay_3", "Bé Hà My 5C4 là khách VIP của gánh ăn vặt cô Bảy đó nha, học giỏi cô tặng thêm bịch me ngào đường!"),
        # Bạn trong lớp
        ("npc_bao_ngoc_1", "Thôi đi mày, để yên tao cày 10 câu ngữ pháp kiếm sao tím nào!"),
        ("npc_khanh_chi_1", "Bài này dễ ợt à, nhìn công thức trên bảng đen của Thầy Tuấn là ra ngay!"),
        ("npc_vy_1", "Thôi đi bà ơi, để yên cho tôi học kẻo Thầy Tuấn gọi lên bảng bây giờ!"),
        ("npc_vy_2", "Gen Z trường Ngô Quyền là không sợ bài tập khó, quậy lên bạn ơi!"),
        ("npc_tung_duong_1", "Hà My ơi ráng làm chuỗi Streak 5 câu đúng để được Thầy Tuấn khen nha!")
    ]

    for key, text in npc_quotes:
        items.append({"key": key, "text": text})

    return items

def build_manifest_js(items):
    manifest_obj = {}
    text_map_obj = {}

    for item in items:
        key = item["key"]
        rel_path = f"audio/quang_minh/{key}.wav"
        wav_file = AUDIO_OUT_DIR / f"{key}.wav"
        if wav_file.is_file() and wav_file.stat().st_size > 1000:
            manifest_obj[key] = rel_path
            norm_text = clean_tts_text(item["text"])
            text_map_obj[norm_text] = rel_path
            # Also store exact raw text
            text_map_obj[item["text"].strip()] = rel_path

    js_content = f"""// Auto-generated by tools/generate_quang_minh_audio.py
// Voice Clone: Quang Minh (VieNeu-TTS-v3-Turbo)
// Total generated audio files: {len(manifest_obj)}

window.QUANG_MINH_VOICE_MANIFEST = {json.dumps(manifest_obj, ensure_ascii=False, indent=2)};

window.QUANG_MINH_TEXT_MAP = {json.dumps(text_map_obj, ensure_ascii=False, indent=2)};
"""
    MANIFEST_JS_PATH.write_text(js_content, encoding="utf-8")
    print(f"Manifest written to {MANIFEST_JS_PATH} with {len(manifest_obj)} audio files mapped.")

def main():
    import argparse
    parser = argparse.ArgumentParser(description="Quang Minh Voice Generator for Chip English")
    parser.add_argument("--batch-size", type=int, default=4, help="Batch size for GPU inference")
    parser.add_argument("--limit", type=int, default=0, help="Limit number of items to generate (0 for all)")
    parser.add_argument("--dry-run", action="store_true", help="Only list items and generate manifest without synthesis")
    parser.add_argument("--force", action="store_true", help="Force re-generation even if wav exists")
    args = parser.parse_args()

    items = extract_all_items()
    print(f"Total voice lines extracted: {len(items)}")

    pending = []
    for item in items:
        wav_file = AUDIO_OUT_DIR / f"{item['key']}.wav"
        if args.force or not wav_file.is_file() or wav_file.stat().st_size < 1000:
            pending.append(item)

    print(f"Items already generated: {len(items) - len(pending)}")
    print(f"Pending items to generate: {len(pending)}")

    if args.dry_run:
        build_manifest_js(items)
        return

    if not pending:
        print("All audio files are up to date!")
        build_manifest_js(items)
        return

    if args.limit > 0:
        pending = pending[:args.limit]
        print(f"Generating limited batch of {len(pending)} items...")

    # Load Voice Clone Runtime
    ready_info = json.loads((VOICE_CLONE_DIR / "runtime" / "READY.json").read_text("utf-8"))
    runtime_paths = vcb.resolve_runtime_paths(
        ready_info["runtime_root"],
        ready_info["model_cache"],
        ready_info["ffmpeg"]
    )
    ref_sample = VOICE_CLONE_DIR / "voice_samples" / "Quang Minh.WAV"
    
    print("Loading VieNeu AI Engine on RTX 3060...")
    engine = vcb.load_engine(runtime_paths.model_cache, batch_size=args.batch_size, progress=lambda m: print(f"[Engine] {m}"))
    print("Engine ready! Synthesizing audio with Quang Minh voice...")

    batch_size = args.batch_size
    total = len(pending)
    completed = 0

    for i in range(0, total, batch_size):
        chunk = pending[i : i + batch_size]
        texts = [clean_tts_text(item["text"]) for item in chunk]
        
        audios = None
        try:
            audios = engine.infer_batch(
                texts,
                ref_audio=str(ref_sample),
                denoise=True,
                style="tu_nhien",
                batch_size=len(chunk)
            )
            audios = list(audios)
        except Exception as e:
            print(f"[Warning] infer_batch failed ({e}), falling back to single inference...")
            audios = []
            for t in texts:
                audios.append(engine.infer(t, ref_audio=str(ref_sample), denoise=True, style="tu_nhien"))

        for item, audio in zip(chunk, audios):
            out_file = AUDIO_OUT_DIR / f"{item['key']}.wav"
            vcb.save_engine_audio(engine, audio, out_file, runtime_paths.ffmpeg)
            completed += 1
            print(f"[{completed}/{total}] Generated: {item['key']}.wav ({out_file.stat().st_size} bytes)")

    print(f"\nSuccessfully generated {completed} audio files!")
    build_manifest_js(items)

if __name__ == "__main__":
    main()
