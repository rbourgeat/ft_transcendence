import React, {useState, useEffect, useRef} from 'react';
import './MatchHistory.scss';
import ButtonResume from "./ButtonResume/ButtonResume";
import axios from 'axios';
import { renderMatches } from 'react-router-dom';


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
		return;}
        getHistory();
    calledOnce.current = true;
    }, []);

    //function renderMatches(length: number, res: any)
    //{
    //    console.log("Length is "+ length);
    //    console.log("res is " + res);
    //    if (length != 0)
    //    {
    //        return (
    //        resultsID.map(result =>
    //        <div className="main--button--resume" key={result.id}>
    //                                <ButtonResume
    //                                    winner={result.winner}
    //                                    looser={result.loser}
    //                                    scoreWinner={result.winner_score}
    //                                    scoreLooser={result.loser_score}
    //                                    login={props.login}
    //                                    key={result.id}
    //                                />
    //                            </div>));
    //    }
    //    else
    //    {
    //        <p id="no--game">You did not play any game yet.</p>
    //    }
    //}

    async function getHistory()
    {
        let url = "http://localhost:3000/api/game/".concat(props.login).concat("/history");
        let headers = {
            login: props.login
        }

        await axios.get(url, {headers})
        .then( res =>
            {
                console.log("Successfully retrived game info");
                console.log(res);
                let results = res.data;
                console.log(results);
				let l = results.length;
                setLen(len);
				let i = 0;
				while (i < l)
                {
					setResultsID(prevArray => [...prevArray, results[i]]);
					i++;
				}
                setLoad(true);
                setLen(len);
            }
        )
        .catch((error) => {
            console.log("Error while getting game info");
            setLen(0);
            setLoad(true);
        })
        //.then( res => {
        //    renderMatches(len, resultsID);}
        //)
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
                            {load == true && resultsID.length > 0  ? resultsID.map(result =>
                                <div className="main--button--resume" key={result.id}>
                                    <ButtonResume
                                        winner={result.winner}
                                        looser={result.loser}
                                        scoreWinner={result.winner_score}
                                        scoreLooser={result.loser_score}
                                        login={props.login}
                                        key={result.id}
                                    />
                                </div> ) : ""}
                                {
                                    load == true && resultsID.length == 0 ?
                                        <p id="no--game">You did not play any game yet.</p>
                                    : ""
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
