import React, { Component, useState, useEffect } from 'react';
import Nav from "../Nav/Nav";
import './User.scss';
import axios from 'axios';
import MyAxios from '../Utils/Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
import EditUsernameModal from "./editUsername/EditUsername";
import Badge from "../Badge/Badge"
import Achievements from "../Achievements/Achievements";
import { Modal } from "react-bootstrap"
import Settings from "./Settings/Settings"
import MatchHistory from '../MatchHistory/MatchHistory';
import Login from '../Auth/Login/Login';
import { AiOutlineLoading3Quarters, AiOutlineLoading } from "react-icons/ai";
import io from "socket.io-client";

export interface UserfuncProps {
	username?: string,
	email?: string,
	password?: string,
	password_conf?: string,
	avatar?: string,
	totalGames?: number,
	totalWins?: number,
	totalLoss?: number,
	winLoss?: number
}

export default function User(props: UserfuncProps) {
	//User et check
	const [username, setUsername] = React.useState("");
	const [logged, setLogged] = React.useState(true);
	const [is42, setis42] = React.useState(false);
	const [login42, setlogin42] = React.useState("");
	const calledOnce = React.useRef(false);
	const [loaded, setLoaded] = React.useState(false);
	const [authorized, setAuthorized] = React.useState(true);

	//Badge
	const [load, setLoad] = React.useState(false);
	const [points, setPoints] = React.useState(0);
	const [rank, setRank] = React.useState(0);
	const [totalGames, setTotalGames] = React.useState(0);
	const [loss, setLoss] = React.useState(0);
	const [wins, setWins] = React.useState(0);
	const [ratio, setRatio] = React.useState(0);
	const [xp, setXp] = React.useState(0);
	const [level, setLevel] = React.useState(0);
	const [nextlevel, setNextLevel] = React.useState(0);
	const [pendingInvite, setPendingInvite] = React.useState(false);

	//Status socket
	const [color, setColor] = React.useState("grey");
	const [status, setStatus] = React.useState("online");

	const [socket, setSocket] = React.useState(io("http://".concat(process.env.REACT_APP_IP).concat(":3000/chat"), { query: { username: username } }));
	function getUser() {

		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/auth";
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/auth/");

		axios.defaults.baseURL = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/");
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post['Accept'] = '*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;

		let username = "";
		axios.get(url)
			.then(res => {
				username = res.data.login;
				setis42(true);
				setlogin42(res.data.login42);
				localStorage.setItem("login", res.data.login);
				localStorage.setItem("login42", res.data.login42);
				setNextLevel(res.data.percent_to_next_lvl);
				setLevel(res.data.level);
				setPoints(res.data.points);
				setRank(res.data.rank);
				setTotalGames(res.data.total_games);
				setLoss(res.data.total_loss);
				setWins(res.data.total_wins);
				setRatio(res.data.win_loss_ration);
				setXp(res.data.xp);

				if (res.data.status == "online") {
					setColor("green");
					setStatus("online");
				}
				if (res.data.status == "ingame") {
					setColor("purple");
					setStatus("ingame")
				}

				setUsername(username);
				socket.emit("update", res.data.login + ":online");
				setLoaded(true);
				renderImage(username);
			})
			.catch((err) => {
				;
			})
	}

	useEffect(() => {
		if (calledOnce.current) {
			return;
			//return () => { socket.disconnect() }
		}
		getUser();
		calledOnce.current = true;
		//return () => { socket.disconnect() }
	}, []);

	function renderImage(login: string) {
		let ax = new MyAxios(null);
		let log42 = localStorage.getItem("login42");

		let haschanged = false;
		if (login != log42)
			haschanged = true;

		if (log42 != "" && log42 != null && log42 != "null" && log42 != undefined)
			return (ax.render_avatar(login, log42, haschanged));

		return (ax.render_avatar(login, "", haschanged));
	}

	return (
		<div id="user--div">
			<Nav />
			<div className="container">
				<div className="row d-flex justify-content-center text-center">
					<div className="col-9">
						<div className="user--stats" key={username}>
							<>
								<br />
								<img id={username} className="profile--pic" height="80" width="80" />
								<svg className="log--color_profile" height="40" width="40">
									<circle cx="20" cy="20" r="15" fill={color} stroke="white" style={{ strokeWidth: '3' }} />
								</svg>
								<h2 id="user--data">{username}</h2>
								<div className="col-9 mx-auto text-center" id="input-div">
									<br />
									<Achievements login={username} />
									<br />
									<Badge
										rank={rank}
										total_wins={wins}
										total_loss={loss}
										total_games={totalGames}
										win_loss_ratio={ratio}
										xp={xp}
										points={points}
										to_next={nextlevel}
										level={level}
									/>
									<br />
									{loaded == true ? <MatchHistory login={username} /> : ""}
									<br />
								</div>
							</>
						</div>
					</div>
				</div>
			</div>
		</div >
	);
};
