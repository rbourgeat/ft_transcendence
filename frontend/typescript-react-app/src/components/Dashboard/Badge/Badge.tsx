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
    win_loss_ratio?: any,
    xp?: number,
    points?: number,
    to_next?:any
}


export default function Badge(props: ProfileProps) {

    return (
        <div id="badge">
            <div className="container">
                {/*<div className="row" id="badge--div">*/}
                    <div id="badge--div--sub" className="row">
                        <div className="col-9" id="badge--stats">
                            <br />
                            <h2 className="stats--h2">Statistics</h2>
                            <br />
                            {/*<ProgressBar label={`level ${props.xp}%`} aria-valuenow={props.to_next} aria-valuemin="0" aria-valuemax="100" variant="success"></ProgressBar>*/}
                            {/*<p id="badge--rank" className="badge--stats-text">Rank:</p>*/}
                            {/*<div className="progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow={props.to_next.toString()} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>*/}
                            <p id="badge--total-score" className="badge--stats-text">Points : {props.points}</p>
                            <p id="badge--games" className="badge--stats-text">Games: {props.total_games}</p>
                            <p id="badge--wins" className="badge--stats-text">Wins: {props.total_wins}</p>
                            <p id="badge--loss" className="badge--stats-text">Loss: {props.total_loss}</p>
                            <p id="badge--ratio" className="badge--stats-text">W/L ratio: {props.win_loss_ratio}</p>
                            <p id="badge--ratio" className="badge--stats-text">XP: {props.xp}</p>
                            <p id="badge--ratio" className="badge--stats-text">Percent to next level: {props.to_next}</p>
                            <br />
                        </div>
                    </div>
                {/*</div>*/}
            </div>
        </div >
    )
}
