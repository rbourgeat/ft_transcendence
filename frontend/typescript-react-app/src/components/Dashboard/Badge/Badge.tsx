import React from 'react';
import './Badge.scss';

//TODO: a (re) diviser
export default function Badge(props) {
    return (
        <div id="badge">
            <div className="container">
                <div className="row" /*d="first-row-dashboard"*/ id="badge--div">
                {/* <div id="badge--div" className="col"> */}
                    <div id="badge--div--sub" className="row">
                        <div className="col" /*id="badge--div--sub"*/>
                            <h2 id="badge--title">Badge</h2>
                            {/*  Photo*/}
                            {/* src="/frontend/typescript-react-app/public/default_avatar.png" */}
                            <img src="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png" alt="default" id="badge-picture"/>
                            {/* TODO: ajouter un bouton pour importer une photo ? */}
                            {/* Rank */}
                        {/* <div className="col"> */}
                        </div>
                        <div className="col" id="badge--stats">
                            <br/>
                            <p id="badge--rank" className="badge--stats-text">Rank: x</p>
                                {/* Total Score */}
                            <p id="badge--total-score" className="badge--stats-text">Total score : x</p>
                                {/* Games */}
                            <p id="badge--games" className="badge--stats-text">Games: x</p>
                                {/* Achievements */}
                                <p id="badge--achievements" className="badge--stats-text">Achievements : x</p>
                            {/* </div> */}
                        </div>
                    </div>
                    {/* Wins */}
                    <div className="col" id="badge--wins">
                        <h2 id="wins-title">Wins</h2>
                        <br/>
                        {/* /?<div className="row"> */}
                            <p id="p--wins">6 wins</p>
                        {/* </div> */}
                    </div>

                    {/* TODO: a revoir */}
                    {/* Graph */}
                    {/* <div className="col" id="badge--graph">
                        <h2 id="graph-title">Graph</h2>
                    </div> */}
                </div>
            {/* </div> */}
            {/* </div> */}
            </div>
        </div>
    )
}

// class Badge