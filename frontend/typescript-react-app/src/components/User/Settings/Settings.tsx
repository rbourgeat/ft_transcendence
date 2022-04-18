import React, { useState, useEffect, useRef } from 'react';
import './Settings.scss';
import { ToastContainer } from 'react-toastify';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import axios from "axios";
import MyAxios from '../../Utils/Axios/Axios';
import EditUsernameModal from '../editUsername/EditUsername';
import Nav from "../../Nav/Nav";
import AuthCode, { AuthCodeRef } from 'react-auth-code-input';
import { AiOutlineLoading3Quarters, AiOutlineLoading } from "react-icons/ai";

export interface SettingsProps {
	username?: string
	login42?: string
}

export default function Settings(props: SettingsProps) {

	const [qrcode, setqrCode] = useState("");
	const [activated2fa, setActivated2fa] = React.useState(false);
	const [verifCode, setverifCode] = React.useState("");
	const calledOnce = React.useRef(false);
	const [load, setLoaded] = React.useState(false);
	const [is42, setis42] = React.useState(false);
	const [login42, setlogin42] = React.useState("");
	const [username, setUsername] = React.useState("");

	//status, realtime variable (a reprendre avec les sockets)
	const [status, setStatus] = React.useState("online");
	const [color, setColor] = React.useState("green");

	//MODALS
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//Style pour le authcode
	const AuthInputRef = useRef<AuthCodeRef>(null);
	const [code, setCode] = React.useState("");

	function clearInput() {
		setverifCode("");
	}

	async function manageQR() {
		const res = await fetch('http://localhost:3000/api/2fa/generate', { method: 'POST', credentials: 'include' });
		const blob = await res.blob();
		const imgUrl = URL.createObjectURL(blob);
		setqrCode(imgUrl);
	}

	function turnoff2FA() {
		let url = "http://localhost:3000/api/2fa/turn-off";

		axios.defaults.baseURL = 'http://localhost:3000/api/';
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
			})
			.catch((error) => {
				toast.notifyDanger('🥲 Error while turnoff on 2FA.');
			})
	}

	const checkCode = (event: any) => {
		event.preventDefault();
		let number = verifCode;
		setverifCode("");

		axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post['Accept'] = '*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;

		let bod = {
			twoFactorAuthenticationCode: number
		}
		let toast = new ToastAlerts(null);
		if (number == "") {
			toast.notifyDanger('🥲 Error while turning on 2FA. Your verif code is wrong or the QR Code is outdated.');
			return;
		}

		let url = "http://localhost:3000/api/2fa/turn-on";

		axios.post(url, bod)
			.then(res => {
				toast.notifySuccess('✨ 2FA successfully turned-on !');
				localStorage.setItem("2fa", "true");
				localStorage.setItem("2faverif", "true");
				setActivated2fa(true);
			})
			.catch((error) => {
				toast.notifyDanger('🥲 Error while turning on 2FA. Your verif code is wrong or the QR Code is outdated.');
			})
		clearInput();
	}


	const handle2FA = (event: any) => {
		event.preventDefault();
		manageQR();
		if (activated2fa == true)
			turnoff2FA();
	}

	function handleInputChange(event) {
		setverifCode(event.target.value);
	}

	const onChangePicture = (e: any) => {
		e.preventDefault();
		if (e.target.files[0]) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
			});

			reader.readAsDataURL(e.target.files[0]);
			const file_name = e.target.files[0].name;
			const file = e.target.files[0];

			let ax = new MyAxios(null);
			let ret = ax.post_avatar(username, file);
		}
	}

	async function getUser() {
		let url = "http://localhost:3000/api/auth/";

		axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post['Accept'] = '*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;

		let username = "";
		await axios.get(url)
			.then(res => {
				username = res.data.login;
				console.log(res);
				console.log("Successful api auth!");
				if (res.data.login42 != null && res.data.login42 != undefined && res.data.login42 != "") {
					setis42(true);
					setlogin42(res.data.login42);
					localStorage.setItem("login", res.data.login);
					localStorage.setItem("login42", res.data.login42);
					console.log(res.data);
					//if (res.data.status == "offline")
					//{
					//	setColor("grey")
					//	setStatus("offline");
					//}
					if (res.data.status == "online") {
						setColor("green");
						setStatus("online");
					}
					if (res.data.status == "ingame") {
						setColor("purple");
						setStatus("ingame")
					}
				}
				setLoaded(true);
				setUsername(username);
				renderImage(username);
			})
			.catch((err) => {
				console.log("Auth returned 400 -> missing cookie");
			})

		//renderImage(username);
	}

	async function renderImage(login: string) {
		let ax = new MyAxios(null);
		let log42 = localStorage.getItem("login42");
		let haschanged = false;
		if (login != log42)
			haschanged = true;
		if (log42 != "" && log42 != null && log42 != "null" && log42 != undefined)
			return (await ax.render_avatar(login, log42, haschanged));
		return (await ax.render_avatar(login, "", haschanged));
	}

	useEffect(() => {
		if (localStorage.getItem("2fa") == "true")
			setActivated2fa(true);
		getUser();
	});

	return (
		<>
			<Nav />
			<div className="container" id="settings_container">
				<div className="row d-flex justify-content-center text-center">
					<div className="col-9">
						<div id="settings">
							<h2 id="user--settings">Settings</h2>
							<br />
							{load == false ?
								<div className="spinner-border m-5" role="status">
									<span className="sr-only"><AiOutlineLoading /></span>
								</div>
								:
								<>
									<img id={username} className="profile--pic" height="80" width="80" />
									{/*{renderImage(username)}*/}
									<svg className="log--color_profile" height="40" width="40">
										<circle cx="20" cy="20" r="15" fill={color} stroke="white" style={{ strokeWidth: '3' }} />
									</svg>
									{/*{status == "" ? getUser() : ""}*/}
									<p className="username-text">{username}</p>
									<p className="status-text">{status}</p>
									<br />
									<div className="row d-flex justify-content-center text-center">
										<div id="change-avatar-div" className="col-5">
											{/*<br />*/}
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
											<button id="change--username" type="button" className="btn btn-outline-dark"
												onClick={handleShow}>click to change
											</button>
											<EditUsernameModal username={username} show={show} onHide={handleClose} />
											<br />
										</div>
									</div>
									<br />
									<div className="row d-flex justify-content-center text-center">
										<div className="row d-flex justify-content-center text-center">
											<div className="col-6">
												<div id="2fa--div">
													<h3 id="activate--2fa">2 Factor Authentication</h3>
													{/*<br />*/}
													<button className={activated2fa ? "btn btn-outline-danger" : "btn btn-outline-success"}
														id="button--2fa" onClick={handle2FA}>{activated2fa == true ? "Turn off 2FA" : "Turn on 2FA"}
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
													{/*<br />*/}
													{/*{qrcode != "" && activated2fa == false ? <input className="form-control form-control-sm" id="check_code" type="text" placeholder="422 022" onChange={handleInputChange}></input> : ""}*/}
													{qrcode != "" && activated2fa == false ?
														<AuthCode
															allowedCharacters='numeric'
															ref={AuthInputRef}
															inputClassName="auth--code_settings"
															onChange={function (res: string): void {
																setCode(res);
															}} />
														: ""}
													{qrcode != "" && activated2fa == false ?
														<>
															<br />
															<button className="btn btn-outline-dark" type="button" id="check--auth" onClick={checkCode}>Check</button>
														</>
														: <p className="black--text"></p>}
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
									</div>
								</>

							}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
