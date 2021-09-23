import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateRoom from './components/CreateRoom';
import Home from './components/Home';
import JoinRoom from './components/JoinRoom';
import Nav from './components/Nav';
import SetName from './components/SetName';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav></Nav>

        <Switch>
          <Route exact path="/">
            <SetName></SetName>
          </Route>
          <Route exact path="/create-room">
            <CreateRoom></CreateRoom>
          </Route>
          <Route exact path="/join-room">
            <JoinRoom></JoinRoom>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
