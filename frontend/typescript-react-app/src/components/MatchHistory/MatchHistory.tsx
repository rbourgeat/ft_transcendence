import React, {useState, useEffect, useRef} from 'react';
import './MatchHistory.scss';
import ButtonResume from "./ButtonResume/ButtonResume";
import axios from 'axios';


export interface MatchHistoryProps
{
    login?: string
}


export default function MatchHistory(props: MatchHistoryProps)
{
    const calledOnce = React.useRef(false);
    const [resultsID, setResultsID] = React.useState([]);
    const [len, setLen] = React.useState(0);
    const [load, setLoad] = React.useState(false);

    useEffect(() => {
        if (calledOnce.current) {
            return;
        }
        getHistory();
        calledOnce.current = true;
    }, []);

    function getHistory()
    {
        let url = "http://localhost:3000/api/game/".concat(props.login);
        let headers = {
            login: props.login
        }

        axios.get(url, {headers})
        .then( res =>
            {
                console.log("Successfully retrived game info");
                console.log(res);
                let results = res.data;
                console.log(results);
				let len = results.length;
                setLen(len);
				let i = 0;
				while (i < len)
                {
					setResultsID(prevArray => [...prevArray, results[i]]);
					i++;
				}
                setLoad(true);
            }
        )
        .catch((error) => {
            console.log("Error while getting game info");
        })
        //setLoad(true);
    }

    return (
        <div id="matchhistory--div" className="container">
            <div >
                <div >
                    <h3 id="matchhistory--title">Match history</h3>
                </div>
                <div id="match--history">
                    <div>
                        <div id="col--matchhistory">
                            <ul>
                                {load == true && len != 0 ?
                                    resultsID.map(result =>
                                    <div className="main--button--resume" key={result.id}>
                                        <ButtonResume
                                            winner={result.winner}
                                            looser={result.loser}
                                            scoreWinner={result.winner_score}
                                            scoreLooser={result.loser_score}
                                        />
                                    </div>
                                ) : ""}
                                {len == 0 ? <p id="no--game">You did not play any game yet.</p> : ""}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
