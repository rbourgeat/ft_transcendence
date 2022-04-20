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
	action?: any,
	handleshow?: any,
	setExited?: any,
	setUpdate?: any,
	exited?: any
}
export default function CreateChan(props: CreateChanProps) {

	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [chanScope, chanScopeSet] = React.useState("public");
	const [chanName, chanNameSet] = React.useState("");
	const [chanPassword, chanPasswordSet] = React.useState("");
	//const [isFree, setIsFree] = React.useState("false");
	const [sucessfull, setSuccessfull] = React.useState(false);
	const [load, setLoad] = React.useState(false);

	const handleExit = () => {
		let toast = new ToastAlerts(null);

		console.log("it is successfull ? " + sucessfull);
		if (sucessfull == true)
		{
			//toast.notifySuccess("Successfully added");
			console.log("result will be " + !props.exited);
			//redirection crade pour recharger la page
			//window.top.location = "http://localhost:3030/channels";
			props.setExited(!props.exited);
		}
		else
		{

			toast.notifyDanger("Unsucessfull add");
			//props.setExited(!props.exited);
			//props.setUpdate(chanName);//pour trigger un update
		}
	}

	const handleSend = () => {
		//console.log("Creating channel");
		axios.defaults.withCredentials = true;

		//Check si la channel existe ou pas
		let url = "http://localhost:3000/api/chat/".concat(chanName).concat("/exist");

		let toast = new ToastAlerts(null);

		let load = false;
		let isFree = false;
		axios.get(url)
		.then(res => {
			console.log("Get checked if exist.");
			console.log(res);//si existe renvoie faux
			console.log(res.data);
			console.log(typeof res.data);
			isFree = res.data;
			load = true;
			if (res.data == true || res.data == "true")
			{
				//setIsFree("true");
				console.log("it is damn true !");
				console.log("result");
				console.log(isFree);
				console.log(load);
				//Ca ne rentre pas dans cette putin de condition
				if (isFree == true && load == true)
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
						toast.notifySuccess("✨ Successfully created channel !");
					})
					.catch((error) => {
						console.log("Catched error on post api chat.");
						console.log(error);
					})
				}
				else {
					console.log("here");
					}
				}
			//setIsFree(res.data);
			setLoad(true);
			//console.log("The name is free ? " + isFree);
			//si c'est libre, je crée la channel, sinon je la join
			//console.log(typeof isFree);

			//TODO: a reprendre
			//if (isFree == "false" && load == true)
			//{
			//	console.log("joining channel");
			//	let url = "http://localhost:3000/api/chat/join";
			//}
			//else if (load == false)
			//{
			//	//console.log("wrong type !")
			//	console.log(load);
			//	console.log(isFree);
			//	console.log("Not loaded !");
			//}

		})
		.catch((error) => {
			console.log("Error while getting exist");
		})
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
