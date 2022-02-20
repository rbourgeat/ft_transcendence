import React from 'react';
import './Welcome.scss';
import '../App/App.scss';
import '../../index.scss';

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import video1 from "../../images/pong-demo.mp4";
import TypeAnimation from 'react-type-animation';
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    let navigate = useNavigate();
    //TODO: faire une condition si la personne est deja authentifiee ? Voir cookie ?
    const routeChange = () => {
        let path = 'auth';
        navigate(path);
    }
    return (
        <>
        <Header />
        <div id="welcome--video-div-main">
            {/* This is our inspiration */}
            <div id="authors">
                <ul id="authors--ul">
                <TypeAnimation
                    cursor={true}
                    sequence={['Authors :', 5000, '']}
                    wrapper="figcaption"
                    repeat="Infitiny"
                />
                {/* <figcaption>Authors : </figcaption> */}
                {/* <br></br> */}
                    <li>bahaas</li>
                    <li>rbourgea</li>
                    <li>malatini</li>
                    <button id="play-button-1" onClick={routeChange}>Play !</button>
                </ul>
            </div>
            {/* <br></br> */}
            {/* <div  id="welcome--video-div">
                <div id="test">
                    <video autoPlay loop muted src={video1}  height="10%" id="welcome--video-video"/>
                </div>
            </div> */}
            
            <Footer />
        </div>
        </>
    )
}