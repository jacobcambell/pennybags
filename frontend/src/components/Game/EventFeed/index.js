import styles from './EventFeed.module.css';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../SettingsContext';

const EventFeed = () => {

    const { socket } = useContext(SettingsContext);
    const [eventFeed, setEventFeed] = useState([]);

    useEffect(() => {
        socket.off('send-event-feed').on('send-event-feed', (data) => {
            setEventFeed(data);
        })

        socket.off('newEventFeed').on('newEventFeed', (data) => {
            setEventFeed(data);
        })

        // Load the existing event feed for this room
        socket.emit('get-event-feed', { room_name: localStorage.getItem('room_name') });
    }, []);

    return (
        <div>
            <p className={styles.title}>Event Feed</p>
            {
                eventFeed &&
                eventFeed.map((event, i) => (
                    <div className={styles.event} key={i}>
                        <i className="fas fa-exclamation-circle"></i>
                        {event}
                    </div>
                ))
            }
        </div>
    );
}

export default EventFeed;