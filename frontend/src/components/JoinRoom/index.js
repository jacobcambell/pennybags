import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import styles from './JoinRoom.module.css';

import { SettingsContext } from '../../SettingsContext';

const JoinRoom = () => {

    const [roomList, setRoomList] = useState([]);
    const { socket } = useContext(SettingsContext);
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('player_name') === null) {
            history.push('/');
            return;
        }

        socket.off('room-list').on('room-list', (data) => {
            setRoomList(data);
        });

        socket.off('success-joinroom').on('success-joinroom', (data) => {
            localStorage.setItem('room_name', data.room_name);

            history.push('/game');
        });

        socket.emit('list-rooms');
    }, []);

    const handleJoin = (room_name) => {
        socket.emit('join-room', {
            player_name: localStorage.getItem('player_name'),
            room_name: room_name
        })
    }

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
        </div>
    );
}

export default JoinRoom;