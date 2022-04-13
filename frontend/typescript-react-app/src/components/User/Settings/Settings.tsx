import React, {useState, useEffect} from 'react';
import './Settings.scss';
import { ToastContainer } from 'react-toastify';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import axios from "axios";
import MyAxios from '../../Utils/Axios/Axios';
import EditUsernameModal from '../editUsername/EditUsername';
import Nav from "../../Nav/Nav";

export interface SettingsProps
{
	username?: string
	login42?: string
}

export default function Settings(props: SettingsProps) {

	const [qrcode, setqrCode] = useState("");
	const [activated2fa, setActivated2fa] = React.useState(false);
	const [verifCode, setverifCode] = React.useState("");
	const calledOnce = React.useRef(false);
	const [load, setLoaded] = React.useState(false);

	//MODALS
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
		if (number == "")
		{
			toast.notifyDanger('🥲 Error while turning on 2FA. Your verif code is wrong or the QR Code is outdated.');
			return ;
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

	//TODO: modifier le nom pour que ce soit plus explicite ? activate 2fa ?
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
			let ret = ax.post_avatar(props.username, file);
		}
	}

	useEffect(() => {
		if (calledOnce.current) {
			return;}
		if (localStorage.getItem("2fa") == "true")
			setActivated2fa(true);
		calledOnce.current = true;
	}, []);

    return (
	<>
		<Nav />
		<div className="container" id="settings_container">
				<div className="row d-flex justify-content-center text-center">
					<div className="col-6">
						<div id="settings">
							<h2 id="user--settings">Settings</h2>
								<br />
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
							<div id="change--username--div">
								<button id="change--username"  type="button" className="btn btn-outline-dark"
										onClick={handleShow}>change username
									</button>
									<EditUsernameModal username={props.username} show={show} onHide={handleClose}/>
									<br />
							</div>
						<div id="2fa--div">
							<h3 id="activate--2fa">2 Factor Authentication</h3>
							<button className={activated2fa ? "btn btn-outline-danger" : "btn btn-outline-success"}
									id="button--2fa" onClick={handle2FA}>{activated2fa == true ? "Turn off 2FA" : "Turn on 2FA"}
							</button>
							<br />
							{qrcode != "" && activated2fa == false ? <img style={{marginBottom: "20ox"}} id="qrcode" src={qrcode}></img> : <p></p>}
							<br />
							{qrcode != "" && activated2fa == false ? <p className="black--text" id="please">Please scan the QR Code with your Google Authenticator app.</p> : <p className="black--text"></p>}
							{qrcode != "" && activated2fa == false ? <label className="black--text">Enter the code provided</label> : <p className="black--text"></p>}
							{qrcode != "" && activated2fa == false ? <input className="form-control form-control-sm" id="check_code" type="text" placeholder="422 022" onChange={handleInputChange}></input> : <p className="black--text"></p>}
							{qrcode != "" && activated2fa == false ? <button className="btn btn-outline-dark" type="button" id="check--auth" onClick={checkCode}>Check</button> : <p className="black--text"></p>}
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
		</div>
	</>
    )
}
