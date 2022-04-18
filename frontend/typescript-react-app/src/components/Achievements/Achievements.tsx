import './Achievements.scss';
import Nav from "../Nav/Nav";
import React, { useEffect } from "react";
import axios from 'axios';
import MyAxios from "../Utils/Axios/Axios";
import { BsCheckLg } from "react-icons/bs";

// Plus importé car problèmes d'affichage ponctuels

//import { MdLocalFireDepartment } from "react-icons/md";
//import { FaCat, FaUserFriends } from "react-icons/fa";
//import { GiPowerButton, GiPeaceDove } from "react-icons/gi";
//import { GrGamepad } from "react-icons/gr";


export interface AchievementsProps {
    login?: string,
    children?: React.ReactNode | React.ReactChild | React.ReactChildren | React.ReactChild[] | React.ReactChildren[]
}

export default function Achievement(props: AchievementsProps) {

    const [myArray, setMyArray] = React.useState([]);
    async function getAchievements() {
        let url = "http://localhost:3000/api/user/achievements/".concat(props.login);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.get(url)
            .then(res => {
                console.log("Succesfully retrieved achievements");
                setMyArray(res.data.map(element => element.title))
            })
            .catch((error) => {
                console.log("Error while retrieve achievements");
                console.log(error);
            })
    }

    function CheckMark() {
        return <svg className="checkmark"><BsCheckLg /></svg>;
    }

    function isUnlocked(name: string) {
        if (myArray.find(element => element == name))
            return true;
        return false;
    }

    useEffect(() => {
        if (props.login)
            getAchievements()
    }, []);

    const style = { height: "40", width: "40" }
    return (
        <div id="Leaderboard">
            <div id="achievements">
                <div className="row d-flex justify-content-center text-center" id="row-cards">
                    <h1 id="achievements--title">Achievements</h1>
                </div>
                <div className="row" id="first-row">
                    <div className="card-group" id="group--one">
                        <div className={isUnlocked("BeAdmin") ? "card card--unlocked" : "card card--locked"}>
                            {isUnlocked("BeAdmin") ? <CheckMark /> : ""}
                            <div className="card-body">
                                <h5 className="card-title">Let's talk</h5>
                                <p className="card-text">Admin of a channel</p>
                            </div>
                        </div>

                        <div className={isUnlocked("5Row") ? "card card--unlocked" : "card card--locked"}>
                            {isUnlocked("5Row") ? <CheckMark /> : ""}
                            <div className="card-body">
                                <h5 className="card-title">On fire</h5>
                                <p className="card-text">Win 5 games</p>
                                {/*<svg className="test-icon">{<MdLocalFireDepartment />}</svg>*/}
                                {/*<MdLocalFireDepartment style={style} />*/}
                            </div>
                        </div>

                        <div className={isUnlocked("1000Game") ? "card card--unlocked" : "card card--locked"}>
                            {isUnlocked("1000Game") ? <CheckMark /> : ""}
                            <div className="card-body">
                                <h5 className="card-title">True g4m3r</h5>
                                <p className="card-text">Play 1000 games</p>
                                {/*<svg className="test-icon">{<GrGamepad />}</svg>*/}
                                {/*<GrGamepad style={style} />*/}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" id="second-row">
                    <div className="card-group">
                        <div className={isUnlocked("AddFriend") ? "card card--unlocked" : "card card--locked"}>
                            {isUnlocked("AddFriend") ? <CheckMark /> : ""}
                            <div className="card-body">
                                <h5 className="card-title">How I met</h5>
                                <p className="card-text">Have one friend</p>
                                {/*<FaUserFriends style={style} />*/}
                            </div>
                        </div>

                        <div className={isUnlocked("FirstGame") ? "card card--unlocked" : "card card--locked"}>
                            {isUnlocked("FirstGame") ? <CheckMark /> : ""}
                            <div className="card-body">
                                <h5 className="card-title">The Pong</h5>
                                <p className="card-text">Play your first game</p>
                                {/*<svg className="test-icon">{<GiPowerButton />}</svg>*/}
                                {/*<GiPowerButton style={style} />*/}
                            </div>
                        </div>

                        <div className={isUnlocked("42") ? "card card--unlocked" : "card card--locked"}>
                            {isUnlocked("42") ? <CheckMark /> : ""}
                            <div className="card-body">
                                <h5 className="card-title">Mistery</h5>
                                <p className="card-text">????????????????</p>
                                {/*<svg className="test-icon">{<FaCat />}</svg>*/}
                                {/*<FaCat style={style} />*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
