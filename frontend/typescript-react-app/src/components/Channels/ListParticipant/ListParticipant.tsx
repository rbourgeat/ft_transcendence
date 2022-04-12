import './ListParticipant.scss';
import React, {useState} from "react";
import Participant from './Participant/Participant';
import Footer from "../../Footer/Footer";
import MyTimer from "./MyTimer/MyTimer";
import axios from "axios";

export interface ParticipantProps{
}

export default function ListParticipant({chanUsers})
{
	const [selectedUser, updateSelectedUser] = React.useState("");
	const [loggedUser, updateLoggedUser] = React.useState({});

	const url = "http://localhost:3000/api/auth/";
	axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
	axios.defaults.withCredentials = true;
	axios.get(url)
		.then(res => {
			updateLoggedUser(res.data);
		})
		.catch((err) => {
			console.log("Error while getting api auth");
		})
	
	
	return (
		<div id="ListParticipant">
			<h2 id="participant--title">Participants</h2>
			<div id="sub--div" className="overflow-auto">
				<div id="participants--div">
					{chanUsers.map(user => 
					<Participant
						key={user.id}
						username={user.id}
						status="Online"
						owner={user.owner}
						admin={user.admin}
						updateSelectedUser={updateSelectedUser} />
				)}
				</div>
					<button id="bann-temp-button" className="btn btn-danger">Ban temporarily</button>
					<button id="mute-temp-button" className="btn btn-warning">Mute temporalily</button>
				</div>
			</div>
	);
}
