import styles from './JoinRoom.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const JoinRoom = () => {

    const socket = io('http://localhost:8000');

    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        socket.emit('list-rooms');
    }, []);

    socket.on('room-list', (data) => {
        setRoomList(data);
    })

    return (
        <div className="page">
            <p className="title">Join Room</p>

            {
                roomList && roomList.map((room, index) => (
                    <Link key={index} to="/" className={styles.roomTile}>
                        {room}
                    </Link>
                ))
            }
        </div>
     );
}

export default JoinRoom;