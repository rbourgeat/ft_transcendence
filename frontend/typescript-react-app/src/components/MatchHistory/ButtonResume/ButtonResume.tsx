import React from 'react';
import './ButtonResume.scss';

export interface MatchHistoryProps {
    winner: string,
    looser: string,
    scoreWinner: string,
    scoreLooser: string
}

export default function MatchHistory(props: MatchHistoryProps) {
    return (
        <div id="buttonresume">
        {/* On fera un map ensuite pour boucler proprement sur les matchs */}
            <div className="row">
                <div id="scores">
                    <p id="buttonresume--result">
                    {/*<br />*/}
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
