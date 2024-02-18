import { WebSocketServer, WebSocket } from 'ws';
import { Player } from '../types';

// const players: Player[] = [];

export function websocketServer(PORT: number) {
  const wss = new WebSocketServer({ port: PORT });

  wss.on('connection', (ws: WebSocket) => {
    console.log(`Server is running on port 3000`);

    ws.on('message', (message: string) => {
      try {
        const { type, data, id } = JSON.parse(message);
        if (type === 'reg') {
          userRegistration(type, data, id);
        }
      } catch (error) {
        throw console.error(error);
      }
    });
  });
}

function userRegistration(ws: WebSocket, data: Player, id: number) {
  const { name, password } = JSON.parse(data.toString());
  console.log(name, password, id);
}
