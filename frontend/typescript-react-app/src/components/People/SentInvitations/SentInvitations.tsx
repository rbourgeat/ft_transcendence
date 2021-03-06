import './SentInvitations.scss';
import React, { useEffect } from "react";
import axios from "axios";
import MiniDisplay from '../MiniDisplay/MiniDisplay';

export default function Invitations() {
	const [users, setUsers] = React.useState([]);
	const [load, setLoad] = React.useState(false);

	const calledOnce = React.useRef(false);

	function renderInvitations() {
		axios.defaults.withCredentials = true;
		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/user/relation/me/sentInvitations";
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/user/relation/me/sentInvitations");

		axios.get(url)
			.then(res => {
				let users = res.data.map(element => element.receiver)
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
		renderInvitations();
		// calledOnce.current = true;
		return () => { setLoad(false); };
	}, []);

	return (
		<div id="invitations--div_sent">
			<div id="container--invitations_sent" className="container">
				<br />
				<div className="row" id="row--users_invitations_sent">
					<h2 className="text-people" id="displaying--invitations_sent">Invitations sent</h2>
					<br />
					<div id="ul--list_invitations_sent" className="row">
						<ul id="list--users--ul_invitations" className="wrapper list-group list-group-horizontal-lg">
							{load == true && users.length == 0 ? <p className="no--contact">No sent invitation 💌</p> : ""}
							{load == true ?
								users.map(user => <MiniDisplay key={user.login} login={user.login} status={user.status} avatar={user.avatar} ftlogin={user.login42} user={user} extra="sent" container="sent" />)
								: ""}
						</ul>
					</div>
					<br />
				</div>
			</div>
		</div>
	);
}
