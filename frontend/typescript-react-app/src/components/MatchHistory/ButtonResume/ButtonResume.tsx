import React, { useEffect } from 'react';
import './ButtonResume.scss';
import axios from 'axios';

export interface MatchHistoryProps {
    winner?: number,
    looser?: number,
    scoreWinner?: string,
    scoreLooser?: string,
    date?: Date,
    gameMode?: number,
    login?: string,
    key?: string
    nbr?: number
}

export default function MatchHistory(props: MatchHistoryProps) {

    const [myDate, setMyDate] = React.useState(new Date());
    const [load, setLoad] = React.useState(false);

    useEffect(() => {
        setMyDate(new Date(props.date));

        getUserWinner(props.winner);
        getUserLooser(props.looser);
    }, []);

    function displayGamemode(mode: number) {
        if (mode === 0)
            return "Original";
        else if (mode === 1)
            return "Big ball";
        else if (mode === 2)
            return "Blitz";
        else if (mode === 3)
            return "Slow";
        else if (mode === 4)
            return "Cube World";
        return "test";
    }

    function getUserWinner(id: number) {

        let url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/user/id/").concat(String(id));

        axios.defaults.baseURL = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/");

        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Accept'] = '*/*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        let pseudo = ""
        axios.get(url)
            .then(res => {
                pseudo = res.data.login;
                setUser1(pseudo);
            })
            .catch((err) => {
                ;
            })
    }

    function getUserLooser(id: number) {

        let url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/user/id/").concat(String(id));
        axios.defaults.baseURL = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/");
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Accept'] = '*/*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        let pseudo = ""
        axios.get(url)
            .then(res => {
                pseudo = res.data.login;
                setUser2(pseudo);
                setLoad(true);
            })
            .catch((err) => {
                ;
            })
    }

    const [winner, setUser1] = React.useState("");
    const [looser, setUser2] = React.useState("");

    return (
        <div className="buttonresume">
            {
                load == true ?
                    <div className="row d-flex justify-content-center text-center">
                        <div className={winner === props.login ? "result--score_p result--score_winner" : "result--score_p result--score_loser"}>
                            <p className="info--game">{myDate.toDateString()} - {displayGamemode(props.gameMode)}</p>
                            <p className={winner === props.login ? "results--winner-color" : "results--loser-color"}>
                                {winner === props.login ? "Win" : "Loss"}</p>
                            <p className="text-match">{winner} - {props.scoreWinner} / {props.scoreLooser} - {looser}</p>
                        </div>
                    </div >
                    : ""
            }
        </div >
    )
}
