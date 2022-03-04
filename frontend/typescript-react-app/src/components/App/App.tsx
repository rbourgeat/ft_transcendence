import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Auth from '../Auth/Auth';
import Welcome from '../Welcome/Welcome';
import NotFound from '../NotFound/NotFound';
import Dashboard from '../Dashboard/Dashboard';

import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div id="main">
      <Router>
        <Switch>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
