import React, {useEffect, useState} from 'react';
import './ButtonResume.scss';

export interface MatchHistoryProps {
    winner?: string,
    looser?: string,
    scoreWinner?: string,
    scoreLooser?: string
    login?: string
    key?: string
}

export default function MatchHistory(props: MatchHistoryProps) {

    useEffect(() => {
        console.log("button created");
    }, []);

    return (
        <div className="buttonresume">
            <div className="row">
                <div id="scores">
                    <div className={props.winner == props.login ? "result--score_winnner" : "result--score_loser"}>
                    <p className="results">
                        {props.winner == props.login ? "You won ✨ !" ! : "You lost 🥲 ..."}
                    </p>
                    <p>
                        <span id="player1" className="winner">{props.winner}</span>
                            <span className="text-match"> - </span>
                        <span id="score-player-1" className="score">{props.scoreWinner}</span>
                        <span className="text-match"> / </span>
                        <span id="score-player-2" className="score">{props.scoreLooser}</span>
                        <span className="tex-match"> - </span><span id="player-2" className="looser">{props.looser}</span></p>
                        </div>
                    </div>
            </div>
        </div>
    )
}
