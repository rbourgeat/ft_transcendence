import './ListParticipant.scss';
import React from "react";
import Participant from './Participant/Participant';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import MyAxios from '../../Utils/Axios/Axios';

export interface ParticipantProps {
	//setActiveChannelName?: any,
	//setActiveChannelID?: any,
	login: string,
	//setActiveDMID?: any,
	//setActiveDMName?: any,
	//setIsDM?: any,
	//setIsChan?: any
	activeChannelName?: any,
	activeChannelId?: any,
	activeDMName?: any,
	activeDMId?: any
	isDM?: any,
	isChan?: any
}

export default function ListParticipant(props: ParticipantProps) {
	const [selectedUser, updateSelectedUser] = React.useState("");
	const [functionToUse, updateFunctionToUse] = React.useState("");
	const [participates, updateParticipates] = React.useState([]);

	const [currentUserAdmin, setCurrentUserAdmin] = React.useState(false);


	React.useEffect(() => {
		getUsers();
		getCurrentUserAdminStatus();

		async function getUsers() {
			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
			axios.defaults.withCredentials = true;
			await axios.get(`http://localhost:3000/api/chat/${props.activeChannelId}/users`)
				.then(response => {
					updateParticipates(response.data);
					console.log("participates are updated");
				})
				.catch(error => {
					console.log("error");
				})
		}

		async function getCurrentUserAdminStatus() {

			let url = "http://localhost:3000/api/chat/isAdminIn/".concat(props.activeChannelId);
			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
			axios.defaults.withCredentials = true;
			await axios.get(url)
				.then(res => {
					if (res.data === true)
						setCurrentUserAdmin(true);
				})
				.catch((err) => {
					console.log("Error while getting api auth");
				})
		}
	}, [props.activeChannelId])

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
			case 'leave':
				return leaveChannel();
			case 'profile':
				return seeProfile();
			case 'dm':
				return sendDM();
		}
	}

	async function unbanUser() {
		let toast = new ToastAlerts(null);
		const url = 'http://localhost:3000/api/chat/unban';

		const body = {
			"idChat": props.activeChannelId,
			"user": selectedUser,
		}
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
			"idChat": props.activeChannelId,
			"user": selectedUser,
		}
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
		ax.post_relation_block(selectedUser, "chat");
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

	function seeProfile() {
		window.top.location = "http://localhost:3030/profile/".concat(selectedUser);
	}

	async function leaveChannel() {
		let toast = new ToastAlerts(null);
		const url = 'http://localhost:3000/api/chat/quit';

		const body = {
			"idChat": props.activeChannelId,
			"user": props.login,
		}
		await axios.post(url, body)
			.then(response => {
				console.log(response);
				toast.notifySuccess("Successfully quitted chat");
			})
			.catch(error => {
				console.log(error);
				toast.notifyDanger("Error while quitting channel");
			})
	}


	async function muteUser() {
		const url = 'http://localhost:3000/api/chat/mute';
		let toast = new ToastAlerts(null);

		const time = new Date();
		time.setSeconds(time.getSeconds() + 600);

		const body = {
			"idChat": props.activeChannelId,
			"user": selectedUser,
			"time": time
		}
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
			"idChat": props.activeChannelId,
			"user": selectedUser,
		}
		await axios.post(url, body)
			.then(response => {
				console.log(response);
				toast.notifySuccess("Successfully unmuted");
			})
			.catch(error => {
				console.log(error);
				toast.notifyDanger("Error while unmuting");
			})
	}

	async function setAdmin() {
		const url = 'http://localhost:3000/api/chat/setAdmin';
		let toast = new ToastAlerts(null);

		const body = {
			"idChat": props.activeChannelId,
			"user": selectedUser,
		}
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
			<div id="sub--div">
				{
					<div id="participants--div">
						{participates.map(participate =>
							<Participant
								currentUserAdmin={currentUserAdmin}
								currentUser={props.login}
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
			<div className="buttons_div">
				<div className="row">
					<div className="col" id="row--button_invite">
						<button id="invite--button" className="btn btn-danger" onClick={leaveChannel}>Leave channel</button>
					</div>
				</div>
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
