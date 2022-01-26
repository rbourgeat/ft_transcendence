import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar'
import Player from '../Player/Player'
import './Profile.css';

export default function Profile() {
    return (
        <div id="profile">
        <Sidebar />
        <Player />
        </div>
    );
}