import React from 'react';
import './Nav.scss';

/**
 * @malatini
 * Notre navbar / menu, à continuer , à mettre en classe et pas en fonction, utilise window
 */

export default function Nav() {
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
                        <a className="nav-link">Chat</a>
                    </li>
                    {/*<li className="nav-item">
                        <a className="nav-link">Messages</a>
                    </li>*/}
                    <li className="nav-item">
                        <a className="nav-link">Account</a>
                    </li>
                    </ul>
                </div>
                </nav>
        </div>
    );
}
