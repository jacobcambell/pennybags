const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

// rooms is an array of room objects
let rooms = [];

io.on('connection', socket => {
    socket.on('create-room', (args) => {
        // Params:
        // room_name: The name of the room the user wishes to create
        // room_password: A password the user supplies that is required for players to join their room
        // yourname: The display name this user wishes to have

        if (
            typeof args.room_name === 'undefined' ||
            typeof args.room_password === 'undefined' ||
            typeof args.yourname === 'undefined'
        ) {
            socket.emit('error', { message: 'Please only send the required parameters' });
            return;
        }

        // Check if a room with that name already exists
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].room_name === args.room_name) {
                socket.emit('error', {
                    message: 'Room with that name already exists'
                });

                return;
            }
        }

        // Generate a secret for this player
        let SECRET = makeid(10);

        // Create a room with this user's information
        let newRoom = {
            room_name: args.room_name,
            room_password: args.room_password,
            owner: args.yourname,
            players: [
                { player_name: args.yourname, balance: 1500, secret: SECRET }
            ],
            event_feed: [
                'Room created by ' + args.yourname,
                'Somebody died'
            ]
        };

        // Push this new room we created to the list of rooms
        rooms.push(newRoom);

        // Room was created successfully, we want to send the user their secret that is attached to their player in the new room, as well as the room name
        socket.emit('success', { secret: SECRET, room_name: args.room_name });
    });

    socket.on('list-rooms', (args) => {
        // Get a list of all the room names
        let listOfRooms = [];

        rooms.map((room) => {
            listOfRooms.push({ room_name: room.room_name, owner: room.owner });
        });

        socket.emit('room-list', listOfRooms);
    })

    socket.on('get-event-feed', (args) => {
        if (typeof args.room_name === 'undefined') {
            socket.emit('error', {
                message: 'Please specify a room name'
            });
        }

        // Get event feed for the requested room name
        // Loop through all the rooms, and see if the room name matches. If so, return that object's event feed
        let event_feed = [];

        for (let i = 0; i < rooms.length; i++) {
            if(rooms[i].room_name === args.room_name){
                event_feed = rooms[i].event_feed;
            }
        }

        // Send the event feed back to the client
        socket.emit('send-event-feed', event_feed);
    })
});

server.listen(8000);

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

setInterval(() => {
    console.log(JSON.stringify(rooms))
}, 3000);