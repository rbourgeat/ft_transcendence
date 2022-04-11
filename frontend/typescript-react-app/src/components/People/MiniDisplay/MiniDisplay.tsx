import './MiniDisplay.scss';
import MyAxios from '../../Utils/Axios/Axios';
import React, { Component, useState, useEffect, Suspense, lazy } from 'react';
import { AiOutlineCloseCircle, AiFillPlusCircle, AiFillCheckCircle } from "react-icons/ai";
import { BsFillPersonPlusFill, BsFillPersonXFill } from "react-icons/bs";
import io from "socket.io-client";
import axios from 'axios';
import { MdCancel, MdCheck, MdBlock } from 'react-icons/md';
import { FiUserMinus, FiUserPlus, FiUserX } from 'react-icons/fi';
import { Oval, Hearts } from "react-loader-spinner";
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
	//children?: React.ReactNode | React.ReactChild | React.ReactChildren | React.ReactChild[] | React.ReactChildren[]
}

import ReactDOM from 'react-dom';

export default function MiniDisplay(props: MiniDisplayProps) {
	const [load, setLoad] = React.useState(false);
	const calledOnce = React.useRef(false);
	const [status, setStatus] = React.useState(props.status);
	const [username, setUsername] = React.useState("");

	function renderImage(avatar: string, login: string, ftlogin: string) {
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
			var myImg = document.getElementById(props.login) as HTMLImageElement;
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

		let url = "http://localhost:3000/api/user/".concat(avatar).concat("/avatar/");

		let res = axios.get(url, { responseType: 'blob' })
			.then(res => {
				let myImage: HTMLImageElement = document.querySelector("#".concat(props.login));
				var objectURL = URL.createObjectURL(res.data);
				myImage.src = objectURL;

				//				if (props.container == "friends")
				//					console.log('get avatar of' + login + 'suceed');

				return (<img className="profile--pic" src={myImage.src} alt={imageName} id={props.login} height="80" />);
			})
			.catch((error) => {
				console.log("Catched error during get/fileId/avatar");
				return (<img className="profile--pic" src="https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" alt={imageName} height="80" width="80" id={props.login} />);
			})
	}

	useEffect(() => {
		if (calledOnce.current) {
			return;
		}
		setLoad(true);
		calledOnce.current = true;
	}, []);


	const [color, setColor] = React.useState("");
	let url = "http://localhost:3000/api/user/".concat(props.login);
	let res = axios.get(url)
		.then(res => {
			if (res.data.status == "offline")
				setColor("grey")
			if (res.data.status == "online")
				setColor("green")
			if (res.data.status == "ingame")
				setColor("purple")
		})
		.catch((error) => {
			console.log("Catched error during get/logind/user");
		})

	function addContact(login: string) {
		let ax = new MyAxios(null);
		return (ax.post_api_user_relation_sendInvation_id(login));

	}

	function blockContact(login: string) {
		let ax = new MyAxios(null);
		return (ax.post_relation_block(login));
	}

	function acceptInvitation(login: string) {
		let ax = new MyAxios(null);
		return (ax.post_api_user_relation_answerInvitation_id(login, "accepted"));
	}

	function refuseInvitation(login: string) {
		let ax = new MyAxios(null);
		return (ax.post_api_user_relation_answerInvitation_id(login, "declined"));
	}

	function removeContact(login: string) {
		let ax = new MyAxios(null);
		return (ax.delete_relation_id(login));
	}

	function unblockContact(login: string) {

		var x = document.getElementById("button-action");
		if (x.style.display === "none") {
			x.style.display = "block";
		} else {
			x.style.display = "none";
		}

		let ax = new MyAxios(null);
		return (ax.delete_relation_unblock(login));
	}

	function gotoprofile() {
		let url = "http://localhost:3030/profile/".concat(props.login);
		window.top.location = url;
	}

	function buttonToDidsplay(container: string) {
		if (container == "all")
			return (
				<>
					<i className="user--action" onClick={() => addContact(props.login)}>{<FiUserPlus />}</i>
					<i className="user--action" onClick={() => blockContact(props.login)}>{<FiUserX />}</i>
				</>
			)
		else if (container == "friends")
			return (
				<>
					<i className="user--action" onClick={() => removeContact(props.login)}>{<FiUserMinus />}</i>
				</>
			)
		else if (container == "invitation")
			return (
				<>
					<i className="user--action" onClick={() => acceptInvitation(props.login)}>{<AiFillCheckCircle />}</i>
					<i className="user--action" onClick={() => refuseInvitation(props.login)}>{<MdCancel />}</i>
				</>
			)
		else if (container == "blocked")
			return (
				<>
					<i id="button-action" className="user--action" onClick={() => unblockContact(props.login)}>unblock</i>
				</>
			)
	}

	return (
		<>
			<li id="minidisplay--div" className="list-group-item" key={props.login}>
				<Suspense fallback={<Hearts color="#ffe4e1" height={100} width={100} key={props.login} />}>
					<img className="profile--pic" id={props.login} src="" width="100" height="100" onClick={gotoprofile} />
					{load == true ? renderImage(props.avatar, props.login, props.ftlogin) : ""}
					<svg className="log--color" height="40" width="40">
						<circle cx="20" cy="20" r="15" fill={color} stroke="white" style={{ strokeWidth: '3' }} /></svg>
					<br />
					<p className="user--p" id="mini--login">{props.login}</p>
					<p className="user--p" id="mini--status">{status}</p>
					{buttonToDidsplay(props.container)}
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
				</Suspense>
			</li>
		</>
	);
}
