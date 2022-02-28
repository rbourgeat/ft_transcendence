import React from 'react';
import './Dashboard.scss';

import Nav from '../Nav/Nav'
import MatchHistory from '../MatchHistory/MatchHistory';
import Badge from './Badge/Badge';
import Footer from "../Footer/Footer"

export default function Dashboard() {
    return (
        <div id="dashboard">
            {/* Pour test */}
            <Nav />
            <Badge />
            <div className="container">
                <div className="row">
                </div>
                
                <div /*className="col-6"*/>  
                </div>
            </div>
            <MatchHistory />
            <Footer />
            {/* <h1>Dashboard</h1> */}
        </div>
    )
}