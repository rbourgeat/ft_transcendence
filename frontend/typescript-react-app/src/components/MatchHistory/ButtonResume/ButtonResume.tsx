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

//TODO: renommer
export default function MatchHistory(props: MatchHistoryProps) {

    useEffect(() => {
        console.log("button created");
    }, []);

    return (
        <div id="buttonresume">
            <div className="row">
                <div id="scores">
                    <p /*className="buttonresume--result"*/ className={props.winner == props.login ? "result--score_winnner" : "result--score_loser"}>
                    <p>
                        {props.winner == props.login ? "You won ✨ !" ! : "You lost 🥲..."}</p>
                    {/*<img src="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png" id="player-1-img" className="player-img" alt="player1"></img>*/}
                        <span id="player1" className="winner">{props.winner}</span>
                            <span className="text"> - </span>
                        <span id="score-player-1" className="score">{props.scoreWinner}</span>
                        <span className="text"> / </span>
                        <span id="score-player-2" className="score">{props.scoreLooser}</span>
                        <span className="text"> - </span><span id="player-2" className="looser">{props.looser}</span>
                        {/*<img src="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png" id="player-2-img" className="player-img" alt="player2"></img>*/}
                        </p>
                    </div>
            </div>
        </div>
    )
}
