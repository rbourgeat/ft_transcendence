import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';

import Auth from '../Auth/Auth';
import Welcome from '../Welcome/Welcome';

import Game from '../Game/Game';
import Dashboard from '../Dashboard/Dashboard'
import Friends from '../Friends/Friends'
import Channels from '../Channels/Channels'
import NotFound from '../NotFound/NotFound'

function App() {
  return (
    <div id="main">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/game" element={<Game />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/channels" element={<Channels />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;