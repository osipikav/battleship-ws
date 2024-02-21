import { WebSocketServer, WebSocket } from 'ws';
import { Player, Room } from '../types';
import { playerRegistration } from './registration';
import { updateRoom } from './createRoom';

export const players: Player[] = [];
export const rooms: Room[] = [];

export function websocketServer(PORT: number) {
  const wss = new WebSocketServer({ port: PORT });

  wss.on('connection', (ws: WebSocket) => {
    console.log(`Server is running on port 3000`);

    ws.on('message', (message: string) => {
      try {
        const { type, data, id } = JSON.parse(message);
        switch (type) {
          case 'reg':
            playerRegistration(ws, data, id);
            break;
          case 'create_room':
            updateRoom(ws, id);
            break;

          default:
            break;
        }
      } catch (error) {
        // throw console.error('WebSocket error', error);
        console.log('WebSocket error', error);
      }
    });
    ws.on('close', () => {
      console.log('Server closed');
    });
  });
}
