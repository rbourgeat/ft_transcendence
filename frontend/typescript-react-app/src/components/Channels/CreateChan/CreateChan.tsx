import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import React from "react";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import "./CreateChan.scss";
import { ToastContainer } from 'react-toastify';

export interface CreateChanProps {
	endpoint?: any,
	action?: any,
	handleshow?: any,
	setExited?: any,
	setUpdate?: any,
	exited?: any,
	setHasPass?: any
}
export default function CreateChan(props: CreateChanProps) {

	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [chanScope, chanScopeSet] = React.useState("public");
	const [chanName, chanNameSet] = React.useState("");
	const [chanPassword, chanPasswordSet] = React.useState("");
	const [sucessfull, setSuccessfull] = React.useState(false);
	const [load, setLoad] = React.useState(false);

	const handleExit = () => {
		if (sucessfull === true) {
			//console.log("result will be " + !props.exited);
			props.setExited(!props.exited);
		}
		chanNameSet("");
		chanScopeSet("public");
		chanPasswordSet("");
	}

	const handleSend = () => {
		//console.log("Creating channel");
		axios.defaults.withCredentials = true;

		//Check si la channel existe ou pas
		let url = "http://localhost:3000/api/chat/".concat(chanName).concat("/exist");

		let toast = new ToastAlerts(null);

		let load = false;
		let isFree = false;
		axios.get(url)
			.then(res => {
				//console.log(res);
				//console.log(res.data);
				//console.log(typeof res.data);
				isFree = res.data;
				load = true;

				if (isFree == false) {
					toast.notifyDanger("This channel already exists.");
					return;
				}

				axios.defaults.withCredentials = true;

				let headers = {
					'Content-Type': 'application/json'
				}

				let body = {};

				if (res.data == true || res.data == "true") {
					if (isFree == true && load == true) {
						url = "http://localhost:3000/api/chat/new";

						let scope: boolean;
						if (chanScope === "public")
							scope = true;
						else
							scope = false;
						if (chanPassword.length <= 0) {
							//console.log("body without pass");
							body = {
								public: scope,
								name: chanName
							}
						}
						else {
							//console.log("body with pass:" + chanPassword);
							props.setHasPass(true);
							body = {
								password: chanPassword,
								public: scope,
								name: chanName
							}
						}

						axios.post(url, body)
							.then(res => {
								setSuccessfull(true);
								toast.notifySuccess("✨ Successfully created channel !");
								handleClose();
							})
							.catch((error) => {
								//console.log("Catched error on post api chat. :(");
								;
							})
					}
				}
			})
	}

	return (
		<div id="create-chan_div">
			<button type="button" className="btn"
				id="createchan-button"
				onClick={handleShow}
				data-toggle="modal" data-target="#exampleModalCenter"
			>New channel</button>
			<Modal show={show} animation={true} onHide={handleClose} onExited={handleExit}>
				<Modal.Header closeButton>
					<Modal.Title id="create_title">Create a channel 💌</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="channName">
							<Form.Label>Channel name</Form.Label>
							<Form.Control
								type="text"
								value={chanName}
								onChange={e => { chanNameSet(e.target.value) }}
								autoFocus
								placeholder="my_unique_chanName"
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Choose policy</Form.Label>
							<Form.Select aria-label="Channel visibility" onChange={e => chanScopeSet(e.target.value)} defaultValue="public">
								<option value="public">public</option>
								<option value="private">private</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className="mb-3" controlId="channPassword">
							<Form.Label>Channel password</Form.Label>
							<Form.Control
								type="password"
								value={chanPassword}
								onChange={e => { chanPasswordSet(e.target.value) }}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="ligth" onClick={handleClose}>
						Close
					</Button>
					<Button variant="dark" type="submit" onClick={handleSend}>
						Send form
					</Button>
				</Modal.Footer>
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
		</div>
	);

}
