import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import MyAxios from '../../Utils/Axios/Axios';
import { ToastContainer } from 'react-toastify';
import "./JoinPubChan.scss";
import { io, Socket } from "socket.io-client";

export interface JoinChanProps {
	endpoint?: any,
	action?: any,
	setExited?: any,
	setUpdate?: any,
	exited?: any,
	login?: string,
	socket?: any
}
export default function JoinChan(props: JoinChanProps) {
	const [show, setShow] = React.useState(false);
	const [newPass, setNewPass] = React.useState("")
	const [show2, setShow2] = React.useState(false);
	const [isPublic, setPublic] = React.useState(Boolean);
	const [privatePass, setPrivatePass] = React.useState(String);
	const [publicPass, setPublicPass] = React.useState(String);
	const [privateToJoin, setPrivateToJoin] = React.useState(String);
	const [chanName, chanNameSet] = React.useState("");
	const [chanPassword, chanPasswordSet] = React.useState("");
	const [sucessfull, setSuccessfull] = React.useState(false);
	const [joignable, setJoignable] = React.useState([]);
	const [load, setLoad] = React.useState(false);
	const calledOnce = React.useRef(false);

	const displayPrivate = () => setPublic(false);

	const displayPublic = () => setPublic(true);

	const handleCloseFinale = () => {
		setShow(false);
	}

	const handleClose2 = () => setShow2(false);

	const handleClose = () => {
		setJoignable([]);
		setShow(false);
		return false;
	}

	React.useEffect(() => {
		//console.log("in join channel")
		;
	}, [])

	const handleExit = () => {

		let toast = new ToastAlerts(null);

		setForm(false);
		setPublicPass("");
		if (sucessfull == true) {
			props.setExited(!props.exited);
		}
		//else {
		//	console.log("Did not add anything")
		//}
	}

	function handleSend(chan: string) {
		let toast = new ToastAlerts(null);

		axios.defaults.withCredentials = true;
		let url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/chat/join");

		console.log("you try to join the chan:" + chan);
		let body = {};
		if (!publicPass || publicPass.length <= 0) {
			body = {
				"name": chan,
			}
		}
		else {
			body = {
				"password": publicPass,
				"name": chan,
			}
		}

		axios.post(url, body)
			.then(res => {
				toast.notifySuccess("You joined the channel");
				props.setUpdate(chan);
				setSuccessfull(true);
				setForm(false);
				setPublicPass("");

				props.socket.emit('refresh', chan)
				handleClose();
			})
			.catch(error => {
				toast.notifyDanger("Failed to join the channel.");
				setSuccessfull(true);
				setForm(false);
				setPublicPass("");
				handleClose();
			})
	}


	const handleShow = () => {
		getJoignableChans();
		setShow(true);
	}

	const getJoignableChans = () => {

		let url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/chat/joinableChannels");

		axios.get(url)
			.then((res) => {
				let joignable = res.data;
				let len = joignable.length;
				let i = 0;
				while (i < len) {
					setJoignable(prevArray => [...prevArray, joignable[i]]);
					i++;
				}
				setLoad(true);

			})
			.catch((error) => {
				//console.log("Catched error while getting joignable.");
				;
			})
	}

	const handleJoinPrivate = () => {
		let toast = new ToastAlerts(null);

		axios.defaults.withCredentials = true;
		let url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/chat/join");

		console.log(privateToJoin + ": chan i want to join while im on private side")
		let body = {};
		if (!privatePass || privatePass.length <= 0) {
			body = {
				"name": privateToJoin,
			}
		}
		else {
			body = {
				"password": privatePass,
				"name": privateToJoin,
			}
		}
		console.log(body);
		axios.post(url, body)
			.then(res => {
				toast.notifySuccess("You joined the channel");
				props.setUpdate(privateToJoin);
				setSuccessfull(true);
				handleCloseFinale();
			})
			.catch(error => {
				console.log(error);
				toast.notifyDanger("Failed to join the channel.");
				setSuccessfull(true);
				handleCloseFinale();
			})
	}

	const [form, setForm] = React.useState(false);
	const [publicToJoin, setPublicToJoin] = React.useState(String);

	function popForm(chan) {
		/*
		setPublicToJoin(chan);
		if (form == false) {
			setForm(true);

		}
		else {
			//setForm(false);

		}
		*/
	}

	return (
		<div id="create-chan_div">
			<button type="button" className="btn"
				id="joinchan-button"
				onClick={handleShow}
				data-toggle="modal" data-target="#exampleModalCenter">Join channel</button>
			<Modal  {...props}
     				size="lg"
	  				show={show} 
					animation={true} onHide={handleClose} onExited={handleExit} id="modal_join">
				<Modal.Header>
					<Modal.Title id="create_title">Join a channel</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form id="form_modal_join">
						<Modal.Title className="Category">
							<div className="row d-flex justify-content-center text-center" id="chans_policy">
								<button type="button" className="btn btn-light" onClick={displayPublic} >Public</button>
								<button type="button" className="btn btn-light" /*categ-join*/ onClick={displayPrivate} >Private</button>
							</div>
						</Modal.Title>
						<br />
						{isPublic === true ?
							<ul className="wrapper list-group list-group-horizontal-sm" id="list_pub_chan">
								{load == true ?
									joignable.map(join =>
										<div key={join} className="chans" /*list-group-item*/>
											<div className="joignable">{join.name}
												{
													join.password ?
														<>
															<Form.Group >
																<Form.Control
																	type="password"
																	value={publicPass}
																	onChange={e => { setPublicPass(e.target.value) }}
																	autoFocus
																	placeholder="******"
																/>
															</Form.Group>
															<Button variant="dark" type="button" id="join--button" onClick={() => handleSend(join.name)}>
																Join
															</Button>
														</>
														:
														<Button variant="dark" type="button" className="join--pub" onClick={() => handleSend(join.name)}>
															Join
														</Button>
												}
											</div>
										</div>)
									:
									null
								}

							</ul>
							:
							<>
							<div className="private-form">
								<Form.Group>
									{/* <div className="private-form"> */}
									<Form.Label>Channel name</Form.Label>
									<Form.Control
										type="text"
										value={privateToJoin}
										onChange={e => { setPrivateToJoin(e.target.value) }}
										// autoFocus
										placeholder="channel"
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										value={privatePass}
										onChange={e => { setPrivatePass(e.target.value) }}
										// autoFocus
										placeholder="******"
									/>
									{/* </div> */}
								</Form.Group>
								<Button className="put-on-right" variant="light" type="button" onClick={handleJoinPrivate}>
									Join
								</Button>
							</div>
								
							</>
						}
					</Form>
				</Modal.Body>
			</Modal >
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
