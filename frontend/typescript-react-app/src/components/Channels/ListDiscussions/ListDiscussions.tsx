import './ListDiscussions.scss';
import SingleMessage from "./SingleMessage/SingleMessage";
import React, { Component, useState, useEffect } from "react";
import myAxios from "../../Utils/Axios/Axios";
import { io } from "socket.io-client";
import axios from 'axios';
import TypingMessage from "../TypingMessage/TypingMessage";

//TODO: a reprendre @rbourgea

/*
export default function ListDiscussions({activeChannel}) {

	const [username, setUsername] = React.useState("");
	const [messages, setMessages] = React.useState([]);
	useEffect(() => {

		async function getUser() {
			let url = "http://localhost:3000/api/auth/";
			let username = "";
			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
			axios.defaults.withCredentials = true;
			await axios.get(url)
				.then(res => {
					username = res.data.login;
					//console.log(username + ' <-- result of get user')
				})
				.catch((err) => {
					console.log("Error while getting api auth");
				})
		}
		getUser();
		// LA SOCKET ICI
		let socket = io("http://localhost:3000/chat", { query: { username: username } });
		socket.emit('requestAllMessages', activeChannel)
		socket.on("sendAllMessages", (messagesUpdated) => {
			if (messagesUpdated) {
				console.log("messages: " + messagesUpdated);
				setMessages(messagesUpdated);
			}
		});
	}, [activeChannel]);

	return (
		<div id="ListDiscussions">
			<p id="discussions--title">List of messages</p>
			<div className="overflow-auto" id="sub--div">
				<ul id="messages" className='text'>
					{
						messages.map(message =>
						<div key={message.id}>
							<li id="message" key={message.id}>
								{message.content}
							</li>
							<br/>
						</div>
						)
					}
				</ul>
			</div>
		</div>
	);
}
*/

//export default function ListDiscussions({ activeChannel, username, socket }) {

export interface ListDiscussionsProps {
	//setActiveChannelName?: any,
	//setActiveChannelID?: any
	login: string
	//setActiveDMName?: any,
	//setActiveDMID?: any,
	activeChannelName?: any,
	activeChannelId?: any,
	activeDMName?: any,
	activeDMId?: any
	isDM?: any,
	isChan?: any
}

export default function ListDiscussions(props: ListDiscussionsProps) {
	const [messages, setMessages] = React.useState([]);
	const [socket, setSocket] = React.useState(io("http://localhost:3000/chat", { query: { username: props.login } }));

	useEffect(() => {
		socket.emit('requestAllMessages', props.activeChannelName)
		socket.on("sendAllMessages", (messagesUpdated) => {
			if (messagesUpdated) {
				setMessages(messagesUpdated);
			}
		});
	}, [props.activeChannelName]);

	socket.on("refreshMessages", (...args) => {
		console.log("channel is " + props.activeChannelName + " | channel socket is " + args[1])
		if (args[1] == props.activeChannelName)
			setMessages(args[0]);
	});

	return (
		//<div>
			<div id="ListDiscussions" className="col-5">
				<div className="title_chat_div">
					<p className="chat--title">Chat</p>
					<p className="chat--title_open">{props.isDM == "true" ? "Your open DM : ".concat(props.activeDMName) : "Your open channel : ".concat(props.activeChannelName)}</p>
				</div>
				<div className="messages-zone">
					<ul id="messages" className='text'>
						{
							messages.map(message =>
								<div key={message.id}>
									<li id="message" key={message.id}>
										{message.author.login}: {message.content}
									</li>
									<br /><br />
								</div>
							)
						}
					</ul>
				</div>
				<TypingMessage
					login={props.login}
					channel={props.activeChannelName}
				/>
				{/*<p id="discussions--title">channelId: {activeChannel}</p>*/}
				{/*<div id="sub--div">*/}
					{/*<ul id="messages" className='text'>
						{
							messages.map(message =>
								<div key={message.id}>
									<li id="message" key={message.id}>
										{message.content}
									</li>
									<br />
								</div>
							)
						}
					</ul>*/}
				{/*</div>*/}
			</div>
		//</div >
	);
}
