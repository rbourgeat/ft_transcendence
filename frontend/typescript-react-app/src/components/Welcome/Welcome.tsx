import React from 'react';
import './Welcome.scss';
import '../App/App.scss';
import '../../index.scss';

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import video1 from "../../images/pong-demo.mp4";
import TypeAnimation from 'react-type-animation';
import { useNavigate } from "react-router-dom";

import Media from 'react-media'


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
                <br></br>
                    <li>bahaas</li>
                    <li>rbourgea</li>
                    <li>malatini</li>
                    <li>darbid</li>
                    <li>macrespo</li>
                    <button id="play-button-1" onClick={routeChange}>Play !</button>
                </ul>
            </div>
            <br></br>
            {/* <Media query="(min-width: 800px)"> */}
                <div  id="welcome--video-div">
                    <video autoPlay loop muted src={video1} id="welcome--video-video" height="400px"/>
                </div>
            {/* </Media> */}
            <Footer />
        </div>
        </>
    )
}