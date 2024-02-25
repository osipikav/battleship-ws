import { WebSocket } from 'ws';

export interface Player {
  name: string;
  playerId: number;
  password: string;
  ws: WebSocket;
}

export interface Room {
  roomId: number;
  roomUsers: [
    {
      name: string;
      index: number;
    },
  ];
}

export interface Game {
  idGame: number;
  players: Player[];
}

export interface AddShips {
  gameId: number;
  ships: Ship[];
  indexPlayer: number;
}

export interface Ship {
  position: Cordinates;
  direction: boolean;
  length: number;
  type: string;
  hits?: boolean[];
}

interface Cordinates {
  x: number;
  y: number;
}
