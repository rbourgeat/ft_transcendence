import './CreateChan.scss';
import React, {Component, useState, useEffect} from "react";
import Nav from "../../Nav/Nav";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import CreateChanModal from "../../Utils/Modal/Modal";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";
import ListChannels from "../ListChannels/ListChannels";

interface UserChat
{
	login?: string
}

export default function CreateChan(props: UserChat)
{
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div id="channels">
            <Nav />
            <ListChannels />
            <div className="container">
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-7">
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
