import './ListParticipant.scss';
import React from "react";
import Participant from './Participant/Participant';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import MyAxios from '../../Utils/Axios/Axios';
import { Button, Modal, Form } from 'react-bootstrap';

let url_begin = "http://".concat(process.env.REACT_APP_IP);

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
			case 'dm':
				return sendDM();
		}
	}

	function unbanUser() {
		makeAPIcall("unban", "Successfully unbanned", "Error while unbanning", false);
		props.socket.emit('ban', { user: selectedUser, ban: false });
	}

	function banUser() {
		makeAPIcall("ban", "Successfully ban", "Error while banning", false);
		props.socket.emit('ban', { user: selectedUser, ban: true });
	}

	function unmuteUser() {
		makeAPIcall("unmute", "Successfully unmuted", "Error while unmuting", false);
		props.socket.emit('mute', { user: selectedUser, mute: false });
	}

	function setAdmin() {
		makeAPIcall("setAdmin", "Successfully set as admin", "Error while setting as admin", false);
	}

	function muteUser() {
		makeAPIcall("mute", "Successfully mute", "Error while muting", false);
		props.socket.emit('mute', { user: selectedUser, mute: true });
	}

	function leaveChannel() {
		makeAPIcall("quit", "Successfull quit", "Error while quitting channel", true);
		props.setHide(true);
	}

	function blockUser() {
		let ax = new MyAxios(null);
		ax.post_relation_block(selectedUser, "chat");
	}

	function sendDM() {
		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre.");
	}

	function inviteToPlay() {
		window.top.location = url_begin.concat(":3030/game?vs=").concat(selectedUser);
	}

	function seeProfile() {
		window.top.location = url_begin.concat(":3030/profile/").concat(selectedUser);
	}

	async function makeAPIcall(endpoint: string, toastSuccessMessage: string, toastErrorMessage: string, me: boolean) {
		let toast = new ToastAlerts(null);
		const url = url_begin.concat(':3000/api/chat/').concat(endpoint);

		let user: string;
		me === true ? user = props.login : user = selectedUser;
		const body = {
			"idChat": props.activeID,
			"user": user
		}
		await axios.post(url, body)
			.then(response => {
				toast.notifySuccess(toastSuccessMessage);
				if (endpoint === "quit") {
					if (props.isChan === true) {
						document.getElementById("display_chan_".concat(props.activeName)).remove();
						let title = document.getElementsByClassName("chan-title_notselected")[0].innerHTML;
						document.getElementsByClassName("chan-title_notselected")[0].className = 'chan-title_selected';
					}
					else
						document.getElementById("dm_chan_".concat(props.activeName)).remove();
				}
			})
			.catch(error => {
				toast.notifyDanger(toastErrorMessage);
			});
		props.socket.emit('refresh', props.activeName);
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
		<div id="ListParticipant" className="col-3">
			<h2 id="participant--title">Members</h2>
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
						{props.isChan === true && props.hide === false && props.isBanned === false ? <button id="leave--button" className="btn" onClick={leaveChannel}>Leave channel</button> : null}
						{currentUserAdmin === true && props.hasPass ?
							<button id="pass--button" className="btn" onClick={handleShow}>Update password</button>
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
			{/* <ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/> */}
		</div>
	);
}