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

export default function Participant({username, status, owner, admin, updateSelectedUser})
{
	return (
	<>
		<p className="p--participant" onClick={() => updateSelectedUser("username")}>
			{username}
			{status === "Online" ? <span className="online"></span> : <span></span>}
			{status === "Offline" ? <span className="offline"></span> : <span></span>}
			{admin == true ? <span className="admin"></span> : <span></span>}
			{owner == true ? <span className="owner"></span> : <span></span>}
		</p>
	</>);
}
