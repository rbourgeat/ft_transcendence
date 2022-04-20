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
import axios from 'axios';

interface ChatProps {
	username?: string
}

export default function Channels(props: ChatProps) {
	const calledOnce = React.useRef(false);
	const [chanUsers, updateChanUsers] = React.useState([]);
	const [username, setUsername] = React.useState("");
	const [user, setUser] = React.useState();
	const [load, setLoad] = React.useState(false);

	//Pour la selection des chans et DMs sur les 3 colonnes de la page
	const [activeChannelId, setActiveChannelID] = React.useState("");//Va permettre de transmettre l'id de l'active channel
	const [activeChannelName, setActiveChannelName] = React.useState("");//Va permettre de transmettre le name de l'active channel
	const [activeDMName, setActiveDMName] = React.useState("");
	const [activeDMID, setActiveDMID] = React.useState("");
	const [isDM, setIsDM] = React.useState("false");
	const [isChan, setIsChan] = React.useState("true");

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
					setUser(res.data);
				})
				.catch((err) => {
					console.log("Error while getting api auth");
				})
			setLoad(true);
		}
		getUser();
		if (calledOnce.current) {
			return;
		}
		setActiveChannelID("1");
		setActiveChannelName("DummyChannel");
		calledOnce.current = true;
	}, []);

	//TODO @malatini : a revoir
	useEffect(() => {
		console.log("use effect called")
	}, [activeChannelName]);

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
					{/* Ces props permettent à tous ces childs components de savoir la channel sélectionnée */}
					{load == true ? <ListChannels login={username}
						setActiveChannelName={setActiveChannelName} setActiveChannelID={setActiveChannelID}
						setActiveDMName={setActiveDMName} setActiveDMID={setActiveDMID}
						setIsDM={setIsDM} setIsChan={setIsChan}
					/>
					: ""}
					{/* Attention ici est-ce qu'on veut les setters ou simplement les variables ? */}
					{load == true ? <ListDiscussions login={username}
										//setActiveChannelName={setActiveChannelName} setActiveChannelID={setActiveChannelID}
										//setActiveDMName={setActiveDMName} setActiveDMID={setActiveDMID}
										activeChannelName={activeChannelName} activeChannelId={activeChannelId}
										activeDMName={activeDMName} activeDMId={activeDMID}
										isDM={isDM} isChan={isChan}/>
						: ""}
					{load == true ? <ListParticipant login={username}
									//setActiveChannelName={setActiveChannelName} setActiveChannelID={setActiveChannelID}
									//setActiveDMName={setActiveDMName} setActiveDMID={setActiveDMID}
									//setIsDM={setIsDM} setIsChan={setIsChan}
									activeChannelName={activeChannelName} activeChannelId={activeChannelId}
									activeDMName={activeDMName} activeDMId={activeDMID}
									isDM={isDM} isChan={isChan}
					/>
						: ""}
				</div>
			</div>
		</div>
	);
}

//<ListParticipant activeChannel={activeChannel} />
