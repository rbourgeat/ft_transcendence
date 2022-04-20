import './Participant.scss';
import React, { useEffect } from "react";
import { FaCrown, FaVolumeMute, FaBan, FaShieldAlt } from "react-icons/fa";

export interface ParticipantsProps {
	currentUser?: string,
	currentUserAdmin?: boolean,
	username?: string,
	role?: string,
	owner?: boolean,
	admin?: boolean,
	updateSelectedUser?: any,
	updateFunctionToUse?: any,
	isChannel?: boolean,
}

export default function Participant(props: ParticipantsProps) {
	const [isBanned, setIsBanned] = React.useState("ban");
	const [isMuted, setIsMuted] = React.useState("mute");
	const [isAdmin, setIsAdmin] = React.useState(false);


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
		console.log('current user is:' + props.currentUser + ', its admin status:' + props.currentUserAdmin);
		calledOnce.current = true;
	}, [isBanned, isMuted, isAdmin]);

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
			setIsMuted("unmute");
		}
		else {
			document.getElementById("mute-click").innerHTML = 'mute';
			setIsMuted("mute");
		}
	}

	function setUpAdmin() {
		setIsAdmin(true);
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
				<p className="btn btn-sm dropdown-toggle p--participant" role="button" data-toggle="dropdown" onClick={() => props.updateSelectedUser(props.username)}>
					{props.owner ? <FaCrown /> : ""} {props.admin ? <FaShieldAlt /> : ""} {isBanned === "unban" ? <FaBan /> : ""}{isMuted === "unmute" ? <FaVolumeMute /> : ""} {props.username}
				</p>
				{props.currentUser === props.username ?
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
						<p className="dropdown-item" onClick={() => setUpLeave()}>leave</p>
					</div>
					:
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						{props.isChannel && props.currentUserAdmin ? <p id="admin-click" className="dropdown-item" onClick={() => setUpAdmin()}>set admin</p> : ""}
						{props.isChannel && props.currentUserAdmin ? <p id="ban-click" className="dropdown-item" onClick={() => setUpBan()}>{isBanned}</p> : ""}
						{props.isChannel && props.currentUserAdmin ? <p id="mute-click" className="dropdown-item" onClick={() => setUpMute()}>{isMuted}</p> : ""}
						<p className="dropdown-item" onClick={() => props.updateFunctionToUse("invite")}>invite to play</p>
						<p className="dropdown-item" onClick={() => setUpBlock()}>block</p>
						<p className="dropdown-item" onClick={() => setUpProfile()}>see profile</p>
					</div>
				}
			</div>
			}
		</div>);
}
