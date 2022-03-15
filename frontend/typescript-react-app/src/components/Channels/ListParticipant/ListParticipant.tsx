import './ListParticipant.scss';
import React, {useState} from "react";
import Participant from './Participant/Participant';
import Footer from "../../Footer/Footer";
//import TimePicker from "react-time-picker";
import { useTimer } from 'react-timer-hook';
import MyTimer from "./MyTimer/MyTimer";

export interface ParticipantProps{
}

// export interface ParticipantState {

// }

export default function ListParticipant()
{
    // constructor(props: ParticipantProps)
    // {
    //     super(props);

    //     this.state = {}
    // }

    // componentDidMount() {}

    // render()
    // {

        // const [value, onChange] = useState('10:00');
        const time = new Date();
        time.setSeconds(time.getSeconds() + 600);

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
                    {/* <div className="row d-flex justify-content-center text-center">
                        <button id="bann-button" className="btn btn-danger">Ban</button>
                    </div>
                    <div className="row d-flex justify-content-center text-center">
                        <button id="mute-button" className="btn btn-warning">Mute</button>
                    </div> */}
                    <button id="bann-temp-button" className="btn btn-danger">Ban temporarily</button>
                    <button id="mute-temp-button" className="btn btn-warning">Mute temporalily</button>
                    {/*<MyTimer expiryTimestamp={time} />*/}

                </div>
                {/* Si je clique je dois pouvoir selectionner un minuteur */}


                {/* <div id="roles">
                    <h3 id="roles--title">Roles</h3>
                    <p className="p--participants">Online <span className="online"></span></p>
                    <p className="p--participants">Offline <span className="offline"></span></p>
                    <p className="p--participants">Admin <span className="admin"></span></p>
                    <p className="p--participants">Owner <span className="owner"></span></p>
                </div> */}

            <Footer />
            </div>
        );
    }
