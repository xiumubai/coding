const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    // 提供HTML文件
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

// 创建WebSocket服务器
const wss = new WebSocket.Server({ server });

// 存储所有连接的客户端
const clients = new Set();

// 处理WebSocket连接
wss.on('connection', (ws) => {
  console.log('新客户端连接');
  
  // 将新客户端添加到集合中
  clients.add(ws);
  
  // 发送欢迎消息
  ws.send(JSON.stringify({
    type: 'system',
    message: '欢迎加入聊天室！',
    timestamp: new Date().toLocaleTimeString()
  }));
  
  // 广播用户加入消息
  broadcast({
    type: 'system',
    message: '有新用户加入了聊天室',
    timestamp: new Date().toLocaleTimeString()
  }, ws);
  
  // 处理接收到的消息
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      console.log('收到消息:', message);
      
      // 广播消息给所有客户端（包括发送者）
      broadcast({
        type: 'user',
        username: message.username || '匿名用户',
        message: message.message,
        timestamp: new Date().toLocaleTimeString()
      });
    } catch (error) {
      console.error('解析消息错误:', error)
    }
  });
  
  // 处理连接关闭
  ws.on('close', () => {
    console.log('客户端断开连接');
    clients.delete(ws);
    
    // 广播用户离开消息
    broadcast({
      type: 'system',
      message: '有用户离开了聊天室',
      timestamp: new Date().toLocaleTimeString()
    });
  });
  
  // 处理连接错误
  ws.on('error', (error) => {
    console.error('WebSocket错误:', error);
    clients.delete(ws);
  });
});

// 广播消息给所有客户端
function broadcast(message, excludeClient = null) {
  const messageString = JSON.stringify(message);
  
  clients.forEach((client) => {
    if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
      client.send(messageString);
    }
  });
}

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('WebSocket服务器已启动');
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('正在关闭服务器...');
  server.close(() => {
    console.log('服务器已关闭');
  });
});