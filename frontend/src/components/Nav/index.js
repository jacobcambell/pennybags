import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import { useContext } from 'react';
import { SettingsContext } from '../../SettingsContext';
const Nav = () => {

    const { settings, setSettings } = useContext(SettingsContext);

    return (
        <div className={styles.nav}>
            <Link to="/" className={styles.logo}>iMonopoly</Link>
            {
                settings.name &&
                <p className={styles.user}>Playing as: {settings.name}</p>
            }
        </div>
     );
}

export default Nav;