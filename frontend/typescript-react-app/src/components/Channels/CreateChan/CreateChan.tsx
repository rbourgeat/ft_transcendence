import './CreateChan.scss';
import React, {Component, useState, useEffect} from "react";
import Nav from "../../Nav/Nav";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import CreateChanModal from "../../Utils/Modal/Modal";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";

interface UserChat
{
	login?: string
}

export default function CreateChan(props: UserChat)
{
    function renderListChannels(login: string)
    {
        axios.defaults.withCredentials = true;
        //var self = this;
        let url = "http://localhost:3000/api/chat/";
        //let channels = new Object;
        axios.get(url)
        .then( res => {
            console.log("Get api chat successfully called.");
            //console.log(res.data);
            let channels = res.data;
            console.log(channels);
            setChannels(channels);
        })
        .catch((error) => {
            console.log("Error while getting all channels");
        })
    }

    useEffect(() => {
        //document.title = `Vous avez cliqué ${count} fois`;
        renderListChannels(props.login);
      });

	const [modalShow, setModalShow] = React.useState(false);
    const [channels, setChannels] = React.useState([]);
    const [count, setCount] = useState(0);

    return (
        <div id="channels">
            <Nav />
            <div className="container">
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-7">
                        <p>Listing all app public channels: </p>
                        {/*{renderListChannels(props.login)}*/}
                        <ul>
                            {channels.map(channel  =>
                                <li>{channel.name}</li>
                            )}
                        </ul>
                        <p>Create a channel</p>
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Launch vertically centered modal
                        </Button>
                        <CreateChanModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
