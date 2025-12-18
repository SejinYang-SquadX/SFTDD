import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { watch } from 'chokidar';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import open from 'open';

const app = express();
const server = createServer(app);
const io = new Server(server);

const LOG_FILE = join(process.cwd(), 'logs/app.log');

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>SFTDD Logs</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Monaco', 'Menlo', monospace; 
            background: #1e1e1e; 
            color: #d4d4d4;
            padding: 20px;
        }
        h1 { 
            color: #4ec9b0; 
            margin-bottom: 20px;
            font-size: 24px;
        }
        #logs { 
            background: #252526; 
            padding: 20px; 
            border-radius: 8px;
            height: calc(100vh - 100px);
            overflow-y: auto;
            font-size: 14px;
            line-height: 1.6;
        }
        .log-line { 
            margin: 4px 0; 
            white-space: pre-wrap;
        }
        .timestamp { color: #858585; }
        .method { color: #569cd6; font-weight: bold; }
        .url { color: #ce9178; }
        .status-200 { color: #4ec9b0; }
        .status-400 { color: #dcdcaa; }
        .status-500 { color: #f48771; }
        .info { color: #4ec9b0; }
        .error { color: #f48771; }
        .warn { color: #dcdcaa; }
    </style>
</head>
<body>
    <h1>🪵 SFTDD Real-time Logs</h1>
    <div id="logs"></div>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        const logsDiv = document.getElementById('logs');
        
        function colorize(line) {
            line = line.replace(/(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)/g, '<span class="timestamp">$1</span>');
            line = line.replace(/\\b(GET|POST|PUT|DELETE|PATCH)\\b/g, '<span class="method">$1</span>');
            line = line.replace(/\\b(2\\d{2})\\b/g, '<span class="status-200">$1</span>');
            line = line.replace(/\\b(4\\d{2})\\b/g, '<span class="status-400">$1</span>');
            line = line.replace(/\\b(5\\d{2})\\b/g, '<span class="status-500">$1</span>');
            line = line.replace(/\\b(info|INFO)\\b/gi, '<span class="info">INFO</span>');
            line = line.replace(/\\b(error|ERROR)\\b/gi, '<span class="error">ERROR</span>');
            line = line.replace(/\\b(warn|WARNING)\\b/gi, '<span class="warn">WARN</span>');
            line = line.replace(/(\\/(api|health|v1)[^\\s]*)/g, '<span class="url">$1</span>');
            return line;
        }
        
        socket.on('initial', (data) => {
            logsDiv.innerHTML = data.split('\\n').map(line => 
                \`<div class="log-line">\${colorize(line)}</div>\`
            ).join('');
            logsDiv.scrollTop = logsDiv.scrollHeight;
        });
        
        socket.on('newLine', (line) => {
            const div = document.createElement('div');
            div.className = 'log-line';
            div.innerHTML = colorize(line);
            logsDiv.appendChild(div);
            logsDiv.scrollTop = logsDiv.scrollHeight;
        });
    </script>
</body>
</html>
    `);
});

io.on('connection', (socket) => {
    if (existsSync(LOG_FILE)) {
        const content = readFileSync(LOG_FILE, 'utf-8');
        socket.emit('initial', content);
    }
});

const watcher = watch(LOG_FILE);
watcher.on('change', () => {
    if (existsSync(LOG_FILE)) {
        const content = readFileSync(LOG_FILE, 'utf-8');
        const lines = content.split('\n');
        const lastLine = lines[lines.length - 2] || lines[lines.length - 1];
        if (lastLine) {
            io.emit('newLine', lastLine);
        }
    }
});

const PORT = 9001;
server.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`🪵 Log viewer running at ${url}`);
    open(url);
});
