import './Channels.scss';
import Nav from '../Nav/Nav';
import TypingMessage from "./TypingMessage/TypingMessage";
import ListDiscussions from "./ListDiscussions/ListDiscussions";
import ListParticipant from './ListParticipant/ListParticipant';
import React from "react";
import MyAxios from '../Utils/Axios/Axios';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from "react-cookie";
import Cookies from 'universal-cookie';


/**
 * @malatini ou @macrespo
 * Page principale pour afficher les channels, voir les sous composants
*/
export interface ChatProps {
    username?: string
}

export default function Channels(props: ChatProps) {
    const cookies = new Cookies();
    function createChat()
    {
        let ax = new MyAxios(null);
        //let res = ax.get_api_user_cookie_test();
        let res = ax.post_api_chat("channel1", true, "password");
    }

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
                            {/* Pour test */}
                            <button onClick={createChat}>Create chat</button>
                            {/*<h2 id="websocket--tile">Websocket chat</h2>*/}
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
