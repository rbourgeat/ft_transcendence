import './ListParticipant.scss';
import React from "react";
import Participant from './Participant/Participant';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import MyAxios from '../../Utils/Axios/Axios';

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
			case 'unban':
				return unbanUser();
			case 'unmute':
				return unmuteUser();
		}
	}

	async function unbanUser() {
		let toast = new ToastAlerts(null);
		const url = 'http://localhost:3000/api/chat/unban';

		const body = {
			"idChat": 1, //replace by ActiveChannel later
			"user": selectedUser,
		}
		//hardcoded idCHat
		await axios.post(url, body)
			.then(response => {
				console.log(response);
				toast.notifySuccess("Successfully unbanned");
			})
			.catch(error => {
				console.log(error);
				toast.notifyDanger("Error while unbanning");
			})
	}

	async function banUser() {
		const url = 'http://localhost:3000/api/chat/ban';
		let toast = new ToastAlerts(null);

		const body = {
			"idChat": 1, //replace by ActiveChannel later
			"user": selectedUser,
		}
		//hardcoded idCHat
		await axios.post(url, body)
			.then(response => {
				console.log(response);
				toast.notifySuccess("Successfully ban");
			})
			.catch(error => {
				console.log(error);
				toast.notifyDanger("Error while banning");
			})
	}

	function blockUser() {
		let ax = new MyAxios(null);
		ax.post_relation_block(selectedUser);
	}

	//TODO
	function sendDM() {
		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre.");
	}

	//TODO
	function inviteToPlay() {
		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre.");
	}

	async function muteUser() {
		const url = 'http://localhost:3000/api/chat/mute';
		let toast = new ToastAlerts(null);

		const time = new Date();
		time.setSeconds(time.getSeconds() + 600);

		const body = {
			"idChat": 1, //replace by ActiveChannel later
			"user": selectedUser,
			"time": time
		}
		//hardcoded idCHat
		await axios.post(url, body)
			.then(response => {
				console.log(response);
				toast.notifySuccess("Successfully mute");
			})
			.catch(error => {
				console.log(error);
				toast.notifyDanger("Error while muting");
			})
	}

	async function unmuteUser() {
		let toast = new ToastAlerts(null);
		const url = 'http://localhost:3000/api/chat/unmute';

		const body = {
			"idChat": 1, //replace by ActiveChannel later
			"user": selectedUser,
		}
		//hardcoded idCHat
		await axios.post(url, body)
			.then(response => {
				console.log(response);
				toast.notifySuccess("Successfully unbanned");
			})
			.catch(error => {
				console.log(error);
				toast.notifyDanger("Error while unbanning");
			})
	}

	async function setAdmin() {
		const url = 'http://localhost:3000/api/chat/setAdmin';
		//const time = new Date();
		//time.setSeconds(time.getSeconds() + 600);
		//console.log("selectedUser is " + selectedUser);
		let toast = new ToastAlerts(null);

		const body = {
			"idChat": 1, //replace by ActiveChannel later
			"user": selectedUser,
		}
		//hardcoded idCHat
		await axios.post(url, body)
			.then(response => {
				console.log(response);
				toast.notifySuccess("Successfully set as admin");
			})
			.catch(error => {
				console.log(error);
				toast.notifyDanger("Error while setting as admin");
			})
	}

	return (
		<div id="ListParticipant" className="col-3">
			<h2 id="participant--title">Members</h2>
			<p>hardcoded participant atm</p>
			<div id="sub--div">
				{
					<div id="participants--div">
						{participates.map(participate =>
							<Participant
								key={participate.id}
								username={participate.user.login}
								role={participate.role}
								owner={participate.owner}
								admin={participate.admin}
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
