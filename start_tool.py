#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CHIP ENGLISH ADVENTURE & 3D CITY COMMUTE - UNIVERSAL START TOOL
Tự động thiết lập môi trường, kiểm tra cổng mạng, tải/sinh tài nguyên theo nhu cầu,
và khởi chạy máy chủ web nội bộ kèm mở trình duyệt.
Hoạt động độc lập 100% trên mọi máy tính Windows/Mac/Linux có cài đặt Python.
"""

import sys
import os
import time
import socket
import webbrowser
import threading
import subprocess
import zipfile
import mimetypes
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

# Đảm bảo MIME types chuẩn trên Windows
mimetypes.add_type('text/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('application/json', '.json')
mimetypes.add_type('audio/mpeg', '.mp3')
mimetypes.add_type('audio/wav', '.wav')
ThreadingHTTPServer.allow_reuse_address = True

# Đảm bảo UTF-8 trên Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

ROOT_DIR = Path(__file__).resolve().parent

# ==============================================================
# 1. HỖ TRỢ HTTP SERVER THÔNG MINH (CORS + RANGE + NO-CACHE DEV)
# ==============================================================
class SmartHTTPRequestHandler(SimpleHTTPRequestHandler):
    """
    HTTP Handler tùy biến:
    - Bổ sung header CORS (Access-Control-Allow-Origin: *)
    - Tắt cache cho file .js và .html để khi sửa code ('vibe code') F5 ăn ngay
    - Hỗ trợ Range Request cho audio HTML5 mượt mà
    """
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        
        # Tắt cache đối với file mã nguồn để tiện phát triển trên máy mới
        path_lower = self.path.lower().split('?')[0]
        if path_lower.endswith(('.js', '.html', '.css', '.json')):
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        else:
            self.send_header('Cache-Control', 'public, max-age=3600')
            
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def log_message(self, format, *args):
        # Chỉ in log của các file chính hoặc lỗi để console gọn gàng
        msg = format % args
        if any(ext in msg for ext in ['.html', 'city_commute.js', '404', '500']):
            print(f"  [HTTP] {msg}")

def find_available_port(start_port=8000, max_tries=50):
    """Tìm cổng mạng còn trống bắt đầu từ start_port"""
    for port in range(start_port, start_port + max_tries):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(('0.0.0.0', port))
                return port
            except OSError:
                continue
    return start_port

def get_local_ip():
    """Lấy địa chỉ IP nội bộ trong mạng LAN (để mở trên iPad/Điện thoại)"""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"

# ==============================================================
# 2. KIỂM TRA TRẠNG THÁI TÀI NGUYÊN (RESOURCE STATUS)
# ==============================================================
def inspect_resources():
    status = {}
    
    # 1. Core Engine
    core_files = ['index.html', 'city_commute.js', 'three_arena.js', 'game.js', 'three.min.js']
    status['core_ready'] = all((ROOT_DIR / f).exists() for f in core_files)
    
    # 2. Audio Pack
    audio_dir = ROOT_DIR / "audio" / "quang_minh"
    if audio_dir.exists():
        files = list(audio_dir.glob("*.mp3")) + list(audio_dir.glob("*.wav"))
        status['audio_count'] = len(files)
        status['audio_size_mb'] = sum(f.stat().st_size for f in files) / (1024 * 1024)
    else:
        status['audio_count'] = 0
        status['audio_size_mb'] = 0
        
    # 3. StreetView Preview
    sv_prev = ROOT_DIR / "streetview_preview"
    status['sv_preview_count'] = len(list(sv_prev.glob("*.jpg"))) if sv_prev.exists() else 0
    
    # 4. StreetView 2K
    sv_2k = ROOT_DIR / "streetview_2k"
    status['sv_2k_count'] = len(list(sv_2k.glob("*.jpg"))) if sv_2k.exists() else 0
    
    # 5. StreetView HD (750MB)
    sv_hd = ROOT_DIR / "streetview_hd"
    status['sv_hd_count'] = len(list(sv_hd.glob("*.jpg"))) if sv_hd.exists() else 0

    return status

# ==============================================================
# 3. CHỨC NĂNG CHẠY SERVER & TỰ ĐỘNG MỞ TRÌNH DUYỆT
# ==============================================================
def start_server_and_browser(port=None):
    os.chdir(str(ROOT_DIR))
    if port is None:
        port = find_available_port(8000)
        
    server = ThreadingHTTPServer(('0.0.0.0', port), SmartHTTPRequestHandler)
    local_url = f"http://localhost:{port}/index.html"
    network_url = f"http://{get_local_ip()}:{port}/index.html"

    print("\n" + "=" * 68)
    print("  🚀 CHIP ENGLISH ADVENTURE & 3D CITY COMMUTE ĐANG CHẠY!")
    print("=" * 68)
    print(f"  📍 Máy tính này  : {local_url}")
    print(f"  📱 Điện thoại/iPad: {network_url}")
    print("  (Nhấn phím Ctrl + C để dừng máy chủ bất cứ lúc nào)")
    print("=" * 68 + "\n")

    # Mở trình duyệt sau 1 giây
    def open_browser():
        time.sleep(1.2)
        print("  🌐 Đang tự động mở trình duyệt...")
        webbrowser.open(local_url)

    threading.Thread(target=open_browser, daemon=True).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n\n  🛑 Đã dừng máy chủ an toàn. Chúc bạn một ngày tốt lành!")
        server.server_close()

# ==============================================================
# 4. TỰ ĐỘNG CÀI ĐẶT THƯ VIỆN & SINH VOICE CLONE BẰNG EDGE-TTS
# ==============================================================
def ensure_package(pkg_name, import_name=None):
    """Tự động kiểm tra và cài đặt thư viện python qua pip nếu thiếu"""
    if import_name is None:
        import_name = pkg_name
    try:
        __import__(import_name)
        return True
    except ImportError:
        print(f"  📦 Đang tự động tải thư viện cần thiết: {pkg_name}...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", pkg_name])
            print(f"  ✅ Đã cài đặt thành công: {pkg_name}")
            return True
        except Exception as e:
            print(f"  ❌ Không thể tự động cài đặt {pkg_name}: {e}")
            return False

def generate_voice_edge_tts():
    """Tự động tạo toàn bộ audio giọng chuẩn qua Microsoft Edge Neural TTS miễn phí"""
    print("\n" + "=" * 68)
    print("  🎙️ TỰ ĐỘNG TẢI & TẠO GÓI VOICE NEURAL AUDIO (MIỄN PHÍ - KHÔNG CẦN GPU)")
    print("=" * 68)
    
    if not ensure_package("edge-tts"):
        print("  ❌ Cần có thư viện edge-tts để sinh giọng nói!")
        return
        
    script_path = ROOT_DIR / "tools" / "generate_audio_edge.py"
    if not script_path.exists():
        print(f"  ❌ Không tìm thấy script: {script_path}")
        return

    print("  🚀 Đang tiến hành tạo audio cho tất cả các câu hỏi & từ vựng...")
    subprocess.call([sys.executable, str(script_path)])

# ==============================================================
# 5. ĐÓNG GÓI BẢN SIÊU NHẸ (LIGHTWEIGHT PACKAGE ZIP)
# ==============================================================
def create_lightweight_package():
    """Tự động nén thành file zip nhẹ (~20-25MB) để chuyển sang máy khác"""
    dist_dir = ROOT_DIR / "dist"
    dist_dir.mkdir(exist_ok=True)
    zip_path = dist_dir / "chip_english_adventure_lightweight.zip"

    print("\n" + "=" * 68)
    print("  📦 ĐANG ĐÓNG GÓI BẢN SIÊU NHẸ (LIGHTWEIGHT DISTRIBUTION)")
    print("=" * 68)
    print("  - Loại bỏ các thư mục nặng: streetview_hd (748MB), audio (241MB), .git, __pycache__")
    print("  - Giữ nguyên 100% mã nguồn game, thành phố 3D, textures, preview 360, và start_tool")
    print(f"  - File xuất ra: {zip_path}")
    print("-" * 68)

    excluded_dirs = {'streetview_hd', 'audio', '.git', '__pycache__', 'dist', '.gemini', '.system_generated'}
    excluded_files = {'sample_map.png', 'test_2k.jpg'}
    excluded_exts = {'.pyc', '.log', '.tmp'}

    count = 0
    total_uncompressed = 0
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as zipf:
        for file in ROOT_DIR.rglob("*"):
            if file.is_dir():
                continue
            rel_path = file.relative_to(ROOT_DIR)
            parts = rel_path.parts
            
            # Kiểm tra loại trừ
            if any(part in excluded_dirs for part in parts):
                continue
            if file.name in excluded_files:
                continue
            if file.suffix in excluded_exts:
                continue

            zipf.write(file, rel_path)
            count += 1
            total_uncompressed += file.stat().st_size

    zip_size_mb = zip_path.stat().st_size / (1024 * 1024)
    orig_mb = total_uncompressed / (1024 * 1024)
    print(f"  ✅ ĐÃ ĐÓNG GÓI XONG THÀNH CÔNG!")
    print(f"  📁 Số lượng file : {count} tệp")
    print(f"  💾 Kích thước ZIP: {zip_size_mb:.2f} MB (Rút gọn từ hơn 1,000 MB!)")
    print(f"  📍 Đường dẫn file: {zip_path.resolve()}")
    print("\n  👉 Bạn chỉ cần gửi file ZIP này sang máy khác, giải nén và bấm start_tool.bat là chạy ngay!")
    if sys.stdin and sys.stdin.isatty():
        input("\n  Bấm phím Enter để quay lại menu...")

# ==============================================================
# 6. GIAO DIỆN MENU ĐIỀU KHIỂN CHÍNH
# ==============================================================
def main():
    res = inspect_resources()

    # Nếu truyền cờ --run hoặc --now thì khởi chạy ngay không cần menu
    if len(sys.argv) > 1 and sys.argv[1] in ('--run', '--now', '-r'):
        start_server_and_browser()
        return

    while True:
        res = inspect_resources()
        print("\n" + "=" * 68)
        print("  🏫 CHIP ENGLISH ADVENTURE & 3D CITY COMMUTE - CONTROL CENTER")
        print("=" * 68)
        print(f"  📁 Thư mục gốc      : {ROOT_DIR}")
        print(f"  🎮 Lõi Game & 3D    : {'✅ Sẵn sàng 100%' if res['core_ready'] else '❌ Thiếu file'}")
        
        # Audio status
        if res['audio_count'] > 0:
            print(f"  🔊 Gói Voice Audio  : ✅ Đã có {res['audio_count']} tệp ({res['audio_size_mb']:.1f} MB)")
        else:
            print(f"  🔊 Gói Voice Audio  : ℹ️ Chưa có (Game tự động dùng giọng Web Speech API mượt mà)")

        # Streetview status
        print(f"  🗺️ StreetView 360   : Preview: {res['sv_preview_count']}/41 | 2K: {res['sv_2k_count']}/41 | HD: {res['sv_hd_count']}/41")
        print("-" * 68)
        print("  [1] 🚀 Khởi động Game & Bản đồ 3D ngay lập tức (Chế độ Nhẹ - Khuyên dùng)")
        print("  [2] 🎙️ Tải & Sinh Voice Audio mới (Edge Neural TTS miễn phí)")
        print("  [3] 📦 Đóng gói bản Siêu Nhẹ (.ZIP ~25MB) để chuyển sang máy khác")
        print("  [4] 📸 Chụp ảnh màn hình kiểm thử 3D tự động (Dev Capture)")
        print("  [5] 🍏 Đồng bộ tài nguyên Web sang dự án iOS (.IPA)")
        print("  [0] 🚪 Thoát")
        print("=" * 68)

        choice = input("  👉 Nhập lựa chọn của bạn (Mặc định [1]): ").strip()
        if not choice or choice == '1':
            start_server_and_browser()
            break
        elif choice == '2':
            generate_voice_edge_tts()
        elif choice == '3':
            create_lightweight_package()
        elif choice == '4':
            ensure_package("websocket-client", "websocket")
            capture_script = ROOT_DIR / "capture_tqt_shops.py"
            if capture_script.exists():
                subprocess.call([sys.executable, str(capture_script)])
            else:
                print("  ❌ Không tìm thấy capture_tqt_shops.py")
        elif choice == '5':
            ios_prep = ROOT_DIR / "tools" / "prepare_ios_assets.py"
            if ios_prep.exists():
                subprocess.call([sys.executable, str(ios_prep)])
                print("  📖 Xem hướng dẫn cài đặt .ipa tại: HUONG_DAN_BUILD_IPA.md")
                if sys.stdin and sys.stdin.isatty():
                    input("\n  Bấm phím Enter để quay lại menu...")
            else:
                print("  ❌ Không tìm thấy tools/prepare_ios_assets.py")
        elif choice == '0':
            print("  Tạm biệt!")
            break
        else:
            print("  ⚠️ Lựa chọn không hợp lệ, vui lòng chọn lại!")

if __name__ == "__main__":
    main()
