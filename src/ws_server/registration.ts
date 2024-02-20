import { WebSocket } from 'ws';
import { Player } from '../types';
import { players } from './server';

export function playerValidation(data: Player) {
  const { name } = JSON.parse(data.toString());
  if (players.map((player) => player.name).includes(name)) {
    return { error: true, errorText: 'Player already exists' };
  } else {
    return { error: false, errorText: '' };
  }
}

export function playerRegistration(ws: WebSocket, data: Player, id: number) {
  const { name, password } = JSON.parse(data.toString());
  const { error, errorText } = playerValidation(data);
  const playerId = players.length;

  const newPlayer: Player = {
    ws,
    name,
    playerId,
    password,
  };
  if (!error) players.push(newPlayer);

  const index = playerId;
  const response = {
    type: 'reg',
    data: JSON.stringify({
      name,
      index,
      error,
      errorText,
    }),
    id,
  };

  ws.send(JSON.stringify(response));
}
