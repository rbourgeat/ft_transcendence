import './Participant.scss';
import React from "react";

export interface ParticipantSProps{
	username?: string,
	status?: string
	owner?: boolean,
	admin?: boolean
}

export interface ParticipantSState {

}

export default class Participant extends React.Component<ParticipantSProps, ParticipantSState>
{
    constructor(props: ParticipantSProps)
    {
        super(props);

        this.state = {}
    }

    componentDidMount() {}

    render()
    {
        return (
		<div className="row">
			<p>
				{this.props.username}
				{this.props.status === "Online" ? <span className="online"></span> : <span></span>}
				{this.props.status === "Offline" ? <span className="offline"></span> : <span></span>}
				{this.props.admin == true ? <span className="admin"></span> : <span></span>}
				{this.props.owner == true ? <span className="owner"></span> : <span></span>}
			</p>

			{/*<button>
		   </button>*/}
		</div>
        );
    }

}
