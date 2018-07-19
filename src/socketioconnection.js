const socketio = require('feathers-socketio');
const tag = 'ipctest';

var socketioconnection = socketio(function (io) {
    
    io.on('connection', function (socket) {

            var roomName = '';

            console.log('webrtc :: ', 'connected Client: ', socket.id);

            // convenience function to log server messages on the client
            function log() {
                var array = ['Message from server:'];
                array.push.apply(array, arguments);
                socket.emit('log', array);
                array = ['ipctest :: clientLog :: '];
                array.push.apply(array, arguments);
                console.log.apply(console, array);
            }

            socket.on('message', function (message) {
                log('Client ' + socket.id + ' message: ', message);
                // for a real app, would be room-only (not broadcast)
                //socket.broadcast.emit('message', message);
                //var room = socket.roomName;
                //console.log('webrtc :: ', 'Message to room: ' + socket.roomName);
                if (socket.roomName) {
                    socket.broadcast.to(socket.roomName).emit('message', message);
                }
            });

            socket.on('join', function (data) {
                console.log('Client ' + socket.id + ' join: ', data);
                var room = data.room;
                var client = data.room;
                log('Received request from ' + socket.id + ' to create or join room ' + room);
                console.log('webrtc :: ', 'Received request to create or join room ' + room);

                var roomObj = io.sockets.adapter.rooms[room];
                //console.log('ipctest :: ', 'io.sockets.adapter.rooms: ', io.sockets.adapter.rooms);
                var numClients = 0;
                if (roomObj) {
                    numClients = roomObj.length;
                }

                socket.join(room);
                socket.roomName = room;
                roomName = room;
                log('Client ID ' + socket.id + ' joined room ' + room);
                socket.emit('joined', { room: room, peerid: socket.id });
                io.sockets.in(room).emit('entered', { room: room, peerid: socket.id });
                
                roomObj = io.sockets.adapter.rooms[room];
                numClients = 0;
                if (roomObj) {
                    numClients = roomObj.length;
                }
                io.sockets.in(room).emit('peercount', { room: room, count: numClients });
                log('Room ' + room + ' now has ' + numClients + ' client(s)');
            });

            socket.on('disconnect', function () {
                var room = socket.roomName;
                if (room) {
                    console.log('ipctest :: ', 'disconnected: peer: ' + socket.id + ' in room: ' + room);
                    io.sockets.in(room).emit('disconnected', { room: room, peerid: socket.id });
                }
            });

            socket.on('ipaddr', function () {
                var ifaces = os.networkInterfaces();
                for (var dev in ifaces) {
                    ifaces[dev].forEach(function (details) {
                        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
                            socket.emit('ipaddr', details.address);
                        }
                    });
                }
            });

            socket.on('bye', function () {
                console.log('ipctest :: ', 'received bye');
            });

    });
});

module.exports = socketioconnection;