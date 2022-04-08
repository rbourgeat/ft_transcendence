import React from 'react';
import { Link } from 'react-router-dom'
import './Nav.scss';
//import { faUser, faComment, faTrophy, faMagnifyingGlass, faDashboard, faUserFriends, faGamepad } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import {Button} from "react-bootstrap"

/**
 * @malatini
 * Notre navbar / menu, à continuer , à mettre en classe et pas en fonction, utilise window
 */

function Nav() {
    return (
        <div id="nav">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<Link to="/" id="nav--title">PONG</Link>
                <button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
						<li className="nav-item">
								<Link to="/game" className="nav-link">
										<div className='nav-link-text'><p>
											{/*<FontAwesomeIcon icon={faGamepad}>*/}
										</p><p>Rules</p></div>
								</Link>
						</li>
						<li className="nav-item">
								<Link to="/people" className="nav-link">
										<div className='nav-link-text'><p>
											{/*<FontAwesomeIcon icon={faUserFriends} />*/}
											</p><p>People</p></div>
								</Link>
						</li>
						<li className="nav-item">
								<Link to="/stats" className="nav-link">
										<div className='nav-link-text'><p>
											{/*<FontAwesomeIcon icon={faTrophy} />*/}
											</p><p>Stats</p></div>
								</Link>
						</li>
						{/*<li className="nav-item">
								<Link to="/search" className="nav-link">
										<div className='nav-link-text'><p><FontAwesomeIcon icon={faMagnifyingGlass}/></p><p>Search [Deprecated]</p></div>
								</Link>
						</li>*/}
						<li className="nav-item">
								<Link to="/achievements" className="nav-link">
										<div className='nav-link-text'><p>
											{/*<FontAwesomeIcon icon={faTrophy}/>*/}
											</p><p>Achievements</p></div>
								</Link>
						</li>
						<li className="nav-item">
								<Link to="/chat"className="nav-link">
										<div className='nav-link-text'><p>
											{/*<FontAwesomeIcon icon={faComment} />*/}
											</p> <p>Sockets</p></div>
								</Link>
						</li>
						<li className="nav-item">
								<Link to="/channels" className="nav-link">
										<div className='nav-link-text'><p>
											{/*<FontAwesomeIcon icon={faComment} />*/}
											</p> <p>Chat</p></div>
								</Link>
						</li>
						<li className="nav-item">
								<Link to="/playwatch" className="nav-link">
										<div className='nav-link-text'><p>
											{/*<FontAwesomeIcon icon={faDashboard} />*/}
											</p><p>Watch</p></div>
								</Link>
						</li>
						<li className="nav-item">
								<Link to="/user" className="nav-link">
										<div className='nav-link-text'><p>
											{/*<FontAwesomeIcon icon={faUser} />*/}
											</p><p>Settings</p></div>
								</Link>
						</li>
						{/*<li className="nav-item">
							<button className="btn btn-outline-light">Secondary</button>
						</li>*/}
                    </ul>
                </div>
                </nav>
        </div>
    );
}

export default Nav
