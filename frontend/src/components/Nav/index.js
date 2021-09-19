import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {
    return (
        <div className={styles.nav}>
            <Link to="/" className={styles.logo}>iMonopoly</Link>
        </div>
     );
}

export default Nav;