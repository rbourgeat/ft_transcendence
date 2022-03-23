import './CreateChan.scss';
import React, {Component} from "react";
import Nav from "../../Nav/Nav";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import CreateChanModal from "../../Utils/Modal/Modal";

export default function CreateChan(props)
{

	const [modalShow, setModalShow] = React.useState(false);
    return (
        <div id="channels">
            <Nav />
            <div className="container">
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-7">
					<p>You are not part of any channel.</p>
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
