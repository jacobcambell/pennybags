import styles from './CreateRoom.module.css';

const CreateRoom = () => {
    return (
        <div className="page">
            <p className={styles.title}>Create a Room</p>

            <p className={styles.label}>Room Name</p>
            <input type="text" className={styles.field} />

            <p className={styles.label}>Room Password</p>
            <input type="password" className={styles.field} />

            <p className={styles.label}>Your Name</p>
            <input type="text" className={styles.field} />

            <button className={styles.createBtn}>Create Room</button>
        </div>
     );
}

export default CreateRoom;