import React from 'react';
import './App.scss';
import Auth from '../Auth/Auth'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Welcome from '../Welcome/Welcome'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom';

// import Profile from '../Pages/Profile'
// import Admin from '../Pages/Admin'
// import Channels from '../Pages/Channels'
// import Friends from '../Pages/Friends'
// import History from '../Pages/History'
// import Messages from '../Pages/Messages'
// import Search from '../Pages/Search'
// import Settings from '../Pages/Settings'
// import Home from '../Pages/Home'
// import Sidebar from '../Sidebar/Sidebar'
// import Test from '../Test/Test'
// import Game from '../Game/Game'

function App() {
  return (
    <div id="main">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="auth" element={<Auth />} />
        {/* <Route path="home" element={<Home />} /> */}
        {/* <Route path="test" element={<Test />} /> */}
        {/* <Route path="profile" element={<Profile />} /> */}
        {/* <Route path="admin" element={<Admin />} /> */}
        {/* <Route path="channels" element={<Channels />} />
        <Route path="messages" element={<Messages />} /> */}
        {/* <Route path="game" element={<Game />} /> */}
        {/* <Route path="search" element={<Search />} /> */}
        {/* <Route path="settings" element={<Settings />} /> */}
      </Routes>
    </div>
  );
}

export default App;