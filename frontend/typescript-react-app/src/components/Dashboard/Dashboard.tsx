import React from 'react';
import './Dashboard.scss';

import Nav from '../Nav/Nav'
import MatchHistory from '../MatchHistory/MatchHistory';

export default function Dashboard() {
    return (
        <div id="dashboard">
            {/* Pour test */}
            <Nav />
            <div className="container">
                <div className="row">
                </div>
                <div className="col-6">
                    <MatchHistory />
                </div>

            
            </div>
            {/* <h1>Dashboard</h1> */}
            
        </div>
    )
}