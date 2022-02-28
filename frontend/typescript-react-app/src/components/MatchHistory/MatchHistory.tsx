import React from 'react';
import './MatchHistory.scss';
import ButtonResume from "./ButtonResume/ButtonResume";

export default function MatchHistory() {
    return (
        <div id="matchhistory">
        {/* On fera un map ensuite pour boucler proprement sur les matchs */}
        {/* <h2>Match history</h2> */}
        {/* Donnes bidons pour tests */}
        <div id="matchhistory--older">
            <h3 id="matchhistory--title">Match history</h3>
        </div>
        <ButtonResume />
        </div>
    )
}