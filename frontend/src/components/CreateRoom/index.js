import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SettingsContext } from '../../SettingsContext';

import styles from './CreateRoom.module.css';

const CreateRoom = () => {

    const { settings, setSettings, socket } = useContext(SettingsContext);

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
        socket.on('success', (data) => {
            // We want to update the settings context with the room name and secret the server sends us
            setSettings({
                ...settings,
                room_name: data.room_name,
                secret: data.secret
            });
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