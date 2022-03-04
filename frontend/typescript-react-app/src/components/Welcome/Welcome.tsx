import React from 'react';
import './Welcome.scss';
import '../App/App.scss';
import '../../index.scss';

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import video1 from "../../images/pong-demo.mp4";
import TypeAnimation from 'react-type-animation';
import { Redirect, useHistory, Link } from 'react-router-dom'
//import { useNavigate } from "react-router-dom";

import Media from 'react-media'

export default function Welcome() {

    // const routeChange = () => {
    //     return (<Redirect to="/auth" />)
    // }

    const history = useHistory();

    const routeChange = () =>{
      let path = `/auth`;
      history.push(path);
    }

    return (
        <>
        <Header />
        <div id="welcome--video-div-main">
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
                    <li>darbib</li>
                    <li>macrespo</li>
                    <button id="play-button-1" onClick={routeChange} className="detalii">Play !</button>
                </ul>
            </div>
            <br></br>
                <div  id="welcome--video-div">
                    <video autoPlay loop muted src={video1} id="welcome--video-video" height="400px"/>
                </div>
            <Footer />
        </div>
        </>
    )
}
