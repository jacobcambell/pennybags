import React from 'react';
import SocketProvider from './src/providers/SocketProvider';
import UserProvider from './src/providers/UserProvider';

export default function App() {

  return (
    <SocketProvider>
      <UserProvider>

      </UserProvider>
    </SocketProvider>
  );
}
