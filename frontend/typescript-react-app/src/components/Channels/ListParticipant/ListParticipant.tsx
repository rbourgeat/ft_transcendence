import './ListParticipant.scss';
import React, {useState} from "react";
import Participant from './Participant/Participant';
import Footer from "../../Footer/Footer";
import MyTimer from "./MyTimer/MyTimer";

export interface ParticipantProps{
}

export default function ListParticipant({chanUsers})
{
	const time = new Date();
	time.setSeconds(time.getSeconds() + 600);
	console.log(chanUsers);
	return (
		<div id="ListParticipant">
			<h2 id="participant--title">Participants</h2>
			<div id="sub--div" className="overflow-auto">
				<div id="participants--div">
					{chanUsers.map(user => 
						<Participant key={user.id} username={user.id} status="Online" owner={user.owner} admin={user.admin} />
					)}
				</div>
					<button id="bann-temp-button" className="btn btn-danger">Ban temporarily</button>
					<button id="mute-temp-button" className="btn btn-warning">Mute temporalily</button>
				</div>
				<Footer />
			</div>
	);
}
