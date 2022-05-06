import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import React from "react";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import "./JoinPubChan.scss";

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
	const [isPublic, setPublic] = React.useState(Boolean);
	const [privatePass, setPrivatePass] = React.useState(String);
	const [publicPass, setPublicPass] = React.useState(String);
	const [privateToJoin, setPrivateToJoin] = React.useState(String);
	const [sucessfull, setSuccessfull] = React.useState(false);
	const [joignable, setJoignable] = React.useState([]);
	const [load, setLoad] = React.useState(false);


	const displayPrivate = () => setPublic(false);

	const displayPublic = () => setPublic(true);

	const handleCloseFinale = () => {
		props.setExited("true");
		setShow(false);
	}

	const handleClose = () => {
		setJoignable([]);
		setShow(false);
		return false;
	}

	React.useEffect(() => {
		props.setExited("false");
		// console.log("eo");
		;
	}, [])

	const handleExit = () => {
		setPublicPass("");
		if (sucessfull == true) {
			props.setExited("true");
		}
	}

	function handleSend(chan: string) {

		let toast = new ToastAlerts(null);

		axios.defaults.withCredentials = true;
		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/chat/join";
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/chat/join");

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

		console.log("test");
		console.log(body);
		console.log (url);
		axios.post(url, body)
			.then(res => {
				toast.notifySuccess("✅ You joined the channel !");
				props.setUpdate(chan);
				setSuccessfull(true);
				setPublicPass("");

				props.socket.emit('refresh', chan)
				handleClose();
			})
			.catch(error => {
				setSuccessfull(true);
				setPublicPass("");
				setJoignable([]);
				handleClose();
			})
	}


	const handleShow = () => {
		props.setExited("false");
		getJoignableChans();
		setShow(true);
	}

	const getJoignableChans = () => {
		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/chat/joignableChannels";
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/chat/joinableChannels");

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
				;
			})
	}

	const handleJoinPrivate = () => {
		let toast = new ToastAlerts(null);

		axios.defaults.withCredentials = true;
		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/chat/join";
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/chat/join");
		let body = {};
		if (!privatePass || privatePass.length <= 0) {
			body = {
				"name": privateToJoin,
				"public": false
			}
		}
		else {
			body = {
				"password": privatePass,
				"name": privateToJoin,
				"public": false
			}
		}
		axios.post(url, body)
			.then(res => {
				toast.notifySuccess("You joined a private channel");
				props.setUpdate(privateToJoin);
				setSuccessfull(true);
				handleCloseFinale();
			})
			.catch(error => {
				toast.notifyDanger("Failed to join a private channel")
				setSuccessfull(true);
				setJoignable([]);
				handleCloseFinale();
			})
	}

	return (
		<div>
			<button type="button" className="btn"
				id="joinchan-button"
				onClick={handleShow}
				data-toggle="modal" data-target="#exampleModalCenter">Join channel</button>
			<Modal
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
										<div key={join.name} className="chans">
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
															<Button variant="dark" type="button" className="join--button" onClick={() => handleSend(join.name)}>
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
										<Form.Label>Channel name</Form.Label>
										<Form.Control
											type="text"
											value={privateToJoin}
											onChange={e => { setPrivateToJoin(e.target.value) }}
											placeholder="channel"
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Password</Form.Label>
										<Form.Control
											type="password"
											value={privatePass}
											onChange={e => { setPrivatePass(e.target.value) }}
											placeholder="******"
										/>
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
		</div >
	);

}
