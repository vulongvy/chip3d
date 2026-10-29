#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PORTABLE HEADLESS CDP TEST CAPTURE SCRIPT
Chụp ảnh màn hình kiểm thử 3D City Commute tự động qua Chrome/Edge DevTools Protocol (CDP).
Hoạt động độc lập trên mọi máy tính Windows (tự tìm Chrome/Edge, tự cài websocket-client).
"""

import subprocess
import time
import json
import urllib.request
import base64
import os
import sys
import tempfile
from pathlib import Path

# Đảm bảo thư viện websocket-client
try:
    import websocket
except ImportError:
    print("  📦 Đang cài đặt thư viện websocket-client...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "websocket-client"])
    import websocket

# Tìm kiếm trình duyệt Chromium (Edge hoặc Chrome)
def find_browser():
    candidates = [
        # Edge paths
        os.path.expandvars(r"%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"),
        os.path.expandvars(r"%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"),
        os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\Edge\Application\msedge.exe"),
        # Chrome paths
        os.path.expandvars(r"%ProgramFiles%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"),
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    return None

BROWSER_PATH = find_browser()
if not BROWSER_PATH:
    print("❌ Không tìm thấy Microsoft Edge hoặc Google Chrome trên máy tính!")
    sys.exit(1)

# Thư mục lưu ảnh: ./screenshots/
PROJECT_DIR = Path(__file__).resolve().parent
SCREENSHOTS_DIR = PROJECT_DIR / "screenshots"
SCREENSHOTS_DIR.mkdir(parents=True, exist_ok=True)

# Thư mục brain artifact (nếu có môi trường Antigravity)
BRAIN_DIR = Path(r"C:\Users\OS\.gemini\antigravity\brain\c8c4b822-60da-4c0b-8bce-334bb31e0ecc")

temp_dir = tempfile.mkdtemp()
cdp_port = 9570
server_port = 8000

print(f"🚀 Đang khởi động trình duyệt headless ({os.path.basename(BROWSER_PATH)})...")
p = subprocess.Popen([
    BROWSER_PATH,
    "--headless=new",
    f"--remote-debugging-port={cdp_port}",
    "--remote-allow-origins=*",
    f"--user-data-dir={temp_dir}",
    "--disable-extensions",
    "--no-first-run",
    "--no-default-browser-check",
    "--window-size=1440,900",
    "--disable-gpu",
    "--no-sandbox"
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

time.sleep(2.5)

try:
    tabs_raw = urllib.request.urlopen(f"http://127.0.0.1:{cdp_port}/json").read()
    tabs = json.loads(tabs_raw.decode('utf-8'))
    page_tab = [t for t in tabs if t.get("type") == "page"][0]
    
    ws_url = page_tab["webSocketDebuggerUrl"]
    ws = websocket.create_connection(ws_url)
    ws.settimeout(40.0)

    msg_id = 0
    def send_cmd(method, params=None):
        global msg_id
        msg_id += 1
        curr_id = msg_id
        msg = {"id": curr_id, "method": method, "params": params or {}}
        ws.send(json.dumps(msg))
        while True:
            resp = json.loads(ws.recv())
            if resp.get("id") == curr_id:
                return resp.get("result", {})
            elif resp.get("method") == "Runtime.exceptionThrown":
                print("JS EXCEPTION:", resp["params"]["exceptionDetails"])

    send_cmd("Runtime.enable")
    send_cmd("Page.enable")

    print(f"Navigating to http://localhost:{server_port}/index.html...")
    send_cmd("Page.navigate", {"url": f"http://localhost:{server_port}/index.html?t={int(time.time())}"})

    print("Waiting for CityCommuteInstance ready...")
    for _ in range(50):
        check = send_cmd("Runtime.evaluate", {
            "expression": "!!(window.CityCommuteInstance && window.CityCommuteInstance.arena)",
            "returnByValue": True
        })
        if check.get("result", {}).get("value") is True:
            print("CityCommuteInstance is ready!")
            break
        time.sleep(0.5)

    time.sleep(3.0)

    def capture(name, js_action):
        print(f"--- Capturing {name} ---")
        res = send_cmd("Runtime.evaluate", {
            "expression": js_action,
            "returnByValue": True
        })
        if res.get("exceptionDetails"):
            print("EVAL EXCEPTION:", res["exceptionDetails"])
        time.sleep(1.5)
        ss = send_cmd("Page.captureScreenshot", {"format": "png"})
        if "data" in ss:
            img_data = base64.b64decode(ss["data"])
            
            # Lưu vào screenshots/ cục bộ
            local_out = SCREENSHOTS_DIR / f"{name}.png"
            local_out.write_bytes(img_data)
            print(f"  ✅ Saved: {local_out} ({len(img_data)} bytes)")
            
            # Lưu vào brain dir nếu tồn tại
            if BRAIN_DIR.exists():
                try:
                    brain_out = BRAIN_DIR / f"{name}.png"
                    brain_out.write_bytes(img_data)
                except Exception:
                    pass

    # 1. Phố Trần Quốc Tuấn: Hai ba con trên xe Honda Vision ngắm Quán Phở Lý & Rèm Cửa & Mầm Non Hạnh Phúc
    capture("anime_tqt_pholy_mamnon", """
    (function() {
        const c = window.CityCommuteInstance;
        c.activateCityMode(0, true);
        c.teleportToWaypoint(1);
        c.cameraMode = 0;
        c.cameraYawOffset = 0.55;
        c.cameraPitchOffset = 0.10;
        c.cameraDistOffset = 1.2;
        c._updateFollowCamera(c.bikeMesh.position, true);
    })()
    """)

    # 2. Phố Trần Quốc Tuấn: Cổng Đình Cổ Kính & Áo Dài Hoàng Gia & Vàng Bạc Hoàng Sơn
    capture("anime_tqt_temple_gold", """
    (function() {
        const c = window.CityCommuteInstance;
        c.teleportToWaypoint(0, { x: 8.0, z: 62.85 });
        c.bikeHeading = Math.PI / 2;
        c.bikeMesh.rotation.y = Math.PI / 2;
        c.cameraMode = 0;
        c.cameraYawOffset = -0.55;
        c.cameraPitchOffset = 0.10;
        c.cameraDistOffset = 1.2;
        c._updateFollowCamera(c.bikeMesh.position, true);
    })()
    """)

    # 3. Số 24 Ngô Quyền: Lái xe Honda Vision qua tiệm Elise & Vàng Bạc Ngô Quyền & Innova SUV
    capture("anime_city_ngoquyen_24", """
    (function() {
        const c = window.CityCommuteInstance;
        c.teleportToWaypoint(6);
        c.cameraMode = 0;
        c.cameraYawOffset = 0.52;
        c.cameraPitchOffset = 0.10;
        c.cameraDistOffset = 1.0;
        c._updateFollowCamera(c.bikeMesh.position, true);
    })()
    """)

    # 4. Ngã Ba Lê Xoay: Tiệm Chăn Ga Gối Đệm Huyền Hậu & Vinamilk & Vios sedan & Honda Wave
    capture("anime_city_lexoay_junction", """
    (function() {
        const c = window.CityCommuteInstance;
        c.teleportToWaypoint(7);
        c.cameraMode = 0;
        c.cameraYawOffset = 0.62;
        c.cameraPitchOffset = 0.10;
        c.cameraDistOffset = 1.2;
        c._updateFollowCamera(c.bikeMesh.position, true);
    })()
    """)

    # 5. Bưu Điện Tỉnh Vĩnh Phúc VNPT & Bùng Binh Kim Ngọc flower park with spire
    capture("anime_city_buudien_vnpt", """
    (function() {
        const c = window.CityCommuteInstance;
        c.teleportToWaypoint(12);
        c.cameraMode = 0;
        c.cameraYawOffset = -1.15;
        c.cameraPitchOffset = 0.12;
        c.cameraDistOffset = 1.5;
        c._updateFollowCamera(c.bikeMesh.position, true);
    })()
    """)

    # 6. Sân Nhà Cây Cảnh Vũ Dậu (1.19 km) - Sân vườn bonsai truyền thống & bàn trà đá
    capture("anime_city_vudau_garden", """
    (function() {
        const c = window.CityCommuteInstance;
        c.teleportToWaypoint(41);
        c.cameraMode = 0;
        c.cameraYawOffset = 0;
        c.cameraPitchOffset = 0.10;
        c.cameraDistOffset = 2.0;
        c._updateFollowCamera(c.bikeMesh.position, true);
    })()
    """)

finally:
    try:
        ws.close()
    except Exception:
        pass
    p.kill()
    print("🎉 Capture finished.")
