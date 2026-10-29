const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// 1. Static file server
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  let filePath = path.join(__dirname, decodeURIComponent(reqPath));
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    return res.end('Not found: ' + filePath);
  }
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.mp3': 'audio/mpeg'
  };
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(filePath));
});

server.listen(8081, async () => {
  console.log('Server listening on http://localhost:8081');

  // 2. Launch headless edge with remote debugging
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    'http://localhost:8081/index.html'
  ]);

  edge.stderr.on('data', d => console.log('[Edge Stderr]:', d.toString()));

  // Wait 2s for Edge to start
  await new Promise(r => setTimeout(r, 2000));

  // Connect to CDP
  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      try {
        const tabs = JSON.parse(data);
        console.log('Tabs:', tabs.map(t => ({ title: t.title, url: t.url })));
        const pageTab = tabs.find(t => t.url.includes('8081'));
        if (!pageTab) {
          console.error('No page tab found!');
          edge.kill();
          process.exit(1);
        }
        
        // Connect websocket
        const WebSocket = require('ws'); // wait, do we have ws installed?
      } catch (err) {
        console.error('Error parsing tabs:', err);
      }
    });
  }).on('error', e => {
    console.error('Failed to connect to Edge CDP:', e.message);
    edge.kill();
    process.exit(1);
  });
});
