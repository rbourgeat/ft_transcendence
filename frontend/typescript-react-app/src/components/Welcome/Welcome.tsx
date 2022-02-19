import React from 'react';
import './Welcome.scss';
import '../App/App.scss';
import '../../index.scss';

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import video1 from "../../images/pong-demo.mp4";

// import { useNavigate } from "react-router-dom";
//TODO: a ranger dans Pages
export default function Welcome() {
    return (
        <>
        <Header />
        <div id="welcome--video-div">
            This is our inspiration
            <div id="test">
                {/* id="welcome--video-div-sub" */}
                <video autoPlay loop muted src={video1}  height="500" id="welcome--video-video"/>
            </div>
            <Footer />
        </div>
        </>
    )
}