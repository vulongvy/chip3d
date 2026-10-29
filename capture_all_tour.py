import subprocess
import time
import json
import urllib.request
import websocket
import base64
import os
import tempfile

temp_dir = tempfile.mkdtemp()
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE_PATH):
    EDGE_PATH = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

port = 9444
p = subprocess.Popen([
    EDGE_PATH,
    "--headless=new",
    f"--remote-debugging-port={port}",
    "--remote-allow-origins=*",
    f"--user-data-dir={temp_dir}",
    "--no-first-run",
    "--no-default-browser-check",
    "--window-size=1440,900",
    "--disable-gpu",
    "--no-sandbox",
    "http://localhost:8000/index.html"
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

time.sleep(3.0)

try:
    tabs_raw = urllib.request.urlopen(f"http://127.0.0.1:{port}/json").read()
    tabs = json.loads(tabs_raw.decode('utf-8'))
    page_tab = None
    for t in tabs:
        if "8000" in t.get("url", ""):
            page_tab = t
            break
    if not page_tab:
        page_tab = tabs[0]
    
    ws_url = page_tab["webSocketDebuggerUrl"]
    print("Connecting to ws:", ws_url)
    ws = websocket.create_connection(ws_url)

    def send_cmd(method, params=None):
        cmd_id = int(time.time() * 1000) % 1000000
        msg = {"id": cmd_id, "method": method, "params": params or {}}
        ws.send(json.dumps(msg))
        while True:
            resp = json.loads(ws.recv())
            if resp.get("id") == cmd_id:
                return resp.get("result", {})

    send_cmd("Runtime.enable")
    send_cmd("Page.enable")

    # Wait for CityCommuteInstance
    for _ in range(20):
        check = send_cmd("Runtime.evaluate", {
            "expression": "!!window.CityCommuteInstance",
            "returnByValue": True
        })
        if check.get("result", {}).get("value") is True:
            break
        time.sleep(0.5)

    def capture(name, js_action):
        print(f"--- Capturing {name} ---")
        send_cmd("Runtime.evaluate", {
            "expression": js_action,
            "returnByValue": True
        })
        time.sleep(2.0)
        ss = send_cmd("Page.captureScreenshot", {"format": "png"})
        if "data" in ss:
            out_path = os.path.join(r"C:\Users\OS\.gemini\antigravity\brain\c8c4b822-60da-4c0b-8bce-334bb31e0ecc", f"{name}.png")
            with open(out_path, "wb") as f:
                f.write(base64.b64decode(ss["data"]))
            print(f"Saved: {out_path}")

    # 1. Đi bộ trước Cổng Trường Ngô Quyền & Phố Trần Quốc Tuấn (Waypoint 0)
    capture("anime_city_tqt_gate", """
    (function() {
        const c = window.CityCommuteInstance;
        c.activateCityModeFromGate(0, 56.5);
        c.cameraYawOffset = -Math.PI / 2; // Nhìn dọc phố về hướng Tây
        c.cameraPitchOffset = 0.08;
        c.cameraDistOffset = 1.0;
    })()
    """)

    # 2. Xoay camera nhìn thẳng vào dãy cửa hàng anime đối diện (Tạp Hóa Cô Hằng, Phở Lý, Rèm Cửa)
    capture("anime_city_tqt_shops", """
    (function() {
        const c = window.CityCommuteInstance;
        c.cameraYawOffset = 0; // Quay mặt thẳng về hướng Bắc (Z = 73) nhìn trực diện dãy cửa hàng
        c.cameraPitchOffset = 0.12;
        c.cameraDistOffset = 2.0;
    })()
    """)

    # 3. Lên xe máy Honda Vision của Ba phóng trên Phố Ngô Quyền (Waypoint 6 - Số 24 Ngô Quyền & Ngã Ba Lê Xoay)
    capture("anime_city_ngoquyen_24", """
    (function() {
        const c = window.CityCommuteInstance;
        c.teleportToWaypoint(6);
        c.isMounted = true;
        c.cameraMode = 0; // Chase cam
        c.cameraYawOffset = 0;
        c.cameraPitchOffset = 0.12;
    })()
    """)

    # 4. Ngã Ba Lê Xoay - Tiệm Chăn Ga Gối Đệm Huyền Hậu & Vinamilk (Waypoint 8)
    capture("anime_city_lexoay_junction", """
    (function() {
        const c = window.CityCommuteInstance;
        c.teleportToWaypoint(8);
        c.isMounted = true;
        c.cameraYawOffset = 0;
    })()
    """)

    # 5. Bùng Binh Kim Ngọc & Bưu Điện VNPT (Waypoint 13)
    capture("anime_city_roundabout_kimngoc", """
    (function() {
        const c = window.CityCommuteInstance;
        c.teleportToWaypoint(13);
        c.isMounted = true;
        c.cameraYawOffset = 0;
    })()
    """)

    # 6. Sân Nhà Cây Cảnh Vũ Dậu đích đến 1.19 km (Waypoint 41)
    capture("anime_city_home_vudau_garden", """
    (function() {
        const c = window.CityCommuteInstance;
        c.teleportToWaypoint(41);
        c.isMounted = false; // Xuống xe dạo vườn
        if (c.arena && c.arena.studentMesh) {
            c.arena.studentMesh.position.set(-930.9, 0.16, -310.0);
            c.arena.studentMesh.rotation.y = Math.PI;
        }
        c.cameraYawOffset = 0;
    })()
    """)

finally:
    try:
        ws.close()
    except:
        pass
    p.kill()
    print("All captures completed successfully!")
