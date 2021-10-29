import { Server } from "socket.io";

const io = new Server({});

io.on("connection", (socket) => {

});

io.listen(6000);

// // rooms is an array of room objects
// let rooms = [];

// io.on('connection', socket => {
//     socket.on('create-room', (args) => {
//         if (
//             typeof args.room_name === 'undefined' ||
//             typeof args.room_password === 'undefined' ||
//             typeof args.yourname === 'undefined'
//         ) {
//             socket.emit('error', { message: 'Please only send the required parameters' });
//             return;
//         }

//         // Check if a room with that name already exists
//         for (let i = 0; i < rooms.length; i++) {
//             if (rooms[i].room_name === args.room_name) {
//                 socket.emit('error', {
//                     message: 'Room with that name already exists'
//                 });

//                 return;
//             }
//         }

//         // Create a room with this user's information
//         let newRoom = {
//             room_name: args.room_name,
//             room_password: args.room_password,
//             owner: args.yourname,
//             players: [
//                 { player_name: args.yourname, balance: 1500, sid: socket.id }
//             ],
//             event_feed: [
//                 'Room created by ' + args.yourname,
//                 'Somebody died'
//             ]
//         };

//         // Push this new room we created to the list of rooms
//         rooms.push(newRoom);

//         // Room was created successfully, we want to send the user their room name
//         socket.emit('success-createroom', { room_name: args.room_name });

//         // Subscribe this socket to the room with the exact same name
//         socket.join(args.room_name);
//     });

//     socket.on('list-rooms', (args) => {
//         // Get a list of all the room names
//         let listOfRooms = [];

//         rooms.map((room) => {
//             listOfRooms.push({ room_name: room.room_name, owner: room.owner });
//         });

//         socket.emit('room-list', listOfRooms);
//     })

//     socket.on('get-event-feed', (args) => {
//         if (typeof args.room_name === 'undefined') {
//             socket.emit('error', {
//                 message: 'Please specify a room name'
//             });

//             return;
//         }

//         // Get event feed for the requested room name
//         // Loop through all the rooms, and see if the room name matches. If so, return that object's event feed
//         let event_feed = [];

//         for (let i = 0; i < rooms.length; i++) {
//             if (rooms[i].room_name === args.room_name) {
//                 event_feed = rooms[i].event_feed;
//             }
//         }

//         // Send the event feed back to the client
//         socket.emit('send-event-feed', event_feed);
//     })

//     socket.on('get-balance-for-player', (args) => {
//         // Returns the balance of the player requested
//         // Player should send their room name, and a player name

//         if (
//             typeof args.room_name === 'undefined' ||
//             typeof args.player_name === 'undefined'
//         ) {
//             socket.emit('error', {
//                 message: 'Please send the correct required parameters'
//             });

//             return;
//         }

//         // Loop through all the rooms until we find the room with the given room name
//         for (let i = 0; i < rooms.length; i++) {
//             if (rooms[i].room_name === args.room_name) {
//                 // We found the requested room
//                 // Now we want to find a player in this room that matches the requested name
//                 for (let k = 0; k < rooms[i].players.length; k++) {
//                     if (rooms[i].players[k].player_name === args.player_name) {
//                         // We found the player in the room the user requested. Send the client this player's balance
//                         socket.emit('return-player-balance', { player_name: args.player_name, balance: rooms[i].players[k].balance })
//                     }
//                 }
//             }
//         }
//     })

//     socket.on('list-players-in-room', (args) => {
//         // Returns a list of players with their balances
//         if (
//             typeof args.room_name === 'undefined'
//         ) {
//             socket.emit('error', {
//                 message: 'Please send a room name to list players'
//             });

//             return;
//         }

//         // Loop through the rooms until we find the room with the requested name
//         for (let i = 0; i < rooms.length; i++) {
//             if (rooms[i].room_name === args.room_name) {
//                 // We found the requested room
//                 // Now we want to build a new array of players from this room that does not contain their secrets (Note - secrets was an old variable, might not need this anymore)

//                 let newPlayerList = [];

//                 for (let k = 0; k < rooms[i].players.length; k++) {
//                     newPlayerList.push({
//                         player_name: rooms[i].players[k].player_name,
//                         balance: rooms[i].players[k].balance
//                     });
//                 }

//                 // Send the player list for the requested room (player_name, balance) to the client
//                 socket.emit('send-player-list', newPlayerList);
//             }
//         }
//     })

//     socket.on('join-room', (args) => {
//         // Makes a player join a room

//         if (
//             typeof args.player_name === 'undefined' ||
//             typeof args.room_name === 'undefined'
//         ) {
//             socket.emit('error', {
//                 message: 'Please send the required information'
//             });

//             return;
//         }

//         // We want to loop through the rooms until we find the room with the specified name
//         for (let i = 0; i < rooms.length; i++) {
//             if (rooms[i].room_name === args.room_name) {
//                 // We found the right room. First we want to check if this person's socket id already exists in the room
//                 for (let k = 0; k < rooms[i].players.length; k++) {
//                     if (rooms[i].players[k].sid === socket.id) {
//                         // Their socket id is already in this room, so we'll tell them they successfully joined but won't process anything from here since they are already in the room
//                         socket.emit('success-joinroom', { room_name: args.room_name });
//                         return;
//                     }
//                 }

//                 // Next, check if someone with that name is already in the room
//                 for (let k = 0; k < rooms[i].players.length; k++) {
//                     if (rooms[i].players[k].player_name === args.player_name) {
//                         socket.emit('error', { message: 'Someone in this room already has the name you chose. Please choose a different name' });
//                         return;
//                     }
//                 }

//                 // Their socket id was not found in the room and nobody exists in this room with that name, so add them to it
//                 rooms[i].players.push({
//                     player_name: args.player_name,
//                     balance: 1500,
//                     sid: socket.id
//                 });

//                 // Add join message to this room's event feed
//                 rooms[i].event_feed.push(`${args.player_name} joined the game.`);

//                 // Broadcast the new event feed to everyone in the room (except this new person)
//                 socket.to(args.room_name).emit('newEventFeed', rooms[i].event_feed);

//                 // Subscribe the new user to the room they joined
//                 socket.join(args.room_name);

//                 // Tell the player they successfully joined the room and give them their room name
//                 socket.emit('success-joinroom', { room_name: args.room_name });
//             }
//         }
//     })
// });

// server.listen(8000);