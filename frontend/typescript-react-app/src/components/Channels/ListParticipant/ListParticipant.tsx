import './ListParticipant.scss';
import React, {useState} from "react";
import Participant from './Participant/Participant';
import Footer from "../../Footer/Footer";
//import TimePicker from "react-time-picker";
//import { useTimer } from 'react-timer-hook';
import MyTimer from "./MyTimer/MyTimer";
import {Button, Modal, Form} from 'react-bootstrap';
import axios from 'axios';

export interface ParticipantProps{
}

export default function ListParticipant()
{
	const time = new Date();
	time.setSeconds(time.getSeconds() + 600);
	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [chanScope, chanScopeSet] = React.useState("public");
	const [chanName, chanNameSet] = React.useState("");
	const [chanPassword, chanPasswordSet] = React.useState("");

	const createChannel = () => {
		if (chanScope === "public") {
			axios.post('http://localhost:3000/api/chat', {
				"public": chanScope === "public" ? true : false,
				"name": chanName 
			})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
		}
		else {
			axios.post('http://localhost:3000/api/chat', {
				"password": chanScope === "public" ? "" : chanPassword,
				"public": chanScope === "public" ? true : false,
				"name": chanName 
			})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}

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
							<Modal.Title>Create a new channel</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group>
									<Form.Select aria-label="Channel visibility" onChange={e => chanScopeSet(e.target.value)} defaultValue="public">
										<option value="public">public</option>
										<option value="private">private</option>
										<option value="protected">protected</option>
									</Form.Select>
								</Form.Group>
								<Form.Group className="mb-3" controlId="channName">
									<Form.Label>Channel name</Form.Label>
									<Form.Control
										type="text"
										value={chanName}
										onChange={e => {chanNameSet(e.target.value)}}
										autoFocus
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="channPassword">
									<Form.Label>Channel password</Form.Label>
									<Form.Control
										type="password"
										value={chanPassword}
										onChange={e => {chanPasswordSet(e.target.value)}}
									/>
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" type="submit" onClick={createChannel}>
								Create 
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
				<Footer />
			</div>
	);
}
