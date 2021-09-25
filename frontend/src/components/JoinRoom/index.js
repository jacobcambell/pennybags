import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';

import styles from './JoinRoom.module.css';

import { SettingsContext } from '../../SettingsContext';

const JoinRoom = () => {

    const socket = io('http://localhost:8000');
    const [roomList, setRoomList] = useState([]);
    const { settings, setSettings } = useContext(SettingsContext);
    const history = useHistory();

    useEffect(() => {
        socket.emit('list-rooms');
    }, []);

    socket.on('room-list', (data) => {
        setRoomList(data);
    })

    const handleJoin = (room_name) => {
        socket.emit('join-room', {
            player_name: settings.player_name,
            room_name: room_name
        })
    }

    socket.on('success', (data) => {
        // Update the state with their secret and room name
        setSettings({
            ...settings,
            room_name: data.room_name,
            secret: data.secret
        });

        history.push('/game');
    })

    return (
        <div className="page">
            <p className="title">Join Room</p>

            {
                roomList && roomList.map((room, i) => (
                    <div onClick={() => { handleJoin(room.room_name) }} key={i} className={styles.roomTile}>
                        {room.room_name}
                    </div>
                ))
            }

            <p>Joining room as {settings.player_name} </p>
        </div>
    );
}

export default JoinRoom;