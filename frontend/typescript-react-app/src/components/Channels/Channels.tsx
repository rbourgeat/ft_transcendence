import './Channels.scss';
import Nav from '../Nav/Nav';
import TypingMessage from "./TypingMessage/TypingMessage";
import ListDiscussions from "./ListDiscussions/ListDiscussions";
import React from "react";
//import { w3cwebsocket} from "websocket";

import socketIOClient from "socket.io-client";


/**
 * @malatini ou @macrespo
 * Page principale pour afficher les channels, voir les sous composants
 */

export interface ChatProps {

}

export interface ChatState {
    data: any
}

//const client = new w3cwebsocket("127.0.0.1:8000");
const ENDPOINT = "http://127.0.0.1:3000";

export default class Channels extends React.Component<ChatProps, ChatState>
{

    constructor(props: ChatProps)
    {
        super(props);

        this.state = {
            data: null
        }
    }

    componentDidMount() {
        //client.onopen = () => {
        //    console.log('Websocket Client Connected')
        //}

        //const socket = socketIOClient(ENDPOINT);
        //socket.on("FromAPI", iodata => {
        //    this.setState({ data: iodata})
        //})
    }

    render()
    {
        return (
            <div id="channels">
                <Nav />
                <div className="container">
                    <div className="row d-flex justify-content-center text-center">
                        <div className="col-7">
                            <h1 id="channels--tile">Channels</h1>
                            <h2 id="websocket--tile">Websocket chat</h2>
                            <ListDiscussions />
                            <TypingMessage />
                        </div>
                    {/* Components mes channels */}
                    {/* Component discussion */}
                    {/* Component participants */}
                    </div>
                </div>
            </div>
        );
    }
}
