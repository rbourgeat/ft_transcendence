import React from 'react';
import './ButtonResume.scss';

export default function MatchHistory() {
    return (
        <div id="buttonresume">
        {/* On fera un map ensuite pour boucler proprement sur les matchs */}
            <div className="row">
                
                <p id="buttonresume--result">
                <img src="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png" id="player-1-img" className="player-img" alt="player1"></img>
                    <span id="player1" className="winner">Player 1 </span> 
                    - <span id="score-player-1" className="score">score</span> / <span id="score-player-2" className="score">score </span>
                    - <span id="player-2" className="looser">Player 2</span>
                    <img src="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png" id="player-2-img" className="player-img" alt="player2"></img>
                </p>
               
            </div>
        </div>
    )
}