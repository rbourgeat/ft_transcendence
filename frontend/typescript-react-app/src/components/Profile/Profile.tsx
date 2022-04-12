import React, {useState, useEffect, useRef, useContext} from 'react';
import './Profile.scss';
import axios from "axios";
import Nav from "../Nav/Nav";
import { useParams } from 'react-router-dom'
import NotFound from "../../components/NotFound/NotFound";
import MyAxios from '../Utils/Axios/Axios';
import MatchHistory from '../MatchHistory/MatchHistory';
import Achievement from '../Achievements/Achievements';

export interface ProfileProps
{
	login?: string,
	avatar?: any
}

export default function Profile() {

	const [color, setColor] = React.useState("");

	const calledOnce = React.useRef(false);
	const [userOK, setUserOk] = React.useState(false);
	const [is42, setis42] = React.useState(false);

	function getUserLogin(log: string) {
		let url = "http://localhost:3000/api/user/".concat(login);

		axios.get(url)
		.then(res => {
			//console.log(res);
			setUserOk(true);
			if (res.data.status == "offline")
				setColor("grey")
			if (res.data.status == "online")
				setColor("green")
			if (res.data.status == "ingame")
				setColor("purple")
		})
		.catch((err) => {
			console.log("Error while getting api auth");
			console.log(err);
		})
	}

	function renderImage(login: string, isUserProfile: boolean) {
		let ax = new MyAxios(null);
		let log42 = localStorage.getItem("login42");
		let haschanged = false;
		if (login != log42)
			haschanged = true;
		if (isUserProfile == false)
			haschanged = false;
		if (log42 != "" && log42 != null && log42 != undefined)
			return (ax.render_avatar(login, log42, haschanged));
		return (ax.render_avatar(login, "", haschanged));
	}

	useEffect(() => {
	if (calledOnce.current) {
		return;}
	calledOnce.current = true;
}, []);

	const {login} = useParams();

	let isUser = (login == localStorage.getItem("login") ? true : false);
    return (
        <div id="profile--div">
			<Nav />
			<div className="container">
				<div className="row d-flex justify-content-center text-center">
					<br />
					<div className="col-6" id="main--profile--div">
						<div>
						<br />
						{getUserLogin(login)}
						{userOK == true ?
							<div id="profile--div">
								<img id={login} className="profile--pic" src="" width="100" height="100"/>
								<br />
								{renderImage(login, isUser)}
								<svg className="log--color" height="40" width="40">
									<circle cx="20" cy="20" r="15" fill={color} stroke="white" style={{ strokeWidth: '3' }} />
								</svg>
								<p className="status-text"></p>
								<br />
								<h2 id="profile-title">{login}</h2>
								<br />
								<Achievement login={login} />
								<br/>
								<MatchHistory login={login}/>
								<br/>
							</div>
						: <>
							<h1><span id="oops">Oops...</span></h1>
							<h2><span id="page-not-found">Page not found</span></h2>
							<button type="button" className="btn btn-outline-dark"
								onClick={(e) =>
									{window.top.location = "http://localhost:3030/game"}
								}
							>Go to game</button>
						</>
						}
					</div>
				</div>
			</div>
		</div>
    </div>
    )
}
