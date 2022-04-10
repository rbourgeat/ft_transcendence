import React, { Component, useState, useEffect } from 'react';
import Nav from "../Nav/Nav";
import './User.scss';
import axios from 'axios';
import MyAxios from '../Utils/Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
import EditUsernameModal from "./editUsername/EditUsername";
import Dashboard from '../Dashboard/Dashboard';

export interface UserfuncProps {
	username?: string,
	email?: string,
	password?: string,
	password_conf?: string,
	avatar?: string,
	totalGames?: number,
	totalWins?: number,
	totalLoss?: number,
	winLoss?: number
}

export default function User(props: UserfuncProps) {
	const [qrcode, setqrCode] = useState("");//https://camo.githubusercontent.com/a20446c393106453751db5f1b2633763cd7213e81015f855432405f7ddedeca3/68747470733a2f2f63686172742e676f6f676c65617069732e636f6d2f63686172743f6368743d71722663686c3d48656c6c6f2532306d61746521266368733d313830783138302663686f653d5554462d382663686c643d4c7c32");
	const [modalShowUsername, setModalShowUsername] = React.useState(false);
	const [username, setUsername] = React.useState("");
	const [verifCode, setverifCode] = React.useState("");
	const [activated2fa, setActivated2fa] = React.useState(true);

	const [logged, setLogged] = React.useState(false);

	const calledOnce = React.useRef(false);

	//TODO: a variabiliser
	function clearInput() {
        setverifCode("");
    }

	async function manageQR() {
		const res = await fetch('http://localhost:3000/api/2fa/generate', { method: 'POST', credentials: 'include' });
		const blob = await res.blob();
		const imgUrl = URL.createObjectURL(blob);
		setqrCode(imgUrl);
	}

	function turnoff2FA()
	{
		console.log("Turning off 2FA");

		let url = "http://localhost:3000/api/2fa/turn-off";

		axios.defaults.baseURL = 'http://localhost:3000/api/';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Accept'] = '*/*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

		let toast = new ToastAlerts(null);

		axios.post(url)
            .then(res => {
                console.log("successfully turned on!");
				toast.notifySuccess('😇 2FA successfully turned-off !');
				setActivated2fa(false);
            })
            .catch((error) => {
                console.log("Catched error on post api chat.");
                //console.log(error);
				toast.notifyDanger('🥲 Error while turnoff on 2FA.');
            })
	}

	//TODO: modifier le nom pour que ce soit plus explicite ? activate 2fa ?
	const handle2FA = (event: any) => {
		event.preventDefault();
		console.log("Button clicked !");
		/*
		if (activated2fa == true)
			setActivated2fa(false)
		else
			setActivated2fa(true);
		*/
		manageQR();
		if (activated2fa == true)
			turnoff2FA();
	}

	//Va permettre d'envoyer le code noté pour confirmer la 2FA
	const checkCode = (event: any) => {
		event.preventDefault();
		//manageQR();
		//axios.post()
		//let number =
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
		console.log("Verif code is " + verifCode);
		console.log("number is " + number);
		let toast = new ToastAlerts(null);

		if (number == "")
		{
			console.log("Error, the verif code can't be true");
			toast.notifyDanger('🥲 Error while turning on 2FA. Your verif code is wrong or the QR Code is outdated.');
			return ;
		}

		let url = "http://localhost:3000/api/2fa/turn-on";
		console.log("Verif code is " + number);

		axios.post(url, bod)
            .then(res => {
                console.log("successfully turned on!");
				toast.notifySuccess('✨ 2FA successfully turned-on !');
				setActivated2fa(true);
            })
            .catch((error) => {
                console.log("Catched error on post api chat.");
                //console.log(error);
				toast.notifyDanger('🥲 Error while turning on 2FA. Your verif code is wrong or the QR Code is outdated.');
            })
		clearInput();
	}

	//Upload d'un nouvel avatar
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

	//verif code
	function handleInputChange(event) {
        setverifCode(event.target.value);
    }

	async function getUser() {

		//Check si personne login
		let log = localStorage.getItem("loggedIn");
		console.log("Logged is " + log);
		setLogged(log == "true" ? true : false);


		//Check si 2fa activé
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
				setUsername(username);
				//console.log("The res data is ");
				//console.log(res.data);
				console.log("2fa activated is (get) : " + res.data.isTwoFactorAuthenticationEnabled);
				setActivated2fa(res.data.isTwoFactorAuthenticationEnabled)
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

	function renderImage(login: string) {
		let ax = new MyAxios(null);
		return (ax.render_avatar(login));
	}

	return (
		<div id="user--div">
			<Nav />
			<div className="container">
				<div className="row d-flex justify-content-center text-center">
					<div className="col-9" id="bonjour--user">
						<br />
						{/* Debut */}
						<div className="user--stats" key={username}>
							<>
							{logged == true ?
							<div>
							<img id={username} className="profile--pic" height="80" width="80"/>
							{renderImage(username)}
							<br />
							<div className="col-9 mx-auto text-center" id="input-div">
								<h2 id="user--data">{username}</h2>
								<button id="change--username" className="btn btn-outline-light" onClick={() => { console.log("clicked"); setModalShowUsername(true) }}>
									change username</button>
								<EditUsernameModal username={username} show={modalShowUsername} onHide={() => {
									setModalShowUsername(false)
								}} />
								<br />
								<div /*id="user--settings--div"*/>
									<h2 id="user--settings">Settings</h2>
									<label /*className="label-file"*/>Change avatar</label>
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
									<div id="2fa--div">
										<h3 id="activate--2fa">2 Factor Authentication</h3>
										<button
											className={activated2fa ? "btn btn-outline-danger" : "btn btn-outline-success"}
											id="button--2fa" onClick={handle2FA}>{activated2fa == true ? "Turn off 2FA" : "Turn on 2FA"}
											</button>
										<br />
										{ qrcode != "" && activated2fa == false ? <img style={{marginBottom: "20ox"}} id="image" src={qrcode}></img> : <p></p>}
										<br />
										{qrcode != "" && activated2fa == false ?<p className="black--text" id="please">Please scan the QR Code with your Google Authenticator app.</p> : <p className="black--text"></p>}
										{qrcode != "" && activated2fa == false ?<label className="black--text">Enter the code provided</label> : <p className="black--text"></p>}
										{qrcode != "" && activated2fa == false ? <input className="form-control form-control-sm" type="text" placeholder="422 022" onChange={handleInputChange}></input> : <p className="black--text"></p>}
										{qrcode != "" && activated2fa == false ? <button className="btn btn-light" id="check--auth" onClick={checkCode}>Check code</button> : <p className="black--text"></p>}
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
							: <p></p>
							}
							</>
						</div>
						{/* Fin */}
					</div>
				</div>
			</div>
		</div>
	);
};
