import './Invitations.scss';
import React, { Component, useState, useEffect } from "react";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";
import MiniDisplay from '../MiniDisplay/MiniDisplay';

export default function Invitations() {
	const [users, setUsers] = React.useState([]);
	const [load, setLoad] = React.useState(false);

	const calledOnce = React.useRef(false);

	async function renderInvitations() {
		axios.defaults.withCredentials = true;
		let url = "http://localhost:3000/api/user/relation/me/pendingInvitations";
		await axios.get(url)
			.then(res => {
				console.log("Get api me/pendingInvitations successfully called.");
				let users = res.data.map(element => element.creator)
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
		renderInvitations();
		calledOnce.current = true;
	}, []);

	return (
		<div id="invitation-div">
			<div id="container--invitations">
				<h2 className="text" id="displaying">Invitations received</h2>
				<br />
				<div className="row" id="row--users">
					<div id="ul--list" className="row">
						<ul id="list--users--ul" className="wrapper list-group list-group-horizontal-lg">
							{load == true ?
								users.map(user => <MiniDisplay key={user.login} login={user.login} status={user.status} avatar={user.avatar} ftlogin={user.login42} user={user} container="invitation" />)
								: ""}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
