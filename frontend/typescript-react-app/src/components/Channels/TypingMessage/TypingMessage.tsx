import './TypingMessage.scss';
import React from "react";
//import { w3cwebsocket} from "websocket";
//import io from "socket.io-client";
import SingleMessage from "../ListDiscussions/SingleMessage/SingleMessage"

/**
 * @malatini ou @macrespo
 * Composant qui permettra à l'user de "preparer" / ecrire le message qu'il va envoyer sur le channel ou le dm.
 */
export interface TypingProps {

}

export interface TypingState {
    text?: string
}

//const client = new w3cwebsocket("ws//127.0.0.1:8000");
//const socket = io("http://localhost:3000/");
const message = document.getElementById('message');
const messages = document.getElementById('messages');

export default class TypingMessage extends React.Component<TypingProps, TypingState>
{
    constructor(props: TypingProps)
    {
        super(props);

        this.state = {
            text: ""
        }
    }

    resetText = function()
    {
        this.setState({
          text: '',
        });
    }

    componentDidMount() {
        //client.onopen = () => {
        //    console.log('Websocket Client Connected')
        //}

        //client.onmessage = (message) => {
        //    const dataFromServer = JSON.parse(message.data);
        //    console.log("Got reply !");
        //}

        //socket.on('message', ({data}) => {
        //    this.handleNewMessage(data);
        //});

     }

     handleNewMessage = (message) => {
        //messages.appendChild(this.buildNewMessage(message))
        //console.log(message);
        //let res = React.createElement(
        //    'div', message,
        //    {username: "malatini", text: message}, null
        //  )
        //console.log(res);
        //return;
    }

    //buildNewMessage = (message) => {
    //    const li = document.createElement("li");
    //    li.appendChild(document.createTextNode(message));
    //    return (li);
    //}

    sendMessage=(event: any)=>
    {
        event.preventDefault();
        //client.send(JSON.stringify({
        //    type: "message",
        //    msg: event
        //}))

        //socket.emit('message', {data: this.state.text});
        console.log(this.state.text);
        this.handleNewMessage(this.state.text);

        this.resetText();
    }

    render()
    {
        return (
            <div id="typing--div">
                <p id="typing--title">Typing message section</p>
                <input
                    placeholder="Type something..."
                    /*className="typing--input"*/
                    value={this.state.text}
                    className="form-control"
                    id="message"
                    onChange={(e)=>{this.setState({text: e.target.value})}}
                    />
                <button
                    id="send--button"
                    type="submit"
                    onClick={this.sendMessage}
                >
                    Send
                </button>
                <br/>
                <br />
            </div>
        );
    }

}
