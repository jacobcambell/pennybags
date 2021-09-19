import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="page">
            <p className={styles.title}>Welcome to iMonopoly</p>

            <Link className={`${styles.btn} ${styles.create}`}>Create Room</Link>
            <Link className={`${styles.btn} ${styles.join}`}>Join Room</Link>
        </div>
     );
}

export default Home;