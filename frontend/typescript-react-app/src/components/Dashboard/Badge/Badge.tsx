import React, { useState, useEffect, useRef, useContext } from 'react';
import './Badge.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from "axios";
import { useParams } from 'react-router-dom'

export interface ProfileProps {
    login?: string,
    total_wins?: number,
    total_games?: number,
    total_loss?: number,
    //rank?: number,//null pour l isntant
    win_loss_ratio?: number,
    xp?: number,
    points?: number,
    to_next?: number,
    level?: number
}

/*
                        <div className="progress">
                            <div className="progress-bar">
                                <div className="progress-value">65%</div>
                            </div>
                        </div>
*/

export default function Badge(props: ProfileProps) {

    const win = props.win_loss_ratio;
    return (

        <div id="badge">
            <div className="container">
                {/*<div className="row" id="badge--div">*/}
                <div id="badge--div--sub" className="row">
                    <div id="badge--stats">
                        <br />
                        <h2 className="stats--h2">Statistics</h2>
                        <br />
                        <p id="badge--ratio" className="badge--stats-text">Rank: TODO bahaas</p>
                        <p id="badge--ratio" className="badge--stats-text">Level: {props.level}</p>
                        <ProgressBar animated={true} now={props.to_next} /*label={`${props.to_next}%`}*/ variant="success"></ProgressBar>
                        <br />
                    </div>
                    <div className="col" id="badge--stats-2">
                        {/*<p id="badge--rank" className="badge--stats-text">Rank:</p>*/}
                        <p id="badge--total-score" className="badge--stats-text">Points : {props.points}</p>
                        <p id="badge--games" className="badge--stats-text">Games: {props.total_games}</p>
                        <p id="badge--ratio" className="badge--stats-text">XP: {props.xp}</p>
                        <br />
                    </div>
                    <div className="col" id="badge--stats-2">
                        <p id="badge--ratio" className="badge--stats-text">Wins: {props.total_wins}</p>
                        <p id="badge--loss" className="badge--stats-text">Loss: {props.total_loss}</p>
                        <p id="badge--ratio" className="badge--stats-text">W/L ratio: {props.win_loss_ratio}%</p>
                    </div>
                </div>
                {/*</div>*/}
            </div>
        </div >

    )
}
