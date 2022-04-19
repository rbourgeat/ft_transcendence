import React, { useState, useContext, useEffect } from 'react';

import './Welcome.scss';
import '../App/App.scss';
import '../../index.scss';
//import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header';

export default function Welcome() {

    const calledOnce = React.useRef(false);

    //const navigate = useNavigate();

    const routeChange = (e: any) => {
        e.preventDefault();
        //let path = `/auth`;
        //navigate(path);
        window.top.location = "http://localhost:3030/auth/"
    }

    useEffect(() => {
		if (calledOnce.current) {
			return;
		}
		calledOnce.current = true;
	}, []);

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
                        <button id="play-button-1" className="btn btn-outline-light" onClick={routeChange}>Play</button>
                    </div>
                </div>
            </div>
        </>
    )
}
