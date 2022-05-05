import './MiniDisplay.scss';
import MyAxios from '../../Utils/Axios/Axios';
import React, { Component, useState, useEffect } from 'react';
import { AiOutlineCloseCircle, AiFillPlusCircle, AiFillCheckCircle, AiFillUnlock } from "react-icons/ai";
import { BsFillPersonPlusFill, BsFillPersonXFill } from "react-icons/bs";
import io from "socket.io-client";
import axios from 'axios';
import { MdCancel, MdCheck, MdBlock } from 'react-icons/md';
import { FiUserMinus, FiUserPlus, FiUserX } from 'react-icons/fi';
import { FaMarsStroke } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

export interface MiniDisplayProps {
	login?: string,
	status?: string,
	avatar?: string,
	isft?: boolean,
	ftlogin?: string,
	user?: any;
	container?: string;
	relation?: string;
	extra?: string;
	currentUser?: string;
	//key?: any
	//socket?: any
}

export default function MiniDisplay(props: MiniDisplayProps) {
	const [load, setLoad] = React.useState(false);
	const calledOnce = React.useRef(false);
	const [status, setStatus] = React.useState(props.status);
	const [username, setUsername] = React.useState("");
	const [color, setColor] = React.useState("green");
	const [relationStatus, setRelationStatus] = React.useState("");

	const [socket, setSocket] = React.useState(io("http://".concat(process.env.REACT_APP_IP).concat(":3000/chat"), { query: { username: username } }));

	function getUser() {
		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/auth/";
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/auth");
		let username = "";
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;
		axios.get(url)
			.then(res => {
				setUsername(res.data.login);
				username = res.data.login;
				setLoad(true);
			})
			.catch((err) => {
				// console.log("Error while getting api auth");
				;
			})
	}

	function renderImage(avatar: string, login: string, ftlogin: string, extra: string) {
		if (!avatar)
			return;
		let is42 = false;

		ftlogin == null || ftlogin == undefined || ftlogin == "" ? is42 = false : is42 = true;
		let imageName = "alt-photo";

		let chosenLogin = "";
		if (login != ftlogin && login != "" && login != null && login != undefined)
			chosenLogin = ftlogin;
		else
			chosenLogin = login;

		if (avatar.startsWith("http")) {
			let imageUser42 = "https://cdn.intra.42.fr/users/".concat(chosenLogin).concat(".jpg");
			var myImg = document.getElementById(props.login.concat("_" + props.extra)) as HTMLImageElement;
			if (is42 == false) {
				myImg.src = "https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg";
				return;
			}
			else {
				if (imageUser42)
					myImg.src = imageUser42;
				else
					myImg.src = avatar;
				return;
			}
		}
		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/user/".concat(avatar).concat("/avatar");
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/user/").concat(avatar).concat("/avatar/");

		let res = axios.get(url, { responseType: 'blob' })
			.then(res => {
				let myImage: HTMLImageElement = document.querySelector("#".concat(login + "_" + extra));
				var objectURL = URL.createObjectURL(res.data);
				myImage.src = objectURL;
				return (<img className="profile--pic" src={myImage.src} alt={imageName} id={props.login.concat("_" + props.extra)} height="100" width="100" />);
			})
			.catch((error) => {
				return (<img className="profile--pic" src="https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" alt={imageName} height="100" width="100" id={props.login.concat("_" + props.extra)} />);
			})
	}

	function selectColor() {
		if (status == "offline")
			setColor("grey")
		if (status == "online")
			setColor("green")
		if (status == "ingame")
			setColor("purple")
	}

	function addContact(login: string) {
		let ax = new MyAxios(null);
		return (ax.post_api_user_relation_sendInvation_id(login));

	}

	function blockContact(login: string) {
		let ax = new MyAxios(null);
		return (ax.post_relation_block(login, "people"));
	}

	function acceptInvitation(login: string) {
		let ax = new MyAxios(null);
		return (ax.post_api_user_relation_answerInvitation_id(login, "accepted", props.extra));
	}

	function refuseInvitation(login: string) {
		let ax = new MyAxios(null);
		return (ax.post_api_user_relation_answerInvitation_id(login, "declined", props.extra));
	}

	function removeContact(login: string) {
		let ax = new MyAxios(null);
		return (ax.delete_relation_id(login, props.extra));
	}

	function unblockContact(login: string) {
		let ax = new MyAxios(null);
		return (ax.delete_relation_unblock(login, props.extra));
	}

	function gotoprofile() {
		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3030/profile/".concat(props.login);
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3030/profile/").concat(props.login);
		window.top.location = url;
	}

	function azer(isBlocked) {
		return (
			<>
				{isBlocked ? "" : <i className="user--action" onClick={() => addContact(props.login)}>{<FiUserPlus />}</i>}
			</>
		)
	}
	function buttonToDidsplay() {
		if (props.container === "all") {

			let isBlocked: boolean = false;
			let isFriend: boolean = false;
			let url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/user/relation/relationStatusWith/").concat(props.login);

			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
			axios.defaults.withCredentials = true;

			axios.get(url)
				.then(res => {
					let relation = res.data;
					let status = relation.status;
					setRelationStatus(status);
				})
				.catch((error) => {
				})

			if (relationStatus === "accepted" || relationStatus === "pending")
				isFriend = true;
			else if (relationStatus === "blocked")
				isBlocked = true;

			return (
				<>
					{isFriend ? "" :
						azer(isBlocked)
					}
					{isBlocked ? "" : <i className="user--action" onClick={() => blockContact(props.login)}>{<FiUserX />}</i>}
				</>
			)
		}
		else if (props.container === "friends")
			return (
				<>
					<i className="user--action" onClick={() => removeContact(props.login)}>{<FiUserMinus />}</i>
				</>
			)
		else if (props.container === "invitation")
			return (
				<>
					<i className="user--action" onClick={() => acceptInvitation(props.login)}>{<AiFillCheckCircle />}</i>
					<i className="user--action" onClick={() => refuseInvitation(props.login)}>{<MdCancel />}</i>
				</>
			)
		else if (props.container === "sent")
			return (
				<>
					<p className="waiting">Waiting for {props.login} to answer</p>
				</>
			)
		else if (props.container === "blocked")
			return (
				<>
					<i id="button-action" className="user--action" onClick={() => unblockContact(props.login)}>{<AiFillUnlock />}</i>
				</>
			)
	}

	useEffect(() => {
		getUser();
		setLoad(true);
		selectColor();
		calledOnce.current = true;

		socket.on('updateStatus', (...args) => {
			if (props.login == args[0]) {
				//console.log("name: " + props.login + " / " + "status: " + args[1]);
				setStatus(args[1]);
				selectColor();
			}

		})
		//return () => { socket.disconnect() }
	}, [status, color]);

	return (
		<div className="mini--display--div" id={"minidisplay".concat("_" + props.login + "_" + props.extra)}>
			<li className="list-group-item" key={props.extra ? props.login.concat(props.extra) : props.login}>
				<div className="mini-display-li">
					<img
						className="profile--pic"
						id={props.login.concat("_" + props.extra)}
						src="https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg"
						width="100"
						height="100"
						onClick={gotoprofile}
					/>
					{load == true ?
						<>
							{renderImage(props.avatar, props.login, props.ftlogin, props.extra)}
						</>

						:
						<div className="d-flex justify-content-center">
							<div className="spinner-border" role="status">
							</div>
						</div>
					}
					<br />
					<p className="user--p" id={"mini--login".concat("_" + props.login)}>{props.login}</p>
					{buttonToDidsplay()}
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
				</div>
				<svg className="log--color" height="40" width="40">
					<circle className="svg_circle" cx="20" cy="20" r="15" fill={color} stroke="white" style={{ strokeWidth: '3' }} />
				</svg>
			</li>
		</div>
	);
}
