import { Attack, Game, Player } from '../types';
import { games, players, shipsDB } from './server';

export function attack(data: Attack, id: number) {
  const { gameId, x, y, indexPlayer } = JSON.parse(data.toString());
  const currentPlayer = players[indexPlayer];
  const otherPlayer = players.find(
    (player) => player.playerId !== currentPlayer.playerId,
  )!;
  const currentGame = games.find((game) => game.idGame === gameId);
  const attackResult = attackStatus(currentGame!, x, y, currentPlayer);

  const response = {
    type: 'attack',
    data: JSON.stringify({
      position: { x, y },
      currentPlayer: currentPlayer.playerId,
      status: attackResult,
    }),
    id,
  };

  currentPlayer.ws.send(JSON.stringify(response));
  otherPlayer.ws.send(JSON.stringify(response));
}

function attackStatus(game: Game, x: number, y: number, currentPlayer: Player) {
  const opponentShips = getOpponentShips(game, currentPlayer);

  for (const ship of opponentShips) {
    const { position, direction, length } = ship;
    const { x: shipX, y: shipY } = position;

    if (!ship.hits) {
      ship.hits = Array(length).fill(false);
    }

    if (
      (!direction && y === shipY && x >= shipX && x < shipX + length) ||
      (direction && x === shipX && y >= shipY && y < shipY + length)
    ) {
      const hitIndex = direction ? y - shipY : x - shipX;
      ship.hits[hitIndex] = true;

      return ship.hits.every((hit) => hit) ? 'killed' : 'shot';
    }
  }
  return 'miss';
}

function getOpponentShips(game: Game, currentPlayer: Player) {
  const opponentShipData = shipsDB.find(
    (ship) =>
      ship.gameId === game.idGame &&
      ship.indexPlayer !== currentPlayer.playerId,
  );

  return opponentShipData ? opponentShipData.ships : [];
}
