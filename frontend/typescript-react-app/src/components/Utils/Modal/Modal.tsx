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
							<label>Channel name</label>
							<input
								className="form-control"
								type="text"
								placeholder="choose a unique channel name"
								/*value={this.state.email}*/
								/*onChange={(e)=>{this.setState({email: e.target.value})}}*/ />
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={props.onHide}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>)
		//	);
	//}
}
//export default CreateChanModal;
