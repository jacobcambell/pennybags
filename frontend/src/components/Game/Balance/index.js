import { useEffect, useState, useContext } from 'react';
import styles from './Balance.module.css';

import { SettingsContext } from '../../../SettingsContext';

const Balance = () => {

    const [balance, setBalance] = useState('0');
    const { settings, setSettings, socket } = useContext(SettingsContext);

    useEffect(() => {
        // Load the player's current balance
        socket.off('return-player-balance').on('return-player-balance', (data) => {
            setBalance(data.balance);
        })

        socket.emit('get-balance-for-player', {
            player_name: localStorage.getItem('player_name'),
            room_name: localStorage.getItem('room_name')
        });
    }, []);

    return (
        <div>
            <p className={styles.title}>My Balance</p>
            <p className={styles.balance}>{`$${balance}`}</p>
        </div>
    );
}

export default Balance;