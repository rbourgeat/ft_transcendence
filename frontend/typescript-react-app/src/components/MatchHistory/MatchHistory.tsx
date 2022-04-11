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
    //const [resultsWS, setResultsWS] = React.useState([]);
    //const [resultsLS, setResultsLS] = React.useState([]);
    //const [resultsW, setResultsW] = React.useState([]);
    //const [resultsL, setResultsL] = React.useState([]);
    //const [resultsP, setResultsP] = React.useState([]);
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
                //console.log("first elemn is " + results[0].id);
                //console.log("len is " + len);
				let i = 0;
				while (i < len)
                {
					setResultsID(prevArray => [...prevArray, results[i]]);
                    //console.log("coucou");
					i++;
				}
                setLoad(true);
                //console.log(resultsID);
            }
        )
        .catch((error) => {
            console.log("Error while getting game info");
            //console.log(error);
        })
        //setLoad(true);
        //console.log("result is ");
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
                        {load == true ?
                            resultsID.map(result =>
                            <div key={result.id}>
                                <ButtonResume
                                    winner={result.winner}
                                    looser={result.loser}
                                    scoreWinner={result.winner_score}
                                    scoreLooser={result.loser_score}
                                />
                                <p>coucou</p>
                            </div>
                        ) : ""}
                        {/*<p>In progress..</p>*/}
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
