import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';
import { socket } from '../components/socket';
import { SocketContext } from '../contexts/SocketContext';

const SocketProvider = ({ children }) => {

    const [connected, setConnected] = useState(false)

    useEffect(() => {
        socket.on('connect', () => {
            setConnected(true)
        })

        socket.on('disconnect', () => {
            setConnected(false)
        })

        return (() => {
            socket.off('connect')
            socket.off('disconnect')
        })
    }, []);

    return (
        <SocketContext.Provider value={''}>
            {connected ? children : <Text>Trying to connect...</Text>}
        </SocketContext.Provider>
    );
}

export default SocketProvider;