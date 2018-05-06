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
        from: 'jordan',
        text: 'yo imi, how\'s it going?',
        createdAt: 12345
    })


    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
    })

    socket.on('disconnect', function() {
        console.log('client disconnected')
    })
})

server.listen(PORT, () => console.log(`listening on port ${PORT}`))