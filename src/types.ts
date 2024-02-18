import { WebSocket } from 'ws';

export interface MessageRequest {
  type: string;
  data: DataWSMessage;
  id: number;
}
export interface DataWSMessage extends Player {}

export interface Player {
  name: string;
  playerId: number;
  password: string;
  ws: WebSocket;
}
