const SocketEvents = require('../client/utils/socket-events');
// const Chat = require('../models/Chat');

module.exports = io =>
  io.on('connection', socket => {
    // console.log('New WebSocket connection | id = ', socket.id);

    // let chat;

    // socket.on(SocketEvents.FIRST_CONNECTION, async chatId => {
    //   chat = await Chat.findOne({ _id: chatId });

    //   socket.emit(SocketEvents.RECIEVE_MESSAGES, chat.messages);
    // });

    // socket.on(SocketEvents.SEND_MESSAGE, async message => {
    //   chat.messages.push(message);

    //   await chat.save();

    //   chat = await Chat.findOne({ _id: chat._id });

    //   io.emit(SocketEvents.RECIEVE_MESSAGES, chat.messages);
    // });

    require('./disconnect')(io, socket);
  });
