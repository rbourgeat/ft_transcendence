import './ListParticipant.scss';
import React from "react";
import Participant from './Participant/Participant';
import Footer from "../../Footer/Footer";

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
                    <div id="participants--div">
                    <Participant username="malatini" status="Online" owner={true} admin={true} />
                    <Participant username="bahaas" status="Offline"/>
                    <Participant username="rbourgea" status="Offline"/>
                    <Participant username="darbib" status="Online"/>
                    <Participant username="macrespo" status="Online" admin={true}/>
                    </div>
                </div>
                <div id="roles">
                    <h3 id="roles--title">Roles</h3>
                    <p>Online <span className="online"></span></p>
                    <p>Offline <span className="offline"></span></p>
                    <p>Admin <span className="admin"></span></p>
                    <p>Owner <span className="owner"></span></p>
                </div>
            <Footer />
            </div>
        );
    }

}
