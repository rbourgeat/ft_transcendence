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

			//toast.notifyDanger("Unsucessfull add");
			console.log("Did not add anything")
			//props.setExited(!props.exited);
			//props.setUpdate(chanName);//pour trigger un update
		}
		chanNameSet("");
		chanScopeSet("public");
		chanPasswordSet("");
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
			//console.log("Get checked if exist.");
			console.log(res);//si existe renvoie faux
			console.log(res.data);
			console.log(typeof res.data);
			isFree = res.data;
			load = true;

			axios.defaults.baseURL = 'http://localhost:3000/api/';
			axios.defaults.headers.post['Content-Type'] = 'application/json';
			axios.defaults.headers.post['Accept'] = '*/*';
			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
			axios.defaults.withCredentials = true;

			let headers = {
				'Content-Type': 'application/json'
			}

			let body = {};

			if (res.data == true || res.data == "true")
			{
				//setIsFree("true");
				//console.log("it is damn true !");
				//console.log("result");
				//console.log(isFree);
				//console.log(load);

				//Ca ne rentre pas dans cette putin de condition
				if (isFree == true && load == true)
				{
					//console.log("creating channel");
					url = "http://localhost:3000/api/chat/";

					if (chanScope === "private")
					{
						body = {
							password: chanPassword,
							public: false,
							name: chanName
						}
					}
					else {
						body = {
							public: true,
							name: chanName
						}
					}

					let res = axios.post(url, body, {headers})
					.then(res => {
						console.log("successfully created a chat !");
						setSuccessfull(true);
						toast.notifySuccess("✨ Successfully created channel !");
					})
					.catch((error) => {
						console.log("Catched error on post api chat.");
						console.log(error);
					})
				//}
				}
			}
			else if (res.data == false || res.data == "false")
			{
				//console.log("here");
				//toast.notifySuccess("here");
				//console.log("joining channel");
				let url = "http://localhost:3000/api/chat/join";

				if (chanScope === "private")
					{
						body = {
							password: chanPassword,
							public: false,
							name: chanName
						}
					}
					else {
						body = {
							public: true,
							name: chanName
						}
					}

				let res = axios.post(url, body, {headers})
					.then(res => {
						//console.log("successfully joined a chat !");
						console.log(res);
						if (res.data.statusCode != 400 || res.data.statusCode != 401)
						{
							toast.notifySuccess("✨ Successfully joined channel !");
							setSuccessfull(true);
						}
						else
						{
							toast.notifyDanger("Error while joining ! Name or password maybe wrong");
							setSuccessfull(false);
						}
					})
					.catch((error) => {
						console.log("Catched error while joining channel");
						console.log(error);
					})
			}})
		.catch((error) => {console.log(error)})
	}

	return (
		<div id="create-chan_div">
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
