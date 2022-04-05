import React from 'react';
import './Badge.scss';

/**
 * TODO: revoir le style, a continuer car trop simple
 */
export default function Badge(props) {
    return (
        <div id="badge">
            <div className="container">
                <div className="row" id="badge--div">
                    <div id="badge--div--sub" className="row">
                        <div className="col">
                            {/* TODO: revoir les images */}
                            {/*<p className="text">Retrieve the picture by calling the get api user</p>*/}
                            <img src="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png" alt="default" id="badge-picture"/>
                        </div>
                        <div className="col" id="badge--stats">
                            <h2 id="badge--title">Your stats : </h2>
                            <br/>
                            <p id="badge--rank" className="badge--stats-text">Rank: x</p>
                            <p id="badge--total-score" className="badge--stats-text">Total score : x</p>
                            <p id="badge--games" className="badge--stats-text">Games: x</p>
                            <p id="badge--achievements" className="badge--stats-text">Achievements : x</p>
                        </div>
                        {/*<div className="col" id="badge--wins">
                            <h2 id="wins-title">Wins</h2>
                            <br/>
                                <p id="p--wins">6 wins</p>
                        </div>*/}
                    </div>
                    {/*<div className="col" id="badge--graph">
                        <h2 id="graph-title">Graph</h2>
                        <PieChart
                            data={
                            [
                                { title: 'One', value: 75, color: '#469536' },
                                { title: 'Two', value: 25, color: '#FF4040' },
                        ]}
                            />
                    </div>*/}
                </div>
            </div>
        </div>
    )
}
