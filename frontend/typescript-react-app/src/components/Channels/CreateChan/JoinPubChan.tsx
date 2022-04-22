import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import MyAxios from '../../Utils/Axios/Axios';
import { ToastContainer } from 'react-toastify';
import "./JoinPubChan.scss";

export interface JoinChanProps {
	endpoint?: any,
	action?: any,
	//handleshow?: any,
	setExited?: any,
	setUpdate?: any,
	exited?: any
}
export default function JoinChan(props: JoinChanProps) {
	const [show, setShow] = React.useState(false);


	//const [chanScope, chanScopeSet] = React.useState("public");
	const [chanName, chanNameSet] = React.useState("");
	const [chanPassword, chanPasswordSet] = React.useState("");
	const [sucessfull, setSuccessfull] = React.useState(false);
	const [joignable, setJoignable] = React.useState([]);
	const [load, setLoad] = React.useState(false);
	const calledOnce = React.useRef(false);


	const handleExit = () => {
		let toast = new ToastAlerts(null);

		console.log("it is successfull ? " + sucessfull);
		if (sucessfull == true) {
			console.log("result will be " + !props.exited);
			props.setExited(!props.exited);
		}
		else {
			console.log("Did not add anything")
		}
		//chanNameSet("");
		//chanScopeSet("public");
		//chanPasswordSet("");
		setJoignable([]);
	}


	const handleClose = () => {
		setJoignable([]);
		setShow(false);
	}


	function handleSend(chan: string) {
		let toast = new ToastAlerts(null);

		axios.defaults.withCredentials = true;
		let url = "http://localhost:3000/api/chat/join";

		let body = {
			"name": chan,
		}
		axios.post(url, body)
			.then(res => {
				toast.notifySuccess("You joined the channel");
				props.setUpdate(chan);
				setSuccessfull(true);
				handleClose();
			})
			.catch(error => {
				toast.notifyDanger("This channel already exists.");
			})
	}

	const handleShow = () => {
		getJoignableChans();
		setShow(true);
	}

	function getJoignableChans() {
		console.log("Getting all joinable chans");

		let url = "http://localhost:3000/api/chat/joinableChannels";

		axios.get(url)
			.then((res) => {
				console.log("Successfully got joinable channels");
				console.log(res);
				console.log(res.data);
				let joignable = res.data;
				let len = joignable.length;
				let i = 0;
				while (i < len) {
					setJoignable(prevArray => [...prevArray, joignable[i]]);
					i++;
				}
				console.log("joignable are " + joignable);
				console.log("joignable len is " + joignable.length);
				setLoad(true);

			})
			.catch((error) => {
				console.log("Catched error while getting joignable.");
			})
	}

	const [newPass, setNewPass] = React.useState("")
	const [show2, setShow2] = React.useState(false);
	const handleClose2 = () => setShow2(false);
	const handleShow2 = () => {
		//getJoignableChans();
		setShow2(true);
	}

	function handleSend2(chan: string, pass: string) {
		let toast = new ToastAlerts(null);

		axios.defaults.withCredentials = true;
		let url = "http://localhost:3000/api/chat/join";

		console.log(chan + ": chan i want to join while im on pass modal")
		let body = {
			"password": pass,
			"name": chan,
		}
		axios.post(url, body)
			.then(res => {
				toast.notifySuccess("You joined the channel");
				props.setUpdate(chan);
				setSuccessfull(true);
				handleClose2();
			})
			.catch(error => {
				toast.notifyDanger("This channel already exists.");
			})
	}
	return (
		<div id="create-chan_div">
			<button type="button" className="btn btn-secondary"
				id="joinchan-button"
				onClick={handleShow}
				data-toggle="modal" data-target="#exampleModalCenter"
			>Join public channel</button>
			<Modal show={show} animation={true} onHide={handleClose} onExited={handleExit}>
				<Modal.Header closeButton>
					<Modal.Title id="create_title">Join a channel 💌</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Modal.Title id="list_title">List of channels you can join</Modal.Title>
						<br />
						<ul className="wrapper list-group list-group-horizontal-lg">
							{load == true ?
								joignable.map(join =>
									<div key={join} className="joignable_chans">
										<i className="btn joignable" onClick={join.password ? handleShow2 : () => handleSend(join.name)}>{join.name}</i>
										<Modal show={show2} animation={true} onHide={handleClose2}>
											<Modal.Body>
												<Form>
													<Form.Group>
														<Form.Label>Password *</Form.Label>
														<Form.Control
															type="password"
															value={newPass}
															onChange={e => { setNewPass(e.target.value) }}
															autoFocus
															placeholder="******"
														/>
													</Form.Group>
												</Form>
												<Button variant="dark" type="submit" onClick={() => handleSend2(join.name, newPass)}>
													Confirm pass
												</Button>
											</Modal.Body>
										</Modal>
									</div>
								)
								: ""}
						</ul>
					</Form>
				</Modal.Body>
			</Modal>
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
		</div >
	);

}
