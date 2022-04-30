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

export interface ProfileProps {
	login?: string,
	avatar?: any
}

export default function Profile() {
	//Check user et status
	const [color, setColor] = React.useState("");
	const [status, setStatus] = React.useState("offline");
	const calledOnce = React.useRef(false);
	const [userOK, setUserOk] = React.useState(false);
	const [is42, setis42] = React.useState(false);
	const { login } = useParams();

	//relation
	const [isFriend, setisFriend] = React.useState(false);
	const [isBlocked, setisBlocked] = React.useState(false);

	const [receivedInvitation, setReceivedInvitation] = React.useState(false);
	const [sentInvitation, setSentInvitation] = React.useState(false);

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

	/*async*/
	function getUserLogin(log: string) {
		let url = "http://localhost:3000/api/user/".concat(login);
		/*await*/
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
			return;
		}
		getUserLogin(login)
		buttonToDisplay();
		calledOnce.current = true;
	}, []);

	function buttonToDisplay() {

		let friends: boolean;
		let url = "http://localhost:3000/api/user/relation/relationStatusWith/".concat(login);

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
				//else if (relation.status == "blocked" && relation.creator == login) {
				//	console.log("You are blocked by this contact");
				//}
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
	}

	function acceptFriend() {
		let ax = new MyAxios(null);
		ax.post_api_user_relation_answerInvitation_id(login, "accepted", "");
		window.top.location = "http://localhost:3000/user/".concat(login);
	}

	function declineFriend() {
		let ax = new MyAxios(null);
		ax.post_api_user_relation_answerInvitation_id(login, "declined", "");
		window.top.location = "http://localhost:3000/user/".concat(login);
	}

	function block() {
		let ax = new MyAxios(null);
		ax.post_relation_block(login, "people");
	}

	function watchPlaying() {
		let toast = new ToastAlerts(null);
		toast.notifyDanger("To do @rbourgea");
	}

	function askToPlay() {
		let toast = new ToastAlerts(null);
		toast.notifyDanger("Not implemented yet");
	}

	function sendDM() {
		let toast = new ToastAlerts(null);
		toast.notifyDanger("Not implemented yet");
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
						<div className="col-6" id="main--profile--div">
							<div>
								<br />
								{load == false ?
									<div className="spinner-border m-5" role="status">
										<span className="sr-only"><AiOutlineLoading /></span>
									</div>

									: ""}
								{userOK == true ?
									<div id="profile--div">
										<h3 className="profile--type">{isFriend == true ? "Friend profile" : "Public profile"}</h3>
										<br />
										<div id="text-type">{isFriend == true ? "You are able to see a detailed profile because you are friends 🥰 !"
											: "You are not able to see a detailed profile because you are not friends 😢 !"}</div>
										<br />
										<img id={login} className="profile--pic" src="" width="100" height="100" />
										{load == false ? renderImage(login, isUser) : ""}
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
											{status == "ingame" && isBlocked == false ? <p className="profile_text">{login} is playing ! You can watch the game.</p> : ""}
											{status == "ingame" && isBlocked == false ? <button type="button" className="btn btn-outline-dark" id="watch--buton" onClick={watchPlaying}>Watch</button> : ""}
											{status == "online" && isBlocked == false ? <button type="button" className="btn btn-outline-dark" id="play--buton" onClick={askToPlay}> Ask to Play</button> : ""}
											{isBlocked == false ? <button type="button" className="btn btn-outline-dark" id="dm--buton" onClick={sendDM}>Send DM</button> : ""}
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
										<h1><span id="oops">Oops...</span></h1>
										<h2><span id="page-not-found">Page not found</span></h2>
										<button type="button" className="btn btn-outline-dark"
											onClick={(e) => { window.top.location = "http://localhost:3030/game" }
											}
										>Go to game</button>
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
