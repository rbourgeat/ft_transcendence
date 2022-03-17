import React from 'react';
import { Link } from 'react-router-dom'
import './Nav.scss';
//
/**
 * @malatini
 * Notre navbar / menu, à continuer , à mettre en classe et pas en fonction, utilise window
 */

export default function Nav() {
    return (
        <div id="nav">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<Link to="/" id="nav--title">Pong Game</Link>
                <button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item">
					<Link to="/chat"className="nav-link">Chat</Link>
                    </li>
                    {/*<li className="nav-item">
                        <a className="nav-link">Messages</a>
                    </li>*/}
                    <li className="nav-item">
							<Link to="/user" className="nav-link">Account</Link>
                    </li>
					<li className="nav-item">
							<Link to="/search" className="nav-link">Search</Link>
					</li>
					<li className="nav-item">
							<Link to="/achievements" className="nav-link">Achievements</Link>
					</li>
                    </ul>
                </div>
                </nav>
        </div>
    );
}
