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
import ls from 'local-storage'

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

export interface UserfuncState
{
	avatar?: string,
	totalGames?: number,
	totalWins?: number,
	totalLoss?: number,
	winLoss?: number
}

export default function User(props:UserfuncProps)
{
  	const [imgData, setImgData] = useState("https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg");
  	//const [imgData, setImgData] = useState(localStorage.getItem('my_avatar'));

	  const onChangePicture = (e: any) => {
		e.preventDefault();
		if (e.target.files[0])
		{
		  const reader = new FileReader();
		  reader.addEventListener("load", () => {
			setImgData(reader.result as string);
			});
		  reader.readAsDataURL(e.target.files[0]);

		  console.log(e.target.files[0]);
		  const file_name = e.target.files[0].name;

		  const file = e.target.files[0];

		//  const imgAsDataUrl = file.toDataURL("image/png");
		//  localStorage.setItem('my_avatar', imgAsDataUrl);

		  	let username = props.username;
			let url = "http://localhost:3000/api/user/".concat(username).concat("/avatar/");
			console.log("url is " + url);

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
					//localStorage.setItem('avatar', file);
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
				<div className="col-4" id="bonjour--user">
				<h1>Bonjour <span></span></h1>
				<br />
				<div className="user--stats">
				<h2>Information</h2>
				<img
					src={imgData}
					height="80"
					width="80"
					alt="avatar"
					id="avatar-id"
					/>
					<br/>
					<br/>
					<div className="col-4 mx-auto text-center" id="input-div">
					<input type="file" name="image-upload" id="input--upload" accept="image/*" onChange={onChangePicture}/>
						<div className="label">
						</div>
					</div>
					<p>Total games : <span className="span--stats">{props.totalGames ? props.totalGames : 0}</span></p>
					<p>Total wins : <span className="span--stats">{props.totalWins ? props.totalWins : 0}</span></p>
					<p>Total loss : <span className="span--stats">{props.totalLoss ? props.totalLoss : 0}</span></p>
					<p>Win/loss ratio : <span className="span--stats">{props.winLoss ? props.winLoss : 0}</span></p>
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


//export default class User extends React.Component<UserfuncProps, UserfuncState>
//{
//	constructor(props: UserfuncProps)
//	{
//		super(props);

//		this.state = {
//			avatar: "https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg",
//			totalGames: 0,
//			totalWins: 0,
//			totalLoss: 0,
//			winLoss: 0
//		}
//	}

//	  onChangePicture = (e: any) =>
//	  {
//		e.preventDefault();
//		if (e.target.files[0])
//		{
//		  const reader = new FileReader();
//		  reader.addEventListener("load", () => {
//			  this.setState({avatar: reader.result as string})
//				//setImgData(reader.result as string);
//			});
//		  reader.readAsDataURL(e.target.files[0]);
//		  //console.log(e.target.files[0]);
//		  const file_name = e.target.files[0].name;
//		  const file = e.target.files[0];

//		  	let username = this.props.username;
//			let url = "http://localhost:3000/api/user/".concat(username).concat("/avatar/");
//			console.log("url is " + url);

//			axios.defaults.baseURL = 'http://localhost:3000/api/';
//			axios.defaults.headers.post['Content-Type'] ='multipart/form-data';
//			axios.defaults.headers.post['Accept'] ='*/*';
//			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

//			const headers = {
//				'Content-Type': 'multipart/form-data'
//			};

//			const formData = new FormData();
//			formData.append('avatar', file);
//			formData.append('type', 'file');

//			localStorage.setItem('my_avatar', file);

//			let res = axios.post(url, formData, {headers}).then(res=>{
//				console.log(res.data);
//				console.log(res.status)
//				if (res.status == 201)
//				{
//					console.log("Yay ! Avatar updated");
//					localStorage.setItem('avatar', file);
//					//this.setState({
//					//	avatar: file
//					//})
//				}
//				else
//				{
//					console.log("Oops! Avatar not updated");
//				}
//			}).catch((error) => {
//				console.log("Catched error !");
//				console.log(error);
//				//return (null);
//			})
//		}
//	  }


//	render()
//	{
//		return(
//			<div id="user--div">
//			<Nav />
//				<div className="container">
//				<div className="row d-flex justify-content-center text-center">
//					<div className="col-4" id="bonjour--user">
//					<h1>Bonjour <span></span></h1>
//					<br />
//					<div className="user--stats">
//					<h2>Information</h2>
//					<img
//						src={this.state.avatar}
//						height="80"
//						width="80"
//						alt="avatar"
//						id="avatar-id"
//						/>
//						<br/>
//						<br/>
//						<div className="col-4 mx-auto text-center" id="input-div">
//						<input type="file" name="image-upload" id="input--upload" accept="image/*" />
//							<div className="label">
//							</div>
//						</div>
//						<p>Total games : <span className="span--stats">{this.state.totalGames ? this.state.totalGames : 0}</span></p>
//						<p>Total wins : <span className="span--stats">{this.state.totalWins ? this.state.totalWins : 0}</span></p>
//						<p>Total loss : <span className="span--stats">{this.state.totalLoss ? this.state.totalLoss : 0}</span></p>
//						<p>Win/loss ratio : <span className="span--stats">{this.state.winLoss ? this.state.winLoss : 0}</span></p>
//					</div>
//					<br />
//					<br />
//					<br />
//					<br />
//					</div>
//					</div>
//				</div>
//			</div>
//		);
//	}

// };
