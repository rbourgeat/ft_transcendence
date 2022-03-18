import './Channels.scss';
import Nav from '../Nav/Nav';
import TypingMessage from "./TypingMessage/TypingMessage";
import ListDiscussions from "./ListDiscussions/ListDiscussions";
import ListParticipant from './ListParticipant/ListParticipant';
import React from "react";
import MyAxios from '../Utils/Axios/Axios';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
import { ToastContainer, toast } from 'react-toastify';
//import { w3cwebsocket} from "websocket";

//import io from "socket.io-client";


/**
 * @malatini ou @macrespo
 * Page principale pour afficher les channels, voir les sous composants
 */

export interface ChatProps {
    username?: string
}

export interface ChatState {
}

//const socket = io("http://localhost:4000");
//const message = document.getElementById('message');

export default class Channels extends React.Component<ChatProps, ChatState>
{

    constructor(props: ChatProps)
    {
        super(props);

        this.state = {
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
        let myax = new MyAxios({
            method: "POST",
            ressource: "/api/chat",
            username: this.props.username
        });

        //TODO: a revoir entre la creation et le get
        let res = myax.createchat(this.props.username);
        //console.log("Coucou!");
        //const socket = socketIOClient(ENDPOINT);
        //socket.on("FromAPI", iodata => {
        //    this.setState({ data: iodata})
        //    console.log("Socket ok!");
        //})

    }

    render()
    {
        return (
            <div id="channels">
                <Nav />
                <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                <div className="container">
                    <div className="row d-flex justify-content-center text-center">
                        <div className="col-7">
                            <h1 id="channels--tile">Channels</h1>
                            <h2 id="websocket--tile">Websocket chat</h2>
                            <ListDiscussions />
                            <TypingMessage />
                        </div>
                        <div className="col-4" id="list--participants">
                            <ListParticipant />
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
