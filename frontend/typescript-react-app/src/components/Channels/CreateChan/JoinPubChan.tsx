import {Button, Modal, Form} from 'react-bootstrap';
import axios from 'axios';
import React, {useState, useEffect, useRef} from "react";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import MyAxios from '../../Utils/Axios/Axios';
import { ToastContainer } from 'react-toastify';
import "./JoinPubChan.scss";

export interface JoinChanProps {
	endpoint?: any,
	action?: any,
	handleshow?: any,
	setExited?: any,
	setUpdate?: any,
	exited?: any
}
export default function JoinChan(props: JoinChanProps) {
	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	

	//const [chanScope, chanScopeSet] = React.useState("public");
	const [chanName, chanNameSet] = React.useState("");
	const [chanPassword, chanPasswordSet] = React.useState("");
	const [sucessfull, setSuccessfull] = React.useState(false);
	const [joignable, setJoignable] = React.useState([]);
	const [load, setLoad] = React.useState(false);
	const calledOnce = React.useRef(false);

	const handleExit = () => {
		let toast = new ToastAlerts(null);

		console.log("it is successfull ? " + sucessfull);
		if (sucessfull == true)
		{
			console.log("result will be " + !props.exited);
			props.setExited(!props.exited);
		}
		else
		{
			console.log("Did not add anything")
		}

		chanNameSet("");
		//chanScopeSet("public");
		chanPasswordSet("");
		setJoignable([]);
	}

	const handleSend = () => {
		axios.defaults.withCredentials = true;

		return ;

		//Check si la channel existe ou pas
		let url = "http://localhost:3000/api/chat/".concat(chanName).concat("/exist");

		let toast = new ToastAlerts(null);

		let load = false;
		let isFree = false;

		//TODO: a reprendre 

		axios.get(url)
		.then(res => {
			console.log(res);//si existe renvoie faux
			console.log(res.data);
			console.log(typeof res.data);
			isFree = res.data;
			load = true;

			if (isFree == false)
			{
				toast.notifyDanger("This channel already exists.");
				//handleClose();
				return ;
			}

			axios.defaults.baseURL = 'http://localhost:3000/api/';
			axios.defaults.headers.post['Content-Type'] = 'application/json';
			axios.defaults.headers.post['Accept'] = '*/*';
			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
			axios.defaults.withCredentials = true;

		})

		return ;
	}

	const handleShow = () => {
		//setShow(true);
		getJoignableChans();
		setShow(true);
		//console.log("joignable len is " + joignable.length);
	}


	function getJoignableChans()
	{
		console.log("Getting all joinable chans");

		let url = "http://localhost:3000/api/chat/joinableChannels";

		axios.get(url)
		.then((res) => {
			console.log("Successfully got joinable channels");
			console.log(res);
			console.log(res.data);
			let joignable = res.data;
			let len = joignable.length;
			let i = 0;
			while (i < len)
			{
				setJoignable(prevArray => [...prevArray, joignable[i]]);
				i++;
			}
			console.log("joignable are " + joignable);
			console.log("joignable len is " + joignable.length);
			setLoad(true);

		})
		.catch((error) => {
			console.log("Catched error while getting joignable.");
		})
	}


	//useEffect(() => {
	//	if (calledOnce.current) {
	//		return;
	//	}
	//	//getUser();
	//	getJoignableChans();
	//	calledOnce.current = true;
	//}, []);


	return (
		<div id="create-chan_div">
			<button type="button" className="btn btn-secondary"
							id="joinchan-button"
							onClick={handleShow}
							data-toggle="modal" data-target="#exampleModalCenter"
						>Join public channel</button>
			<Modal show={show} animation={true} onHide={handleClose} onExited={handleExit}>
				<Modal.Header closeButton>
					<Modal.Title id="create_title">Join a channel 💌</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Modal.Title id="list_title">List of public channels : </Modal.Title>
						<br />
					<ul className="wrapper list-group list-group-horizontal-lg">
					{load == true ?
								joignable.map(join =>
									<div key={join} className="joignable_chans">
										<button disabled className="btn btn-light joignable">{join.name}</button>
										{/*<p>{join.name}</p>*/}
									</div>
								)
								: ""}
					</ul>
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
