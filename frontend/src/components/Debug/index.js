import styles from './Debug.module.css';
import { useContext, useEffect } from 'react';
import { SettingsContext } from '../../SettingsContext';

const Debug = () => {
    // This component is to be used for debugging purposes
    const { settings, setSettings, socket } = useContext(SettingsContext);

    useEffect(() => {
        console.log(settings)
    }, []);

    return (
        <div className={styles.debug}>
            <p>{`Player Name: ` + settings.player_name}</p>
            <p>{`Room Name: ` + settings.room_name}</p>
            <p>{`Secret: ` + settings.secret}</p>
            <p>{`Socket: ` + socket}</p>
        </div>
    );
}

export default Debug;