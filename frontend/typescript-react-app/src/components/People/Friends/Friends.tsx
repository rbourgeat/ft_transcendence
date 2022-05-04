import './Friends.scss';
import React, { Component, useState, useEffect } from "react";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";
import MiniDisplay from '../MiniDisplay/MiniDisplay';

export default function Friends() {
	const [users, setUsers] = React.useState([]);
	const [load, setLoad] = React.useState(false);
	const calledOnce = React.useRef(false);

	function renderFriends() {
		axios.defaults.withCredentials = true;
		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/user/relation/me/allFriends";
		else 
		url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/user/relation/me/allFriends");

		axios.get(url)
			.then(res => {
				let users = res.data;
				let len = users.length;
				let i = 0;
				while (i < len) {
					setUsers(prevArray => [...prevArray, users[i]])
					i++;
				}
				setLoad(true);
			})
			.catch((error) => {
				;
			})
		;
	}

	useEffect(() => {
		if (calledOnce.current) {
			return;
		}
		renderFriends();
		calledOnce.current = true;
	}, []);

	return (
		<div id="friends--div">
			<div id="container--friends" className="container">
				<br />
				<div className="row" id="row--users_friends">
					<h1 className="text-people" id="displaying--friends">All my friends</h1>
					<br />
					<div id="ul--list" className="row">
						<ul id="list--users--ul" className="wrapper list-group list-group-horizontal-lg">
							{load == true && users.length == 0 ? <p className="no--contact">You have no friends 😢</p> : ""}
							{load == true ?
								users.map(user => <MiniDisplay key={user.login} login={user.login} status={user.status} avatar={user.avatar} ftlogin={user.login42} extra="friends" container="friends" />)
								: ""}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
