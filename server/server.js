const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public')
const PORT = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use('/', express.static(publicPath))

io.on('connection', function(socket) {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('admin', 'welcome to the chat app'))

    socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('this is from the server');
    })

    socket.on('createLocationMessage', (coords)=> {
        io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude));
    })

    socket.on('disconnect', function() {
        console.log('client disconnected')
    })
})

server.listen(PORT, () => console.log(`listening on port ${PORT}`))