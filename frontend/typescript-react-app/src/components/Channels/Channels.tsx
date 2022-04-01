import './Channels.scss';
import Nav from '../Nav/Nav';
import TypingMessage from "./TypingMessage/TypingMessage";
import ListDiscussions from "./ListDiscussions/ListDiscussions";
import ListParticipant from './ListParticipant/ListParticipant';
import React from "react";
import MyAxios from '../Utils/Axios/Axios';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
import { ToastContainer, toast } from 'react-toastify';


/**
 * @malatini ou @macrespo
 * Page principale pour afficher les channels, voir les sous composants
*/
interface ChatProps {
    username?: string
}

//TODO: a revoir
export default function Channels(props: ChatProps) {
    function createChat()
    {
        let ax = new MyAxios(null);
        let res = ax.post_api_chat("channel1", true, "password");
    }

    function listChats()
    {
        let ax = new MyAxios(null);
        let res = ax.get_api_chat();
    }

        //TODO: changer la page
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
                            <button className="chat-buttons" onClick={createChat}>Create chat</button>
                            <br></br>
                            <button className="chat-buttons" onClick={listChats}>list your chats</button>
                            <ListDiscussions />
                            <TypingMessage />
                        </div>
                        <div className="col-4" id="list--participants">
                            <ListParticipant />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
