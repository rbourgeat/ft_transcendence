import './ListParticipant.scss';
import React, { useState, useEffect } from "react";
import Participant from './Participant/Participant';
import Footer from "../../Footer/Footer";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';

export interface ParticipantProps {
	setActiveChannelName?: any,
	setActiveChannelID?: any,
	login: string,
	setActiveDMID?: any,
	setActiveDMName?: any,
	setIsDM?: any,
	setIsChan?: any
}

//export default function ListParticipant({activeChannel})
export default function ListParticipant(props: ParticipantProps) {
	const [selectedUser, updateSelectedUser] = React.useState("");
	const [functionToUse, updateFunctionToUse] = React.useState("");
	const [loggedUser, updateLoggedUser] = React.useState({});
	const [participates, updateParticipates] = React.useState([]);

	React.useEffect(() => {

		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;
		axios.get(`http://localhost:3000/api/chat/1/users`)
			.then(response => {
				updateParticipates(response.data);
				console.log("participates are updated");
			})
			.catch(error => {
				console.log("error");
			})
	}, [])

	React.useEffect(() => {
		console.log("selectedUser is set to : " + selectedUser);
	}, [selectedUser])

	React.useEffect(() => {
		console.log("functionToUse is set to : " + functionToUse);
		executeFunction(functionToUse);
	}, [functionToUse])

	async function executeFunction(param) {
		switch (param) {
			case 'block':
				return blockUser();
			case 'invite':
				return inviteToPlay();
			case 'admin':
				return setAdmin();
			case 'mute':
				return muteUser();
			case 'ban':
				return banUser();
		}
	}

	/*
	//TODO: a reprendre; mute user
	const time = new Date();
	time.setSeconds(time.getSeconds() + 600);

	const muteUser = () => {

		let toast = new ToastAlerts(null);

		toast.notifyDanger("A reprendre.");

		//if (selectedUser == "")
		//{
		//	toast.notifyDanger("No user where selected.");
		//	return ;
		//}
		//const url = 'http://localhost:3000/api/chat/mute';
		//axios.post(url, {
		//"idChat": activeChannel,
		//"user": selectedUser,
		//"time": time,
		//"password": "string"})
		//	.then(response => {
		//		console.log(response);
		//	})
		//	.catch(error => {
		//		console.log(error);
		//	})
	}

	//TODO: a reprendre - Ban user
	const banUser = () => {
		const url = 'http://localhost:3000/api/chat/ban';

		let toast = new ToastAlerts(null);

		toast.notifyDanger("A reprendre.");

		//console.log("selectedUser is " + selectedUser);

		//if (selectedUser == "")
		//{
		//	toast.notifyDanger("No user where selected.");
		//	return ;
		//}
		//axios.post(url, {
		//"idChat": activeChannel,
		//"user": selectedUser,
		//"time": time,
		//"password": "string"})
		//	.then(response => {
		//		console.log(response);
		//		toast.notifySuccess("Successfully banned");
		//	})
		//	.catch(error => {
		//		console.log(error);
		//		toast.notifyDanger("Error while banned user");
		//	})
	}
*/
	function banUser() {
		//const url = 'http://localhost:3000/api/chat/ban';

		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre.");
	}

	function blockUser() {
		//const url = 'http://localhost:3000/api/chat/ban';

		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre.");
	}

	function sendDM() {
		//const url = 'http://localhost:3000/api/chat/ban';

		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre.");
	}

	function banChannel() {
		//const url = 'http://localhost:3000/api/chat/ban';

		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre.");
	}

	function inviteToPlay() {
		//const url = 'http://localhost:3000/api/chat/ban';

		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre.");
	}

	function muteUser() {
		//const url = 'http://localhost:3000/api/chat/ban';

		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre.");
	}

	async function setAdmin() {
		const url = 'http://localhost:3000/api/chat/setAdmin';
		//const time = new Date();
		//time.setSeconds(time.getSeconds() + 600);
		//console.log("selectedUser is " + selectedUser);
		let toast = new ToastAlerts(null);

		//hardcoded idCHat
		await axios.post(url, {
			"idChat": 1, //replace by ActiveChannel later
			"user": selectedUser,
			//	"time": time,
			//	"password": "string"
		})
			.then(response => {
				console.log(response);
				toast.notifySuccess("Successfully set as admin");
			})
			.catch(error => {
				console.log(error);
				toast.notifyDanger("Error while setting as admin");
			})

		//toast.notifyDanger("A reprendre.");
	}

	return (
		<div id="ListParticipant" className="col-3">
			<h2 id="participant--title">Members</h2>
			<p>hardcoded participant atm</p>
			<div id="sub--div">
				{
					<div id="participants--div">
						{participates.map(user =>
							<Participant
								key={user.id}
								username={user.login}
								status={user.status}
								owner={user.owner}
								admin={user.admin}
								updateSelectedUser={updateSelectedUser}
								updateFunctionToUse={updateFunctionToUse} />
						)}
					</div>
				}
			</div>
			{/*<div className="buttons_div">
				<div className="row">
					<div className="col" id="row--button_invite">
						<button id="invite--button" className="btn btn-warning" onClick={inviteToPlay}>Invite to play</button>
					</div>
				</div>
				<div className="row" id="row--buttons_chat">
					<div className="col">
						<button id="players-dm-button" className="btn btn-success" onClick={sendDM}>DM</button>
					</div>
					<div className="col">
						<button id="players-channel-button" className="btn btn-primary" onClick={banChannel}>Channel</button>
					</div>
				</div>
				<div className="row" id="row--buttons_danger">
					<div className="col">
						<button id="players-dm-button" className="btn btn-danger" onClick={banUser}>Block</button>
					</div>
					<div className="col">
						<button id="players-channel-button" className="btn btn-danger" onClick={muteUser}>Mute</button>
					</div>
				</div>
				<div className="row">
					<div className="col" id="row--button_admin">
						<button id="admin--buton" className="btn btn-secondary" onClick={setAdmin}>Set admin</button>
					</div>
				</div>
				<div className="row">
					<div className="col" id="row--button_kick">
						<button id="kick--button" className="btn btn-danger" disabled>Kick</button>
					</div>
				</div>
				<div className="row">
					<div className="col" id="row--button_leave">
						<button id="leave--button" className="btn btn-danger" disabled >Leave channel</button>
					</div>
				</div>
			</div>*/}
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
	);
}
