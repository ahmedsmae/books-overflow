const SocketEvents = require('../client/src/assets/socket-events');
const Chat = require('../database/models/chat');

module.exports = io =>
  io.on('connection', socket => {
    console.log('New WebSocket connection | id = ', socket.id);

    let userChat;
    let opponentChat;

    socket.on(
      SocketEvents.FIRST_CONNECTION,
      async ({ ownerId, opponentId }) => {
        userChat = await Chat.findOne({ owner: ownerId, opponent: opponentId });
        opponentChat = await Chat.findOne({
          owner: opponentId,
          opponent: ownerId
        });
      }
    );

    socket.on(SocketEvents.SEND_MESSAGE, async message => {
      userChat.messages.push(message);
      userChat.save();

      opponentChat.messages.push(message);
      opponentChat.save();

      io.emit(SocketEvents.RECIEVE_MESSAGE, message);
    });

    require('./disconnect')(io, socket);
  });
