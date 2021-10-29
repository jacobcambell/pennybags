import React from 'react';
import SocketProvider from './src/contexts/SocketProvider';
import UserProvider from './src/contexts/UserProvider';

export default function App() {
  return (
    <SocketProvider>
      <UserProvider>
      </UserProvider>
    </SocketProvider>
  );
}
