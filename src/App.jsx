import React from 'react';
import './styles/App.css';
import './styles/AppLg.css';
import { Route } from 'react-router-dom';
import regeneratorRuntime from 'regenerator-runtime';
import DefaultContainer from './containers/DefaultContainer';

const App = () => (
  <Route path="/" component={DefaultContainer} />
);

export default App;
