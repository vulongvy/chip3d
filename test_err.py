import subprocess, time, json, urllib.request, websocket

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
p = subprocess.Popen([
    EDGE_PATH, "--headless=new", "--remote-debugging-port=9560", "--remote-allow-origins=*",
    "--no-first-run", "--no-default-browser-check", "--window-size=1440,900",
    "--disable-gpu", "--no-sandbox", "http://localhost:8000/index.html"
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
time.sleep(3.0)
try:
    tabs = json.loads(urllib.request.urlopen("http://127.0.0.1:9560/json").read().decode())
    ws = websocket.create_connection(tabs[0]["webSocketDebuggerUrl"])
    msg_id = 0
    def cmd(method, params=None):
        global msg_id
        msg_id += 1
        ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
        while True:
            r = json.loads(ws.recv())
            if r.get("id") == msg_id:
                return r
            elif r.get("method") == "Runtime.exceptionThrown":
                print("EXCEPTION:", r)
            elif r.get("method") == "Runtime.consoleAPICalled":
                print("CONSOLE:", r.get("params", {}).get("args"))
    cmd("Runtime.enable")
    cmd("Page.enable")
    cmd("Log.enable")
    cmd("Network.enable")
    # Reload page to catch all network and runtime events from start
    cmd("Page.reload")
    start = time.time()
    while time.time() - start < 4.0:
        r = json.loads(ws.recv())
        if r.get("method") == "Runtime.exceptionThrown":
            print("EXCEPTION:", r["params"]["exceptionDetails"])
        elif r.get("method") == "Network.responseReceived":
            resp = r["params"]["response"]
            if resp["status"] != 200:
                print("HTTP ERROR:", resp["url"], resp["status"])
finally:
    p.kill()
