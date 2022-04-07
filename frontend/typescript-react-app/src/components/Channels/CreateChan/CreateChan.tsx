import './CreateChan.scss';
import React, {Component, useState, useEffect} from "react";
import Nav from "../../Nav/Nav";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import CreateChanModal from "../../Utils/Modal/Modal";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";
import ListChannels from "../ListChannels/ListChannels";
import Channels from "../../Channels/Channels";
import io from "socket.io-client";

interface UserChat
{
	login?: string
}

const ENDPOINT = "http://ws.localhost:3000/api/";

export default function CreateChan(props: UserChat)
{
    const [modalShow, setModalShow] = React.useState(false);
    const [response, setResponse] = useState("");

    //React Hooks qui est appelée quand le component est mounté / la page est chargée
    //useEffect(() => {
        //let socket = io();
        //console.log("socket is " + socket);

        //let socket2 = io("http://localhost:3000/", {
        //    transports: ["polling", "websocket"]});
        //console.log("socket2 is " + socket2);


        //socket2.on('connection', (socket) => {
        //    console.log(`Connecté au client ${socket.id}`);
        //})

        //socket2.on('disconnect', function() {
        //    console.log('Disconnected');
        //})
  //  }, []);

    return (
        <div id="channels">
            <Nav />
            <div className="container">
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-7">
                        <div id="quick--actions">
                            {/*<h1 className="text" id="quick--actions--title">Quick actions</h1>*/}
                            <div className="row">
                                <Button className="quick--actions" variant="primary" onClick={() => setModalShow(true)}>
                                    Create a new channel
                                </Button>
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
                {/*<ListChannels />*/}
            </div>
        );
    }
