import './ListParticipant.scss';
import React from "react";
import Participant from './Participant/Participant';
import axios from "axios";
import { Button, Modal, Form } from 'react-bootstrap';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';

let url_begin = "";
if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
	url_begin = "http://localhost";
else
	url_begin = "http://".concat(process.env.REACT_APP_IP);

export interface ParticipantProps {
	login: string,
	isChan?: boolean,
	hasPass?: boolean,
	setHasPass?: any,
	activeID?: string,
	activeName?: string,
	socket?: any,
	setHide?: any,
	hide?: any
	isBanned?: boolean
}

export default function ListParticipant(props: ParticipantProps) {
	const [selectedUser, updateSelectedUser] = React.useState("");
	const [functionToUse, updateFunctionToUse] = React.useState("");
	const [participates, updateParticipates] = React.useState([]);
	const [currentUserAdmin, setCurrentUserAdmin] = React.useState(false);
	const [show, setShow] = React.useState(false);
	const [passFail, setPassFAil] = React.useState("");
	const [newPass, setNewPass] = React.useState("");
	const [newPassConf, setNewPassConf] = React.useState("");
	const [load, setLoad] = React.useState(false);

	function getCurrentUserAdminStatus() {
		if (props.activeID != "" && props.activeID != undefined && props.activeID != null) {
			let url = url_begin.concat(":3000/api/chat/isAdminIn/").concat(props.activeID);
			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
			axios.defaults.withCredentials = true;
			axios.get(url)
				.then(res => {
					if (res.data === true)
						setCurrentUserAdmin(true);
				})
		}
	}

	const [sockChan, setsockChan] = React.useState(props.activeName);

	React.useEffect(() => {
		setsockChan(props.activeName);
		props.socket.emit('requestAllUsers', props.activeID);
		props.socket.on("sendAllUsers", (participants) => {
			if (participants)
				updateParticipates(participants);
			else
				updateParticipates(null)
		});
		if (props.isChan === true) {
			setCurrentUserAdmin(false);
			getCurrentUserAdminStatus();
		}
	}, [props.activeID, sockChan])

	props.socket.on("refreshParticipants", (...args) => {
		if (args[1] == props.activeName && (props.activeName != "" || props.activeName != undefined || props.activeName != null)) {
			updateParticipates(args[0]);
			setsockChan(args[1]);
		}
	});

	React.useEffect(() => {
		executeFunction(functionToUse);
		return () => { setLoad(false)};
	}, [functionToUse])

	function executeFunction(param: string) {
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
		}
	}

	function unbanUser() {
		props.socket.emit('ban', { user: selectedUser, ban: false, chatName: props.activeName, admin: props.login });
	}

	function banUser() {
		props.socket.emit('ban', { user: selectedUser, ban: true, chatName: props.activeName, admin: props.login });
	}

	function unmuteUser() {
		props.socket.emit('mute', { user: selectedUser, mute: false, chatName: props.activeName, admin: props.login });
	}

	async function setAdmin() {
		props.socket.emit('setAdmin', { user: selectedUser, chatName: props.activeName, admin: props.login });
	}

	function muteUser() {
		props.socket.emit('mute', { user: selectedUser, mute: true, chatName: props.activeName, admin: props.login });
	}

	function leaveChannel() {
		props.socket.emit('leave', { user: props.login, chatName: props.activeName });
		if (props.isChan === true) {
			document.getElementById("display_chan_".concat(props.activeName)).remove();
		}
		props.setHide(true);
	}

	function blockUser() {
		props.socket.emit('block', { user: selectedUser, me: props.login, chatName: props.activeName });
	}

	function inviteToPlay() {
		window.top.location = url_begin.concat(":3030/game?vs=").concat(selectedUser);
	}

	function seeProfile() {
		window.top.location = url_begin.concat(":3030/profile/").concat(selectedUser);
	}

	const handleClose = () => setShow(false);

	const handleShow = () => {
		setNewPass("");
		setNewPassConf("");
		setPassFAil("")
		setShow(true);
	}

	const handleSend = () => {
		if (newPass !== newPassConf) {
			setPassFAil("Pass doesn't match")
		}
		else {
			updatePass();
			handleClose();
		}
	}

	const handleRemovePass = () => {
		let toast = new ToastAlerts(null);
		const url = url_begin.concat(":3000/api/chat/password");

		const body = {
			"idChat": props.activeID,
			"password": null
		}
		axios.post(url, body)
			.then(response => {
				toast.notifySuccess("Remove password :)");
				handleClose();
			})
			.catch(error => {
				toast.notifyDanger("Fail to remove password");
			})
		props.setHasPass(false);
	}

	function updatePass() {
		let toast = new ToastAlerts(null);
		const url = url_begin.concat(":3000/api/chat/password");

		const body = {
			"idChat": props.activeID,
			"password": newPass
		}
		axios.post(url, body)
			.then(response => {
				toast.notifySuccess("Update password :)");
			})
			.catch(error => {
				toast.notifyDanger("Fail to update password");
			})
	}

	return (
		<div id="ListParticipant" className="col-md-3">
			<h2 id="participant--title">{props.activeID != "" && props.activeName != "" ? "Members" : null}</h2>
			<div id="sub--div">
				{
					<div id="participants--div">
						{
							props.hide === false ?
								participates.map(participate =>
									<Participant
										isChannel={props.isChan}
										currentUserAdmin={currentUserAdmin}
										currentUser={props.login}
										key={participate.id}
										username={participate.user.login}
										role={participate.role}
										owner={participate.owner}
										admin={participate.admin}
										updateSelectedUser={updateSelectedUser}
										updateFunctionToUse={updateFunctionToUse}
										isBanned={props.isBanned}
										status={participate.user.status}
										socket={props.socket}
									/>
								)
								:
								null
						}
					</div>
				}
			</div>
			<div className="buttons_div">
				<div className="row">
					<div className="col">
						{props.isChan === true && props.hide === false && props.isBanned === false && props.activeID != "" && props.activeName != "" ? <button id="leave--button" className="btn" onClick={leaveChannel}>Leave channel</button> : null}

						{currentUserAdmin === true && props.hasPass ?
							<button id="pass--button" className={props.hide == false ? "btn" : "invisible"} onClick={handleShow}>Update password</button>
							:
							null
						}
						<Modal show={show} animation={true} onHide={handleClose}>
							<Modal.Body>
								<Form>
									<Form.Group>
										<Form.Label>New Password *</Form.Label>
										<Form.Control
											type="password"
											value={newPass}
											onChange={e => { setNewPass(e.target.value) }}
											autoFocus
											placeholder="******"
											className={passFail ? "fail" : ""}
										/>
									</Form.Group>
									<p className="fail">{passFail}</p>
									<Form.Group>
										<Form.Label>New Password confirmation *</Form.Label>
										<Form.Control
											type="password"
											value={newPassConf}
											onChange={e => { setNewPassConf(e.target.value) }}
											autoFocus
											placeholder="******"
										/>
									</Form.Group>
								</Form>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="danger" onClick={handleRemovePass}>
									Remove Pass
								</Button>
								{newPassConf && newPass ?
									<Button variant="success" onClick={handleSend} >
										Confirm New Pass
									</Button>
									:
									<Button variant="success" onClick={handleSend} disabled>
										Confirm New Pass
									</Button>
								}
							</Modal.Footer>
						</Modal>
					</div>
				</div>
			</div>
		</div>
	);
}
