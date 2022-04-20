import './Participant.scss';
import React, { useEffect } from "react";
import { FaCrown } from "react-icons/fa";

export interface ParticipantsProps {
	currentUser?: string,
	username?: string,
	role?: string,
	owner?: boolean,
	admin?: boolean,
	updateSelectedUser?: any,
	updateFunctionToUse?: any
}

export default function Participant(props: ParticipantsProps) {
	const [isBanned, setIsBanned] = React.useState("ban");
	const [isMuted, setIsMuted] = React.useState("mute");

	const calledOnce = React.useRef(false);

	useEffect(() => {
		if (props.role === 'ban')
			setIsBanned("unban");
		else if (props.role === 'mute')
			setIsMuted("unmute");

		if (calledOnce.current) {
			return;
		}
		console.log('props of ' + props.username + ', owner: ' + props.owner + ', admin: ' + props.admin + ', role: ' + props.role);
		calledOnce.current = true;
	}, [isBanned, isMuted]);

	function setUpBan() {
		props.updateFunctionToUse(isBanned);
		if (isBanned === 'ban') {
			document.getElementById("ban-click").innerHTML = 'unban';
			setIsBanned("unban");
		}
		else {
			document.getElementById("ban-click").innerHTML = 'ban';
			setIsBanned("ban");
		}
	}

	function setUpMute() {
		props.updateFunctionToUse(isMuted);
		if (isMuted === 'mute') {
			document.getElementById("mute-click").innerHTML = 'unmute';
			setIsBanned("unmute");
		}
		else {
			document.getElementById("mute-click").innerHTML = 'mute';
			setIsBanned("mute");
		}
	}

	function setUpAdmin() {
		props.updateFunctionToUse("admin");
		document.getElementById("admin-click").remove();
	}

	function setUpBlock() {
		props.updateFunctionToUse("block");
		document.getElementById("block-click").remove();
	}

	function setUpLeave() {
		props.updateFunctionToUse("leave");
	}

	function setUpProfile() {
		props.updateFunctionToUse("profile");
	}

	return (
		<div className="participant--div">
			{<div className="dropdown show">
				<a className="btn btn-sm dropdown-toggle p--participant" role="button" data-toggle="dropdown" onClick={() => props.updateSelectedUser(props.username)}>
					{props.owner ? <FaCrown /> : ""} {props.username}
				</a>
				{props.currentUser === props.username ?
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
						<a className="dropdown-item" onClick={() => setUpLeave()}>leave</a>
					</div>
					:
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						<a id="ban-click" className="dropdown-item" onClick={() => setUpBan()}>{isBanned}</a>
						<a id="admin-click" className="dropdown-item" onClick={() => setUpAdmin()}>set admin</a>
						<a id="mute-click" className="dropdown-item" onClick={() => setUpMute()}>{isMuted}</a>
						<a className="dropdown-item" onClick={() => props.updateFunctionToUse("invite")}>invite to play</a>
						<a className="dropdown-item" onClick={() => setUpBlock()}>block</a>
						<a className="dropdown-item" onClick={() => setUpProfile()}>see profile</a>
					</div>
				}
			</div>
			}
		</div>);
}
