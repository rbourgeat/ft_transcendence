import './MiniDisplay.scss';
import axios from 'axios';
import MyAxios from '../../Utils/Axios/Axios';
import React, { Component, useState, useEffect } from 'react';

import { AiOutlineCloseCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsFillPersonPlusFill, BsFillPersonXFill } from "react-icons/bs";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faUser, faComment, faTrophy, faMagnifyingGlass, faDashboard, faUserFriends, faGamepad } from "@fortawesome/free-solid-svg-icons";

// IMPORTER CA
import io from "socket.io-client";

export interface MiniDisplayProps {
	login?: string,
	status?: string,
	avatar?: string
	children?: React.ReactNode | React.ReactChild | React.ReactChildren | React.ReactChild[] | React.ReactChildren[]
}

export default function MiniDisplay(props: MiniDisplayProps) {
	const [load, setLoad] = React.useState(false);
	const calledOnce = React.useRef(false);
	const [status, setStatus] = React.useState(props.status);

	const [username, setUsername] = React.useState("");

	function renderImage(avatar: string) {
		if (!avatar)
			return;

		let imageName = "alt-photo";

		if (avatar.startsWith("http")) {
			let imageUser42 = "https://cdn.intra.42.fr/users/".concat(props.login).concat(".jpg");
			var myImg = document.getElementById(props.login) as HTMLImageElement;
			if (imageUser42)
				myImg.src = imageUser42;
			else
				myImg.src = avatar;;
			return;
		}

		let url = "http://localhost:3000/api/user/".concat(avatar).concat("/avatar/");

		let res = axios.get(url, { responseType: 'blob' })
			.then(res => {
				let myImage: HTMLImageElement = document.querySelector("#".concat(props.login));
				var objectURL = URL.createObjectURL(res.data);
				myImage.src = objectURL;
				return (<img className="profile--pic" src={myImage.src} alt={imageName} id={props.login} height="80" />);
			})
			.catch((error) => {
				console.log("Catched error during get/fileId/avatar");
				return (<img className="profile--pic" src="https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" alt={imageName} height="80" width="80" id={props.login} />);
			})

	}

	// REPRENDRE USER ICI - SOCKET
	async function getUser() {
		let url = "http://localhost:3000/api/auth/";
		let username = "";
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;
		await axios.get(url)
			.then(res => {
				username = res.data.login;
				console.log(username + ' <-- result of get user')
			})
			.catch((err) => {
				console.log("Error while getting api auth");
			})
	}

	useEffect(() => {
		getUser();
		setLoad(true);

		if (calledOnce.current) {
			return;
		}
		setLoad(true);
		calledOnce.current = true;

		let socket = io("http://localhost:3000/chat", { query: { username: username } });
		socket.on("updateStatus", (pseudo, statusUpdated) => {
			if (pseudo) {
				console.log("name: " + pseudo + " / " + "status: " + statusUpdated);
				setStatus(statusUpdated);
			}
		})
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


	//demander à Mahaut comment faire appel à des fonctions situés dans d'autres fichiers (genre onclick = faire le addFrien)
	function testing() {
		console.log('click test');
	}

	return (
		<>
			<li id="minidisplay--div" className="list-group-item" key={props.login}>
				<img className="profile--pic" id={props.login} src="" width="100" height="100" onClick={testing} />
				{load == true ? renderImage(props.avatar) : console.log("test")}
				<svg className="log--color" height="40" width="40"><circle cx="20" cy="20" r="15" fill={color} /></svg>
				<br />
				<p className="user--p" id="mini--login">{props.login}</p>
				<p className="user--p" id="mini--status">{status}</p>
				<i className="user--action" onClick={testing}>{<BsFillPersonPlusFill />}</i>
				<i className="user--action" onClick={testing}>{<BsFillPersonXFill />}</i>
			</li>
		</>
	);
}
