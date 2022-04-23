import './ListChannels.scss';
import React, { useEffect } from "react";
import axios from "axios";
import DisplayChan from './DisplayChan/DisplayChan';
import { ToastContainer } from 'react-toastify';
import CreateChan from '../CreateChan/CreateChan';
import CreateDM from "../CreateChan/CreateDM";
import JoinChan from '../CreateChan/JoinPubChan';

export interface ListChannelsProps {
	setHasPass?: any,
	login: string,
	setIsChan?: any,
	minIdDM?: any,
	setActiveID?: any,
	setActiveName?: any
}

export default function ListChannels(props: ListChannelsProps) {
	const [channels, setChannels] = React.useState([{}]);
	const [DMs, setDMs] = React.useState([{}]);
	const [receiver, setReceiver] = React.useState([]);

	//Affichage sélection DM ou channels
	const [selectedCat, setSelectedCat] = React.useState("Channels");
	const [load, setLoad] = React.useState(false);

	const [minId, setMinID] = React.useState(0);

	const [exited, setExited] = React.useState(false);
	const [update, setUpdate] = React.useState("");
	const calledOnce = React.useRef(false);
	const [count, setCount] = React.useState(0);

	function renderListChannels() {
		axios.defaults.withCredentials = true;
		const url = "http://localhost:3000/api/chat/joinedChannels";
		axios.get(url)
			.then(res => {
				let channels = res.data;
				let len = channels.length;
				let i = 0;
				let first = 0;
				while (i < len) {
					if (channels[i].direct === false) {
						if (first === 0) {
							setMinID(channels[i].id);
							first = 1;
							setCount(1);
							console.log("count is " + count);
						}
						setChannels(prevArray => [...prevArray, channels[i]]);
						//On informe le component parent qu'on va se focus sur une chan
					}
					//console.log("min id is " + minId);
					i++;
				}
				//console.log(channels);
				//setCount(res.data.length);
				//console.log("count is " + count);
				setLoad(true);
				props.setIsChan(true);
				//props.setIsDM(false);
			})
			.catch((error) => {
				console.log("Error while getting all channels");
			})
	}

	function renderListDMs() {
		//console.log("should render dms");
		axios.defaults.withCredentials = true;
		const url = "http://localhost:3000/api/chat/joinedChannels";
		axios.get(url)
			.then(res => {
				let DMs = res.data;
				let len = DMs.length;
				let i = 0;
				let first = 0;

				console.log(res);

				console.log(res.data.participates);

				//if (res.data.participates[0].login == props.login)
				//	setReceiver(res.data.participates[1].login);
				//else
				//	setReceiver(res.data.participates[0].login);

				//console.log("The receiver is " + receiver);

				//trier sur direct true
				while (i < len) {
					if (DMs[i].direct === true) {
						if (first === 0) {
							setMinID(DMs[i].id);
							first = 1;
							setCount(1);

						}
						setDMs(prevArray => [...prevArray, DMs[i]]);
						//let rec;
						//if (DMs[i].participates[0].login == props.login || DMs[i].participates[0].login === props.login)
						//{
						//	rec = DMs[i].participates[1].login;
						//}
						//else if (DMs[i].participates[0].login == DMs[i].participates[1].login)
						//{
						//	console.log("Erreur, deux fois le même particpant");
						//}
						//else
						//{
						//	rec = DMs[i].participates[0].login;
						//}
						setReceiver(prevArray1 => [...prevArray1, DMs[i].participates]);
					}
					//console.log("min id is " + minId);
					console.log("DM found is" + DMs[i]);
					i++;
				}
				setLoad(true);
				props.setIsChan(false);
				//setLoad(true);//a re voir pour le set load
			})
			.catch((error) => {
				console.log("Error while getting all channels");
			})
	}

	function displaySelectedCat(arg: string) {
		if (arg === "Channels") {
			console.log("selected cat is Channels");
			props.setIsChan(true);
			renderListChannels();
		}
		else if (arg === "DMs") {
			console.log("selected cat is DMS");
			props.setIsChan(false);
			renderListDMs();
		}
	}

	//nécessaire pour mettre à jour suite à la fermeture d'un modal
	useEffect(() => {
		clean();
		displaySelectedCat(selectedCat);
	}, [exited])

	//permet d'afficher les channels sans faire de doublons
	useEffect(() => {
		if (load === true) {
			displaySelectedCat(selectedCat);
		}
	}, [])

	function clean() {
		let chans = Array.from(document.getElementsByClassName("displaying_channels"));
		let len = chans.length;
		let i: number = 0;
		while (i < len) {
			chans.pop();
			channels.pop();
			i++;
		}

		chans = Array.from(document.getElementsByClassName("displaying_dm"));
		len = chans.length;
		i = 0;
		while (i < len) {
			chans.pop();
			DMs.pop();
			i++;
		}
	}

	function displayDM() {
		setSelectedCat("DMs");
		setCount(0);
		let chans = Array.from(document.getElementsByClassName("displaying_channels"));
		let len = chans.length;
		let i: number = 0;
		while (i < len) {
			chans.pop();
			channels.pop();
			i++;
		}
		console.log("displaying DMs");
		displaySelectedCat("DMs");
	}

	function displayChannels() {
		setSelectedCat("Channels");
		setCount(0);
		let chans = Array.from(document.getElementsByClassName("displaying_dm"));
		let len = chans.length;
		let i: number = 0;
		while (i < len) {
			chans.pop();
			DMs.pop();
			i++;
		}
		displaySelectedCat("Channels");
	}

	return (
		<div id="listChannels" className="col-3" >
			<div id="channel--col">
				<div className="title--channel--col">
					<p className="channels-title">Channels</p>
				</div>
				<div className="add-channel-a">
					<CreateChan setExited={setExited} setUpdate={setUpdate} exited={exited} setHasPass={props.setHasPass} />
					<CreateDM setExited={setExited} setUpdate={setUpdate} exited={exited} />
					<JoinChan setExited={setExited} setUpdate={setUpdate} exited={exited} />
				</div>
				<p className="selected--categorie">{selectedCat === "Channels" ? "Channels you are in" : "Your direct messages"}</p>
				<div className="displaying-div">
					{load === true && selectedCat === "Channels" && count !== 0 ?
						Object.keys(channels).map(function (key, index) {
							if (channels[key].id !== undefined && selectedCat === "Channels") {
								return (
									<div key={channels[key].id} className="displaying_channels">
										<DisplayChan
											dm={DMs[key]}
											isChan={true}
											channel={channels[key]}
											minId={minId}
											login={props.login}
											setHasPass={props.setHasPass}
											setActiveID={props.setActiveID}
											setActiveName={props.setActiveName}
										/>
									</div>
								)
							}
						})
						: ""}
					{/* TODO: a tester css */}
					{load === true && selectedCat === "Channels" && count === 0 ?
						<>
							<p className="no_message">You have no channel 🥲</p>
						</>
						: ""}
					{load === true && selectedCat === "DMs" && count === 0 ?
						<>
							<p className="no_message">You have no DM 🥲</p>
						</>
						: ""}
					{load === true && selectedCat === "DMs" && count !== 0 ?
						Object.keys(DMs).map(function (key, index) {
							if (DMs[key].id !== undefined && selectedCat === "DMs") {
								return (
									<div key={DMs[key].id} className="displaying_dm">
										<DisplayChan
											dm={DMs[key]}
											isChan={false}
											channel={DMs[key]}
											minId={minId}
											login={props.login}
											setHasPass={props.setHasPass}
											setActiveID={props.setActiveID}
											setActiveName={props.setActiveName} />
									</div>)
							}
						})
						: ""}
				</div>
				<div className="send--dm_div">
					<button type="button" className="btn btn-light" id="send--dm" onClick={displayDM} disabled={selectedCat === "DMs" ? true : false}>DM</button>
					<button type="button" className="btn btn-light" id="display--channels" onClick={displayChannels} disabled={selectedCat === "Channels" ? true : false}>Channels</button>
				</div>
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
			</div>
		</div>
	);
}
