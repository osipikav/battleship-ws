import { WebSocket } from 'ws';
import { Room } from '../types';
import { players, rooms } from './server';

export const updateRoom = (wss: WebSocket, id: number) => {
  const playerToUpdate = players?.find((player) => wss === player.ws);

  if (playerToUpdate) {
    const { name, playerId } = playerToUpdate;
    const newRoom: Room = {
      roomId: rooms.length,
      roomUsers: [{ name: name, index: playerId }],
    };
    rooms.push(newRoom);

    players?.forEach((player) => {
      const response = {
        type: 'update_room',
        data: JSON.stringify(rooms),
        id,
      };

      console.log(response);
      player.ws.send(JSON.stringify(response));
    });
  }
};
