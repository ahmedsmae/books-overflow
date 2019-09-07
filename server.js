const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const compression = require('compression');
// const enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const connectMongoDB = require('./database/mongo-db');
connectMongoDB();

// Init Middleware
app.use(compression());
app.use(express.json({ extended: false }));

// Define Routers
app.use('/api/users', require('./routes/users/signing'));
// app.use('/api/users', require('./routes/users/password'));
// app.use('/api/users', require('./routes/users/logout'));

// contains all event handlers
require('./socket-io/main')(io);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  // app.use(enforce.HTTPS({ trustProtoHeader: true }));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

server.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
