import io from 'socket.io-client';
import SocketEvents from '../../assets/socket-events';

const socket = io();

export const subscribeToChat = (userOpponentIds, cb) => {
  socket.on(SocketEvents.RECIEVE_MESSAGE, message => cb(null, message));
  socket.emit(SocketEvents.FIRST_CONNECTION, userOpponentIds);
};

export const sendMessage = message => {
  socket.emit(SocketEvents.SEND_MESSAGE, message);
};
