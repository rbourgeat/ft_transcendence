import './Channels.scss';
import Nav from '../Nav/Nav';
import TypingMessage from "./TypingMessage/TypingMessage";
import ListDiscussions from "./ListDiscussions/ListDiscussions";
import ListParticipant from './ListParticipant/ListParticipant';
import CreateChan from './CreateChan/CreateChan';
import React, { useState, useEffect } from "react";
import MyAxios from '../Utils/Axios/Axios';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
import { ToastContainer, toast } from 'react-toastify';
import { io } from "socket.io-client";
import ListChannels from './ListChannels/ListChannels';
//import ListPubChannels from './ListChannels/ListPubChannels';
import axios from 'axios';

interface ChatProps {
	username?: string
}

export default function Channels(props: ChatProps) {
	const calledOnce = React.useRef(false);
	const [chanUsers, updateChanUsers] = React.useState([]);
	const [username, setUsername] = React.useState("");

	const [activeChannelId, setActiveChannelID] = React.useState("");//Va permettre de transmettre l'id de l'active channel
	const [activeChannelName, setActiveChannelName] = React.useState("");//Va permettre de transmettre le name de l'active channel

	//TODO: rbourgea : reprendre partie socket
	//const [socket, setSocket] = React.useState(io("http://localhost:3000/chat", { query: { username: username } }));
	/*
	let socket = io("http://localhost:3000/chat", { query: { username: username } });
	setSocket(socket);
	*/

	useEffect(() => {

		async function getUser() {
			let url = "http://localhost:3000/api/auth/";
			let username = "";
			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
			axios.defaults.withCredentials = true;
			await axios.get(url)
				.then(res => {
					username = res.data.login;
				})
				.catch((err) => {
					console.log("Error while getting api auth");
				})
		}
		getUser();
		if (calledOnce.current) {
			return;
		}
		setActiveChannelID("1");
		setActiveChannelName("DummyChannel");
		calledOnce.current = true;
	}, []);

	useEffect(() => {
		console.log("Parent composant Channels saw child update active channel");
		console.log("Activate channel name is " + activeChannelName);
	}, [activeChannelName, activeChannelId]);

	return (
		<div id="channels">
			<Nav />
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
			<div className="container">
				<div className="row" id="row_chat">
					<ListChannels setActiveChannelName={setActiveChannelName} setActiveChannelID={setActiveChannelID}/>
					<ListDiscussions setActiveChannelName={setActiveChannelName} setActiveChannelID={setActiveChannelID}/>
					<ListParticipant setActiveChannelName={setActiveChannelName} setActiveChannelID={setActiveChannelID}/>
		</div>
	</div>
</div>
	);
}

//<ListParticipant activeChannel={activeChannel} />
