import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CreateRoom from './components/CreateRoom';
import Home from './components/Home';
import JoinRoom from './components/JoinRoom';
import Nav from './components/Nav';
import SetName from './components/SetName';

import { SettingsContext } from './SettingsContext';

function App() {

  const [settings, setSettings] = useState({
    name: 'Player1',
    room_name: null,
    secret: null
  });

  return (
    <div className="App">
      <SettingsContext.Provider value={{settings, setSettings}}>
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
          </Switch>
        </Router>
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
