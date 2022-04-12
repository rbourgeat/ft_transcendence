import './ListDiscussions.scss';
import SingleMessage from "./SingleMessage/SingleMessage";
import React, {Component, useState, useEffect} from "react";
import myAxios from "../../Utils/Axios/Axios";
import { io } from "socket.io-client";
import axios from 'axios';

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
