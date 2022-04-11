import './Blocked.scss';
import React, { Component, useState, useEffect } from "react";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";
import MiniDisplay from '../MiniDisplay/MiniDisplay';

export default function Blocked() {
	const [users, setUsers] = React.useState([]);
	const [load, setLoad] = React.useState(false);

	const calledOnce = React.useRef(false);

	async function renderBlocked() {
		axios.defaults.withCredentials = true;
		let url = "http://localhost:3000/api/user/relation/me/allBlocked";
		await axios.get(url)
			.then(res => {
				console.log("Get api me/allBlocked successfully called.");
				let users = res.data;
				let len = users.length;
				let i = 0;
				while (i < len) {
					setUsers(prevArray => [...prevArray, users[i]])
					i++;
				}
			})
			.catch((error) => {
				console.log("Error while getting my friends");
			})
		setLoad(true);
	}

	useEffect(() => {
		if (calledOnce.current) {
			return;
		}
		renderBlocked();
		calledOnce.current = true;
	}, []);

	return (
		<div id="blocked-div">
			<div id="container--invitations">
				<h1 className="text" id="displaying">Blocked</h1>
				<br />
				<div className="row" id="row--users">
					<div id="ul--list" className="row">
						<ul id="list--users--ul" className="wrapper list-group list-group-horizontal-lg">
							{load == true ?
								users.map(user => <MiniDisplay key={user.login} login={user.login} status={user.status} avatar={user.avatar} ftlogin={user.login42} user={user} container="blocked" />)
								: ""}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
