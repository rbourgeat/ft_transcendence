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
        <div id="welcome--video-div-main" /*className="row" */>
            This is our inspiration
            <p></p>
            <div  id="welcome--video-div" /*className="row" */>
                <div id="test" /* A renommer */>
                    {/* id="welcome--video-div-sub" */}
                    <video autoPlay loop muted src={video1}  height="200" id="welcome--video-video"/>
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
}