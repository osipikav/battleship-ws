import { WebSocketServer, WebSocket } from 'ws';
import { Player } from '../types';
import { playerRegistration } from './registration';

export const players: Player[] = [];

export function websocketServer(PORT: number) {
  const wss = new WebSocketServer({ port: PORT });

  wss.on('connection', (ws: WebSocket) => {
    console.log(`Server is running on port 3000`);

    ws.on('message', (message: string) => {
      try {
        const { type, data, id } = JSON.parse(message);
        if (type === 'reg') {
          playerRegistration(type, data, id);
          console.log(players);
        }
      } catch (error) {
        throw console.error('WebSocket error', error);
      }
    });
  });
}
