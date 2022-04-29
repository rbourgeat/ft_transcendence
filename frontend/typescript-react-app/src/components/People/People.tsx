import './People.scss';
import Nav from '../Nav/Nav';
import Footer from "../Footer/Footer";
import All from "./All/All";
import Invitations from "./Invitations/Invitations";
import Friends from "./Friends/Friends";
import Blocked from "./Blocked/Blocked";
import SentInvitations from "./SentInvitations/SentInvitations";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters, AiOutlineLoading } from "react-icons/ai";


export interface PeopleProps {
	login?: string
}

export default function People(props: PeopleProps) {

	const [load, setLoad] = React.useState(false);
	const calledOnce = React.useRef(false);

	function update() {
		window.top.location = "/people/";
	}

	/*async*/
	function getUser() {
		let url = "http://localhost:3000/api/auth/";

		axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post['Accept'] = '*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;

		let username = "";
		/*await*/
		axios.get(url)
			.then(res => {
				username = res.data.login;
				setLoad(true);
			})
			.catch((err) => {
				;
			})
		//setLoad(true);
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
						{/*{load == false ?
							<div className="container">
								<div className="row d-flex justify-content-center text-center">
									<div className="mycontainer">
										<div className="spinner-border m-5" role="status">
											<span className="sr-only"><AiOutlineLoading /></span>
										</div>
									</div>
								</div>
							</div>
							:
							<>*/}
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
							{/*</>
						}*/}
					</div>
				</div>
			</div>
		</>
	);
}
