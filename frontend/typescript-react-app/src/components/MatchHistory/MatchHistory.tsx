import React, {useState, useEffect, useRef} from 'react';
import './MatchHistory.scss';
import ButtonResume from "./ButtonResume/ButtonResume";


export interface MatchHistoryProps
{
    login?: string
}


export default function MatchHistory(props: MatchHistoryProps) {
    const calledOnce = React.useRef(false);

    useEffect(() => {
        if (calledOnce.current) {
            return;
        }
        getHistory();
        calledOnce.current = true;
    }, []);

    function getHistory()
    {
        console.log("getting history");
        let url = "http://localhost:3000/api/game/".concat(props.login)
    }

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
