import {Button, Modal, Form} from 'react-bootstrap';
import axios from 'axios';
import React, {useState} from "react";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import MyAxios from '../../Utils/Axios/Axios';
import "./CreateChan.scss";
import { ToastContainer } from 'react-toastify';

//TODO : a reprendre ?

export interface CreateChanProps {
	endpoint?: any,
	action?: any
	handleshow?: any
}
export default function CreateChan(props: CreateChanProps) {

	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [chanScope, chanScopeSet] = React.useState("public");
	const [chanName, chanNameSet] = React.useState("");
	const [chanPassword, chanPasswordSet] = React.useState("");
	const [isFree, setIsFree] = React.useState(false);
	const [sucessfull, setSuccessfull] = React.useState(false);

	const handleExit = () => {
		let toast = new ToastAlerts(null);
		//if (sucessfull == true)
		//{
		//	toast.notifySuccess("Successfully added");
		//}
		if (sucessfull == false)
		{
			toast.notifyDanger("Unsucessfull add");
		}
	}

	const handleSend = () => {
		//console.log("Creating channel");
		axios.defaults.withCredentials = true;

		//Check si la channel existe ou pas
		let url = "http://localhost:3000/api/chat/".concat(chanName).concat("/exist");

		let toast = new ToastAlerts(null);

		let res = axios.get(url)
		.then(res => {
			console.log("Get checked if exist.");
			console.log(res);//si existe renvoie faux
			console.log(res.data);
			setIsFree(res.data);
			console.log("The name is free ? " + isFree);
			//si c'est libre, je crée la channel, sinon je la join
			console.log(typeof isFree);
			if (isFree == true)
			{
				console.log("creating channel");
				url = "http://localhost:3000/api/chat/";

				let headers = {
					'Content-Type': 'application/json'
				}

				axios.defaults.baseURL = 'http://localhost:3000/api/';
				axios.defaults.headers.post['Content-Type'] = 'application/json';
				axios.defaults.headers.post['Accept'] = '*/*';
				axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
				axios.defaults.withCredentials = true;

				let body = {};

				if (chanScope === "private")
				{
					body = {
						password: chanPassword,
						public: false,
						name: chanName
					}
				}
				else
				{
					body = {
						public: true,
						name: chanName
					}
				}

				console.log("body is ");
				console.log(body);

				let res = axios.post(url, body, {headers})
				.then(res => {
					console.log("successfully posted a chat !");
					setSuccessfull(true);
					toast.notifySuccess("✨ Successfully created channel !")
				})
				.catch((error) => {
					console.log("Catched error on post api chat.");
					console.log(error);
				})
			}
			else if (isFree == false)
			{
				console.log("joining channel");
				url = "http://localhost:3000/api/chat/join";
			}
			else
			{
				console.log("wrong type !")
			}
		})
		.catch((error) => {
			console.log("Error while getting exist");
		})

		//créer ou join en fonction du résultat précédent
	}

	const createChannel = () => {
		//let toast = new ToastAlerts(null);
		//toast.notifyDanger("A revoir");
		//return ;

		let ax = new MyAxios(null);

		//if (chanScope === "public") {
		//	axios.post(endpoint, {
		//		"public": chanScope === "public" ? true : false,
		//		"name": chanName
		//	})
		//		.catch(function (error) {
		//			console.log(error);
		//		});
		//}
		//else {
		//	axios.post(endpoint, {
		//		"password": chanPassword,
		//		"public": chanScope === "public" ? true : false,
		//		"name": chanName
		//	})
		//		.then(function (response) {
		//			console.log(response);
		//		})
		//		.catch(function (error) {
		//			console.log(error);
		//		});
		//}//		.then(function (response) {
		//			console.log(response);
		//		})

	}


	return (
		<div>
			<button type="button" className="btn btn-success"
							id="createchan-button" /*onClick={createJoinChan}*/
							onClick={handleShow}
							data-toggle="modal" data-target="#exampleModalCenter"
						>New channel</button>
			<Modal show={show} animation={true} onHide={handleClose} onExited={handleExit}>
				<Modal.Header closeButton>
					<Modal.Title id="create_title">Join or create a channel 💌</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="channName">
							<Form.Label>Channel name</Form.Label>
							<Form.Control
								type="text"
								value={chanName}
								onChange={e => {chanNameSet(e.target.value)}}
								autoFocus
								placeholder="my_unique_chanName"
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Choose policy</Form.Label>
							<Form.Select aria-label="Channel visibility" onChange={e => chanScopeSet(e.target.value)} defaultValue="public">
								<option value="public">public</option>
								<option value="private">private</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className="mb-3" controlId="channPassword">
							<Form.Label>Channel password</Form.Label>
							<Form.Control
								type="password"
								value={chanPassword}
								onChange={e => {chanPasswordSet(e.target.value)}}
								disabled={chanScope == "public" ? true : false}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="ligth" onClick={handleClose}>
						Close
					</Button>
					<Button variant="dark" type="submit" onClick={handleSend}>
						Send form
					</Button>
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
                pauseOnHover
			/>
		</div>
	);
}
