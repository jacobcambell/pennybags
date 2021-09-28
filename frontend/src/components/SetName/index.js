import styles from './SetName.module.css';
import { useContext, useState, useEffect } from 'react';
import { SettingsContext } from '../../SettingsContext';
import { useHistory } from 'react-router-dom';


const SetName = () => {

    const [name, setName] = useState('');
    const { socket } = useContext(SettingsContext);
    const history = useHistory();

    const updateName = () => {
        // Name should be at least 1 character long
        if (name.length === 0) {
            return;
        }

        // Save player name to local storage
        localStorage.setItem('player_name', name);

        history.push('/home');
    }

    useEffect(() => {
        if (localStorage.getItem('player_name') !== null) {
            history.push('/home');
        }
    }, []);

    return (
        <div className="page">
            <p className={styles.title}>Welcome to iMonopoly</p>
            <p className={styles.desc}>To get started, please enter your display name.</p>

            <input onChange={(e) => { setName(e.target.value) }} type="text" className={styles.field} placeholder="Your Name" />

            <button onClick={updateName} className={styles.btn}>Let's Go</button>
        </div>
    );
}

export default SetName;