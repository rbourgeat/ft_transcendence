import './ListParticipant.scss';
import React from "react";
import Participant from './Participant/Participant';

export interface ParticipantProps{

}

export interface ParticipantState {

}

export default class ListParticipant extends React.Component<ParticipantProps, ParticipantState>
{
    constructor(props: ParticipantProps)
    {
        super(props);

        this.state = {}
    }

    componentDidMount() {}

    render()
    {
        return (
            <div id="ListParticipant">
                <h2 id="participant--title">Participants</h2>
                <div id="sub--div" className="overflow-auto">
                    <Participant username="malatini" status="Online" owner={true} admin={true} />
                    <Participant username="bahaas" status="Offline"/>
                    <Participant username="rbourgea" status="Offline"/>
                    <Participant username="darbib" status="Online"/>
                    <Participant username="macrespo" status="Online" admin={true}/>
                </div>
            </div>
        );
    }

}
