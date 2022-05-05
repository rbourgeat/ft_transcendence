import './Participant.scss';
import React, { useEffect } from "react";
import { FaCrown, FaVolumeMute, FaBan, FaShieldAlt, FaCircle } from "react-icons/fa";

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
	const [color, setColor] = React.useState("green");
	const [status, setStatus] = React.useState(props.status);


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
