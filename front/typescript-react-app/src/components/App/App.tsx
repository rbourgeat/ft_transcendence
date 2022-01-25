import React from 'react';
import './App.css';
import Sidebar from '../Sidebar/Sidebar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../Pages/Home'
import Profile from '../Profile/Profile'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="app-div">
      <Router>
        <Sidebar />
        <Profile />
      </Router>
    </div>
  );
}

export default App;