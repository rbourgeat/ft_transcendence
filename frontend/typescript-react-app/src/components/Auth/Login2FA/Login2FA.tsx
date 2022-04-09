import './Login2FA.scss';
import io from "socket.io-client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Nav from "../../Nav/Nav";
import AuthCode from 'react-auth-code-input';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import {ToastContainer} from "react-toastify";


export default function Login2fa() {

	//const [username, setUsername] = React.useState("");
	const [activated2fa, setActivated2fa] = React.useState(false);
	const calledOnce = React.useRef(false);
	const [code, setCode] = React.useState("");

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
					setActivated2fa(false);
					window.top.location = "http://localhost:3030/user";
				}
				else
				{
					console.log("should check the code before");
					setActivated2fa(true);
				}
			})
			.catch((err) => {
				console.log("Error while getting api auth");
			})
	}

	useEffect(() => {
		if (calledOnce.current) {
			return;}
		getUser();
		calledOnce.current = true;
	}, []);

	let checkcode=(event: any) =>
	{
		event.preventDefault();
		console.log("Button clicked!");
		let toast = new ToastAlerts(null);
		if (code.length != 6)
		{
			toast.notifyDanger("❗️ Error, the verif code is too short.");
			return ;
		}
		console.log("Posting on api...");
		let url = "http://localhost:3000/api/2fa/log-in";
		axios.defaults.baseURL = 'http://localhost:3000/api/';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Accept'] = '*/*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

		let bod = {
			twoFactorAuthenticationCode: code
		}

		//TODO: a variabiliser
		let res = axios.post(url, bod)
		.then(res => {
			console.log("Succesfully logged in with 2fa!");
			console.log(res);
			console.log(res.data);
			setCode("");
			window.top.location = "http://localhost:3030/user";
		})
		.catch((error) => {
			console.log("Catched error while logging in with 2fa");
			console.log(error);
			toast.notifyDanger("😢 Error while logging in with 2fa");
		})
	}

	return (
		<>
			<div id="login--2FA" className="container">
				{/*<div className="row">*/}
					<div id="div--main--2fa"/* className="row d-flex justify-content-justify text-justify"*/>
						<h1 className="game--rules--title">✨ 2 factor authentication</h1>
						<br />
						<div /*className='content-area'*/>
							<AuthCode /*style={{height:"40"}}*/
								allowedCharacters='numeric'
								//containerClassName="height=40"
								onChange={function (res: string): void {
								//throw new Error('Function not implemented.');
								//console.log("Filling in AuthCode");
								setCode(res);
								console.log("code is " + code);
							} } />
							{/*<br />*/}
							<button type="submit" className="btn btn-outline-dark" value="Submit" id="check--button" onClick={checkcode}>Check code</button>
							<ToastContainer
								position="top-right"
								autoClose={5000}
								hideProgressBar={false}
								newestOnTop={false}
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
							/>
					</div>
				</div>
			</div>
		{/*</div>*/}
	</>
	);
}
