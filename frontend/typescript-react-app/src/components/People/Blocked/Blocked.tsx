import './Blocked.scss';
import React, { useEffect } from "react";
import axios from "axios";
import MiniDisplay from '../MiniDisplay/MiniDisplay';

export default function Blocked() {

	const [users, setUsers] = React.useState([]);
	const [load, setLoad] = React.useState(false);
	// const calledOnce = React.useRef(false);

	function renderBlocked() {
		axios.defaults.withCredentials = true;
		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/user/relation/me/allBlocked";
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/user/relation/me/allBlocked");

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
	}

	useEffect(() => {
		// if (calledOnce.current) {
		// 	return;
		// }
		renderBlocked();
		// calledOnce.current = true;
	}, []);

	return (
		<div id="blocked-div">
			<div id="container--blocked" className="container">
				<br />
				<div className="row" id="row--users_blocked">
					<div id="ul--list" className="row">
						<h1 className="text-people" id="displaying--blocked">Blocked</h1>
						<br />
						<ul id="list--users--ul" className="wrapper list-group list-group-horizontal-lg">
							{load == true && users.length == 0 ? <p className="no--contact">No blocked user 😇</p> : ""}
							{load == true ?
								users.map(user => <MiniDisplay key={user.login} login={user.login} status={user.status} avatar={user.avatar} ftlogin={user.login42} user={user} extra="blocked" container="blocked" />)
								: ""}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
