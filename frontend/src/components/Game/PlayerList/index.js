import { useEffect, useContext, useState } from 'react';
import styles from './PlayerList.module.css';
import io from 'socket.io-client';

import { SettingsContext } from '../../../SettingsContext';

const PlayerList = () => {

    const socket = io('http://localhost:8000');
    const { settings, setSettings } = useContext(SettingsContext);
    const [players, setPlayers] = useState();

    useEffect(() => {
        socket.emit('list-players-in-room', { room_name: settings.room_name });
    }, []);

    socket.on('send-player-list', (data) => {
        setPlayers(data);
    })

    return (
        <div className={styles.playerlist}>
            <p className={styles.title}>Players in Room:</p>

            {
                players &&
                players.map((player, i) => (
                    <p key={i} className={styles.player}>{player.player_name} : ${player.balance}</p>
                ))
            }
        </div>
    );
}

export default PlayerList;