import { useEffect, useContext, useState } from 'react';
import styles from './PlayerList.module.css';

import { SettingsContext } from '../../../SettingsContext';

const PlayerList = () => {

    const { socket } = useContext(SettingsContext);
    const [players, setPlayers] = useState();

    useEffect(() => {
        socket.off('send-player-list').on('send-player-list', (data) => {
            setPlayers(data);
        })

        socket.emit('list-players-in-room', { room_name: localStorage.getItem('room_name') });
    }, []);

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