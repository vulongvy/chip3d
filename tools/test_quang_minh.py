import sys
import os
import json
from pathlib import Path

# Configure UTF-8 for console output
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

VOICE_CLONE_DIR = Path(r"H:\toollong\13- Voice Clone\VoiceClone_SRT_Studio_3.1.0_PORTABLE\VoiceClone_SRT_Studio_3.1.0_Beginner_Edition")
if str(VOICE_CLONE_DIR) not in sys.path:
    sys.path.insert(0, str(VOICE_CLONE_DIR))

import voice_clone_backend as vcb

ready_path = VOICE_CLONE_DIR / "runtime" / "READY.json"
with open(ready_path, "r", encoding="utf-8") as f:
    ready_info = json.load(f)

runtime_paths = vcb.resolve_runtime_paths(
    ready_info["runtime_root"],
    ready_info["model_cache"],
    ready_info["ffmpeg"]
)
print("Runtime paths resolved:", runtime_paths)

ref_sample = VOICE_CLONE_DIR / "voice_samples" / "Quang Minh.WAV"
print("Quang Minh sample exists:", ref_sample.is_file(), "Size:", ref_sample.stat().st_size if ref_sample.is_file() else 0)

out_dir = Path(r"h:\toollong\18- tieng anh\chip\audio\quang_minh")
out_dir.mkdir(parents=True, exist_ok=True)
test_out = out_dir / "test_greeting.wav"

print("Loading VieNeu engine...")
def progress_cb(msg):
    print("[Engine]", msg)

engine = vcb.load_engine(runtime_paths.model_cache, batch_size=4, progress=progress_cb)
print("Engine loaded successfully!")

test_text = "Chào mừng con gái Hà My lớp 5C4 đến với Trường Tiểu Học Ngô Quyền!"
print("Inferring audio for test text:", test_text)

audio = engine.infer(
    text=test_text,
    ref_audio=str(ref_sample),
    denoise=True,
    style="tu_nhien"
)
print("Saving audio via save_engine_audio...")
vcb.save_engine_audio(engine, audio, test_out, runtime_paths.ffmpeg)
print("Output created:", test_out.is_file(), "Size:", test_out.stat().st_size if test_out.is_file() else 0)
