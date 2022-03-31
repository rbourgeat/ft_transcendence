import React, {Component} from "react";
import Nav from "../../Nav/Nav"
import {Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter, Button, Row, Col, Form} from "react-bootstrap"

export default function EditUsernameModal(props) {
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
							<label>edit username</label>
							<input
								className="form-control"
								type="text"
								placeholder="choose your new username"/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={props.onHide}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>)
}
