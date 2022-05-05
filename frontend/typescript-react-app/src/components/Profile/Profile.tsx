import React, { useState, useEffect, useRef, useContext } from 'react';
import './Profile.scss';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import ToastAlerts from '../Utils/ToastAlerts/ToastAlerts';
import Nav from "../Nav/Nav";
import { useParams } from 'react-router-dom'
import NotFound from "../../components/NotFound/NotFound";
import MyAxios from '../Utils/Axios/Axios';
import MatchHistory from '../MatchHistory/MatchHistory';
import Achievement from '../Achievements/Achievements';
import Badge from "../Badge/Badge";
import Footer from "../Footer/Footer";
import { AiOutlineLoading3Quarters, AiOutlineLoading } from "react-icons/ai";

let url_begin = "";
if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
	url_begin = "http://localhost";
else
	url_begin = "http://".concat(process.env.REACT_APP_IP);

export interface ProfileProps {

	login?: string,
	avatar?: any,
	//socket?: any
}

export default function Profile() {
	const [color, setColor] = React.useState("");
	const [status, setStatus] = React.useState("offline");
	const calledOnce = React.useRef(false);
	const [userOK, setUserOk] = React.useState(false);
	const [is42, setis42] = React.useState(false);
	const { login } = useParams();

	const [isFriend, setisFriend] = React.useState(false);
	const [isBlocked, setisBlocked] = React.useState(false);

	const [receivedInvitation, setReceivedInvitation] = React.useState(false);
	const [sentInvitation, setSentInvitation] = React.useState(false);

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
	const [ftlogin, setftLogin] = React.useState("");
	const [avatar, setAvatar] = React.useState();
	
	// function getAvatar()
	// {
	// 	let url = "";
	// 	if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
	// 		url = "http://localhost:3000/api/user/".concat(login);
	// 	else 
	// 		url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/user/").concat(login);
		
	// 	return ;

	// }

	function getUserLogin(log: string) {
		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/user/".concat(login);
		else 
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/user/").concat(login);

		axios.get(url)
			.then(res => {
				setUserOk(true);
				setNextLevel(res.data.percent_to_next_lvl);
				setLevel(res.data.level);
				setRank(res.data.rank)
				setPoints(res.data.points);
				setTotalGames(res.data.total_games);
				setLoss(res.data.total_loss);
				setWins(res.data.total_wins);
				setRatio(res.data.win_loss_ration);
				setXp(res.data.xp);
				setAvatar(res.data.avatar);
				if (res.data.status === "offline")
					setColor("grey")
				if (res.data.status === "online") {
					setColor("green");
					setStatus("online");
				}
				if (res.data.status === "ingame") {
					setColor("purple");
					setStatus("ingame")
				}
			})
			.catch((err) => {
				;
			})
		setLoad(true);
	}

	// function renderImage(login: string, isUserProfile: boolean) {
	// 	let ax = new MyAxios(null);
	// 	let log42 = localStorage.getItem("login42");
	// 	// let logi = localStorage.getItem("login");

	// 	console.log("login is " + login + " and login42 is " + log42);

	// 	let haschanged = false;
	// 	if (login != log42)
	// 		haschanged = true;
	// 	if (isUserProfile == false)
	// 		haschanged = false;
	// 	// if (log42 != "" && log42 != null && log42 != undefined)
	// 		// return (ax.render_avatar(login, log42, haschanged));
	// 	return (ax.render_avatar(login, log42, haschanged, isUserProfile));
	// }

	function renderImage(avatar: string, login: string, ftlogin?: string, extra?: string) {
		if (!avatar)
			return;

		console.log("avatar is " + avatar);

		if (avatar.startsWith("http")) {

			//console.log("youpi !");

			return (<img className="profile--pic"
						width="100" height="100"
						src={avatar}
						id={login} />);

			var myImg = document.getElementById(login) as HTMLImageElement;
		}

		let url = "";

		// console.log("hihi");

		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/user/".concat(avatar).concat("/avatar");
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/user/").concat(avatar).concat("/avatar/");

		let res = axios.get(url, { responseType: 'blob' })
			.then(res => {
				let myImage: HTMLImageElement = document.querySelector("#".concat(login + "_" + extra));
				var objectURL = URL.createObjectURL(res.data);
				myImage.src = objectURL;
				return (<img className="profile--pic"
				width="100" height="100"
				src={myImage.src} id={login} />);
			})
			.catch((error) => {
				return (<img className="profile--pic"
				width="100" height="100"
				src="https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" id={login} />);
			})
	}

	useEffect(() => {
		if (calledOnce.current) {
			return;
		}
		getUserLogin(login)
		buttonToDisplay();

		calledOnce.current = true;
	}, []);

	function buttonToDisplay() {

		let friends: boolean;
		let url = url_begin.concat(":3000/api/user/relation/relationStatusWith/").concat(login);

		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;

		axios.get(url)
			.then(res => {
				let relation = res.data;
				let status = relation.status;
				if (relation.status == "accepted") {
					friends = true;
					setisFriend(true);
					let message = "You are friends !";
				}
				else if (relation.status == "pending" && relation.receiver == login) {
					setSentInvitation(true);
					setPendingInvite(true);
				}
				else if (relation.status == "pending" && relation.sender == login) {
					setReceivedInvitation(true);
					setPendingInvite(true);
				}
				else if (relation.status == "blocked" && relation.receiver == login) {
					setisBlocked(true);
				}
				else {
					setisFriend(false);
				}
			})
			.catch((error) => {
				friends = false;
				;
			})
	}

	function inviteFriend() {
		let ax = new MyAxios(null);
		ax.post_api_user_relation_sendInvation_id(login);
		window.top.location = url_begin.concat(":3030/profile/").concat(login);
	}

	function acceptFriend() {
		let ax = new MyAxios(null);
		ax.post_api_user_relation_answerInvitation_id(login, "accepted", "");
		window.top.location = url_begin.concat(":3030/profile/").concat(login);
	}

	function declineFriend() {
		let ax = new MyAxios(null);
		ax.post_api_user_relation_answerInvitation_id(login, "declined", "");
		window.top.location = url_begin.concat(":3030/profile/").concat(login);
	}

	function block() {
		let ax = new MyAxios(null);
		ax.post_relation_block(login, "people");
		window.top.location = url_begin.concat(":3030/profile/").concat(login);
	}

	function askToPlay() {
		let selectedUser = login;
		// console.log("You are inviting " + selectedUser + " to play !");
		window.top.location = url_begin.concat(":3030/game?vs=").concat(selectedUser);
	}

	function unblock() {
		let ax = new MyAxios(null);
		ax.delete_relation_unblock(login, "");
	}

	function remove() {
		let ax = new MyAxios(null);
		ax.delete_relation_id(login, "");
	}

	let isUser = (login == localStorage.getItem("login") ? true : false);
	return (
		<>
			<div id="profile--div">
				<Nav />
				<div className="container">
					<div className="row d-flex justify-content-center text-center">
						<br />
						<div className="col-9" id="main--profile--div">
							<div>
								<br />
								{userOK == true ?
									<div id="profile--div">
										<h3 className="profile--type">{isFriend == true ? "Friend profile" : "Public profile"}</h3>
										<br />
										<div id="text-type">{isFriend == true ? "You are able to see a detailed profile because you are friends 🥰 !"
											: "You are not able to see a detailed profile because you are not friends 😢 !"}</div>
										<img id={login} width="100" height="100" className="profile--pic" src="" />
										{/* {renderImage("", login, isUser)} */}
										{renderImage(avatar, login)}
										<svg className="log--color" height="40" width="40">
											<circle cx="20" cy="20" r="15" fill={color} stroke="white" style={{ strokeWidth: '3' }} />
										</svg>
										<h2 id="profile-title">{login}</h2>
										<p className="status-text">{status}</p>
										<div className="row d-flex justify-content-center text-center" id="relations">
											{isFriend == false && pendingInvite == false && isBlocked == false ? <button type="button" className="btn btn-outline-success" id="invite--buton" onClick={inviteFriend}>Invite</button> : ""}
											{isFriend == false && pendingInvite == true && receivedInvitation == true && isBlocked == false ?
												<>
													<br />
													<br />
													<p className="profile_text">{login} wants to be your friend ! </p>
													<br />
												</>
												: ""}
											{isFriend == false && pendingInvite == true && receivedInvitation == true && isBlocked == false ?
												<>
													<button type="button" className="btn btn-outline-success" id="invite--buton" onClick={acceptFriend}>
														Accept
													</button>
													<button type="button" className="btn btn-outline-danger" id="invite--buton" onClick={declineFriend}>
														Decline
													</button>
												</>
												: ""}
											<div className="row d-flex justify-content-center text-center" id="relations">
												{isFriend == false && pendingInvite == true && sentInvitation == true && isBlocked == false ? <button type="button" className="btn btn-outline-info" id="invite--buton" disabled /*onClick={inviteFriend}*/>Sent Invitation</button> : ""}
											</div>
											{isFriend == false && pendingInvite == true && sentInvitation == true && isBlocked == false ?
												<>
													<p className="profile_text"> Waiting for {login} to answer to your invitation !</p>
													<br />
												</>
												: ""}
										</div>
										<div className="row d-flex justify-content-center text-center" id="friends--related">
											{isBlocked != true ? <button type="button" className="btn btn-outline-danger" id="block--buton" onClick={block}>Block</button> : ""}
											{isFriend == true ? <button type="button" className="btn btn-outline-danger" id="remove--buton" onClick={remove}>Remove</button> : ""}
										</div>
										<div className="row d-flex justify-content-center text-center" id="games--related">
											{status == "online" && isBlocked == false ? <button type="button" className="btn btn-outline-dark" id="play--buton" onClick={askToPlay}> Ask to Play</button> : ""}
											{isBlocked == true ?
												<>
													<br />
													<p className="block-warning">You blocked this user !</p>
													<button type="button" className="btn btn-outline-danger" id="unblock--buton" onClick={unblock}>Unblock</button>
												</>
												: ""}
											<br />
										</div>
										<div id="relationship">
										</div>
										<br />
										{isFriend == true ? <Achievement login={login} /> : ""}
										<br />
										{isFriend == true ? <MatchHistory login={login} /> : ""}
										<br />
										<ToastContainer
											position="top-right"
											autoClose={5000}
											hideProgressBar={false}
											newestOnTop={false}
											closeOnClick
											rtl={false}
											pauseOnFocusLoss
											draggable
											pauseOnHover
										/>
										{isFriend == true ? <Badge
											rank={rank}
											level={level}
											login={login}
											total_wins={wins}
											total_loss={loss}
											total_games={totalGames}
											win_loss_ratio={ratio}
											xp={xp}
											points={points}
											to_next={nextlevel}
										/> : ""}

									</div>
									: <>
									</>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
