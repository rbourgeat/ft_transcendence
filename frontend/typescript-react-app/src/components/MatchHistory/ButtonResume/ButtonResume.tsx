import React, { useEffect, useState } from 'react';
import './ButtonResume.scss';
//import { Moment } from 'moment'
import { default as moment, Moment } from 'moment'
//let moment = require('moment');

export interface MatchHistoryProps {
    winner?: string,
    looser?: string,
    scoreWinner?: string,
    scoreLooser?: string,
    date?: Date,
    gameMode?: number,
    login?: string,
    key?: string
}

export default function MatchHistory(props: MatchHistoryProps) {

    const [myDate, setMyDate] = React.useState(new Date());

    useEffect(() => {
        setMyDate(new Date(props.date));
        console.log(myDate);
        console.log(myDate.toDateString());
        console.log(props.winner + ': is winning');
    }, []);

    function displayGamemode(mode: number) {
        if (mode == 0)
            return "Original";
        else if (mode == 1)
            return "Big ball";
        else if (mode == 2)
            return "Blitz";
        else if (mode == 3)
            return "Slow";
        else if (mode == 4)
            return "Cube World";
        return "test";
    }

    return (
        <div className="buttonresume">
            <div className="row">
                <div id="scores">
                    <div className={props.winner == props.login ? "result--score_p result--score_winner" : "result--score_p result--score_loser"}>
                        <p className="info--game">
                            <span className="info--game2">{myDate.toDateString()} </span>
                            <span className="info--game2"> {displayGamemode(props.gameMode)}</span>
                        </p>
                        <p className={props.winner == props.login ? "results--winner-color" : "results--loser-color"}>
                            {props.winner == props.login ? "Win" : "Loss"}
                        </p>
                        <p>
                            <span id="player1" className="winner">{props.winner}</span>
                            <span className="text-match">  -  </span>
                            <span id="score-player-1" className="score">{props.scoreWinner}</span>
                            <span className="text-match"> / </span>
                            <span id="score-player-2" className="score">{props.scoreLooser}</span>
                            <span className="tex-match"> - </span><span id="player-2" className="looser">{props.looser}</span></p>
                    </div>
                </div>
            </div >
        </div >
    )
}
