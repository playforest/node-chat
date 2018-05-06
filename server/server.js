const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')
const PORT = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use('/', express.static(publicPath))

io.on('connection', function(socket) {
    console.log('new user connected');

    socket.emit('newMessage', {
        from: 'admin',
        text: 'welcome to the chat app',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'new user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
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