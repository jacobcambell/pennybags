import { useFocusEffect } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { socket } from '../components/socket';
import { Theme } from '../components/Theme';
import { UserContext } from '../contexts/UserProvider';

const Lander = () => {

    const { setUsername, setSecret } = useContext(UserContext);
    const [name, setName] = useState('');

    const handleContinue = () => {
        socket.emit('create-user', {
            username: name
        })
    }

    useFocusEffect(React.useCallback(() => {
        socket.on('register-success', (data) => {
            setUsername(data.username)
            setSecret(data.secret)
        })

        return (() => {
            socket.off('register-success')
        })
    }, []))

    return (
        <SafeAreaView style={styles.content}>
            <Image source={require('../../assets/logo-small.png')} style={styles.logo}></Image>
            <Text style={styles.title}>Pennybags</Text>

            <TextInput onChangeText={(e) => { setName(e) }} style={styles.input} placeholder={'Enter Your Name'}></TextInput>
            <Pressable onPress={handleContinue} style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
        </SafeAreaView>
    );
}

export default Lander;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 25
    },
    logo: {
        marginBottom: 15
    },
    title: {
        fontSize: 20,
        marginBottom: 30
    },
    input: {
        borderBottomColor: Theme.colors.darkgrey,
        borderBottomWidth: 1,
        paddingVertical: 5,
        fontSize: Theme.fontSizes.normal,
        alignSelf: 'stretch'
    },
    button: {
        backgroundColor: Theme.colors.darkgreen,
        marginVertical: 15,
        paddingVertical: 10,
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        color: Theme.colors.white,
        fontSize: Theme.fontSizes.normal
    }
});