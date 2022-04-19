import {Button, Modal, Form} from 'react-bootstrap';
import axios from 'axios';
import React, {useState} from "react";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import MyAxios from '../../Utils/Axios/Axios';

//TODO : a reprendre ?

export interface CreateChanProps {
	endpoint?: any,
	action?: any
	handleshow?: any
}
export default function CreateChan(props: CreateChanProps) {

	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [chanScope, chanScopeSet] = React.useState("public");
	const [chanName, chanNameSet] = React.useState("");
	const [chanPassword, chanPasswordSet] = React.useState("");

	const createChannel = () => {
		//let toast = new ToastAlerts(null);
		//toast.notifyDanger("A revoir");
		//return ;

		let ax = new MyAxios(null);

		//if (chanScope === "public") {
		//	axios.post(endpoint, {
		//		"public": chanScope === "public" ? true : false,
		//		"name": chanName
		//	})
		//		.catch(function (error) {
		//			console.log(error);
		//		});
		//}
		//else {
		//	axios.post(endpoint, {
		//		"password": chanPassword,
		//		"public": chanScope === "public" ? true : false,
		//		"name": chanName
		//	})
		//		.then(function (response) {
		//			console.log(response);
		//		})
		//		.catch(function (error) {
		//			console.log(error);
		//		});
		//}//		.then(function (response) {
		//			console.log(response);
		//		})

	}

	return (
		<div>
			<button type="button" className="btn btn-success"
							id="createchannel-button" /*onClick={createJoinChan}*/
							onClick={handleShow}
							data-toggle="modal" data-target="#exampleModalCenter"
						>Join channel</button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Join or create a channel 💌</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="channName">
							<Form.Label>Channel name</Form.Label>
							<Form.Control
								type="text"
								value={chanName}
								onChange={e => {chanNameSet(e.target.value)}}
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
								onChange={e => {chanPasswordSet(e.target.value)}}
								disabled={chanScope == "public" ? true : false}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="ligth" onClick={handleClose}>
						Close
					</Button>
					<Button variant="dark" type="submit" onClick={createChannel}>
						Send form
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
