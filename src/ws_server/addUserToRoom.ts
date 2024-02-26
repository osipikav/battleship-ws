import { WebSocket } from 'ws';
import { players, rooms, games } from './server';
import { Game, Room, Player } from '../types';

export function addUserToRoom(wss: WebSocket, data: number, id: number) {
  const { indexRoom } = JSON.parse(data.toString());
  const activeRoom: Room = rooms.find(
    (room) => room.roomId === indexRoom,
  ) as Room;

  const activePlayer: Player = players.find(
    (player) => player.ws === wss,
  ) as Player;

  const indexActivePlayer = activeRoom.roomUsers[0].index;
  const waitingPlayer: Player = players.find(
    (player) => player.playerId === indexActivePlayer,
  ) as Player;

  if (indexActivePlayer !== activePlayer.playerId) {
    const idGame = games.length;
    const game: Game = { idGame, players: [activePlayer, waitingPlayer] };
    games.push(game);

    const activeData = {
      type: 'create_game',
      data: JSON.stringify({
        idGame,
        idPlayer: activePlayer.playerId,
      }),
      id,
    };
    activePlayer.ws.send(JSON.stringify(activeData));
    const waitingData = {
      type: 'create_game',
      data: JSON.stringify({
        idGame,
        idPlayer: waitingPlayer.playerId,
      }),
      id,
    };
    waitingPlayer.ws.send(JSON.stringify(waitingData));
  }
}
