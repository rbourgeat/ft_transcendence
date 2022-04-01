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
					size="m"
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
							<div id="public--policy">
								{/*<label className="modal--label" id="policy--title">Choose public policy</label>*/}
								{/*<br />*/}
								{/*<p id="text">Choose protected if you want a public channel protected by a password</p>*/}
								<select className="form-select form-select-sm" aria-label="form-select-sm" id="policy--select">
									{/*<option value="">Select policy</option>*/}
									<option value="public" selected>Public</option>
									<option value="private">Private</option>
									<option value="protected">Protected</option>
								</select>
							</div>
							<br />
							{/* Faire une condition si protected a été sélectionné */}
							<label className="modal--label">Password</label>
							<input
								className="form-control"
								type="text"
								placeholder="Password"
								disabled
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
