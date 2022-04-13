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
    rank?: number,
    win_loss_ration?: string,
    xp?: number,
    points?: number,
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
                            <ProgressBar label={`level ${props.xp}%`} variant="success"></ProgressBar>
                            <p id="badge--rank" className="badge--stats-text">Rank: x</p>
                            <p id="badge--total-score" className="badge--stats-text">Total score : x</p>
                            <p id="badge--games" className="badge--stats-text">Games: x</p>
                            <br />
                        </div>
                    </div>
                {/*</div>*/}
            </div>
        </div >
    )
}
