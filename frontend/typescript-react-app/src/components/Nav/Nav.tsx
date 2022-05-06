import { Link } from 'react-router-dom'
import './Nav.scss';
import axios from 'axios';
import React, { useEffect } from "react";

let url_begin = "";
if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
	url_begin = "http://localhost";
else
	url_begin = "http://".concat(process.env.REACT_APP_IP);

function Nav() {

	const [sleep, setSleep] = React.useState(true);
	const [load, setLoad] = React.useState(false);

	function disconnect() {
		axios.defaults.baseURL = 'url_begin.concat().":3000/api/';
		axios.defaults.headers.post['Accept'] = '*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;

		axios.post(url_begin.concat(":3000/api/auth/log-out"))
			.then((response) => {
				//Sauvegarde dans localStorage le fait qu'on est déconnecté
				localStorage.setItem("loggedIn", JSON.stringify(false));
				localStorage.removeItem("login");
				localStorage.removeItem("login42");

				let twofa = localStorage.getItem("2fa");
				if (twofa == "true") {
					localStorage.setItem("2faverif", "false");
				}
				window.top.location = url_begin.concat(":3030/");
			})
			.catch((error) => {
				;
			});

	}

	function funcGame() {
		window.top.location = url_begin.concat(":3030/game");
	}




	useEffect(() => {
		let isMounted = true;
		setLoad(true);
		setTimeout((() => {
			setSleep(false);
			// console.log("reenabled");
		}), 2000);
		return () => { setLoad(false) }; 
	}, [sleep]);

	// console.log("render");

	return (
		<div id="nav">
			<nav className="navbar navbar-expand-lg" id="nav-bar">
				{
					load == true ?
					<>
					<Link to="/" id="nav--title">PONG</Link>
				<button className="navbar-toggler" type="button">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse in">
					<ul className={sleep ? "disabled-link navbar-nav d-flex flex-row" : "navbar-nav d-flex flex-row"}
						// className="navbar-nav d-flex flex-row"
						>
						<li onClick={funcGame} className={sleep ? "disabled-link nav-item" : "nav-item"}>
							<Link to="/game" className={sleep ? "disabled-link nav-link" : "nav-link"}>
								<div className='nav-link-text'><p className="navbar--title">Game</p></div>
							</Link>
						</li>
						<li className={sleep ? "disabled-link nav-item" : "nav-item"}>
							<Link to="/live" className={sleep ? "disabled-link nav-link" : "nav-link"}>
								<div className='nav-link-text'><p className="navbar--title">Live</p></div>
							</Link>
						</li>
						<li className={sleep ? "disabled-link nav-item" : "nav-item"}>
							<Link to="/people" className={sleep ? "disabled-link nav-link" : "nav-link"}>
								<div className='nav-link-text'><p className="navbar--title">People</p></div>
							</Link>
						</li>
						<li className={sleep ? "disabled-link nav-item" : "nav-item"}>
							<Link to="/channels" className={sleep ? "disabled-link nav-link" : "nav-link"}>
								<div className='nav-link-text'><p className="navbar--title">Chat</p></div>
							</Link>
						</li>
						<li className={sleep ? "disabled-link nav-item" : "nav-item"}>
							<Link to="/user" className={sleep ? "disabled-link nav-link" : "nav-link"}>
								<div className='nav-link-text'><p className="navbar--title">User</p></div>
							</Link>
						</li>
						<li className={sleep ? "disabled-link nav-item" : "nav-item"}>
							<Link to="/settings" className={sleep ? "disabled-link nav-link" : "nav-link"}>
								<div className='nav-link-text'><p className="navbar--title">Settings</p></div>
							</Link>
						</li>
					</ul>
				</div>
				</>
					: ""
				}
				<button id="logout--button" type="button" className="btn btn-dark" onClick={disconnect}>Log Out</button>
			</nav >
		</div >
	);
}

export default Nav
