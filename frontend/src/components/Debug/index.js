import styles from './Debug.module.css';
import { useContext, useEffect } from 'react';
import { SettingsContext } from '../../SettingsContext';

const Debug = () => {
    // This component is to be used for debugging purposes
    const { socket } = useContext(SettingsContext);

    return (
        <div className={styles.debug}>
            <p>{`Player Name: ` + localStorage.getItem('player_name')}</p>
            <p>{`Room Name: ` + localStorage.getItem('room_name')}</p>
            <p>{`Secret: ` + localStorage.getItem('secret')}</p>
            <p>{`Socket: ` + socket.id}</p>
        </div>
    );
}

export default Debug;