import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import React from "react";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import "./CreateDM.scss";

export interface CreateDMProps {
	endpoint?: any,
	action?: any
	handleshow?: any,
	setExited?: any,
	setUpdate?: any,
	exited?: any
}
export default function CreateDM(props: CreateDMProps) {

	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [receiver, setReceiver] = React.useState("");
	const [sucessfull, setSuccessfull] = React.useState(false);

	const handleExit = () => {
		if (sucessfull == true) {
			props.setExited(!props.exited);
		}
		setReceiver("");
	}

	const createDM = () => {
		let toast = new ToastAlerts(null);

		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/chat/".concat(receiver).concat("/direct");
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/chat/").concat(receiver).concat("/direct");

		axios.post(url)
			.then(res => {
				setSuccessfull(true);
				toast.notifySuccess("🥰 Successfully created DM conv!");
				handleClose();
			})
			.catch((error) => {
				toast.notifyDanger("Error while creating conversation with " + receiver);
				handleClose();
				setSuccessfull(false);
			})
	}

	return (
		<div>
			<button type="button" className="btn"
				id="createdm-button"
				onClick={handleShow}
			>New DM</button>
			<Modal show={show} onHide={handleClose} animation={true} onExited={handleExit}>
				<Modal.Header>
					<Modal.Title>Create DM conversation 💌</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="channPassword">
							<Form.Label>Receiver</Form.Label>
							<Form.Control
								type="text"
								value={receiver}
								placeholder="bahaas"
								onChange={e => { setReceiver(e.target.value) }}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="dark" type="submit" onClick={createDM}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
