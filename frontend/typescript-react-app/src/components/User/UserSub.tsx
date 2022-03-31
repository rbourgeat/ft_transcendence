import React, { Component, useState} from 'react';
import Nav from "../Nav/Nav";
import './User.scss';
import axios from 'axios';
import MyAxios from '../Utils/Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
import EditUsernameModal from "./editUsername/EditUsername";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";

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
	const handle2FA = (event: any) => {
		event.preventDefault();
		axios.defaults.baseURL = 'http://localhost:3000/api/';

        let toast = new ToastAlerts(null);
        let url = "http://localhost:3000/api/user/".concat(props.username);

        let res = axios.get(url)
        .then( res => {
            console.log(res);
			let secret = res.data.twoFactorAuthenticationSecret;
			console.log("secret is is " + secret);
        })
        .catch((error) => {
            console.log(error);
        })
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

    return (
		<div id="user--div">
		<Nav />
			<div className="container">
			<div className="row d-flex justify-content-center text-center">
				<div className="col-9" id="bonjour--user">
				<br /><br />
				<div className="user--stats">
				{/* TO DO: cleaner le CSS */}
				{renderImage(props.username)}
					<br/>
					<br/>
					<div className="col-9 mx-auto text-center" id="input-div">
					<h2 id="user--data">{props.username}</h2>
					<Button id="change--username" variant="ight" onClick={() => { console.log("clicked"); setModalShowUsername(true)}}>
                        change username
                    </Button>
					<EditUsernameModal show={modalShowUsername} onHide={() => {
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
							<h3 id="activate--2fa">2FA Enablement (to do)</h3>
							<button className="btn btn-outline-danger" id="button--2fa" onClick={handle2FA}>ON / OFF</button>
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
				<br />
				<br />
				<br />
				<br />
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

