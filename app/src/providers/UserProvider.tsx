import React, { createContext, useState } from 'react'
import Lander from '../pages/Lander';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { UserContext } from '../contexts/UserContext';

const Stack = createNativeStackNavigator();

const UserProvider = ({ children }) => {

    const [username, setUsername] = useState<string | undefined>()
    const [secret, setSecret] = useState<string | undefined>()

    return (
        <UserContext.Provider value={{ setUsername, setSecret }}>
            {
                typeof username === 'undefined' ?
                    <NavigationContainer>
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="Lander" component={Lander} />
                        </Stack.Navigator>
                    </NavigationContainer> :
                    <Text>You have a username! {username}</Text>
            }
        </UserContext.Provider>
    );
}

export default UserProvider;