import React, { useEffect, useState } from 'react';
import './ButtonResume.scss';

export interface MatchHistoryProps {
    winner?: string,
    looser?: string,
    scoreWinner?: string,
    scoreLooser?: string,
    date?: Date,
    gameMode?: number,
    login?: string,
    key?: string
    nbr?: number
}

export default function MatchHistory(props: MatchHistoryProps) {

    const [myDate, setMyDate] = React.useState(new Date());

    useEffect(() => {
        setMyDate(new Date(props.date));
    }, []);

    function displayGamemode(mode: number) {
        if (mode === 0)
            return "Original";
        else if (mode === 1)
            return "Big ball";
        else if (mode === 2)
            return "Blitz";
        else if (mode === 3)
            return "Slow";
        else if (mode === 4)
            return "Cube World";
        return "test";
    }

    return (
        <div className="buttonresume">
            <div className="row d-flex justify-content-center text-center">
                <div className={props.winner === props.login ? "result--score_p result--score_winner" : "result--score_p result--score_loser"}>
                    <p className="info--game">{myDate.toDateString()} - {displayGamemode(props.gameMode)}</p>
                    <p className={props.winner === props.login ? "results--winner-color" : "results--loser-color"}>
                        {props.winner === props.login ? "Win" : "Loss"}</p>
                    <p className="text-match">{props.winner} - {props.scoreWinner} / {props.scoreLooser} - {props.looser}</p>
                </div>
            </div >
        </div >
    )
}
