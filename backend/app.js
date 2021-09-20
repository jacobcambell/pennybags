const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

// rooms is an array of room objects, with each room object containing a name,
// an array of player objects
let rooms = [
    // {
    //     room_name: 'First Room',
    //     players: [
    //         {player_name: 'Mike', balance: 1500, secret: 'j18fh173n8'}
    //     ]
    // }
];

io.on('connection', socket => {

});

server.listen(8000);