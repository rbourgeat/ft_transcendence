import './ListChannels.scss';
import React, {Component, useState, useEffect} from "react";
import Nav from "../../Nav/Nav";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import DisplayChan from './DisplayChan/DisplayChan';
import { ToastContainer } from 'react-toastify';


export interface ListChannelsProps {
	setActiveChannelName?: any,
	setActiveChannelID?: any,
	setActiveDMName?: any,
	setActiveDMID?: any,
	login: string,
	setIsDM?: any,
	setIsChan?: any
}

//export default function ListChannels({activeChannel, updateActiveChannel, chanUsers, updateChanUsers}) {
export default function ListChannels(props: ListChannelsProps) {

	//pour les channels
    //const [channelsId, setChannelsId] = React.useState([]);
	//const [channelsName, setChannelsName] = React.useState([]);
	//const [channelsCat, setChannelsCat] = React.useState([]);
	const [channels, setChannels] = React.useState([{}]);
	const [DMs, setDMs] = React.useState([{}]);

    //const [count, setCount] = useState(0);

	//Affichage sélection DM ou channels
	const [selectedCat, setSelectedCat] = React.useState("");
	const [load, setLoad] = React.useState(false);

	const calledOnce = React.useRef(false);


	//TODO: a reprendre
	function createChanneltest()
	{
		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre");

		//let body = {
		//	password: "test",
		//	pub: true,
		//	name: "test"
		//}

		//const ax = new myAxios(null);
		//ax.post_api_chat(body.name, body.pub, body.password);
	}

	function renderListChannels()
	{
		//console.log("rendering all channels");
		axios.defaults.withCredentials = true;
		const url = "http://localhost:3000/api/chat/joinedChannels";
		axios.get(url)
			.then( res => {
				let channels = res.data;
				let len = channels.length;
				let i = 0;
				while (i < len) {
					if (channels[i].direct == false)
						setChannels(prevArray => [...prevArray, channels[i]])
					i++;
				}
				//console.log(channels);
				setLoad(true);
			})
			.catch((error) => {
				console.log("Error while getting all channels");
			})
	}

	function renderListDMs()
	{
		console.log("should render dms");
		axios.defaults.withCredentials = true;
		const url = "http://localhost:3000/api/chat/joinedChannels";
		axios.get(url)
			.then( res => {
				let DMs = res.data;
				let len = DMs.length;
				let i = 0;
				//trier sur direct true
				while (i < len) {
					if (DMs[i].direct == true)
					{
						setDMs(prevArray => [...prevArray, DMs[i]]);
						console.log("found one DM");
					}
					i++;
				}
				setLoad(true);
				//setLoad(true);//a re voir pour le set load
			})
			.catch((error) => {
				console.log("Error while getting all channels");
			})
			console.log("displaying dms")
			console.log(DMs);
			setLoad(true);
	}

	function displaySelectedCat(arg: string)
	{
		//console.log("here again");
		//setSelectedCat(arg);
		let toast = new ToastAlerts(null);
		toast.notifyDanger("En cours - ne pas tester");
		if (arg == "Channels")
		{
			//console.log("and here here")
			//console.log("calling render list channels");
			renderListChannels();
		}
		else if (arg== "DMs")
		{
			console.log("selected cat is DMS");
			//console.log("should not display channels but dms");
			renderListDMs();
		}
		else
		{
			console.log("Its null !!");
		}
	}

	function removeDisplayChans()
	{
		console.log("We whould remove displayed chan");
	}

	//premier use effect pour le chargement
	useEffect(() => {
	//if (calledOnce.current) {
	//	return;
	//}
		displaySelectedCat(selectedCat);
		//calledOnce.current = true;
	}, [selectedCat])

	//useEffect(() => {
	////deuxieme ôur les modifs
	//	displaySelectedCat();
	//}, [selectedCat]);

	function createJoinChan()
	{
		//TODO: a reprendre - doit permettre de rejoindr ou creer une channel
		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre - doit permettre d'ouvrir un modal pour creer un dm ou rejoindre ou creer un channel");
	}

	function displayDM()
	{
		//console.log("calling display dm")
		//setSelectedCat("DMs");
		console.log("Calling display dms");
		//Faire la même chose dans l'autre sens
		let chans = Array.from(document.getElementsByClassName("displaying_channels"));
		let len = chans.length;
		let i: number = 0;
		while (i < len)
		{
			//suppression dans le dom et dans notre variable state
			chans.pop();
			channels.pop();
			i++;
		}
		//console.log("here");
		displaySelectedCat("DMs");
	}

	function displayChannels()
	{
		//console.log("calling display channels")
		//setSelectedCat("Channels");
		displaySelectedCat("Channels");
	}

	return (
		<div id="listChannels" className="col-3" >
				<div id="channel--col">
					<div className="title--channel--col">
						<p className="channels-title">Channels</p>
						<p className="selected--categorie">{selectedCat== "Channels" ? "Channels you are in" : "Your direct messages"}</p>
					</div>
					<div className="add-channel-a">
						<button type="button" className="btn btn-success" id="createchannel-button" onClick={createJoinChan}>+</button>
					</div>
					<div className="displaying-div">
						{load == true && selectedCat == "Channels" ?
							Object.keys(channels).map(function(key, index) {
								if (channels[key].id != undefined && selectedCat === "Channels")
								{
									return (
										<div key={channels[key].id} className="displaying_channels">
											<DisplayChan isChan={true} isDM={false} channel={channels[key]} setActiveChannelName={props.setActiveChannelName} setActiveChannelId={props.setActiveChannelID}/>
										</div>
									)
								}})
						: ""}
						{load == true && selectedCat == "DMs" ?
							Object.keys(DMs).map(function(key, index) {
								if (DMs[key].id != undefined && selectedCat === "DMs")
								{
									return (
										<div key={DMs[key].id}>
											<DisplayChan dm={DMs[key]}
												isChan={false} isDM={true} channel={DMs[key]}
												setActiveDMName={props.setActiveDMName} setActiveDMID={props.setActiveDMID}/>
										</div>)
								}
							})
						: ""}
					</div>
					<div className="send--dm_div">
						<button type="button" className="btn btn-light" id="send--dm" onClick={displayDM} disabled={selectedCat == "DMs" ? true : false}>DM</button>
						<button type="button" className="btn btn-light" id="display--channels" onClick={displayChannels} disabled={selectedCat == "Channels" ? true : false}>Channels</button>
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
