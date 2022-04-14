import './ListParticipant.scss';
import React, { useState, useEffect } from "react";
import Participant from './Participant/Participant';
import Footer from "../../Footer/Footer";
import MyTimer from "./MyTimer/MyTimer";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';

export interface ParticipantProps{
}

export default function ListParticipant({activeChannel})
{
	const [selectedUser, updateSelectedUser] = React.useState("");
	const [loggedUser, updateLoggedUser] = React.useState({});
	const [participates, updateParticipates] = React.useState([]);

	React.useEffect(() => {
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;
		axios.get(`http://localhost:3000/api/chat/${activeChannel}/users`)
			.then(response => {
				updateParticipates(response.data);
			})
			.catch(error => {
				console.log("error");
			})
	}, [activeChannel])

	const time = new Date();
	time.setSeconds(time.getSeconds() + 600);

	const muteUser = () => {

		let toast = new ToastAlerts(null);

		if (selectedUser == "")
		{
			toast.notifyDanger("No user where selected.");
			return ;
		}
		const url = 'http://localhost:3000/api/chat/mute';
		axios.post(url, {
		"idChat": activeChannel,
		"user": selectedUser,
		"time": time,
		"password": "string"})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			})
	}

	const banUser = () => {
		const url = 'http://localhost:3000/api/chat/ban';

		let toast = new ToastAlerts(null);

		console.log("selectedUser is " + selectedUser);

		if (selectedUser == "")
		{
			toast.notifyDanger("No user where selected.");
			return ;
		}
		axios.post(url, {
		"idChat": activeChannel,
		"user": selectedUser,
		"time": time,
		"password": "string"})
			.then(response => {
				console.log(response);
				toast.notifySuccess("Successfully banned");
			})
			.catch(error => {
				console.log(error);
				toast.notifyDanger("Error while banned user");
			})
	}

	return (
		<div id="ListParticipant">
			<h2 id="participant--title">Participants</h2>
			<div id="sub--div" className="overflow-auto">
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
					<button id="bann-temp-button" className="btn btn-danger" onClick={banUser}>Ban temporarily</button>
					<button id="mute-temp-button" className="btn btn-warning" onClick={muteUser}>Mute temporalily</button>
					<ToastContainer
                        position="top-right"
                        autoClose={5000}
						hideProgressBar={false}
                        newestOnTop={false}
						closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover/>
				</div>
			</div>
	);
}
