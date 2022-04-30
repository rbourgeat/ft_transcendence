import './ListDiscussions.scss';
import SingleMessage from "./SingleMessage/SingleMessage";
import React, { Component, useState, useEffect } from "react";
import myAxios from "../../Utils/Axios/Axios";
import { io } from "socket.io-client";
import axios from 'axios';
import TypingMessage from "../TypingMessage/TypingMessage";
import MyAxios from '../../Utils/Axios/Axios';

export interface ListDiscussionsProps {
	login: string,
	isChan?: any,
	activeID?: string,
	activeName?: string,
	socket?: any
}

export default function ListDiscussions(props: ListDiscussionsProps) {
	const [sockChan, setsockChan] = React.useState(props.activeName);
	const [messages, setMessages] = React.useState([]);
	const [oldMessages, setOldMessages] = React.useState([]);

	useEffect(() => {

		setsockChan(props.activeName);

		//startLog();
		props.socket.emit('requestAllMessages', props.activeID);
		props.socket.on("sendAllMessages", (messagesUpdated) => {
			if (messagesUpdated) {
				setMessages(messagesUpdated);
				console.log("refresh mssg")
			}
			else {
				console.log(" refresh mmsg set as null ;(")
				setMessages(null)
			}

		});
	}, [props.activeID]);

	props.socket.on("refreshMessages", (...args) => {
		//console.log("before modif and after refresh call sockchan:" + sockChan);
		//console.log("before modif and after refresh call activename:" + props.activeName);
		setOldMessages(messages);
		if (args[1] == props.activeName && (props.activeName != "" || props.activeName != undefined || props.activeName != null)) {
			setMessages(args[0]);
			setsockChan(args[1]);
			console.log(sockChan);
			console.log("messages are refreshed");
		}

	});

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
		<div id="ListDiscussions" className="col-5">
			<div className="title_chat_div">
				<p className="chat--title">{props.activeName}</p>
			</div>
			<div className="messages-zone">
				<ul className="text">
					{
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
					}
				</ul>
			</div>
			<TypingMessage
				socket={props.socket}
				login={props.login}
				channel={props.activeName}
				id={props.activeID}
				chanId={props.activeID}
			/>
		</div>
	);
}
