import React, {Component, useState, useEffect} from "react";
import Nav from "../../Nav/Nav"
import {Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter, Button, Row, Col, Form} from "react-bootstrap"
import ToastAlerts from "../../Utils/ToastAlerts/ToastAlerts";
import { ToastContainer, toast } from 'react-toastify';
import myAxios from "../../Utils/Axios/Axios";

export default function EditUsernameModal(props) {

	//TODO: revoir l'indentation
	//TODO: faire en sorte que le component soit toujours créé avec les props du user

	//input pour le username
	const [inputValue, setInputValue] = React.useState("");

	//Equivalent component did mount
	useEffect(() => {
		// Met à jour le titre du document via l’API du navigateur
		let ax = new myAxios(null);
		let url = "http://localhost:3000/api/user";

		//ax.get_api_user();
	}, []);

	function clearInput() {
        setInputValue("");
    }

	function handleInputChange(event) {
        setInputValue(event.target.value);
    }

	let changeUsername = (event: any) => {
		console.log("Button clicked");
		event.preventDefault();
		let ax = new myAxios(null);
		console.log("Old username is " + props.username);
		console.log("New username is " + inputValue);
		let res = ax.patch_user(props.username, inputValue);
		window.top.location = "http://localhost:3030/user";
	}

		return (
			<div id="modal--create--channel">
				<Modal
					{...props}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Edit username
					</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div id="create--channel--div">
							<label>Choose your new username</label>
							<input
								className="form-control"
								type="text"
								placeholder="choose your new username"
								value={ inputValue }
								onChange={ handleInputChange }
								/>
							<Button variant="success" onClick={changeUsername}>Save</Button>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={props.onHide}>Close</Button>
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
					pauseOnHover/>
			</div>)
}
