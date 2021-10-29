import React from 'react';
import SocketProvider from './src/contexts/SocketProvider';
import Lander from './src/pages/Lander';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SocketProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Lander" component={Lander} />
        </Stack.Navigator>
      </NavigationContainer>

    </SocketProvider>
  );
}
