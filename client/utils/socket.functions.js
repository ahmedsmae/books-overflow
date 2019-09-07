import io from 'socket.io-client';
import SocketEvents from './socket-events';

const socket = io();

export const subscribeToChat = (chatId, cb) => {
  socket.on(SocketEvents.RECIEVE_MESSAGES, messages => cb(null, messages));
  socket.emit(SocketEvents.FIRST_CONNECTION, chatId);
};

export const sendMessage = message => {
  socket.emit(SocketEvents.SEND_MESSAGE, message);
};
