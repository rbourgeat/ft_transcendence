import './Channels.scss';
import Nav from '../Nav/Nav';
import TypingMessage from "./TypingMessage/TypingMessage";
import ListDiscussions from "./ListDiscussions/ListDiscussions";
import ListParticipant from './ListParticipant/ListParticipant';
import ListChannels from './ListChannels/ListChannels';
import CreateChan from './CreateChan/CreateChan';
import React, {useState, useEffect} from "react";
import MyAxios from '../Utils/Axios/Axios';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
import { ToastContainer, toast } from 'react-toastify';
import { io } from "socket.io-client";
import ListPubChannels from './ListChannels/ListPubChannels';
import axios from "axios";

interface ChatProps {
	username?: string
}

export default function Channels(props: ChatProps) {
	const calledOnce = React.useRef(false);
	let log = localStorage.getItem("loggedIn");
	const [loaded, setLoaded] = React.useState(false);
	const [activeChannel, updateActiveChannel] = React.useState(0);
	const [chanUsers, updateChanUsers] = React.useState([]);
	const [authorized, setAuthorized] = React.useState(false);

	async function getUser() {

		//setLogged(log == "true" ? true : false);

		let url = "http://localhost:3000/api/auth/";

		axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post['Accept'] = '*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;

		let username = "";
		axios.get(url)
			.then(res => {
				username = res.data.login;
				console.log(res);
				setAuthorized(true);
				setLoaded(true);
				//setUsername(username);
			})
			.catch((err) => {
				console.log("Auth returned 400 -> missing cookie");
				setAuthorized(false);
			})
	}


	useEffect(() => {
        if (calledOnce.current) {
			return;}
		getUser();
        calledOnce.current = true;
	}, []);



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
			<div className="container" id="chat--container">
			{
				authorized == false ?
				<>
					{/* TODO: ajouter un spinner pour que ca ne s'affiche pas quand la page load */}
					<p className="not-authenticated">You are not properly authenticated.</p>
				</>
				:
				localStorage.getItem("loggedIn") != "true" && authorized == true?
						<div className="row d-flex justify-content-center text-center">
							<div className="col-9">
								<div className="channels-not-logged">
									<p>You are either not logged in or properly authenticated (cookie).</p>
								</div>
							</div>
						</div>
						:
						<div className="chat-container text-center">
							<div className="chat-channel-menu">
								<CreateChan endpoint="http://localhost:3000/api/chat" action="Create" />
								<CreateChan endpoint="http://localhost:3000/api/chat/join" action="Join" />
								{/* PB DE MERGE ? */}
								{/*<ListChannels activeChannel={activeChannel} updateActiveChannel={updateActiveChannel}/>*/}
								<ListPubChannels />
							</div>
							<div className="chat--messages">
								{/*<ListDiscussions activeChannel={activeChannel}/>*/}
								{/* pb de compil */}
								<ListDiscussions activeChannel="0"/>
								<TypingMessage />
							</div>
						{/*<ListParticipant />*/}
					</div>
			}

			</div>
		</div>
	);
}
