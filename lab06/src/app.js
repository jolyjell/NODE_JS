const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { join } = require('path');

const { generateMessage, generateLocationMessage, generateTypingMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom, getUserByName } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(join(__dirname, '/../public')));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options });

        if (error) {
            return callback(error);
        }

        socket.join(user.room);

        socket.emit('message', generateMessage('Admin', `Welcome, ${user.username}!`));
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`));

        io.to(user.room).emit('roomData', {
            users: getUsersInRoom(user.room)
        });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback();
    });

    socket.on('sendPrivateMessage', (username, message, callback) => {
        const recipient = getUserByName(username);
        const user = getUser(socket.id);
        if (user && recipient) {
            socket.to(recipient.id).emit('message', generateMessage(user.username, message));
            socket.emit('message', generateMessage(user.username, message));
            callback();
        } else {
            callback('User not found');
        }
    });

    socket.on('userIsTyping', (typing) => {
        const user = getUser(socket.id);
        if (typing === true)
            io.emit('display', generateTypingMessage(true, `${user.username} is typing...`));
        else
            io.emit('display', generateTypingMessage(false, ""));
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`));
            io.to(user.room).emit('roomData', {
                users: getUsersInRoom(user.room)
            });
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});