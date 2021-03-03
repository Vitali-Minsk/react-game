import './App.css';
import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Breakout from './game';
import { Form } from 'react-bootstrap';
import Settings from './settings/Settings'

function App() {
  const [audioVolume, setAudioVolume] = useState({musicVolume: 0.75, soundVolume: 0.75})

  function setSoundsVolume(type, value) {
    setAudioVolume(state => {
      const newState ={ ...state}
      newState[type] = value
      return newState
    } )
    console.log(audioVolume)
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/breakout">Break out</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/breakout">
            <Breakout audioVolume={audioVolume} />
          </Route>
          <Route path="/settings">
            <Settings setSoundsVolume={setSoundsVolume} audioVolume={audioVolume}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}



export default App;
