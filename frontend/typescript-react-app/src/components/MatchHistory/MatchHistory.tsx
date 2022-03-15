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
        <br/>
        <div className="row" id="match--history">
            <div className="d-flex justify-content-center">
                <ul>
                    <li><ButtonResume /></li>
                    <li><ButtonResume /></li>
                </ul>
            </div>
        </div>
        </div>
        </div>
    )
}
