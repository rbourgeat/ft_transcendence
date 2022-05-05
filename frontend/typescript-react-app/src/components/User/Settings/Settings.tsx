import React, { useState, useEffect, useRef } from 'react';
import './Settings.scss';
import axios from "axios";
import MyAxios from '../../Utils/Axios/Axios';
import EditUsernameModal from '../editUsername/EditUsername';
import Nav from "../../Nav/Nav";
import AuthCode, { AuthCodeRef } from 'react-auth-code-input';
import io from "socket.io-client";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';

let url_begin = "";
if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
	url_begin = "http://localhost";
else
	url_begin = "http://".concat(process.env.REACT_APP_IP);

export interface SettingsProps {
	username?: string
	login42?: string
}

export default function Settings(props: SettingsProps) {

	const [qrcode, setqrCode] = useState("");
	const [activated2fa, setActivated2fa] = React.useState(false);
	const calledOnce = React.useRef(false);
	const [username, setUsername] = React.useState("");

	//status, realtime variable (a reprendre avec les sockets)
	const [status, setStatus] = React.useState("online");
	const [color, setColor] = React.useState("green");

	//Style pour le authcode
	const AuthInputRef = useRef<AuthCodeRef>(null);
	const [code, setCode] = React.useState("");

	//Pour modal changeUsername
	const [exited, setExited] = React.useState(false);
	const [checkExited, setCheckExited] = React.useState("false");

	//Ici le async est ultra nécessaire !
	async function manageQR() {
		const res = await fetch(url_begin.concat(':3000/api/2fa/generate'), { method: 'POST', credentials: 'include' });
		const blob = await res.blob();
		const imgUrl = URL.createObjectURL(blob);
		setqrCode(imgUrl);
	}

	function turnoff2FA() {
		let url = url_begin.concat(":3000/api/2fa/turn-off");

		axios.defaults.baseURL = url_begin.concat(':3000/api/');
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post['Accept'] = '*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;

		let toast = new ToastAlerts(null);

		axios.post(url)
			.then(res => {
				toast.notifySuccess('😇 2FA successfully turned-off !');
				localStorage.setItem("2fa", "false");
				setActivated2fa(false);
				localStorage.setItem("2faverif", "false");
			})
			.catch((error) => {
				;
			})
	}

	const checkCode = (event: any) => {
		event.preventDefault();

		axios.defaults.baseURL = url_begin.concat(':3000/api/');
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post['Accept'] = '*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;

		let bod = {
			twoFactorAuthenticationCode: code
		}
		let toast = new ToastAlerts(null);

		let url = url_begin.concat(":3000/api/2fa/turn-on");

		axios.post(url, bod)
			.then(res => {
				toast.notifySuccess('✨ 2FA successfully turned-on !');
				localStorage.setItem("2fa", "true");
				localStorage.setItem("2faverif", "true");
				setActivated2fa(true);
				setCode("");
			})
			.catch((error) => {
				toast.notifyDanger('🥲 Error while turning on 2FA. Your verif code is wrong or the QR Code is outdated.');
				setCode("");
			})
	}


	const handle2FA = (event: any) => {
		event.preventDefault();
		manageQR();
		if (activated2fa == true)
			turnoff2FA();
	}

	const onChangePicture = (e: any) => {
		e.preventDefault();
		if (e.target.files[0]) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
			});

			reader.readAsDataURL(e.target.files[0]);
			const file = e.target.files[0];

			let ax = new MyAxios(null);
			ax.post_avatar(username, file);
		}
	}

	function selectColor() {
		if (status == "offline")
			setColor("grey")
		if (status == "online")
			setColor("green")
		if (status == "ingame")
			setColor("purple")
	}

	function getUser() {
		let url = url_begin.concat(":3000/api/auth/");

		axios.defaults.baseURL = url_begin.concat(':3000/api/');
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post['Accept'] = '*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;

		let username = "";
		axios.get(url)
			.then(res => {
				username = res.data.login;
				if (res.data.login42 != null && res.data.login42 != undefined && res.data.login42 != "") {
					localStorage.setItem("login", res.data.login);
					localStorage.setItem("login42", res.data.login42);
					if (res.data.status == "online") {
						setColor("green");
						setStatus("online");
					}
					if (res.data.status == "ingame") {
						setColor("purple");
						setStatus("ingame")
					}
				}
				setUsername(username);
				renderImage(username);
				socket.emit("update", "online");
			})
			.catch((err) => {
				localStorage.setItem("loggedIn", "false");
				window.top.location = url_begin.concat(":3030/auth/");
			})

	}

	function renderImage(login: string) {
		let ax = new MyAxios(null);
		let log42 = localStorage.getItem("login42");
		let haschanged = false;
		if (login != log42)
			haschanged = true;
		if (log42 != "" && log42 != null && log42 != "null" && log42 != undefined)
			return (ax.render_avatar(login, log42, haschanged));
		return (ax.render_avatar(login, "", haschanged));
	}

	const [socket, setSocket] = React.useState(io("http://".concat(process.env.REACT_APP_IP).concat(":3000/chat"), { query: { username: username } }));

	useEffect(() => {

		if (calledOnce.current) {
			socket.on('updateStatus', (...args) => {
				if (username == args[0]) {
					setStatus(args[1]);
					selectColor();
				}

			})
		}

		if (localStorage.getItem("2fa") == "true")
			setActivated2fa(true);
		getUser();
		selectColor();
		calledOnce.current = true;

	}, [status, color]);

	useEffect(() => {
		getUser();
	}, [exited]);

	return (
		<>
			<Nav />
			<div className="container" id="settings_container">
				<div className="row d-flex justify-content-center text-center">
					<div className="col-9">
						<div id="settings">
							<h2 id="user--settings">Settings</h2>
							<br />
							<>
								<img id={username} className="profile--pic" height="80" width="80" />
								<svg className="log--color_profile" height="40" width="40">
									<circle cx="20" cy="20" r="15" fill={color} stroke="white" style={{ strokeWidth: '3' }} />
								</svg>
								<p className="username-text" id="user_username">{username}</p>
								<br />
								<div className="row d-flex justify-content-center text-center">
									<div id="change-avatar-div" className="col-5">
										<label id="change--avatar--label">Change avatar</label>
										<div id="change--avatar">
											<input
												type="file"
												name="image-upload"
												id="input--upload"
												accept="image/*"
												onChange={onChangePicture}
												className="input-file-upload"
											/>
										</div>
									</div>
									<br />
								</div>
								<br />
								<br />
								<div className="row d-flex justify-content-center text-center">
									<div id="change--username--div">
										<h3 id="activate--modal">Change username</h3>
										<EditUsernameModal
											setUsername={setUsername}
											username={username}
											exited={checkExited}
										/>
										<br />
									</div>
								</div>
								<br />
								<div className="row d-flex justify-content-center text-center">
									<div className="row d-flex justify-content-center text-center">
										<div className="col-6">
											<div id="2fa--div">
												<h3 id="activate--2fa">2 Factor Authentication</h3>
												<button className={activated2fa ? "btn btn-outline-danger" : "btn btn-outline-success"}
													id="button--2fa" type="button" onClick={handle2FA}>{activated2fa == true ? "Turn off 2FA" : "Turn on 2FA"}
												</button>
												<br />
												<br />
												{qrcode != "" && activated2fa == false ? <img style={{ marginBottom: "20ox" }} id="qrcode" src={qrcode}></img> : <p></p>}
												<br />
												{qrcode != "" && activated2fa == false ? <p className="black--text" id="please">Please scan the QR Code with your Google Authenticator app.</p> : <p className="black--text"></p>}
												{qrcode != "" && activated2fa == false ?
													<>
														<br />
														<label className="black--text">Enter the code provided</label>
													</>
													: <p className="black--text"></p>}
												{qrcode != "" && activated2fa == false ?
													<AuthCode
														allowedCharacters='numeric'
														ref={AuthInputRef}
														inputClassName="auth--code_settings"
														onChange={
															function (res: string): void {
																setCode(res);
															}}
													/>
													: ""}
												{qrcode != "" && activated2fa == false ?
													<>
														<br />
														<button className="btn btn-outline-dark" type="button" id="check--auth" onClick={checkCode}>Check</button>
													</>
													: <p className="black--text"></p>}
											</div>
										</div>
									</div>
								</div>
							</>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
