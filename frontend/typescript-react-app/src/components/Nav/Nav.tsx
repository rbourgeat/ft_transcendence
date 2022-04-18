import React from 'react';
import { Link } from 'react-router-dom'
import './Nav.scss';
import axios from 'axios';
import cookies from 'react-cookie';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';

function Nav() {

	function disconnect() {
		axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Accept'] = '*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;

		axios.post("http://localhost:3000/api/auth/log-out")
			.then((response) => {
				console.log(response);
				console.log("Succesfully disconnected !");

				//Sauvegarde dans localStorage le fait qu'on est déconnecté
				localStorage.setItem("loggedIn", JSON.stringify(false));
				localStorage.removeItem("login");
				localStorage.removeItem("login42");

				let check = localStorage.getItem("loggedIn");
				console.log("Check is " + check);
				let twofa = localStorage.getItem("2fa");
				if (twofa == "true")
				{
					localStorage.setItem("2faverif", "false");
				}
				window.top.location = "http://localhost:3030/";
			})
			.catch((error) => {
				console.log("Catched error while disconnecting");
				console.log(error);
			});

	}

	return (
		<div id="nav">
			<nav className="navbar navbar-expand-lg bg-dark" id="nav-bar">
				<Link to="/" id="nav--title">PONG</Link>
				<button className="navbar-toggler" type="button">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to="/game" className="nav-link">
								<div className='nav-link-text'><p className="navbar--title">Game</p></div>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/live" className="nav-link">
								<div className='nav-link-text'><p className="navbar--title">Live</p></div>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/people" className="nav-link">
								<div className='nav-link-text'><p className="navbar--title">People</p></div>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/channels" className="nav-link">
								<div className='nav-link-text'><p className="navbar--title">Chat</p></div>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/user" className="nav-link">
								<div className='nav-link-text'><p className="navbar--title">User</p></div>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/settings" className="nav-link">
								<div className='nav-link-text'><p className="navbar--title">Settings</p></div>
							</Link>
						</li>
					</ul>
				</div>
				{/* Quick actions fait optionnellement - pas affiché finakement */}
				{/*<div className="dropdown show"  id="menu">
					<a className="btn btn-dark btn-sm dropdown-toggle" role="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Quick actions
					</a>
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						<a className="dropdown-item">Send DM</a>
						<a className="dropdown-item">Join channel</a>
						<a className="dropdown-item">Create channel</a>
					</div>
				</div>*/}
				<button id="logout--button" type="button" className="btn btn-dark" onClick={disconnect}>Log Out</button>
			</nav>
		</div>
	);
}

export default Nav
