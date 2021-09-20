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
    socket.on('create-room', (args) => {
        // Params:
        // room_name: The name of the room the user wishes to create
        // room_password: A password the user supplies that is required for players to join their room
        // yourname: The display name this user wishes to have

        if(
            typeof args.room_name === 'undefined' ||
            typeof args.room_password === 'undefined' ||
            typeof args.yourname === 'undefined'
        ) {
            socket.emit('error', {message: 'Please only send the required parameters'});
            return;
        }
    });
});

server.listen(8000);