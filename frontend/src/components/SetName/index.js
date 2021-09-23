import styles from './SetName.module.css';
import { useContext, useState } from 'react';
import { SettingsContext } from '../../SettingsContext';

const SetName = () => {

    const { settings, setSettings } = useContext(SettingsContext);

    const updateName = () => {
        setSettings({...settings, name: name});
    }

    const [name, setName] = useState('');

    return (
        <div className="page">
            <p className={styles.title}>Welcome to iMonopoly</p>
            <p className={styles.desc}>To get started, please enter your display name.</p>

            <input onChange={(e) => { setName(e.target.value) }}type="text" className={styles.field} placeholder="Your Name" />

            <button onClick={updateName} className={styles.btn}>Let's Go</button>
        </div>
     );
}

export default SetName;