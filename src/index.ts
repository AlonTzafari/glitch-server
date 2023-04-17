import http from 'http';
import express from 'express';
import WebSocket, {WebSocketServer} from 'ws';
import {v4} from 'uuid';
import { messageHandler } from './messageHandler';


const PORT = Number(process.env.PORT ?? 80);
const HOST = process.env.HOST ?? 'localhost';
const SSL = process.env.SSL === 'true' || false;




const app = express();
app.use(express.static('../public'));
app.get('/', (req, res) => {
    res.status(200).send("OK");
});
app.get('/health', (req, res) => {
    res.status(200).send("OK");
});
const server = http.createServer(app);

const ws = new WebSocketServer({
  server,
  path: '/ws'
});

const connections = new Map<string, WebSocket>();

ws.on('connection', (socket, req) => {
    const connectionId = v4();
    connections.set(connectionId, socket);
    socket.on('message', (data, isBinary) => {
        messageHandler(connections, connectionId, data, isBinary)
    });
    socket.on('close', () => {
        connections.delete(connectionId);
    })
    socket.send(JSON.stringify({connectionId}));
})

server.listen(PORT, () => {
    console.log(`server ready at ${SSL ? 'https' : 'http'}://${HOST}`);
});