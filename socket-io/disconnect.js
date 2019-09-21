const SocketEvents = require('../client/src/assets/socket-events ');
const { generateMessage } = require('./socket-io.utils');

module.exports = (io, socket) =>
  socket.on('disconnect', () => {
    io.emit(SocketEvents.MESSAGE, generateMessage('A user has left :('));
  });
