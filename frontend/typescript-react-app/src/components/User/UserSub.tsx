import React, { useState, useEffect, useReducer} from 'react';
import Nav from "../Nav/Nav";
import './User.scss';
import axios from 'axios';
import MyAxios from '../Utils/Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';

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

	  const onChangePicture = (e: any) => {
		e.preventDefault();
		if (e.target.files[0])
		{
		  const reader = new FileReader();
		  reader.addEventListener("load", () => {
				console.log("Load event listener");
			});

		  reader.readAsDataURL(e.target.files[0]);
		  const file_name = e.target.files[0].name;
		  const file = e.target.files[0];

		  	let username = props.username;
			let url = "http://localhost:3000/api/user/avatar/".concat(username);

			//POST de la nouvelle image
			axios.defaults.baseURL = 'http://localhost:3000/api/';
			axios.defaults.headers.post['Content-Type'] ='multipart/form-data';
			axios.defaults.headers.post['Accept'] ='*/*';
			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

			const headers = {
				'Content-Type': 'multipart/form-data'
			};

			const formData = new FormData();
			formData.append('file', file);
			formData.append('type', 'file');;

			let res = axios.post(url, formData, {headers}).then(res=>{
				if (res.status == 201)
				{
					console.log("Yay ! Avatar updated");
					renderImage(props.username);
				}
				else
				{
					console.log("Oops! Avatar not updated");
				}
			}).catch((error) => {
				console.log("Catched error !");
			})
			}
	  }

    return (
		<div id="user--div">
		<Nav />
			<div className="container">
			<div className="row d-flex justify-content-center text-center">
				<div className="col-9" id="bonjour--user">
				<h1>Bonjour <span></span></h1>
				<br />
				<div className="user--stats">
				{/* TO DO: cleaner le CSS */}
				{renderImage(props.username)}
					<br/>
					<br/>
					<div className="col-9 mx-auto text-center" id="input-div">
					<h2 id="user--data">{props.username}</h2>
					<br/>
					<div id="user--settings--div">
						<p>
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
						</p>
						<p>
							<h3 id="activate--2fa">2FA Enablement (to do)</h3>
							<button className="btn btn-outline-danger" id="button--2fa" onClick={handle2FA}>ON / OFF</button>
						</p>
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

