import subprocess, time, json, urllib.request, websocket, tempfile, os

temp_dir = tempfile.mkdtemp()
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE_PATH):
    EDGE_PATH = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

port = 9568
p = subprocess.Popen([
    EDGE_PATH,
    "--headless=new",
    f"--remote-debugging-port={port}",
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
    tabs_raw = urllib.request.urlopen(f"http://127.0.0.1:{port}/json").read()
    tabs = json.loads(tabs_raw.decode('utf-8'))
    page_tab = [t for t in tabs if t.get("type") == "page"][0]
    print("Connecting to tab:", page_tab["url"])
    ws = websocket.create_connection(page_tab["webSocketDebuggerUrl"])
    ws.settimeout(10.0)

    msg_id = 0
    def send_cmd(method, params=None):
        global msg_id
        msg_id += 1
        curr_id = msg_id
        ws.send(json.dumps({"id": curr_id, "method": method, "params": params or {}}))
        while True:
            resp = json.loads(ws.recv())
            if resp.get("id") == curr_id:
                return resp
            elif resp.get("method") == "Runtime.exceptionThrown":
                print("JS EXCEPTION:", resp["params"]["exceptionDetails"])

    send_cmd("Page.enable")
    send_cmd("Runtime.enable")

    print("Navigating to http://localhost:8000/index.html...")
    nav_res = send_cmd("Page.navigate", {"url": "http://localhost:8000/index.html"})
    print("Nav result:", nav_res)

    # Wait 4 seconds for scripts and Three arena to boot
    time.sleep(4.0)

    for attempt in range(10):
        eval_res = send_cmd("Runtime.evaluate", {
            "expression": """
            ({
                url: window.location.href,
                ready: document.readyState,
                three: typeof THREE !== 'undefined',
                arenaInst: !!window.Campus3DArenaInstance,
                cityInst: !!window.CityCommuteInstance,
                enterFn: typeof window.enterViceCityMode
            })
            """,
            "returnByValue": True
        })
        val = eval_res.get("result", {}).get("result", {}).get("value")
        print(f"Attempt {attempt}:", val)
        if val and val.get("cityInst"):
            break
        time.sleep(1.0)

finally:
    p.kill()
