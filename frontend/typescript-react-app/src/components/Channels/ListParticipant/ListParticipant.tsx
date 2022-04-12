import './ListParticipant.scss';
import React, {useState} from "react";
import Participant from './Participant/Participant';
import Footer from "../../Footer/Footer";
//import TimePicker from "react-time-picker";
//import { useTimer } from 'react-timer-hook';
import MyTimer from "./MyTimer/MyTimer";

export interface ParticipantProps{
}

export default function ListParticipant()
{
	const time = new Date();
	time.setSeconds(time.getSeconds() + 600);

	return (
		<div id="ListParticipant">
			<h2 id="participant--title">Participants</h2>
			<div id="sub--div" className="overflow-auto">
				<div id="participants--div">
					<Participant username="malatini" status="Online" owner={true} admin={true} />
					<Participant username="bahaas" status="Offline"/>
					<Participant username="rbourgea" status="Offline"/>
					<Participant username="darbib" status="Online"/>
					<Participant username="macrespo" status="Online" admin={true}/>
				</div>
					<button id="bann-temp-button" className="btn btn-danger">Ban temporarily</button>
					<button id="mute-temp-button" className="btn btn-warning">Mute temporalily</button>
				</div>
			</div>
	);
}
