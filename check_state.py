import urllib.request
import json
import websocket

try:
    tabs = json.loads(urllib.request.urlopen('http://127.0.0.1:9333/json').read().decode())
    t = [x for x in tabs if '8000' in x.get('url','')][0]
    ws = websocket.create_connection(t['webSocketDebuggerUrl'])
    ws.send(json.dumps({
        'id': 1,
        'method': 'Runtime.evaluate',
        'params': {
            'expression': '''
            (function() {
                const c = window.CityCommuteInstance;
                return {
                    realTextures: Object.keys(c._realTextures || {}),
                    cityGroupChildren: c.cityGroup.children.length,
                    cameraPos: { x: c.camera.position.x, y: c.camera.position.y, z: c.camera.position.z },
                    studentPos: c.arena && c.arena.studentMesh ? {
                        x: c.arena.studentMesh.position.x,
                        y: c.arena.studentMesh.position.y,
                        z: c.arena.studentMesh.position.z
                    } : null
                };
            })()
            ''',
            'returnByValue': True
        }
    }))
    res = json.loads(ws.recv())
    print("Debug state:", json.dumps(res, indent=2))
except Exception as e:
    print("Error:", e)
