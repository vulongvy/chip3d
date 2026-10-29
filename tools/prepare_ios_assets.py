#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Chuẩn bị và đồng bộ toàn bộ tài nguyên Web vào thư mục bundle iOS (ios/Chip3D/www)
"""

import shutil
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
IOS_WWW_DIR = ROOT_DIR / "ios" / "Chip3D" / "www"

def sync_assets(include_audio=False):
    print("=" * 65)
    print("  🍎 ĐỒNG BỘ TÀI NGUYÊN WEB SANG DỰ ÁN IOS CHIP 3D")
    print("=" * 65)

    if IOS_WWW_DIR.exists():
        shutil.rmtree(IOS_WWW_DIR)
    IOS_WWW_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Sao chép các tệp gốc
    core_extensions = {'.html', '.js', '.css', '.json', '.png', '.jpg'}
    count = 0
    total_bytes = 0

    for f in ROOT_DIR.glob("*.*"):
        if f.suffix.lower() in core_extensions:
            dest = IOS_WWW_DIR / f.name
            shutil.copy2(f, dest)
            count += 1
            total_bytes += f.stat().st_size

    # 2. Sao chép thư mục StreetView (Preview & 2K)
    for folder_name in ["streetview_preview", "streetview_2k"]:
        src_folder = ROOT_DIR / folder_name
        if src_folder.exists():
            dest_folder = IOS_WWW_DIR / folder_name
            shutil.copytree(src_folder, dest_folder)
            for f in dest_folder.glob("*.*"):
                count += 1
                total_bytes += f.stat().st_size

    # 3. Sao chép audio nếu người dùng chọn
    if include_audio:
        src_audio = ROOT_DIR / "audio"
        if src_audio.exists():
            dest_audio = IOS_WWW_DIR / "audio"
            shutil.copytree(src_audio, dest_audio)
            for f in dest_audio.rglob("*.*"):
                count += 1
                total_bytes += f.stat().st_size
            print(f"  🔊 Đã gộp toàn bộ gói Voice Audio offline.")
    else:
        print(f"  ℹ️ Chế độ siêu nhẹ: Bỏ qua thư mục audio 240MB (Game dùng Web Speech API mượt mà).")

    print(f"  ✅ Đã đồng bộ {count} tệp vào: {IOS_WWW_DIR}")
    print(f"  💾 Tổng dung lượng bundle web: {total_bytes / (1024 * 1024):.2f} MB")
    print("=" * 65)

if __name__ == "__main__":
    import sys
    with_audio = "--with-audio" in sys.argv
    sync_assets(include_audio=with_audio)
