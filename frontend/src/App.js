import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';

import CreateRoom from './components/CreateRoom';
import Debug from './components/Debug';
import Game from './components/Game';
import Home from './components/Home';
import JoinRoom from './components/JoinRoom';
import Nav from './components/Nav';
import SetName from './components/SetName';

import { SettingsContext } from './SettingsContext';

// Socket that is used accross our entire application
const socket = io('http://localhost:8000');

function App() {

  useEffect(() => {
    socket.off('error').on('error', (data) => {
      alert('Error: ' + data.message);
    })
  }, []);

  return (
    <div className="App">
      <SettingsContext.Provider value={{ socket }}>
        <Router>
          <Nav></Nav>

          <Switch>
            <Route exact path="/">
              <SetName></SetName>
            </Route>
            <Route exact path="/home">
              <Home></Home>
            </Route>
            <Route exact path="/create-room">
              <CreateRoom></CreateRoom>
            </Route>
            <Route exact path="/join-room">
              <JoinRoom></JoinRoom>
            </Route>
            <Route exact path="/game">
              <Game></Game>
            </Route>
          </Switch>

          <Debug></Debug>
        </Router>
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
