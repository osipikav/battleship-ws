import { WebSocket } from 'ws';
import { AddShips } from '../types';
import { shipsDB } from './server';

export function startGame(ws: WebSocket, data: AddShips, id: number) {
  const { ships, indexPlayer } = JSON.parse(data.toString());
  const ship: AddShips = {
    gameId: id,
    ships,
    indexPlayer,
  };

  shipsDB.push(ship);

  const response = {
    type: 'start_game',
    data: JSON.stringify({
      ships,
      currentPlayerIndex: indexPlayer,
    }),
    id,
  };
  ws.send(JSON.stringify(response));
}
