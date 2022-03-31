import React from 'react';
import { Link } from 'react-router-dom'
import './Nav.scss';
import { faUser, faComment, faTrophy, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/**
 * @malatini
 * Notre navbar / menu, à continuer , à mettre en classe et pas en fonction, utilise window
 */

function Nav() {
    return (
        <div id="nav">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<Link to="/" id="nav--title">PONG GAME</Link>
                <button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item">
							<Link to="/chat"className="nav-link">
									<div className='nav-link-text'><p><FontAwesomeIcon icon={faComment} /></p> <p>Message</p></div>
							</Link>
                    </li>
                    <li className="nav-item">
							<Link to="/user" className="nav-link">
									<div className='nav-link-text'><p><FontAwesomeIcon icon={faUser} /></p><p>Account</p></div>
							</Link>
                    </li>
					<li className="nav-item">
							<Link to="/search" className="nav-link">
									<div className='nav-link-text'><p><FontAwesomeIcon icon={faMagnifyingGlass}/></p><p>Search</p></div>
							</Link>
					</li>
					<li className="nav-item">
							<Link to="/achievements" className="nav-link">
									<div className='nav-link-text'><p><FontAwesomeIcon icon={faTrophy}/></p><p>Achievements</p></div>
							</Link>
					</li>
                    </ul>
                </div>
                </nav>
        </div>
    );
}

export default Nav
