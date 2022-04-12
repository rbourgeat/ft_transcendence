import './People.scss';
import Nav from '../Nav/Nav';
import Footer from "../Footer/Footer";
import All from "./All/All";
import Invitations from "./Invitations/Invitations";
import Friends from "./Friends/Friends";
import Blocked from "./Blocked/Blocked";
import React, {useState, useEffect} from "react";
import axios from "axios";

export interface PeopleProps {
	login?: string
}

export default function People(props: PeopleProps) {

	function update() {
		window.top.location = "/people/";
	}

	const [authorized, setAuthorized] = React.useState(false);
	const calledOnce = React.useRef(false);

	async function getUser() {
		let url = "http://localhost:3000/api/auth/";

		axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post['Accept'] = '*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;

		let username = "";
		axios.get(url)
			.then(res => {
				username = res.data.login;
				console.log(res);
				setAuthorized(true);
				//setLoaded(true);
				//setUsername(username);
			})
			.catch((err) => {
				console.log("Auth returned 400 -> missing cookie");
				setAuthorized(false);
			})
	}

	useEffect(() => {
        if (calledOnce.current) {
			return;}
		getUser();
        calledOnce.current = true;
	}, []);



	return (
		<>
			{localStorage.getItem("loggedIn") != "true" || authorized != false?
				<>
					<Nav />
					<div className="container">
						<div className="row d-flex justify-content-center text-center">
							<div className="col-9">
								<div className="channels-not-logged">
									<p>You are not logged in or properly authenticated (no cookie).</p>
								</div>
							</div>
						</div>
					</div>
				</>
				:
				<div id="people--div">
					<Nav />
					{/*<button onClick={update}>update</button>*/}
					<div id="all">
						<div className="row">
							<br />
							<All login={props.login} />
							<br />
							<Friends />
							<br />
							<Invitations />
							<br />
							<Blocked />
						</div>
					</div>
				</div>
			}
		</>
	);
}
