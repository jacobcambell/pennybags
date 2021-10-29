import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native';
import { socket } from '../components/socket';

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
        <SafeAreaView>
            {connected ? <Text>Connected</Text> : <Text>No connection :(</Text>}
        </SafeAreaView>
    );
}

export default SocketProvider;