import './ListDiscussions.scss';
import SingleMessage from "./SingleMessage/SingleMessage";
import React, { Component, useState, useEffect } from "react";
import myAxios from "../../Utils/Axios/Axios";
import { io } from "socket.io-client";
import axios from 'axios';
import TypingMessage from "../TypingMessage/TypingMessage";
import MyAxios from '../../Utils/Axios/Axios';

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

		setsockChan(props.activeName);
		props.socket.emit('requestAllMessages', props.activeID);
		props.socket.on("sendAllMessages", (messagesUpdated) => {
			if (messagesUpdated) {
				setMessages(messagesUpdated);
				//console.log("refres h mssg")
			}
			else {
				console.log(" refresh mmsg set as null ;(")
				setMessages(null)
			}

		});
	}, [props.activeID]);

	props.socket.on("refreshMessages", (...args) => {

		let b = args[1].split('_');
		if (b[0] == "direct") {
			//console.log("we need to grep name of user based on the id");
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
				console.log("messages are refreshed");
				return;
			})
		}
		//console.log("gonna refresh the chat (backname) of:" + args[1] + ", but name in front is:" + props.activeName)
		setOldMessages(messages);
		if (args[1] == props.activeName && (props.activeName != "" || props.activeName != undefined || props.activeName != null)) {
			setMessages(args[0]);
			setsockChan(args[1]);
			//console.log(sockChan);
			//console.log("messages are refreshed");
		}

	});

	props.socket.on('isBan', (...args) => {
		if (props.login == args[0] && args[1] == true) {
			props.setIsBanned(true)
			console.log("set is ban to true")
		}
		else if (props.login == args[0] && args[1] == false) {
			props.setIsBanned(false)
			console.log("set is ban to false")
		}
	})

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

	useEffect(() => {
		checkisBanned();
	}, [props.activeID]);

	function renderImage(login: string, isUserProfile: boolean) {
		let ax = new MyAxios(null);
		let log42 = localStorage.getItem("login42");
		let haschanged = false;
		if (login != log42)
			haschanged = true;
		if (isUserProfile == false)
			haschanged = false;
		if (log42 != "" && log42 != null && log42 != undefined)
			return (ax.render_avatar(login, log42, haschanged));
		return (ax.render_avatar(login, "", haschanged));
	}

	return (
		<div id="ListDiscussions" className="col-md-5">
			<div className="title_chat_div">
				{
					props.hide === false ?
						<p className="chat--title">{props.activeName.startsWith("direct") ? "DM" : props.activeName}</p>
						:
						<p className="chat--title"></p>
				}
			</div>
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
