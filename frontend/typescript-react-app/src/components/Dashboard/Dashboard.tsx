import React from 'react';
import './Dashboard.scss';

import Nav from '../Nav/Nav'
import MatchHistory from '../MatchHistory/MatchHistory';
import Badge from './Badge/Badge';
import Footer from "../Footer/Footer"
import { PieChart } from 'react-minimal-pie-chart';
import Media from 'react-media'

export default function Dashboard() {
  //Condition si la personne est connectee ou pas
    return (
        <div id="dashboard">
            <Nav />
            <Badge />
            <div className="container">
                <div className="row">
                </div>
            </div>
            <div className="container">
                <div
                  className="row d-flex justify-content-center text-center"
                  id="dashboard-buttons"
                  >
                    <div className="col-4">
                        <button
                          id="match-history-button"
                        >
                          Match history
                        </button>
                    </div>
                    <div className="col-4">
                        <button id="friends-button">Friends</button>
                    </div>
            </div>
            </div>
            <Media query="(min-width: 1200px)">
                <MatchHistory />
            </Media>
            <Footer />
        </div>
    )
}
