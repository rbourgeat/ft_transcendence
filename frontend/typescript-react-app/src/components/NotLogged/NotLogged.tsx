import './NotLogged.scss';
import Nav from '../Nav/Nav';
import React, { useState, useEffect } from "react";

export default function NotLogged() {

    const calledOnce = React.useRef(false);

    useEffect(() => {
    }, []);

    return (
        <div id="NotFound">
            <Nav />
            <div className="container">
                <div className="d-flex justify-content-center" id="oops--notlogged">
                    <h1>You are not logged in !</h1>
                </div>
            </div>
        </div>
    );
}
