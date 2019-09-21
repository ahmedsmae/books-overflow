const express = require('express');
const cors = require('cors');
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
app.use(cors());

// contains all event handlers
// require('./socket-io/main')(io);

// Define Routers
app.use('/api/users', require('./routes/users/signing'));
app.use('/api/users', require('./routes/users/profile'));
app.use('/api/users', require('./routes/users/password'));
app.use('/api/users', require('./routes/users/logout'));
app.use('/api/avatars', require('./routes/avatars/avatars'));

app.use('/api/books', require('./routes/books/setters'));
app.use('/api/books', require('./routes/books/getters'));
app.use('/api/books', require('./routes/books/delete'));
app.use('/api/bookimages', require('./routes/book-images/book-images'));

app.use('/api/collections', require('./routes/collections/setters'));
app.use('/api/collections', require('./routes/collections/getters'));
app.use('/api/collections', require('./routes/collections/delete'));
app.use(
  '/api/collectionimages',
  require('./routes/collection-images/collection-images')
);

app.use('/api/notifications', require('./routes/notifications/admin'));
app.use('/api/notifications', require('./routes/notifications/user'));

app.use('/api/publicitems', require('./routes/public-items/public-items'));

app.use('/api/contact', require('./routes/contact-us/contact'));

app.use('/api/chats', require('./routes/chats/chats'));

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
