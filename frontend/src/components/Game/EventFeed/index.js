import styles from './EventFeed.module.css';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../../SettingsContext';

import io from 'socket.io-client';

const EventFeed = () => {

    const { settings, setSettings } = useContext(SettingsContext);
    const socket = io('http://localhost:8000');
    const [eventFeed, setEventFeed] = useState([]);

    useEffect(() => {
        // Load the existing event feed for this room
        socket.emit('get-event-feed', { room_name: settings.room_name });
    }, []);

    socket.on('send-event-feed', (data) => {
        setEventFeed(data);
    })

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