import './Channels.scss';
import Nav from '../Nav/Nav';
import TypingMessage from "./TypingMessage/TypingMessage";
import ListDiscussions from "./ListDiscussions/ListDiscussions";
import ListParticipant from './ListParticipant/ListParticipant';
import CreateChan from './CreateChan/CreateChan';
import React, { useState, useEffect } from "react";
import MyAxios from '../Utils/Axios/Axios';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
//import ListParticipant from './ListParticipant/ListParticipant';
import { ToastContainer, toast } from 'react-toastify';
import { io } from "socket.io-client";
import ListChannels from './ListChannels/ListChannels'; import ListPubChannels from './ListChannels/ListPubChannels'; import axios from 'axios';
interface ChatProps {
	username?: string
}

export default function Channels(props: ChatProps) {
	const calledOnce = React.useRef(false);
	const [username, setUsername] = React.useState("");
	const [socket, setSocket] = React.useState(io("http://localhost:3000/chat", { query: { username: username } }));

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
		calledOnce.current = true;
	}, []);

	const [activeChannel, updateActiveChannel] = React.useState(1);
	const [chanUsers, updateChanUsers] = React.useState([]);

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
					{/*<div>*/}
						{/*<div className="chat-channel-menu">*/}
							{/*TODO: A reprendre */}
							{/*<CreateChan endpoint="http://localhost:3000/api/chat" action="Create" />*/}
							{/*<CreateChan endpoint="http://localhost:3000/api/chat/join" action="Join" />*/}
							{/*<ListChannels
								activeChannel={activeChannel}
								updateActiveChannel={updateActiveChannel}
								chanUsers={chanUsers}
								updateChanUsers={updateChanUsers}
							/>*/}
								<ListChannels />
							{/* Devrait pourvoir lister tous les channels dont on fait partie */}
							{/*<ListPubChannels />*/}
						{/*</div>*/}
								{/*<div className="chat--messages">*/}
							{/*<ListDiscussions activeChannel={activeChannel} username={username} socket={socket} />*/}
								<ListDiscussions />
							{/*</div>*/}
							{/*<div className="players">*/}
								<ListParticipant />
							{/*</div>*/}
						{/*</div>*/}
					{/*</div>*/}
				{/*</div>*/}
			{/*</div>*/}
		{/*</div>*/}
	{/*</div>*/}
		</div>
	</div>
</div>
	);
}

//<ListParticipant activeChannel={activeChannel} />
