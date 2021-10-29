import React from 'react';
import SocketProvider from './src/contexts/SocketProvider';
import Lander from './src/pages/Lander';

export default function App() {
  return (
    <SocketProvider>
      <Lander></Lander>
    </SocketProvider>
  );
}
