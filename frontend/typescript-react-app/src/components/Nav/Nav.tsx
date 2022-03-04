import React from 'react';
import './Nav.scss';
//import { useNavigate } from "react-router-dom";

export default function Nav() {
    // let navigate = useNavigate();
    // const routeChange = () => {
    //     //A changer en fonction du bouton clique
    //     let path = `/channels`;
    //     navigate(path);
    // };
    return (
        <div id="nav">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a id="nav--title">Pong Game</a>
                <button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link">Channels</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">Messages</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">Account</a>
                    </li>
                    </ul>
                </div>
                </nav>
        </div>
    );
}
