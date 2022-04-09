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
		//axios.defaults.baseURL = 'http://localhost:3000/api/';
        //axios.defaults.headers.post['Accept-Control-Allow-Origin'] = "http://localhost:3030/user";
		//axios.defaults.headers.post['Access-Control-Allow-Credentials'] = true;
		//axios.defaults.headers.post['Access-Control-Allow-Origin'] = true;
        //axios.defaults.withCredentials = true;

		let bod = {}

		axios.post("http://localhost:3000/api/auth/log-out", bod)
			.then((response) => {
				console.log(response);
				//Sauvegarde dans localStorage le fait qu'on est déconnecté
				localStorage.setItem("loggedIn", JSON.stringify("false"));
				console.log("Disconnecting");
				let check = localStorage.getItem("loggedIn");
				console.log("Check is " + check);
			})
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
