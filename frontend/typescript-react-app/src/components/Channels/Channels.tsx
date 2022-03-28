import './Channels.scss';
import Nav from '../Nav/Nav';
import TypingMessage from "./TypingMessage/TypingMessage";
import ListDiscussions from "./ListDiscussions/ListDiscussions";
import ListParticipant from './ListParticipant/ListParticipant';
import React from "react";
import MyAxios from '../Utils/Axios/Axios';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
import { ToastContainer, toast } from 'react-toastify';
import cookieClient from "react-cookie";

//import { Cookies } from "react-cookie"
//import Cookie from 'js-cookie'
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
            //username: Cookies.get('Authication');
        }
    }

    componentDidMount() {

    }

    createChat()
    {
        //Initialisation de notre classe MyAxios (sans prop)

        //Retrieve chats

        let ax = new MyAxios(null);

        //let cookie = cookieClient.load("Authentication");
        //console.log(cookie);
        //let res = ax.get_api_chat();
        //let cookie = Cookie.get('Authentication');
        //console.log("Cookie : " + cookie);

        //Creating chat
        let res = ax.post_api_chat("pass!1717", true, "chat-6");
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
                <div className="container" id="chat--container">
                    <div className="row d-flex justify-content-center text-center">
                        <div className="col-7">
                            <h1 id="channels--tile">Channels</h1>
                            <button onClick={this.createChat}>Create chat</button>
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
