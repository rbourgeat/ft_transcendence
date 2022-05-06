import './Achievements.scss';
import React, { useEffect } from "react";
import axios from 'axios';
import { BsCheckLg } from "react-icons/bs";

export interface AchievementsProps {
    login?: string
}

export default function Achievement(props: AchievementsProps) {

    const [myArray, setMyArray] = React.useState([]);
    const [load, setLoad] = React.useState(false);

    function getAchievements() {
        let url = "";
        if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
            url = "http://".concat("localhost:3000/api/user/achievements/").concat(props.login);
        else
            url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/user/achievements/").concat(props.login);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.get(url)
            .then(res => {
                setMyArray(res.data.map(element => element.title))
            })
            .catch((error) => {
                ;
            })
    }

    function isUnlocked(name: string) {
        if (myArray.find(element => element == name))
            return true;
        return false;
    }

    useEffect(() => {
        if (props.login)
            getAchievements();
        let isMounted = true;
        setLoad(true);

        return () => { setLoad(false)};
    }, []);

    return (
        <div id="Leaderboard">
            <div id="achievements">
                <div className="row d-flex justify-content-center text-center" id="row-cards">
                    <h1 id="achievements--title">Achievements</h1>
                </div>
                <div className="row" id="first-row">
                    <div className="card-group" id="group--one">
                        <div className={isUnlocked("BeAdmin") ? "card card--unlocked" : "card card--locked"}>
                            {isUnlocked("BeAdmin") ? <svg className="checkmark"><BsCheckLg /></svg> : ""}
                            <div className="card-body">
                                <h5 className="card-title">Promoted</h5>
                                <p className="card-text">Someone set you admin</p>
                            </div>
                        </div>

                        <div className={isUnlocked("5Row") ? "card card--unlocked" : "card card--locked"}>
                            {isUnlocked("5Row") ? <svg className="checkmark"><BsCheckLg /></svg> : ""}
                            <div className="card-body">
                                <h5 className="card-title">On fire</h5>
                                <p className="card-text">Win 5 games in a row</p>
                            </div>
                        </div>

                        <div className={isUnlocked("1000Game") ? "card card--unlocked" : "card card--locked"}>
                            {isUnlocked("1000Game") ? <svg className="checkmark"><BsCheckLg /></svg> : ""}
                            <div className="card-body">
                                <h5 className="card-title">True g4m3r</h5>
                                <p className="card-text">Play 1000 games</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" id="second-row">
                    <div className="card-group">
                        <div className={isUnlocked("AddFriend") ? "card card--unlocked" : "card card--locked"}>
                            {isUnlocked("AddFriend") ? <svg className="checkmark"><BsCheckLg /></svg> : ""}
                            <div className="card-body">
                                <h5 className="card-title">How I met</h5>
                                <p className="card-text">Have one friend</p>
                            </div>
                        </div>

                        <div className={isUnlocked("FirstGame") ? "card card--unlocked" : "card card--locked"}>
                            {isUnlocked("FirstGame") ? <svg className="checkmark"><BsCheckLg /></svg> : ""}
                            <div className="card-body">
                                <h5 className="card-title">The Pong</h5>
                                <p className="card-text">Play your first game</p>
                            </div>
                        </div>

                        <div className={isUnlocked("42") ? "card card--unlocked" : "card card--locked"}>
                            {isUnlocked("42") ? <svg className="checkmark"><BsCheckLg /></svg> : ""}
                            <div className="card-body">
                                <h5 className="card-title">Mistery</h5>
                                <p className="card-text">????????????????</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
