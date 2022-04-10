import './NotLogged.scss';
import Nav from '../Nav/Nav';
import React, {useState, useEffect} from "react";

/**
 * @malatini
 */
export default function NotLogged() {

	const calledOnce = React.useRef(false);

	useEffect(() => {
		//if (calledOnce.current) {
		//	return;}
		////getUser();
		//calledOnce.current = true;
		window.top.location = 'http://localhost:3030/auth';
	}, []);

    return (
        <div id="NotFound">
            <Nav />
            <div className="container">
                <div className="d-flex justify-content-center" id="oops--notlogged">
					{/*<h1><span id="oops">YOU MUST LOG IN !</span></h1>*/}
                </div>
            </div>
        </div>
    );
}
