import React, { useState, useContext, useEffect } from 'react';

import './Welcome.scss';
import '../App/App.scss';
import '../../index.scss';
import Header from '../Header/Header';

let url_begin = "http://".concat(process.env.REACT_APP_IP);
//Pour faire fonctionner sur mac
if (url_begin == "http://")
{
    url_begin = "http://localhost";
}

export default function Welcome() {

    const routeChange = (e: any) => {
        e.preventDefault();
        console.log(url_begin);
        window.top.location = url_begin.concat(":3030/auth/")
    }

    //const calledOnce = React.useRef(false);

    //useEffect(() => {
    //	if (calledOnce.current) {
    //		return;
    //	}
    //	calledOnce.current = true;
    //}, []);

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
                        </ul>
                        <button id="play-button-1"
                            className="btn btn-outline-light"
                            onClick={routeChange}>Play</button>
                    </div>
                </div>
            </div>
        </>
    )
}
