import './All.scss';
import React, { Component, useState, useEffect} from "react";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";
import Invitations from "../Invitations/Invitations";
import Blocked from "../Blocked/Blocked";
import Friends from "../Friends/Friends";
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import MiniDisplay from '../MiniDisplay/MiniDisplay';

export interface InputWrapperProps {
	login?: string
}

export default function All(props: InputWrapperProps) {
	const [users, setUsers] = React.useState([]);
	const [load, setLoad] = React.useState(true);
	const [count, setCount] = useState(0);
	const [stateLogin, setStateLogin] = React.useState(props.login);

	const calledOnce = React.useRef(false);

	async function renderUsers() {

		axios.defaults.withCredentials = true;
		let log = localStorage.getItem("login");
		let url = "http://localhost:3000/api/user/";
		await axios.get(url)
			.then(res => {
				let users = res.data;
				let len = users.length;
				let i = 0;
				while (i < len) {
					if (users[i].login != log)
						setUsers(prevArray => [...prevArray, users[i]])
					i++;
				}
			})
			.catch((error) => {
				;
			})
		setLoad(true);
	}

	useEffect(() => {
		if (calledOnce.current) {
			return;
		}
		renderUsers();
		calledOnce.current = true;

	}, []);

	return (
		<div id="people--div">
			<div id="container--all" className="container">
				<br />
				<div className="row" id="row--users_all">
					<div id="ul--list">
						<h1 id="registered--title">List of all registered users</h1>
						<ul id="list--users--ul" className="wrapper list-group list-group-horizontal-lg">
							{load == true ?
								users.map(user =>
									<div key={user.login}>
										<MiniDisplay key={user.login} login={user.login} status={user.status} avatar={user.avatar} ftlogin={user.login42} extra="all" container="all" currentUser={props.login} />
									</div>
								)
								: ""}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
