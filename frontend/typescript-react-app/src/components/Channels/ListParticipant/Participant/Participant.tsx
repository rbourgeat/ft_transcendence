import './Participant.scss';
import React, { useEffect } from "react";
import { FaCrown, FaVolumeMute, FaBan, FaShieldAlt, FaCircle } from "react-icons/fa";
import { io } from "socket.io-client";

export interface ParticipantsProps {
	socket?: any
	currentUser?: string,
	currentUserAdmin?: boolean,
	username?: string,
	role?: string,
	owner?: boolean,
	admin?: boolean,
	updateSelectedUser?: any,
	updateFunctionToUse?: any,
	isChannel?: boolean,
	isBanned?: boolean,
	status?: string
}

export default function Participant(props: ParticipantsProps) {
	const [isAdmin, setIsAdmin] = React.useState(false);
	const [color, setColor] = React.useState("green");
	const [status, setStatus] = React.useState(props.status);

	const calledOnce = React.useRef(false);

	function selectColor() {
		if (status == "offline")
			setColor("grey")
		if (status == "online")
			setColor("green")
		if (status == "ingame")
			setColor("purple")
	}

	useEffect(() => {
		selectColor();

		props.socket.on('updateStatus', (...args) => {
			if (props.username == args[0]) {
				setStatus(args[1]);
				selectColor();
			}
		})
	}, [status, color]);

	function setUpBan() {
		if (props.role === "ban")
			props.updateFunctionToUse("unban");
		else
			props.updateFunctionToUse("ban");
	}

	function setUpMute() {
		if (props.role === "mute")
			props.updateFunctionToUse("unmute");
		else
			props.updateFunctionToUse("mute");
	}

	function setUpAdmin() {
		setIsAdmin(true);
		props.updateFunctionToUse("admin");
	}


	function setUpBlock() {
		props.socket.emit('updateChat', true);
		props.updateFunctionToUse("block");
		document.getElementById("block-user").remove();
	}

	function setUpProfile() {
		props.updateFunctionToUse("profile");
	}

	//<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"></path></svg>

	return (
		<div className="participant--div">
			{<div className="dropdown show">
				<p className="btn btn-sm dropdown-toggle p--participant" role="button" data-toggle="dropdown" onClick={() => props.updateSelectedUser(props.username)}>
					{props.owner ? <FaCrown /> : ""} {props.admin ? <FaShieldAlt /> : ""} {props.role === "ban" ? <FaBan /> : ""}{props.role === "mute" ? <FaVolumeMute /> : ""} {props.username}  <FaCircle color={color} />
				</p>
				{props.currentUser === props.username ?
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
					</div>
					:
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						{props.isChannel && props.currentUserAdmin && !props.owner && !props.admin ? <p id="admin-click" className="dropdown-item" onClick={() => setUpAdmin()}>set admin</p> : ""}
						{props.isChannel && props.currentUserAdmin && !props.owner ? <p id="ban-click" className="dropdown-item" onClick={() => setUpBan()}>un/ban</p> : ""}
						{props.isChannel && props.currentUserAdmin && !props.owner ? <p id="mute-click" className="dropdown-item" onClick={() => setUpMute()}>un/mute</p> : ""}
						<p className="dropdown-item" onClick={() => props.updateFunctionToUse("invite")}>invite to play</p>
						<p id="block-user" className="dropdown-item" onClick={() => setUpBlock()}>block</p>
						<p className="dropdown-item" onClick={() => setUpProfile()}>see profile</p>
					</div>
				}
			</div>
			}
		</div>);
}
