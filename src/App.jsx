import React from 'react';
// import GameRoom from './containers/GameRoom';
import './styles/App.css';
import './styles/AppLg.css';
import { Route, Link } from 'react-router-dom'
import DefaultContainer from './containers/DefaultContainer';
import Splash from './Splash.jsx';

const App = () => (
  <>
    <Route exact path="/" component={DefaultContainer} />
    {/* <Route path="/game/:id" component={DefaultContainer} /> */}
  </>
);

export default App;
