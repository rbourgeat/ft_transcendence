import './TypingMessage.scss';
import React from "react";
import { w3cwebsocket} from "websocket";

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
    }

    sendMessage=(event: any)=>
    {
        event.preventDefault();
        //client.send(JSON.stringify({
        //    type: "message",
        //    msg: event
        //}))
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
