import './ListChannels.scss';
import React, {Component, useState, useEffect} from "react";
import Nav from "../../Nav/Nav";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import DisplayChan from './DisplayChan/DisplayChan';


export interface ListChannelsProps {
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
		//let toast = new ToastAlerts(null);
		//toast.notifyDanger("A reprendre");

		console.log("rendering all channels");
		axios.defaults.withCredentials = true;
		const url = "http://localhost:3000/api/chat/joinedChannels";
		axios.get(url)
			.then( res => {
				//console.log(res.data);
				//console.log(res);
				let channels = res.data;
				//console.log(channels);
				//setChannels(channels);

				let len = channels.length;
				//console.log("len is " + len);
				let i = 0;
				while (i < len) {
					//if (channels[i].login != log)
					//setChannelsId(prevArray => [...prevArray, channels.id])
					//setChannelsName(prevArray => [...prevArray, channels.name])
					//setChannelsCat(prevArray => [...prevArray, channels.public])
					setChannels(prevArray => [...prevArray, channels[i]])
					i++;
				}
				//console.log(channelsId);
				//console.log(channelsName);
				//console.log(channelsCat);
				console.log(channels);
				//console.log(channels[0]);
				//console.log(channels[0].name);
				//console.log(channels[1].name);
				setLoad(true);
			})
			.catch((error) => {
				console.log("Error while getting all channels");
			})
	}

	function displaySelectedCat()
	{
		console.log("displaying selected category");
		if (selectedCat === "Channels")
		{
			renderListChannels();
		}
	}

	useEffect(() => {
		console.log("SelectedCat is " + selectedCat);
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
							//channels.map(channel=>
							//	<div key={channels}>
							//		<DisplayChan channel={channel} />
							//	</div>
							//	)
							Object.keys(channels).map(function(key, index) {
								//console.log("my id is " + channels[key].id);
								//console.log("my name is " + channels[key].name);
								//console.log("my name is " + channels[key].name);
								if (channels[key].id != undefined)
								{
									//console.log("ici");
									return (
										<div key={channels[key].id}>
											<DisplayChan channel={channels[key]} />
										</div>
									)
								}
								//console.log("my name is " + channels[name]);
							})
						: ""}
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
		</div>
	);
}
