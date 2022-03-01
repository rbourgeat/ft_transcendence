import React from 'react';
import './Dashboard.scss';

import Nav from '../Nav/Nav'
import MatchHistory from '../MatchHistory/MatchHistory';
import Badge from './Badge/Badge';
import Footer from "../Footer/Footer"

import { PieChart } from 'react-minimal-pie-chart';

import Media from 'react-media'


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
            <div className="container">
                <div className="row d-flex justify-content-center text-center" id="dashboard-buttons">
                    <div className="col-4" /*id="match-history-button"*/>
                        <button id="match-history-button">Match history</button>
                    </div>
                {/* <button>Guild ?</button> */}
                    <div className="col-4" /*id="friends-button"*/>
                        <button id="friends-button">Friends</button>
                    </div>
            </div>
            </div>
            {/* <button>Achievements</button> */}
            <Media query="(min-width: 1200px)">
                <MatchHistory />
            </Media>
            
            <Footer />
            {/* <h1>Dashboard</h1> */}
        </div>
    )
}