import React from 'react';
import './Nav.scss';

import { useNavigate } from "react-router-dom";

export default function Nav() {
    let navigate = useNavigate();
    const routeChange = () => {
        //A changer en fonction du bouton clique
        let path = `/channels`;
        navigate(path);
    };
    return (
        <div id="nav">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a id="nav--title">Pong Game</a>
                <button className="navbar-toggler" type="button" /*data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"*/>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    {/* <li className="nav-item active">
                        <a className="nav-link" />Guildes<span className="sr-only">(current)</span></a>
                    </li> */}
                    {/* <li className="nav-item">
                        <a className="nav-link">Leaderboad</a>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link" /*href="channels"*/ onClick={routeChange}>Channels</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"/*href="#"*/>Messages</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"/*href="#"*/>Account</a>
                    </li>
                    {/* Exemple de disabled */}
                    {/* <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li> */}
                    </ul>
                </div>
                </nav>
        </div>
    );
}