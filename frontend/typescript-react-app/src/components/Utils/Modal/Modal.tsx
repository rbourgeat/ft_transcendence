import React, {Component} from "react";
import Nav from "../../Nav/Nav"
import {Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter, Button, Row, Col, Form} from "react-bootstrap"

/*
interface CreateChanProps {
}

interface CreateChanState {
	name?: string,
	public?: boolean,
	password?: string
}
*/

//export default function CreateChanModal(props)
//class CreateChanModal extends React.Component<CreateChanProps, CreateChanState>

export default function CreateChanModal(props) {
	//constructor(props: CreateChanProps)
	//{
	//	super(props);

	//	this.state = {
	//		name: "",
	//		password: "",
	//		public: true
	//	}
	//}

	//resetForm = function() {
	//	this.setState({
	//		name: '',
	//		password: '',
	//		public: true
	//	})
	//}

	//submit=(event: any) =>
	//{
	//	event.preventDefault();
	//	console.log("Use the post method axios...");
	//	//...
	//	this.resetForm();
	//}

	//render() {
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
						Create new channel
					</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div id="create--channel--div">
							<label className="modal--label">Channel name</label>
							<input
								className="form-control"
								type="text"
								placeholder="unique channel name"
								/*value={this.state.email}*/
								/*onChange={(e)=>{this.setState({email: e.target.value})}}*/
							/>
							<label className="modal--label">Choose public policy</label>
							<select className="form-select" aria-label="Choose public policy">
								<option value="">Select policy</option>
								<option value="public">Public</option>
								<option value="private">Private</option>
								<option value="protected">Protected (public with password)</option>
							</select>
							{/* Faire une condition si protected a été sélectionné */}
							<label className="modal--label">Password</label>
							<input
								className="form-control"
								type="text"
								placeholder="Password"
								/*value={this.state.email}*/
								/*onChange={(e)=>{this.setState({email: e.target.value})}}*/
							/>
						</div>
						<Button variant="success"/*onClick={}*/>Create</Button>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={props.onHide} variant="light">Close</Button>
					</Modal.Footer>
				</Modal>
			</div>)
		//	);
	//}
}
//export default CreateChanModal;
