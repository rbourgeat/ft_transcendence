import './TypingMessage.scss';
import React, { Component, useState, useEffect } from "react";
import io from "socket.io-client";
import SingleMessage from "../ListDiscussions/SingleMessage/SingleMessage";
import axios from 'axios';

export interface TypingProps {
    login: string,
    channel: string,
    chanId?: string
}

export interface TypingState {
    text?: string
}

const message = document.getElementById('message');
const messages = document.getElementById('messages');

export default function TypingMessage(props: TypingProps) {
    const [text, updateText] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [isMuted, setIsMuted] = React.useState(false);

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
                //console.log("Error while getting api auth");
                ;
            })
    }

    function checkisMuted() {
        //console.log("props chanId is " + props.chanId);

        if (props.chanId != "" && props.chanId != undefined && props.chanId != null) {
            let url = "http://localhost:3000/api/chat/isMutedIn/".concat(props.chanId);

            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            axios.defaults.withCredentials = true;

            //console.log("check is muted");

            axios.get(url)
                .then(res => {
                    //console.log(res);
                    if (res.data == false) {
                        setIsMuted(false);
                    }
                    else if (res.data == true) {
                        setIsMuted(true);
                    }
                    //console.log("is muted is " + isMuted);
                })
                .catch((error) => {
                    ;
                })
        }
    }

    useEffect(() => {
        checkisMuted();
    }, [props.chanId]);


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
                    disabled={isMuted == true ? true : false}
                />
                <button
                    type="submit"
                    className="btn btn-outline-dark"
                    onClick={() => sendMessage(text)}
                    disabled={isMuted == true ? true : false}
                >
                    Send
                </button>
            </section>
        </div>
    );
}
