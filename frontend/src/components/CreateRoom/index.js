import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SettingsContext } from '../../SettingsContext';

import styles from './CreateRoom.module.css';

const CreateRoom = () => {

    const { socket } = useContext(SettingsContext);

    const [roomname, setRoomname] = useState();
    const [roompassword, setRoompassword] = useState();

    const history = useHistory();

    const handleForm = () => {
        socket.emit('create-room', {
            room_name: roomname,
            room_password: roompassword,
            yourname: localStorage.getItem('player_name')
        });
    }

    useEffect(() => {
        socket.off('success-createroom').on('success-createroom', (data) => {
            localStorage.setItem('room_name', data.room_name);
            localStorage.setItem('secret', data.secret);

            history.push('/game');
        })
    }, []);

    return (
        <div className="page">
            <p className={styles.title}>Create a Room</p>

            <p className={styles.label}>Room Name</p>
            <input onChange={(e) => { setRoomname(e.target.value) }} type="text" className={styles.field} />

            <p className={styles.label}>Room Password</p>
            <input onChange={(e) => { setRoompassword(e.target.value) }} type="password" className={styles.field} />

            <button onClick={handleForm} className={styles.createBtn}>Create Room</button>
        </div>
    );
}

export default CreateRoom;