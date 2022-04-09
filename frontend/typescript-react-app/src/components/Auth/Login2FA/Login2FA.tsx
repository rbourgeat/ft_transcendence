import './Login2FA.scss';
import io from "socket.io-client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Nav from "../../Nav/Nav";

export default function GameRules() {

	//const [username, setUsername] = React.useState("");

	async function getUser() {
		let url = "http://localhost:3000/api/auth/";
		let username = "";
		let activated = false;
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;
		await axios.get(url)
			.then(res => {
				username = res.data.login;
				console.log(username + ' <-- result of get user')
				//setUsername(username);
				activated = res.data.isTwoFactorAuthenticationEnabled;
				console.log("2FA activated ? " + activated);
				if (activated == false)
				{
					console.log("should redirect to user");
				}
				else
				{
					console.log("should check the code before");
				}
			})
			.catch((err) => {
				console.log("Error while getting api auth");
			})
	}

	useEffect(() => {
		getUser();
	}, []);

	return (
		<>
			<Nav />
			<div id="login--2FA" className="container">
				<div className="row">
					<div className="row d-flex justify-content-justify text-justify">
						<h1 className="game--rules--title">2 factor authentication</h1>
					</div>
				</div>
			</div>
		</>
	);
}
