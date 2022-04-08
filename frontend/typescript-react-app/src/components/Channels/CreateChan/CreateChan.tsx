import './CreateChan.scss';
import React, { Component, useState, useEffect } from "react";
import Nav from "../../Nav/Nav";
//import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import CreateChanModal from "../../Utils/Modal/Modal";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";
import ListChannels from "../ListChannels/ListChannels";
import Channels from "../../Channels/Channels";
import io from "socket.io-client";

interface UserChat {
    login?: string
}

const ENDPOINT = "http://ws.localhost:3000/api/";

export default function CreateChan(props: UserChat) {
    const [modalShow, setModalShow] = React.useState(false);
    const [response, setResponse] = useState("");

    const [username, setUsername] = React.useState("");

    async function getUser() {
        let url = "http://localhost:3000/api/auth/";
        let username = "";
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;
        await axios.get(url)
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

        // socket.on('connect', () => {
        //     console.log(`Socket connectée !`);
        //     // socket.emit('status', username + ':online')
        // })

        // socket.on('disconnect', () => {
        //     console.log(`Socket déconnectée !`);
        //     // socket.emit('status', username + ':offline')
        // })

    }, []);

    let socket = io("http://localhost:3000/chat", { query: { username: username } });

    function sendTest() {
        socket.emit('test', 'test ok !')
    }

    // socket.on("updateStatus", (pseudo, status) => {
    //     if (pseudo) {
    //         console.log("name: " + pseudo + " / " + "status: " + status);
    //     }
    // });

    let channel = "";

    function sendMessage(channel: string, message: string) {
        socket.emit('message', username + ":" + channel + ":" + message)
    }

    const [inputValue, setInputValue] = React.useState("");

    function handleInputChange(event) {
        setInputValue(event.target.value);
        socket.emit('status', "est en train d'écrire")
    }

    //TODO: a reprendre sans react bootstrap, pb de dépendances
    return (
        <div id="channels">
            <Nav />
            <div className="container">
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-7">
                        <div id="quick--actions">
                            {/*<h1 className="text" id="quick--actions--title">Quick actions</h1>*/}
                            <div className="row">
                                {/*<Button className="quick--actions" variant="primary" onClick={() => setModalShow(true)}>
                                    Create a new channel
                                </Button>


                                <Button className="quick--actions" variant="primary" onClick={() => sendTest()}>
                                    Test
                                </Button>*/}
                                {/*<button className"">Create a new channel</button>*/}
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="message"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                                {/*<Button className="quick--actions" variant="primary" onClick={() => sendMessage("DummyChannel", inputValue)}>
                                    Envoyer
                                </Button>*/}

                                {/*<Button className="quick--actions" variant="light" disabled>
                                    Send a DM
                                </Button>
                                <Button className="quick--actions" variant="light" disabled>
                                    Answer invitation(s)
                                </Button>
                                <Button className="quick--actions" variant="light" disabled>
                                    Invite friend
                                </Button>
                                <Button className="quick--actions" variant="light" disabled>
                                    Make admin
                                </Button>
                                <Button className="quick--actions" variant="light" disabled>
                                    Mute
                                </Button>
                                <Button className="quick--actions" variant="light" disabled>
                                    Invite to play
                                </Button>
                                <Button className="quick--actions" variant="light" disabled>
                                    Answer to play
                                </Button>*/}
                            </div>
                            {/*<CreateChanModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />*/}
                        </div>
                    </div>
                </div>
            </div>
            <ListChannels />
        </div>
    );
}
