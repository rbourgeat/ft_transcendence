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
	setActiveName?: any,
	socket?: any,
	setHide?: any,
	setIsBanned?: any
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
		const url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/chat/joinedChannels");
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
						}
						setChannels(prevArray => [...prevArray, channels[i]]);
					}
					i++;
				}
				setLoad(true);
				props.setIsChan(true);
			})
			.catch((error) => {
				//console.log("Error while getting all channels");
				;
			})
	}

	function renderListDMs() {
		axios.defaults.withCredentials = true;
		const url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/chat/joinedChannels");
		axios.get(url)
			.then(res => {
				let DMs = res.data;
				let len = DMs.length;
				let i = 0;
				let first = 0;

				while (i < len) {
					if (DMs[i].direct === true) {
						if (first === 0) {
							setMinID(DMs[i].id);
							first = 1;
							setCount(1);

						}
						setDMs(prevArray => [...prevArray, DMs[i]]);
						setReceiver(prevArray1 => [...prevArray1, DMs[i].participates]);
					}
					i++;
				}
				setLoad(true);
				props.setIsChan(false);
			})
			.catch((error) => {
				//console.log("Error while getting all channels");
				;
			})
	}

	function displaySelectedCat(arg: string) {
		if (arg === "Channels") {
			props.setIsChan(true);
			renderListChannels();
		}
		else if (arg === "DMs") {
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
					<JoinChan socket={props.socket} setExited={setExited} setUpdate={setUpdate} exited={exited} login={props.login} />
				</div>
				<p className="selected--categorie">{selectedCat === "Channels" ? "Your Channels" : "Your direct messages"}</p>
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
											setHide={props.setHide}
										/>
									</div>
								)
							}
						})
						: ""}
					{load === true && selectedCat === "Channels" && count === 0 ?
						<>
							<p className="no_message">You have no channel</p>
						</>
						: ""}
					{load === true && selectedCat === "DMs" && count === 0 ?
						<>
							<p className="no_message">You have no DM</p>
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
											setActiveName={props.setActiveName}
											setHide={props.setHide}
										/>
									</div>)
							}
						})
						: ""}
				</div>
				<div className="send--dm_div">
					<button type="button" className="send--dm" onClick={displayDM} disabled={selectedCat === "DMs" ? true : false}>DM</button>
					<button type="button" className="display--channels" onClick={displayChannels} disabled={selectedCat === "Channels" ? true : false}>Channels</button>
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
