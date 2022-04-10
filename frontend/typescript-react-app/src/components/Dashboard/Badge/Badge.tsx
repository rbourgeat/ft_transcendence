import React from 'react';
import './Badge.scss';

export default function Badge(props) {
    return (
        <div id="badge">
            <div className="container">
                <div className="row" id="badge--div">
                    <div id="badge--div--sub" className="row">
                        <div className="col" id="badge--stats">
                            <br />
                            {/*<strong>
                                <h2 id="badge--title">Your stats : </h2>
                            </strong>*/}
                            <br/>
                            <p id="badge--rank" className="badge--stats-text">Rank: x</p>
                            <p id="badge--total-score" className="badge--stats-text">Total score : x</p>
                            <p id="badge--games" className="badge--stats-text">Games: x</p>
                            <p id="badge--achievements" className="badge--stats-text">Achievements : x</p>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
