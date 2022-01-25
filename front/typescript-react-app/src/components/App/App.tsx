import React from 'react';
import './App.css';
import Sidebar from '../Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home'
import Profile from '../Profile/Profile'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="app-div">
      <Router>
        <Routes>
            {/* <Route path="/" element={<Sidebar />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />}> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;