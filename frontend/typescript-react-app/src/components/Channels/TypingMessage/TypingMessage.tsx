import './TypingMessage.scss';
import React, { Component, useState, useEffect } from "react";
import io from "socket.io-client";
import SingleMessage from "../ListDiscussions/SingleMessage/SingleMessage";
import axios from 'axios';

export interface TypingProps {
    login: string,
    channel: string,
}

export interface TypingState {
    text?: string
}

const message = document.getElementById('message');
const messages = document.getElementById('messages');

export default function TypingMessage(props: TypingProps) {
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
                setUsername(username);
            })
            .catch((err) => {
                console.log("Error while getting api auth");
            })
    }

    useEffect(() => {
    }, []);


    let socket = io("http://localhost:3000/chat", { query: { username: props.login } });

    function sendMessage(message: string) {
        if (message !== "") {
            updateText("");
            socket.emit('message', props.login + ":" + props.channel + ":" + message)
        }
    }

    return (
        <div id="typing--div">
            <section className="send-message-form">
                <input
                    placeholder="Your message..."
                    value={text}
                    className="form-control typing--input"
                    id="message-typed"
                    onChange={e => updateText(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn btn-outline-dark"
                    onClick={() => sendMessage(text)}
                >
                    Send
                </button>
            </section>
        </div>
    );
}
