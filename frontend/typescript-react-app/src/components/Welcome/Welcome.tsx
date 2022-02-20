import React from 'react';
import './Welcome.scss';
import '../App/App.scss';
import '../../index.scss';

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import video1 from "../../images/pong-demo.mp4";

//TODO: a ranger dans Pages

export default function Welcome() {
    return (
        <>
        <Header />
        <div id="welcome--video-div-main">
            {/* This is our inspiration */}
            <p></p>
            <div  id="welcome--video-div">
                <div id="test">
                    <video autoPlay loop muted src={video1}  height="200" id="welcome--video-video"/>
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
}