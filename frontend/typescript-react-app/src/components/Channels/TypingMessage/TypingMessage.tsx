import './TypingMessage.scss';
import React, { Component, useState, useEffect } from "react";
import io from "socket.io-client";
import SingleMessage from "../ListDiscussions/SingleMessage/SingleMessage";
import axios from 'axios';
// import { env } from 'process';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';

let url_begin = "http://".concat(process.env.REACT_APP_IP);

export interface TypingProps {
    login: string,
    channel: string,
    id: string,
    socket?: any
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

    function checkisMuted() {
        //console.log("props chanId is " + props.chanId);

        if (props.chanId != "" && props.chanId != undefined && props.chanId != null) {
            let url = url_begin.concat(":3000/api/chat/isMutedIn/").concat(props.chanId);

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

    setInterval(() => {
        /*
        if (isMuted === true) {
            setIsMuted(false);
            //console.log("interval with isMuted == true");

            const body = {
                "idChat": props.chanId,
                "user": props.login
            }
            axios.post(url, body)
                .then(response => {
                })
                .catch(error => {
                });
        }
        */
    }, 50000);

    useEffect(() => {
        checkisMuted();
    }, [props.chanId]);



    function sendMessage(message: string) {
        console.log(process.env.REACT_APP_IP)
        console.log("-------");
        // console.log(TEST)
        // console.log('port ' + env.PORT)
        console.log("test");
        // let toast = new ToastAlerts(null);

        if (message !== "") {
            updateText("");
            props.socket.emit('message', props.login + ":" + props.channel + ":" + message);
            // toast.notifySuccess(process.env.TEST);
        }
    }

    //this.server.emit('isMute', user.login, body.mute);

    props.socket.on('isMute', (...args) => {
        if (props.login == args[0] && args[1] == true) {
            setIsMuted(true)
            console.log("set is mute to true")
        }
        else if (props.login == args[0] && args[1] == false) {
            setIsMuted(false)
            console.log("set is mute to false")
        }
    })

    const [seconds, setSeconds] = useState(600);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        /*
                let interval = null;

                interval = setInterval(() => {
                    setSeconds(seconds => seconds - 1);
                }, 10000);

                return () => clearInterval(interval);
        */
    }, [isActive, seconds]);

    return (
        <div id="typing--div">
            <section className="send-message-form">
                {
                    isMuted === true ?
                        <>
                            You are muted in that channel for {seconds}s
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
                }
            </section>
        </div >
    );
}
