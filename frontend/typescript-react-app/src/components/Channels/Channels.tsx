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

interface ChatProps {
	username?: string
}

export default function Channels(props: ChatProps) {
	const calledOnce = React.useRef(false);


	useEffect(() => {
        if (calledOnce.current) {
			return;}
        calledOnce.current = true;
	}, []);

	const [activeChannel, updateActiveChannel] = React.useState(0);
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
			<div className="container" id="chat--container">
			{localStorage.getItem("loggedIn") != "true " ?
						<div className="row d-flex justify-content-center text-center">
							<div className="col-9">
								<div className="channels-not-logged">
									<p>You are not logged in.</p>
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
								<ListDiscussions activeChannel={activeChannel}/>
								<TypingMessage />
							</div>
						{/*<ListParticipant />*/}
					</div>
				}
			</div>
		</div>
	);
}
