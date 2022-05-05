import './ListDiscussions.scss';
import React, { useEffect } from "react";
import axios from 'axios';
import TypingMessage from "../TypingMessage/TypingMessage";

let url_begin = "";
if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
	url_begin = "http://localhost";
else
	url_begin = "http://".concat(process.env.REACT_APP_IP);

export interface ListDiscussionsProps {
	login: string,
	isChan?: any,
	activeID?: string,
	activeName?: string,
	socket?: any,
	hide?: boolean
	isBanned?: boolean
	setIsBanned?: any
}

export default function ListDiscussions(props: ListDiscussionsProps) {
	const [sockChan, setsockChan] = React.useState(props.activeName);
	const [messages, setMessages] = React.useState([]);
	const [oldMessages, setOldMessages] = React.useState([]);

	useEffect(() => {
		console.log(props.activeName + ": activename atm")
		setsockChan(props.activeName);
		props.socket.emit('requestAllMessages', props.activeID);
		props.socket.on("sendAllMessages", (messagesUpdated) => {
			if (messagesUpdated)
				setMessages(messagesUpdated);
			else
				setMessages(null)
		});
	}, [props.activeID, props.activeName]);

	props.socket.on("refreshMessages", (...args) => {
		let b = args[1].split('_');
		if (b[0] == "direct") {
			props.socket.emit('getUsersLogins', b[1] + ":" + b[2]);
			props.socket.on("receiveLogins", (...args2) => {
				if (args2[1] == props.activeName) {
					setMessages(args[0]);
					setsockChan(args2[1]);
				}
				else if (args2[0] == props.activeName) {
					setMessages(args[0]);
					setsockChan(args2[0]);
				}
				return;
			})
		}
		//console.log("gonna refresh the chat (backname) of:" + args[1] + ", but name in front is:" + props.activeName)
		setOldMessages(messages);
		if (args[1] == props.activeName && (props.activeName != "" || props.activeName != undefined || props.activeName != null)) {
			setMessages(args[0]);
			setsockChan(args[1]);
		}

	});

	props.socket.on('isBan', (...args) => {
		if (props.login == args[0] && args[1] == true)
			props.setIsBanned(true)
		else if (props.login == args[0] && args[1] == false)
			props.setIsBanned(false)
	});

	function checkisBanned() {
		if (props.activeID != "" && props.activeID != undefined && props.activeID != null) {
			let url = url_begin.concat(":3000/api/chat/isBannedIn/").concat(props.activeID);
			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
			axios.defaults.withCredentials = true;
			axios.get(url)
				.then(res => {
					if (res.data == false) {
						props.setIsBanned(false);
					}
					else if (res.data == true) {
						props.setIsBanned(true);
					}
				})
				.catch((error) => {
				})
		}
	}

	//TODO BLOCK DM IF U BLOCKED USER
	const [isBlocked, setIsBlocked] = React.useState(false);

	function checkisBlocked() {
		if (props.activeID != "" && props.activeID != undefined && props.activeID != null) {
			let url = url_begin.concat(":3000/api/user/relation/me/allBlocked");
			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
			axios.defaults.withCredentials = true;
			axios.get(url)
				.then(res => {
					/*
					*/
				})
				.catch((error) => {
				})
		}
	}

	useEffect(() => {
		console.log(props.activeName + ": activename atm")
		checkisBanned();
		checkisBlocked();
	}, [props.activeID, props.activeName]);

	return (
		<div id="ListDiscussions" className="col-md-5">
			{/* <div className="title_chat_div">
				{
					props.hide === false ?
						props.activeName ?
							<p className="chat--title">{props.activeName.startsWith("direct") ? "DM" : props.activeName}</p>
							:
							null
						:
						null
				}
			</div> */}
			<div className="messages-zone">
				<ul className="text text_ul">
					{
						props.isBanned === true ?
							null
							:
							props.hide === false ?
								props.activeName === sockChan ?
									messages.map(message =>
										<div id="author" className={message.author.login === props.login ? "from-me" : "from-them"} key={message.id}>
											{message.author.login}
											<li id="message" key={message.id} className={message.author.login === props.login ? "my-messages" : ""}>
												{message.content}
											</li>
											<br />
										</div>
									)
									:
									oldMessages.map(message =>
										<div id="author" className={message.author.login === props.login ? "from-me" : "from-them"} key={message.id}>
											{message.author.login}
											<li id="message" key={message.id} className={message.author.login === props.login ? "my-messages" : ""}>
												{message.content}
											</li>
											<br />
										</div>
									)
								:
								null
					}
				</ul>
			</div>
			{
				props.hide === true ?
					""
					:
					props.isBanned === true ?
						<div>BAN</div>
						:
						< TypingMessage
							sockChan={sockChan}
							socket={props.socket}
							login={props.login}
							channel={props.activeName}
							id={props.activeID}
							activeName={props.activeName}
							isChan={props.isChan}
							chanId={props.activeID}
						/>
			}

		</div>
	);
}
