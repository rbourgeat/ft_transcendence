import './TypingMessage.scss';
//import { w3cwebsocket} from "websocket";
import React, { Component, useState, useEffect } from "react";
import io from "socket.io-client";
import SingleMessage from "../ListDiscussions/SingleMessage/SingleMessage";
import axios from 'axios';

/**
 * @malatini ou @macrespo
 * Composant qui permettra à l'user de "preparer" / ecrire le message qu'il va envoyer sur le channel ou le dm.
 */
export interface TypingProps {

}

export interface TypingState {
    text?: string
}

const message = document.getElementById('message');
const messages = document.getElementById('messages');

export default function TypingMessage() 
{
		const [text, updateText] = React.useState("");
    const [username, setUsername] = React.useState("");

    function getUser() {
        let url = "http://localhost:3000/api/auth/";
        let username = "";
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;
        axios.get(url)
            .then(res => {
                username = res.data.login;
                console.log(username + ' <-- result of get user')
                setUsername(username);
            })
            .catch((err) => {
                console.log("Error while getting api auth");
            })
    }

    useEffect(() => {
        getUser();
    }, []);
	
    let socket = io("http://localhost:3000/chat", { query: { username: username } });

    function sendMessage(channel: string, message: string) {
        socket.emit('message', username + ":" + channel + ":" + message)
    }

		return (
			<div id="typing--div">
				<p id="typing--title">Typing message section</p>
				<section className="send-message-form">
					<input
						placeholder="Type something..."
						value={text}
						className="form-control typing--input"
						id="message"
						onChange={e => updateText(e.target.value)}
					/>
					<button
						id="send--button"
						type="submit"
						onClick={() => sendMessage("DummyChannel", text)}>
						Send
					</button>
				</section>
			</div>
		);
}
