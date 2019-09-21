import io from 'socket.io-client';
import SocketEvents from '../../assets/socket-events';

const socket = io();

export const subscribeToChat = userOpponentIds => {
  socket.emit(SocketEvents.FIRST_CONNECTION, userOpponentIds);
};

export const sendMessage = message => {
  socket.emit(SocketEvents.SEND_MESSAGE, message);
};

export const recieveMessage = () => {
  socket.on(SocketEvents.RECIEVE_MESSAGE, message => {
    return message;
  });
};
