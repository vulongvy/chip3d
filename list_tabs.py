import subprocess, time, json, urllib.request, tempfile, os

temp_dir = tempfile.mkdtemp()
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE_PATH):
    EDGE_PATH = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

port = 9561
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
    "--no-sandbox",
    "http://localhost:8000/index.html"
], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

time.sleep(3.0)

try:
    tabs_raw = urllib.request.urlopen(f"http://127.0.0.1:{port}/json").read()
    tabs = json.loads(tabs_raw.decode('utf-8'))
    for i, t in enumerate(tabs):
        print(f"Tab {i}: type={t.get('type')}, url={t.get('url')}, title={t.get('title')}")
finally:
    p.kill()
