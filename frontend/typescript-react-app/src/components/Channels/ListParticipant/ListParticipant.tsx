import './ListParticipant.scss';
import React, {useState} from "react";
import Participant from './Participant/Participant';
import Footer from "../../Footer/Footer";
//import TimePicker from "react-time-picker";
//import { useTimer } from 'react-timer-hook';
import MyTimer from "./MyTimer/MyTimer";
import {Button, Modal} from 'react-bootstrap';

export interface ParticipantProps{
}

export default function ListParticipant()
{
	const time = new Date();
	time.setSeconds(time.getSeconds() + 600);
	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
					<br/>
					<Button variant="secondary" onClick={handleShow}>Create channel</Button>
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Modal heading</Modal.Title>
						</Modal.Header>
						<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" onClick={handleClose}>
								Save Changes
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
				<Footer />
			</div>
	);
}
