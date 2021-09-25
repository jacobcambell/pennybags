import { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import styles from './Balance.module.css';

import { SettingsContext } from '../../../SettingsContext';

const Balance = () => {

    const [ balance, setBalance ] = useState('0');
    const socket = io('http://localhost:8000');
    const { settings, setSettings } = useContext(SettingsContext);

    useEffect(() => {
        // Load the player's current balance
        socket.emit('get-balance-for-player', {
            player_name: settings.player_name,
            room_name: settings.room_name
        });
    }, []);

    socket.on('return-player-balance', (data) => {
        setBalance(data.balance);
    })

    return (
        <div>
            <p className={styles.title}>My Balance</p>
            <p className={styles.balance}>{`$${balance}`}</p>
        </div>
     );
}

export default Balance;