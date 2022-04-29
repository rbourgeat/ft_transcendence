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
	const [username, setUsername] = React.useState("");
	const [load, setLoad] = React.useState(false);
	const [isChan, setIsChan] = React.useState(true);
	const [hasPass, setHasPass] = React.useState(false);
	const [activeID, setActiveID] = React.useState("");
	const [activeName, setActiveName] = React.useState("");


	/*async*/ function getUser() {
		let url = "http://localhost:3000/api/auth/";
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;
		/*await*/
		axios.get(url)
			.then(res => {
				setUsername(res.data.login);
			})
			.catch((err) => {
				//console.log("Error while getting api auth");
				;
			})
		setLoad(true);
	}

	useEffect(() => {
		getUser();
	}, [username]);

	useEffect(() => {
	}, [activeName]);

	return (
		<div id="channels">
			<Nav />
			<div className="container">
				<div className="row" id="row_chat">
					{load === true ?
						<ListChannels
							login={username}
							setIsChan={setIsChan}
							setHasPass={setHasPass}
							setActiveID={setActiveID}
							setActiveName={setActiveName} />
						: ""}
					{load === true ?
						<ListDiscussions
							login={username}
							isChan={isChan}
							activeID={activeID}
							activeName={activeName} />
						: ""}
					{load === true ?
						<ListParticipant
							login={username}
							isChan={isChan}
							hasPass={hasPass}
							setHasPass={setHasPass}
							activeID={activeID}
							activeName={activeName} />
						: ""}
				</div>
			</div>
		</div>
	);
}
