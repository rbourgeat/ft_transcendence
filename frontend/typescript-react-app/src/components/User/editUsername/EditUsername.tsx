import React, {Component, useState, useEffect} from "react";
//import Nav from "../../Nav/Nav"
import ToastAlerts from "../../Utils/ToastAlerts/ToastAlerts";
import { ToastContainer, toast } from 'react-toastify';
import myAxios from "../../Utils/Axios/Axios";
import "./editUsername.scss";
import {Modal, Button} from "react-bootstrap";

export default function EditUsernameModal(props) {
	const [inputValue, setInputValue] = React.useState("");

	useEffect(() => {
		let ax = new myAxios(null);
		let url = "http://localhost:3000/api/user";
	}, []);

	function clearInput() {
        setInputValue("");
    }

	function handleInputChange(event) {
        setInputValue(event.target.value);
    }

	let changeUsername = (event: any) => {
		event.preventDefault();
		let ax = new myAxios(null);
		let res = ax.patch_user(props.username, inputValue);
		window.top.location = "http://localhost:3030/user";
	}

		//TODO: a reprendre sans react bootstrap
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
