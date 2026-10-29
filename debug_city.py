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

    msg_id = 0
    def send_cmd(method, params=None):
        global msg_id
        msg_id += 1
        ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
        while True:
            resp = json.loads(ws.recv())
            if resp.get("id") == msg_id:
                return resp
            elif resp.get("method") == "Runtime.exceptionThrown":
                print("JS EXCEPTION:", resp["params"]["exceptionDetails"])
            elif resp.get("method") == "Log.entryAdded":
                print("LOG ENTRY:", resp["params"]["entry"])

    send_cmd("Runtime.enable")
    send_cmd("Page.enable")
    send_cmd("Log.enable")
    
    # Reload page
    print("Reloading page...")
    send_cmd("Page.reload")
    
    # Listen for 5 seconds
    start = time.time()
    while time.time() - start < 5.0:
        resp = json.loads(ws.recv())
        if resp.get("method") == "Runtime.exceptionThrown":
            print("PAGE EXCEPTION:", resp["params"]["exceptionDetails"])
        elif resp.get("method") == "Runtime.consoleAPICalled":
            args = resp.get("params", {}).get("args", [])
            vals = [a.get("value") or a.get("description") for a in args]
            if resp.get("params", {}).get("type") in ["error", "warn"]:
                print(f"CONSOLE {resp.get('params', {}).get('type')}:", vals)

finally:
    p.kill()
