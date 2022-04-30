import React, {Component, useState, useEffect} from "react";
import ToastAlerts from "../../Utils/ToastAlerts/ToastAlerts";
import { ToastContainer, toast } from 'react-toastify';
import myAxios from "../../Utils/Axios/Axios";
import "./editUsername.scss";
import {Modal, Button} from "react-bootstrap";

export interface EditUsernameModalProps {
	username?: string,
	//setUsername?: any,
	//checkexited?: any,
	exited?: any,
	//setUpdate?: any
	//show?: any
}

export default function EditUsernameModal(props: EditUsernameModalProps)
{
	const [inputValue, setInputValue] = React.useState("");
	const [sucessfull, setSuccessfull] = React.useState(false);
	const [show, setShow] = React.useState(false);

	//const [show, setShow] = React.useState(false);
	//const handleShow = () => setShow(true);

	function clearInput() {
        setInputValue("");
    }

	function handleInputChange(event) {
        setInputValue(event.target.value);
    }

	let changeUsername = (event: any) => {
		event.preventDefault();
		let ax = new myAxios(null);
		setSuccessfull(true);
		//props.setUsername(inputValue);
		//props.username = inputValue;
		ax.patch_user(props.username, inputValue);
		handleClose();
	}

	const handleClose = () => {
		setInputValue("");
		setShow(false);
		//return false;
	}

	const handleExit = () => {
		//let toast = new ToastAlerts(null);
		//if (props.exited == true)
		//	props.exited = "false";
		//else
		//	props.exited = "true";
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
								value={ inputValue }
								onChange={ handleInputChange }
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
					pauseOnHover/>
			</div>)
}
