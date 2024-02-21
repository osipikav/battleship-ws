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
