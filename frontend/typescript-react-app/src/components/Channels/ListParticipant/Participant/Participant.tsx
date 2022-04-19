import './Participant.scss';
import React from "react";

export interface ParticipantSProps {
	username?: string,
	status?: string
	owner?: boolean,
	admin?: boolean
}

//TODO: écrire les props proprement x) !!
export interface ParticipantSState {

}

export default function Participant({ username, status, owner, admin, updateSelectedUser, updateFunctionToUse }) {
	return (
		<div className="participant--div">
			{<div className="dropdown show">
				<a className="btn btn-sm dropdown-toggle p--participant" role="button" data-toggle="dropdown" onClick={() => updateSelectedUser(username)}>
					{username}
				</a>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					<a className="dropdown-item" onClick={() => updateFunctionToUse("ban")}>ban</a>
					<a className="dropdown-item" onClick={() => updateFunctionToUse("admin")}>set admin</a>
					<a className="dropdown-item" onClick={() => updateFunctionToUse("mute")}>mute</a>
					<a className="dropdown-item" onClick={() => updateFunctionToUse("invite")}>invite to play</a>
					<a className="dropdown-item" onClick={() => updateFunctionToUse("block")}>block</a>
				</div>
			</div>
				/*<div className="dropdown p--participant">
				<p onClick={() => updateSelectedUser("username")} className="dropbtn">{username}</p>
				<div id="myDropdown" className="dropdown-content">
					<a>Home</a>
					<a>About</a>
					<a>Contact</a>
				</div>
				</div>*/}
		</div>);
}
