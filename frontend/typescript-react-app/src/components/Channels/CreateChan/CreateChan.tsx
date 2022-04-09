import './CreateChan.scss';
import React, { Component, useState, useEffect } from "react";
import Nav from "../../Nav/Nav";
import CreateChanModal from "../../Utils/Modal/Modal";
import myAxios from "../../Utils/Axios/Axios";
import ListChannels from "../ListChannels/ListChannels";
import Channels from "../../Channels/Channels";
import io from "socket.io-client";
import axios from "axios";

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
                // console.log(username + ' <-- result of get user')
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
                            <div className="row">
                                {/*<button type="button" className="btn btn-outline-dark" onClick={() => setModalShow(true)}>Create a channel</button>*/}
                                <button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#exampleModal">
                                    Create a channel
                                </button>

                                <button type="button" className="btn btn-outline-dark" onClick={() => sendTest()}>Test</button>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="message"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                                <button type="button" className="btn btn-outline-dark" onClick={() => sendMessage("DummyChannel", inputValue)}>Envoyer</button>
                                <button type="button" className="btn btn-outline-dark" disabled>Send a DM</button>
                                <button type="button" className="btn btn-outline-dark" disabled>Invite to play</button>
                                <button type="button" className="btn btn-outline-dark" disabled>Answer to play</button>
                            </div>
                            {/*<CreateChanModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />*/}
                            {/*TODO: a reprendre (ne pas faire de modal avec react bootstrap mais avec bootstrap) - reprendre le modal qui se trouve dans Utils/Modal*/}
                            <div className="modal fade" id="exampleModal" tab-index="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        ...
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <ListChannels />
        </div>
    );
}
