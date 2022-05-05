import './People.scss';
import Nav from '../Nav/Nav';
import All from "./All/All";
import Invitations from "./Invitations/Invitations";
import Friends from "./Friends/Friends";
import Blocked from "./Blocked/Blocked";
import SentInvitations from "./SentInvitations/SentInvitations";
import React, { useEffect } from "react";
import axios from "axios";

export interface PeopleProps {
	login?: string
}

export default function People(props: PeopleProps) {

	const [load, setLoad] = React.useState(false);
	const calledOnce = React.useRef(false);

	function update() {
		window.top.location = "/people/";
	}

	const [username, setUsername] = React.useState("");

	function getUser() {
		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/auth";
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/auth/");

		axios.defaults.baseURL = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api");
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post['Accept'] = '*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;

		axios.get(url)
			.then(res => {
				setUsername(res.data.login);
				setLoad(true);
			})
	}

	useEffect(() => {
		if (calledOnce.current) {
			return;
		}
		getUser();
		calledOnce.current = true;
	}, []);

	return (
		<>
			<div id="people--div">
				<Nav />
				<div id="all">
					<div className="row" id="row-all">
						<br />
						<All login={props.login} />
						<br />
						<Friends />
						<br />
						<Invitations />
						<br />
						<SentInvitations />
						<br />
						<Blocked />
						<br />
					</div>
				</div>
			</div>
		</>
	);
}
