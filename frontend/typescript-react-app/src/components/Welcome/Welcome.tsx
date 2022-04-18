import React, { useState, useContext } from 'react';

import './Welcome.scss';
import '../App/App.scss';
import '../../index.scss';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import video1 from "../../public/pong-demo.mp4";
import { useNavigate } from 'react-router-dom'

export default function Welcome() {

    const navigate = useNavigate();

    const routeChange = (e: any) => {
        e.preventDefault();
        let path = `/auth`;
        navigate(path);
    }

    return (
        <>
            <Header />
            <div className="container">
                <div id="welcome--video-div-main">
                    <div id="authors" className="row d-flex justify-content-center text-center">
                        <ul id="authors--ul">
                            <li>bahaas</li>
                            <li>rbourgea</li>
                            <li>malatini</li>
                            <br />
                            <button id="play-button-1" onClick={routeChange}>PLAY</button>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
