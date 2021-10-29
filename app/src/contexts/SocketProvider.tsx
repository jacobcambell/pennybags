import React, { createContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native';
import { socket } from '../components/socket';

const SocketContext = createContext<any>(null);

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