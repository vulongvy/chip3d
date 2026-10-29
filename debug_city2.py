import subprocess, time, json, urllib.request, websocket, tempfile, os

temp_dir = tempfile.mkdtemp()
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE_PATH):
    EDGE_PATH = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

port = 9559
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

time.sleep(2.0)

try:
    tabs_raw = urllib.request.urlopen(f"http://127.0.0.1:{port}/json").read()
    tabs = json.loads(tabs_raw.decode('utf-8'))
    ws = websocket.create_connection(tabs[0]["webSocketDebuggerUrl"])
    ws.settimeout(2.0)

    msg_id = 0
    def send_cmd(method, params=None):
        global msg_id
        msg_id += 1
        ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
        while True:
            try:
                resp = json.loads(ws.recv())
                if resp.get("id") == msg_id:
                    return resp
            except websocket.WebSocketTimeoutException:
                return None

    send_cmd("Runtime.enable")
    send_cmd("Page.enable")
    
    # Check if page is finished loading
    time.sleep(3.0)
    
    # Check scripts loaded
    res = send_cmd("Runtime.evaluate", {
        "expression": "Array.from(document.querySelectorAll('script')).map(s => s.src)",
        "returnByValue": True
    })
    print("SCRIPTS IN DOM:", res)

    # Check window variables
    res2 = send_cmd("Runtime.evaluate", {
        "expression": "({ hasThree: typeof THREE !== 'undefined', hasRoblox: typeof RobloxClassroom3D !== 'undefined', hasArena: typeof window.Campus3DArenaInstance !== 'undefined', hasCityMgr: typeof window.CityCommuteManager !== 'undefined', hasCityInst: typeof window.CityCommuteInstance !== 'undefined', hasEnter: typeof window.enterViceCityMode !== 'undefined' })",
        "returnByValue": True
    })
    print("WINDOW VARS:", res2)

finally:
    p.kill()
