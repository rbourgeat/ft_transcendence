import React, { Component, useState, useEffect} from 'react';
import Nav from "../Nav/Nav";
import './User.scss';
import axios from 'axios';
import MyAxios from '../Utils/Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
import EditUsernameModal from "./editUsername/EditUsername";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import Dashboard from '../Dashboard/Dashboard';
import QRCode from 'qrcode.react';
//import fs from 'fs';

export interface UserfuncProps
{
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

export default function User(props:UserfuncProps)
{
	//TODO: a reprendre
	const [qrcode, setqrCode] = useState("");//https://camo.githubusercontent.com/a20446c393106453751db5f1b2633763cd7213e81015f855432405f7ddedeca3/68747470733a2f2f63686172742e676f6f676c65617069732e636f6d2f63686172743f6368743d71722663686c3d48656c6c6f2532306d61746521266368733d313830783138302663686f653d5554462d382663686c643d4c7c32");
	const handle2FA = (event: any) => {
		event.preventDefault();

		//let ax = new MyAxios(null);
		//TODO: vérifier si c'est pas déjà activé (on / off)
		//Le genereate genere un QR code quíl va surement falloir recuperer comme l image via un blob
		let url = "http://localhost:3000/api/2fa/generate";

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        let rep = async() => await axios.post(url,  {responseType: 'arraybuffer'})
        .then(res => {
            console.log("Successfully generate 2fa target");
			console.log(res);
			console.log(res.data);
			setqrCode(res.data);
			//fs.writeFileSync('./qrcode.png', res.data);
			//setqrCode("./qrcode.png");

			//let imageblob = new Blob(res.data);
			//let imageObjectURL = URL.createObjectURL(imageblob);
			//let base64ImageString = Blob.from(res.data, 'binary').toString('base64');
			//let srcValue = "data:image/png;base64,"+base64ImageString;
			//setqrCode(imageObjectURL);

        })
        .catch((error) => {
            console.log("Error while generating 2fa target");
			console.log(error);
        })

		//console.log(rep);

		//axios.post(url, { responseType: 'image/png' })
		//.then(response => {
		//	console.log(typeof response);
		//	let blob = new Blob(
		//		[response.data],
		//{ type: response.headers['content-type']}
		//	)
		//	let image = URL.createObjectURL(blob);
		//	setqrCode(image);
		//	//return image
		//	})

		//return axios.post(url, { responseType: 'arraybuffer' })
		//.then((response) => {
		//	let image = btoa(
		//	new Uint8Array(response.data)
		//		.reduce((data, byte) => data + String.fromCharCode(byte), '')
		//	);
		//	setqrCode(`data:${response.headers['content-type'].toLowerCase()};base64,${image}`);
		//	return `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;

		//});


		//return (renderQrCode(qrcode));

		//On doit faire generate puis turnOn ?
		//ax.post_2fa_turnOn(authCode);
		//ax.post_2fa_generate();
		//ax.get_api_user(props.username);

		axios.defaults.baseURL = 'http://localhost:3000/api/';

        url = "http://localhost:3000/api/user/".concat(props.username);

		/*
		let secret = "";
        axios.get(url)
        .then( res => {
            console.log(res);
			secret = res.data.twoFactorAuthenticationSecret
			console.log(secret);
        })
        .catch((error) => {
            console.log(error);
        })
		*/

		//TODO: erreur 400 auth code
		//ax.post_2fa_turnOn(secret);
	}

	//Upload d'un nouvel avatar
	const onChangePicture = (e: any) => {
		e.preventDefault();
		if (e.target.files[0])
		{
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				//console.log("Load event listener");
		});

		reader.readAsDataURL(e.target.files[0]);
		const file_name = e.target.files[0].name;
		const file = e.target.files[0];

		let ax = new MyAxios(null);
		let ret = ax.post_avatar(props.username, file);
		}
	}

	const [modalShowUsername, setModalShowUsername] = React.useState(false);
	const [username, setUsername] = React.useState("");

	useEffect(() => {
		//console.log(username);
		let url = "http://localhost:3000/api/auth/";

		axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Content-Type'] ='application/json';
		axios.defaults.headers.post['Accept'] ='*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

		let username = "";
		axios.get(url)
		.then (res => {
			username = res.data.login;
			setUsername(username);

		})
		.catch((err) => {
			console.log("Error while getting api auth");
		})
	}, []);



    return (
		<div id="user--div">
		<Nav />
			<div className="container">
			<div className="row d-flex justify-content-center text-center">
				<div className="col-9" id="bonjour--user">
				<br /><br />
				<div className="user--stats">
				{/* TO DO: cleaner le CSS */}
				{renderImage(username)}
					<br/>
					<br/>
					<div className="col-9 mx-auto text-center" id="input-div">
					<h2 id="user--data">{username}</h2>
					<Button id="change--username" variant="ight" onClick={() => { console.log("clicked"); setModalShowUsername(true)}}>
                        change username
                    </Button>
					<EditUsernameModal username={username} show={modalShowUsername} onHide={() => {
						console.log("called");
						setModalShowUsername(false)
					}}/>
					<br/>
					<div id="user--settings--div">
							<h2 id="user--settings">Settings</h2>
							<div id="change--avatar">
								<label className="label-file">Change avatar</label>
									<input
										type="file"
										name="image-upload"
										id="input--upload"
										accept="image/*"
										onChange={onChangePicture}
										className="input-file-upload"
									/>
					</div>
						{/*<p>*/}
						<div id="2fa--div">
							<h3 id="activate--2fa">2FA Enablement - in progress</h3>
							{qrcode != "" ? <p className="warning-2fa">You will have to successfully authenticate to turn 2FA on</p> : <p></p>}
							<button className="btn btn-outline-danger" id="button--2fa" onClick={handle2FA}>Activate 2FA</button>
							<br />
							<img id="image"></img>
							{renderQrCode(qrcode)}
							{qrcode != "" ? <p className="black--text">Please scan the QR Code with your Google Authenticator app.</p> : <p className="black--text"></p>}
							{qrcode != "" ? <label className="black--text">Enter the code provided</label> : <p className="black--text"></p>}
							{qrcode != "" ?<input className="form-control form-control-sm" type="text" placeholder="422 022"></input> : <p className="black--text"></p>}
							{qrcode != "" ?<button className="btn btn-light" id="check--auth">Check code</button> : <p className="black--text"></p>}
						</div>
						{/*</p>*/}
					</div>
					</div>
					{/*<div id="stats" className="col-9 mx-auto text-center">
						<h4 id="stats--title">Your statistics</h4>
						<br/>
						<p>Total games : <span className="span--stats">{props.totalGames ? props.totalGames : 0}</span></p>
						<p>Total wins : <span className="span--stats">{props.totalWins ? props.totalWins : 0}</span></p>
						<p>Total loss : <span className="span--stats">{props.totalLoss ? props.totalLoss : 0}</span></p>
						<p>Win/loss ratio : <span className="span--stats">{props.winLoss ? props.winLoss : 0}</span></p>
					</div>*/}
				</div>
				</div>
				</div>
			</div>
		</div>
    );
};

//function render2Fa(username: string)
//{
//	return (<div></div>)
//}

function renderImage(login: string) {
	let ax = new MyAxios(null);
	return (ax.render_avatar(login));
}

function renderQrCode(qrcode: any) {
	//if (qrcode == null)
	//	return ;
	//console.log("rendered QR code");
	//var img = new Image();
	//img.src = qrcode;
	//<img src={URL.createObjectURL(`data:image/jpeg;base64,${this.state.image}`)} />
	return (<img height="180" src={qrcode}></img>);
	//return (<img height="180" src={objectURL}></img>);
	//{{uri: base64ImageData}}
	//return (<img height="180" src={base64data}></img>);
}
