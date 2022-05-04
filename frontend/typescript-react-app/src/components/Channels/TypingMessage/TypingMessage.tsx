import './TypingMessage.scss';
import React, { Component, useState, useEffect } from "react";
import io from "socket.io-client";
import SingleMessage from "../ListDiscussions/SingleMessage/SingleMessage";
import axios from 'axios';
// import { env } from 'process';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';

let url_begin = "";
if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
    url_begin = "http://localhost";
else
    url_begin = "http://".concat(process.env.REACT_APP_IP);

export interface TypingProps {
    login: string,
    channel: string,
    id: string,
    socket?: any
    chanId?: string
    activeID?: string,
    activeName?: string,
    sockChan?: any,
    isChan?: boolean
}

export interface TypingState {
    text?: string
}

let timestamp;

const message = document.getElementById('message');
const messages = document.getElementById('messages');

export default function TypingMessage(props: TypingProps) {
    const [text, updateText] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [isMuted, setIsMuted] = React.useState(false);
    const [sockChan, setsockChan] = React.useState(props.activeName);

    function checkisMuted() {
        if (props.chanId != "" && props.chanId != undefined && props.chanId != null) {
            let url = url_begin.concat(":3000/api/chat/isMutedIn/").concat(props.chanId);

            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            axios.defaults.withCredentials = true;

            axios.get(url)
                .then(res => {
                    if (res.data == false) {
                        setIsMuted(false);
                    }
                    else if (res.data == true) {
                        setIsMuted(true);
                    }
                })
                .catch((error) => {
                    ;
                })
        }
    }

    useEffect(() => {
        checkisMuted();
    }, [props.chanId]);


    function sendMessage(message: string) {
        if (message !== "") {
            updateText("");
            if (props.isChan === false)
                props.socket.emit('message', props.login + ":" + props.channel + ":" + message + ":" + props.chanId + ":dm");
            else
                props.socket.emit('message', props.login + ":" + props.channel + ":" + message + ":" + props.chanId + ":chat");
            console.log("send message with" + props.login + "to the channel " + props.channel + ", content:" + message);

        }
    }

    props.socket.on('isMute', (...args) => {
        if (props.login == args[0] && args[1] == true) {
            setIsMuted(true)
            //console.log("set is mute to true")
        }
        else if (props.login == args[0] && args[1] == false) {
            setIsMuted(false)
            //console.log("set is mute to false")
        }
    })

    return (
        <div id="typing--div">
            <section className="send-message-form">
                {
                    props.activeID != "" && props.activeName != "" ?
                        isMuted === true ?
                            <>
                                You are muted in that channel
                            </>
                            :
                            <>
                                <input
                                    placeholder="Your message..."
                                    value={text}
                                    className="form-control typing--input"
                                    id="message-typed"
                                    onChange={e => updateText(e.target.value)}
                                />
                                <button type="submit" className="btn btn-outline-dark" onClick={() => sendMessage(text)} >
                                    Send
                                </button>
                            </>
                        :
                        ""
                }
            </section>
        </div >
    );
}
