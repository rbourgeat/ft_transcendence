import React, { Component, useState, useEffect } from "react";
import ToastAlerts from "../../Utils/ToastAlerts/ToastAlerts";
import { ToastContainer, toast } from 'react-toastify';
import myAxios from "../../Utils/Axios/Axios";
import "./editUsername.scss";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

let url_begin = "";
if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
	url_begin = "http://localhost";
else
	url_begin = "http://".concat(process.env.REACT_APP_IP);

export interface EditUsernameModalProps {
	username?: string,
	setUsername?: any,
	exited?: any,
}

export default function EditUsernameModal(props: EditUsernameModalProps) {
	const [inputValue, setInputValue] = React.useState("");
	const [sucessfull, setSuccessfull] = React.useState(false);
	const [show, setShow] = React.useState(false);

	function clearInput() {
		setInputValue("");
	}

	function handleInputChange(event) {
		setInputValue(event.target.value);
	}

	let changeUsername = (event: any) => {
		event.preventDefault();
		setSuccessfull(true);
		let url = url_begin.concat(":3000/api/user/").concat(props.username).concat("/changeto/").concat(inputValue);

		axios.defaults.baseURL = url_begin.concat(':3000/api/');
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

		let headers = {
			login: inputValue
		}

		let toast = new ToastAlerts(null);

		axios.patch(url, { headers })
			.then(res => {
				toast.notifySuccess("✨ Successfully updated username");
				localStorage.setItem("login", inputValue);
				props.setUsername(inputValue)
			})
			.catch((error) => {
				toast.notifySuccess("😢 Error while updating username");;
			})
		handleClose();
	}

	const handleClose = () => {
		setInputValue("");
		setShow(false);
	}

	const handleExit = () => {
		setShow(false);
	}

	const handleShow = () => {
		setShow(true);
	}


	return (
		<div id="modal--create--channel">
			<button type="button"
				id="change--username"
				className="btn btn-outline-dark"
				//id="joinchan-button"
				onClick={handleShow}
				data-toggle="modal"
				data-target="#exampleModalCenter">Changer username
			</button>
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				onHide={handleClose}
				centered
				onExited={handleExit}
				show={show}
				animation={true}
			>
				<Modal.Header closeButton >
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
							value={inputValue}
							onChange={handleInputChange}
						/>
						<Button variant="success" onClick={changeUsername}>Save</Button>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light"
						onClick={handleExit}
					>Close</Button>
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
				pauseOnHover />
		</div>)
}
