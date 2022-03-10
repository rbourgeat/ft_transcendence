import './SingleMessage.scss';
import React from "react";

export interface MessageProps {
	text?: string,
	username?: string
}

export default class ListChannels extends React.Component<MessageProps>
{
	constructor(props: MessageProps)
	{
		super(props);
	}

    render()
	{
		return (
		<div id="message--div">
			<p>
				<span id="username">{this.props.username} : </span>
				<span>{this.props.text}</span>
			</p>
		</div>
		);
        //null
	};
}
