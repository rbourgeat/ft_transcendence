import React from 'react';
import './MatchHistory.scss';
import ButtonResume from "./ButtonResume/ButtonResume";

/**
 * @malatini
 * Composant pour afficher l'historique des matchs, réutilisable sur plusieurs pages éventuellement
 * TODO: a continuer
 */
export default function MatchHistory() {
    return (
        <div id="matchhistory--div"className="container">
        <div className="row">
        <div  className="d-flex justify-content-center">
            <h3 id="matchhistory--title">Match history</h3>
        </div>
        <div className="row" id="match--history">
            <div className="d-flex justify-content-center">
                <div className="col" id="col--matchhistory">
                    <ul>
                        <p>In progress..</p>
                        
                        {/*<li><ButtonResume winner="bahaas" looser="malatini" scoreWinner="3" scoreLooser="2"/></li>
                        <li><ButtonResume winner="dummy5" looser="bahaas" scoreWinner="5" scoreLooser="1"/></li>*/}

                    </ul>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}
