import React from 'react';
import { Link } from 'react-router-dom'
import './Nav.scss';


function Nav() {
    return (
        <div id="nav">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar--main">
					<Link to="/" id="nav--title">FT_TRANSCENDENCE</Link>
                <button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
						<li className="nav-item">
								<Link to="/game" className="nav-link">
										<div className='nav-link-text'>
											{/*<FontAwesomeIcon icon={faGamepad}>*/}
										<p className="nav--text">Rules</p></div>
								</Link>
						</li>
						<li className="nav-item">
								<Link to="/people" className="nav-link">
										<div className='nav-link-text'>
											{/*<FontAwesomeIcon icon={faUserFriends} />*/}
											<p className="nav--text">People</p></div>
								</Link>
						</li>
						<li className="nav-item">
								<Link to="/stats" className="nav-link">
										<div className='nav-link-text'>
											{/*<FontAwesomeIcon icon={faTrophy} />*/}
											<p className="nav--text">Stats</p></div>
								</Link>
						</li>
						{/*<li className="nav-item">
								<Link to="/search" className="nav-link">
										<div className='nav-link-text'><p><FontAwesomeIcon icon={faMagnifyingGlass}/></p><p>Search [Deprecated]</p></div>
								</Link>
						</li>*/}
						<li className="nav-item">
								<Link to="/achievements" className="nav-link">
										<div className='nav-link-text'>
											{/*<FontAwesomeIcon icon={faTrophy}/>*/}
											<p className="nav--text">Achievements</p></div>
								</Link>
						</li>
						<li className="nav-item">
								<Link to="/chat"className="nav-link">
										<div className='nav-link-text'>
											{/*<FontAwesomeIcon icon={faComment} />*/}
											<p className="nav--text">Sockets</p></div>
								</Link>
						</li>
						<li className="nav-item">
								<Link to="/channels" className="nav-link">
										<div className='nav-link-text'>
											{/*<FontAwesomeIcon icon={faComment} />*/}
											<p className="nav--text">Chat</p></div>
								</Link>
						</li>
						<li className="nav-item">
								<Link to="/playwatch" className="nav-link">
										<div className='nav-link-text'>
											{/*<FontAwesomeIcon icon={faDashboard} />*/}
											<p className="nav--text">Watch</p></div>
								</Link>
						</li>
						<li className="nav-item">
								<Link to="/user" className="nav-link">
										<div className='nav-link-text'>
											{/*<FontAwesomeIcon icon={faUser} />*/}
											<p className="nav--text">Settings</p></div>
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
