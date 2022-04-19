import './ListParticipant.scss';
import React, { useState, useEffect } from "react";
import Participant from './Participant/Participant';
import Footer from "../../Footer/Footer";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';

export interface ParticipantProps {
	setActiveChannelName: any,
	setActiveChannelID: any
}

//export default function ListParticipant({activeChannel})
export default function ListParticipant(props: ParticipantProps) {
	const [selectedUser, updateSelectedUser] = React.useState("");
	const [loggedUser, updateLoggedUser] = React.useState({});
	const [participates, updateParticipates] = React.useState([]);
	/*
		const [users, setUsers] = React.useState([]);
		const [load, setLoad] = React.useState(true);
		const calledOnce = React.useRef(false);
		async function renderUsers() {

			axios.defaults.withCredentials = true;
			let log = localStorage.getItem("login");
			console.log("My login is " + log);
			let url = "http://localhost:3000/api/user/";
			await axios.get(url)
				.then(res => {
					console.log("Get api users successfully called.");
					let users = res.data;
					let len = users.length;
					let i = 0;
					while (i < len) {
						if (users[i].login != log)
							setUsers(prevArray => [...prevArray, users[i]])
						i++;
					}
				})
				.catch((error) => {
					console.log("Error while getting all users");
				})
			setLoad(true);
		}

		useEffect(() => {
			if (calledOnce.current) {
				return;
			}
			renderUsers();
			calledOnce.current = true;

		}, []);
	*/
	React.useEffect(() => {
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;
		axios.get(`http://localhost:3000/api/chat/1/users`)
			.then(response => {
				updateParticipates(response.data);
			})
			.catch(error => {
				console.log("error");
			})
	}, [])

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

	function muteUSer() {
		//const url = 'http://localhost:3000/api/chat/ban';

		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre.");
	}

	function setAdmin() {
		//const url = 'http://localhost:3000/api/chat/ban';

		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre.");
	}

	return (
		<div id="ListParticipant" className="col-3">
			<h2 id="participant--title">Members</h2>
			<p>hardcoded participant atm</p>
			<div id="sub--div">
				{/*<div id="participants--div">
					{participates.map(user =>
					<Participant
						key={user.id}
						username={user.login}
						status={user.status}
						owner={user.owner}
						admin={user.admin}
						updateSelectedUser={updateSelectedUser} />
					)}
				</div>*/
					<div id="participants--div">
						{participates.map(user =>
							<Participant
								key={user.id}
								username={user.login}
								status={user.status}
								owner={user.owner}
								admin={user.admin}
								updateSelectedUser={updateSelectedUser} />
						)}
					</div>
				}
			</div>
			<div className="buttons_div">
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
						<button id="kick--button" className="btn btn-danger" disabled /*onClick={setAdmin}*/>Kick</button>
					</div>
				</div>
				<div className="row">
					<div className="col" id="row--button_leave">
						<button id="leave--button" className="btn btn-danger" disabled /*onClick={setAdmin}*/>Leave channel</button>
					</div>
				</div>
				{/*<button id="mute-temp-button" className="btn btn-warning" onClick={muteUser}>Mute temporalily</button>*/}
			</div>
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
