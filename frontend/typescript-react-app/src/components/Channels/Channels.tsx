import './Channels.scss';
import Nav from '../Nav/Nav';
import TypingMessage from "./TypingMessage/TypingMessage";
import ListDiscussions from "./ListDiscussions/ListDiscussions";
import ListParticipant from './ListParticipant/ListParticipant';
import CreateChan from './CreateChan/CreateChan';
import React, {useState, useEffect} from "react";
import MyAxios from '../Utils/Axios/Axios';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
import { ToastContainer, toast } from 'react-toastify';
import { io } from "socket.io-client";
import ListChannels from './ListChannels/ListChannels';
//import React, {useState, useEffect} from "react";


/**
 * @malatini ou @macrespo
 * Page principale pour afficher les channels, voir les sous composants
 */
interface ChatProps {
	username?: string
}

export default function Channels(props: ChatProps) {
	const calledOnce = React.useRef(false);

	function createChat()
	{
		let ax = new MyAxios(null);
		let res = ax.post_api_chat("channel1", true, "password");
	}

	function listChats()
	{
		let ax = new MyAxios(null);
		let res = ax.get_api_chat();
	}

	useEffect(() => {
        if (calledOnce.current) {
			return;}
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
				<div className="chat-container text-center">
					<div className="chat-channel-menu">
						<CreateChan endpoint="http://localhost:3000/api/chat" action="Create" />
						<CreateChan endpoint="http://localhost:3000/api/chat/join" action="Join" />
						<ListChannels />
					</div>
					<div className="chat--messages">
						<ListDiscussions />
						<TypingMessage />
					</div>
					<ListParticipant />
				</div>
			</div>
		</div>
	);
}
