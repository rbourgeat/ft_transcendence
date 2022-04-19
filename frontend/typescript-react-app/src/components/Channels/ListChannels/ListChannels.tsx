import './ListChannels.scss';
import React, {Component, useState, useEffect} from "react";
import Nav from "../../Nav/Nav";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';


export interface ListChannelsProps {
}

//export default function ListChannels({activeChannel, updateActiveChannel, chanUsers, updateChanUsers}) {
export default function ListChannels(props: ListChannelsProps) {
    const [channels, setChannels] = React.useState([]);
    const [count, setCount] = useState(0);
	const [selectedCat, setSelectedCat] = React.useState("Channels");

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
		//TODO: a reprendre
		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre");

		//axios.defaults.withCredentials = true;
		//const url = "http://localhost:3000/api/chat/joinedChannels";
		//axios.get(url)
		//	.then( res => {
		//		console.log(res.data);
		//		let channels = res.data;
		//		setChannels(channels);
		//	})
		//	.catch((error) => {
		//		console.log("Error while getting all channels");
		//	})
	}

	useEffect(() => {
		//TODO: a reprendre
		//createChanneltest();
		//renderListChannels();
	}, []);

	function createJoinChan()
	{
		//TODO: a reprendre - doit permettre de rejoindr ou creer une channel
		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre - doit permettre d'ouvrir un modal pour creer un dm ou rejoindre ou creer un channel");
	}

	function displayDM()
	{
		//TODO: a reprendre - doit permettre de rejoindr ou creer une channel
		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre - doit afficher tous les dms");
	}

	function displayChannels()
	{
		//TODO: a reprendre - doit permettre de rejoindr ou creer une channel
		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre - doit afficher tous les channels");
	}

	return (
		<div id="listChannels" className="col-3" >
			{/*<div className="row">*/}
				<div id="channel--col">
					<div className="title--channel--col">
						<p className="channels-title">Channels</p>
						<p className="selected--categorie">{selectedCat== "Channels" ? "Channels you are in" : "Your direct messages"}</p>
					</div>
					<div className="add-channel-a">
						<button type="button" className="btn btn-success" id="createchannel-button" onClick={createJoinChan}>+</button>
					</div>
					<div className="displaying-div">
					</div>
					<div className="send--dm_div">
						<button type="button" className="btn btn-light" id="send--dm" onClick={displayDM} disabled={selectedCat == "Channels" ? false : true}>DM</button>
						<button type="button" className="btn btn-light" id="display--channels" onClick={displayChannels} disabled={selectedCat == "DM" ? false : true}>Channels</button>
					</div>
					{/*<p id="list--channels--title"> Public channels :</p>*/}
					{/*<ul id="list--channels--ul">*/}
						{/*{channels.map(channel  =>
						<button key={channel.id} onClick={() => {updateActiveChannel(channel.id); updateChanUsers(channel.participates)}} className="channel--list">{channel.name} {channel.public === true ? "public" : "private"}</button>
						)}*/}
					{/*</ul>*/}
				</div>
			{/*</div>*/}
		</div>
	);
}
