import './ListChannels.scss';
import React, {Component, useState, useEffect} from "react";
import Nav from "../../Nav/Nav";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import DisplayChan from './DisplayChan/DisplayChan';


export interface ListChannelsProps {
	setActiveChannelName: any,
	setActiveChannelID: any,
	login: string
}

//export default function ListChannels({activeChannel, updateActiveChannel, chanUsers, updateChanUsers}) {
export default function ListChannels(props: ListChannelsProps) {

	//pour les channels
    const [channelsId, setChannelsId] = React.useState([]);
	const [channelsName, setChannelsName] = React.useState([]);
	const [channelsCat, setChannelsCat] = React.useState([]);
	const [channels, setChannels] = React.useState([{}]);


    const [count, setCount] = useState(0);

	//Affichage sélection DM ou channels
	const [selectedCat, setSelectedCat] = React.useState("Channels");
	const [load, setLoad] = React.useState(false);

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
					setChannels(prevArray => [...prevArray, channels[i]])
					i++;
				}
				console.log(channels);
				setLoad(true);
			})
			.catch((error) => {
				console.log("Error while getting all channels");
			})
	}

	function displaySelectedCat()
	{
		if (selectedCat === "Channels")
		{
			renderListChannels();
		}
	}

	useEffect(() => {
		displaySelectedCat();
	}, [selectedCat]);

	function createJoinChan()
	{
		//TODO: a reprendre - doit permettre de rejoindr ou creer une channel
		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre - doit permettre d'ouvrir un modal pour creer un dm ou rejoindre ou creer un channel");
	}

	function displayDM()
	{
		//TODO: a reprendre - doit permettre de rejoindr ou creer une channel
		//let toast = new ToastAlerts(null);
		//toast.notifyDanger("A reprendre - doit afficher tous les dms");
		setSelectedCat("DM");
	}

	function displayChannels()
	{
		//TODO: a reprendre - doit permettre de rejoindr ou creer une channel
		//let toast = new ToastAlerts(null);
		//toast.notifyDanger("A reprendre - doit afficher tous les channels");
		setSelectedCat("Channels");
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
						{load == true ?
							Object.keys(channels).map(function(key, index) {
								if (channels[key].id != undefined)
								{
									return (
										<div key={channels[key].id}>
											<DisplayChan channel={channels[key]} setActiveChannelName={props.setActiveChannelName} setActiveChannelId={props.setActiveChannelID}/>
										</div>
									)
								}
							})
						: ""}
					</div>
					<div className="send--dm_div">
						<button type="button" className="btn btn-light" id="send--dm" onClick={displayDM} disabled={selectedCat == "Channels" ? false : true}>DM</button>
						<button type="button" className="btn btn-light" id="display--channels" onClick={displayChannels} disabled={selectedCat == "DM" ? false : true}>Channels</button>
					</div>
				</div>
		</div>
	);
}
