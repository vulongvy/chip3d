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

port = 9333
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
    print("Found tabs:", [(t.get("title"), t.get("url")) for t in tabs])
    page_tab = None
    for t in tabs:
        if "8000" in t.get("url", ""):
            page_tab = t
            break
    if not page_tab:
        for t in tabs:
            if t.get("type") == "page":
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

    print("Enabling Runtime and Page...")
    send_cmd("Runtime.enable")
    send_cmd("Page.enable")

    # Wait up to 10s for CityCommuteInstance to exist
    for _ in range(20):
        check = send_cmd("Runtime.evaluate", {
            "expression": "!!window.CityCommuteInstance",
            "returnByValue": True
        })
        if check.get("result", {}).get("value") is True:
            print("CityCommuteInstance is ready!")
            break
        time.sleep(0.5)

    eval_res = send_cmd("Runtime.evaluate", {
        "expression": """
        (function() {
            if (window.CityCommuteInstance) {
                window.CityCommuteInstance.activateCityMode(0, false);
                return "SUCCESS: Activated City Mode (Walking at School Gate)";
            }
            return "ERROR: No CityCommuteInstance found";
        })()
        """,
        "returnByValue": True
    })
    debug_tex = send_cmd("Runtime.evaluate", {
        "expression": """
        (function() {
            const c = window.CityCommuteInstance;
            const keys = Object.keys(c._realTextures || {});
            const details = {};
            keys.forEach(k => {
                const tex = c._realTextures[k];
                details[k] = {
                    hasImage: !!tex.image,
                    imgWidth: tex.image ? tex.image.width : 0,
                    imgHeight: tex.image ? tex.image.height : 0,
                    complete: tex.image ? tex.image.complete : false
                };
            });
            return {
                keys: keys,
                details: details
            };
        })()
        """,
        "returnByValue": True
    })
    print("Texture debug:", json.dumps(debug_tex, indent=2))

    # Capture screenshot
    ss_res = send_cmd("Page.captureScreenshot", {"format": "png"})
    if "data" in ss_res:
        img_bytes = base64.b64decode(ss_res["data"])
        out_path = r"C:\Users\OS\.gemini\antigravity\brain\c8c4b822-60da-4c0b-8bce-334bb31e0ecc\city_current_state.png"
        with open(out_path, "wb") as f:
            f.write(img_bytes)
        print("Saved screenshot to:", out_path)
    else:
        print("Failed to capture screenshot:", ss_res)

finally:
    try:
        ws.close()
    except:
        pass
    p.kill()
    print("Done")
