import { useEffect, useContext } from 'react';
import styles from './PlayerList.module.css';
import io from 'socket.io-client';

import { SettingsContext } from '../../../SettingsContext';

const PlayerList = () => {

    const socket = io('http://localhost:8000');
    const { settings, setSettings } = useContext(SettingsContext);

    useEffect(() => {
        socket.emit('list-players-in-room', { room_name: settings.room_name });
    }, []);

    socket.on('send-player-list', (data) => {
        console.log(data)
    })

    return (
        <div className={styles.playerlist}>
            <p className={styles.title}>Players in Room:</p>
        </div>
    );
}

export default PlayerList;