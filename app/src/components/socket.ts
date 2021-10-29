import { io } from 'socket.io-client';
const SOCKET_ADDRESS = 'http://192.168.0.108:6000';
export const socket = io(SOCKET_ADDRESS);

