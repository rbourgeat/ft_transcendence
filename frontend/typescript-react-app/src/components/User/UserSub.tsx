//import { createStore, combineReducers } from 'redux';
//import { createBrowserHistory } from "history";
//import { UserContext } from "../App/UserContext";
//import { useLocalStorage } from "./useLocalStorage";
//import fs from "fs"
//import { useSelector } from "react-redux";

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

// export interface UserfuncState
// {
// 	avatar?: string,
// 	totalGames?: number,
// 	totalWins?: number,
// 	totalLoss?: number,
// 	winLoss?: number
// }

export default function User(props:UserfuncProps)
{
  	//const [imgData, setImgData] = useState("https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg");

	 const handle2FA = (event: any) => {
		event.preventDefault();
		//let res = myAx.get_api_user(props.username);
		//console.log(res);
		axios.defaults.baseURL = 'http://localhost:3000/api/';
       // axios.defaults.headers.post['Content-Type'] = '*';
       // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

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
            //return (error);
        })
	  }


	  const onChangePicture = (e: any) => {
		e.preventDefault();
		if (e.target.files[0])
		{
		  const reader = new FileReader();
		  reader.addEventListener("load", () => {
			//setImgData(reader.result as string);
				//console.log("You must re render the image with the new avatar");
			});

		  reader.readAsDataURL(e.target.files[0]);

		  //console.log(e.target.files[0]);
		  const file_name = e.target.files[0].name;
		  const file = e.target.files[0];

		  	let username = props.username;
			let url = "http://localhost:3000/api/user/".concat(username).concat("/avatar/");
			//console.log("url is " + url);

			//TODO: a mettre dans la classe axios

			//POST de la nouvelle image
			axios.defaults.baseURL = 'http://localhost:3000/api/';
			axios.defaults.headers.post['Content-Type'] ='multipart/form-data';
			axios.defaults.headers.post['Accept'] ='*/*';
			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

			const headers = {
				'Content-Type': 'multipart/form-data'
			};

			const formData = new FormData();
			formData.append('avatar', file);
			formData.append('type', 'file');

			//localStorage.setItem('my_avatar', file);

			let res = axios.post(url, formData, {headers}).then(res=>{
				console.log(res.data);
				console.log(res.status)
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
				console.log(error);
				return (null);
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
				{renderImage(props.username)}
				{/* <img
					src={imgData}
					//src={renderImage}
					height="80"
					width="80"
					alt="avatar"
					id="avatar-id"
					/> */}
					<br/>
					<br/>
					<div className="col-4 mx-auto text-center" id="input-div">
					<h2 id="user--data">Hello {props.username}</h2>
					{/*<label className="label-file">Upload avatar</label>*/}
					<input
						type="file"
						name="image-upload"
						id="input--upload"
						accept="image/*"
						onChange={onChangePicture}
						className="input-file-upload"
						//placeholder=""
					/>
						{/*<div className="label" >
						</div>*/}

					<br />
					</div>
					<div id="stats" className="text-center">
						<p>Total games : <span className="span--stats">{props.totalGames ? props.totalGames : 0}</span></p>
						<p>Total wins : <span className="span--stats">{props.totalWins ? props.totalWins : 0}</span></p>
						<p>Total loss : <span className="span--stats">{props.totalLoss ? props.totalLoss : 0}</span></p>
						<p>Win/loss ratio : <span className="span--stats">{props.winLoss ? props.winLoss : 0}</span></p>
						<button className="btn btn-outline-info" id="button--2fa" onClick={handle2FA}>Activate 2FA</button>
					</div>
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

function renderImage(login: string) {
	//throw new Error('Function not implemented.');
	let imageCode = "https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg";

	//TO DO: refaire le get sur l image
	let imageName = "alt-photo";
	let url = "http://localhost:3000/api/user/".concat(login);
	console.log(url);
	let res = axios.get(url)
	.then(res => {
		console.log(res);
		imageCode = JSON.stringify(res.data.avatar);
		console.log(imageCode);
		console.log("Image is " + JSON.stringify(res.data.avatar));
		return (
			<img src={imageCode} alt={imageName} height="80" width="80" id="avatar-id"/>
		);
	})
	.catch(error => {
		console.log("Catched error getting avatar");
	})
	return (
		<img src={imageCode} alt={imageName} height="80" width="80" id="avatar-id"/>
	);
}

//TODO: a reprendre quand back ok
function render2Fa(username: string)
{
	return (<div></div>)
}
