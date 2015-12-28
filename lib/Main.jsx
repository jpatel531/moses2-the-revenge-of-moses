import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';

import './styles/main.scss'; 
import './services/Menu';

import Workspace from './components/Workspace.jsx';

render((
  <Router>
    <Route path="/" component={Workspace} />
  </Router> 
), document.getElementById('app'));
