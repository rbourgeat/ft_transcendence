import './ListChannels.scss';
import React, {Component, useState, useEffect} from "react";
import Nav from "../../Nav/Nav";
import CreateChanModal from "../../Utils/Modal/Modal";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';

/**
 * @malatini ou @macrespo ?
 * Pour la personne en charge du chat
 */

export interface ListChannelsProps {

}


//export default function ListChannels({activeChannel, updateActiveChannel, chanUsers, updateChanUsers}) {
export default function ListChannels(props: ListChannelsProps) {
    const [channels, setChannels] = React.useState([]);
    const [count, setCount] = useState(0);

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

	function createDM()
	{
		//TODO: a reprendre
		let toast = new ToastAlerts(null);
		toast.notifyDanger("A reprendre");
	}

	return (
		<div id="listChannels">
			{/*<div className="row">*/}
				<div className="col-3" id="channel--col">
					<div className="title--channel--col">
						<p className="channels-title">Channels</p>
					</div>
					<div className="add-channel-a">
						<a /*className="dropdown-item"*/ onClick={createDM}>+</a>
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
