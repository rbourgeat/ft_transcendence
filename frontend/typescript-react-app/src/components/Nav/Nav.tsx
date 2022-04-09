import React from 'react';
import { Link } from 'react-router-dom'
import './Nav.scss';
import axios from 'axios';
/**
 * @malatini
 * Notre navbar / menu, à continuer , à mettre en classe et pas en fonction, utilise window
 */

function Nav() {

	function disconnect()
	{
		axios.post('http:localhost:3000/api/auth/log-out')
			.then((response) => {console.log(response)})
			.catch((error) => {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
				else if (error.request) {
					console.log(error.request)
				}
				else
					console.log("Response", error.message);
			});
	}

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
								<div className='nav-link-text'><p>Rules</p></div>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/people" className="nav-link">
								<div className='nav-link-text'><p>People</p></div>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/stats" className="nav-link">
								<div className='nav-link-text'><p>Stats</p></div>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/achievements" className="nav-link">
								<div className='nav-link-text'><p>Achievements</p></div>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/chat"className="nav-link">
								<div className='nav-link-text'><p>Sockets</p></div>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/channels" className="nav-link">
								<div className='nav-link-text'><p>Chat</p></div>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/playwatch" className="nav-link">
								<div className='nav-link-text'><p>Watch</p></div>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/user" className="nav-link">
								<div className='nav-link-text'><p>Settings</p></div>
							</Link>
						</li>
					</ul>
				</div>
				<button className="disconnect-button" onClick={disconnect}>Disconnect</button>
			</nav>
		</div>
	);
}

export default Nav
