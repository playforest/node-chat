const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

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
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    })

    socket.on('disconnect', function() {
        console.log('client disconnected')
    })
})

server.listen(PORT, () => console.log(`listening on port ${PORT}`))