import styles from './SetName.module.css';

const SetName = () => {
    return (
        <div className="page">
            <p className={styles.title}>Welcome to iMonopoly</p>
            <p className={styles.desc}>To get started, please enter your display name.</p>

            <input type="text" className={styles.field} placeholder="Your Name" />

            <button className={styles.btn}>Let's Go</button>
        </div>
     );
}

export default SetName;