import {Button, Modal, Form} from 'react-bootstrap';
import axios from 'axios';
import React, {useState} from "react";


export default function CreateChan({endpoint, action}) {

	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [chanScope, chanScopeSet] = React.useState("public");
	const [chanName, chanNameSet] = React.useState("");
	const [chanPassword, chanPasswordSet] = React.useState("");

	const createChannel = () => {
		if (chanScope === "public") {
			axios.post(endpoint, {
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
			axios.post(endpoint, {
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
		<div>
			<Button variant="secondary" onClick={handleShow}>{action} channel</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{action} a new channel</Modal.Title>
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
						{action} 
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
