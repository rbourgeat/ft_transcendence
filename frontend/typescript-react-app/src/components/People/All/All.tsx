import './All.scss';
import React, { useState, useEffect } from "react";
import axios from "axios";
import MiniDisplay from '../MiniDisplay/MiniDisplay';

export interface InputWrapperProps {
	login?: string,
}

export default function All(props: InputWrapperProps) {
	const [users, setUsers] = React.useState([]);
	const [load, setLoad] = React.useState(true);
	// const calledOnce = React.useRef(false);

	function renderUsers() {
		axios.defaults.withCredentials = true;
		let log = localStorage.getItem("login");
		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/user/";
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/user/");

		axios.get(url)
			.then(res => {
				let users = res.data;
				let len = users.length;
				let i = 0;
				while (i < len) {
					if (users[i].login != log)
						setUsers(prevArray => [...prevArray, users[i]])
					i++;
				}
				setLoad(true);
			})
			.catch((error) => {
				;
			})
	}

	useEffect(() => {
		// if (calledOnce.current) {
		// 	return;
		// }
		renderUsers();
		// calledOnce.current = true;

		// let isMounted = true;

		return () => { setLoad(false); };
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
