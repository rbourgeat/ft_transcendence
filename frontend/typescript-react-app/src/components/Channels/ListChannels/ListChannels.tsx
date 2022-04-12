import './ListChannels.scss';
import React, {Component, useState, useEffect} from "react";
import Nav from "../../Nav/Nav";
import CreateChanModal from "../../Utils/Modal/Modal";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";

/**
 * @malatini ou @macrespo ?
 * Pour la personne en charge du chat
 */
export default function ListChannels({activeChannel, updateActiveChannel}) {
    const [channels, setChannels] = React.useState([]);
    const [count, setCount] = useState(0);

	function createChanneltest()
	{
		let body = {
			password: "test",
			pub: true,
			name: "test"
		}

		const ax = new myAxios(null);
		ax.post_api_chat(body.name, body.pub, body.password);
	}

	function renderListChannels()
	{
		axios.defaults.withCredentials = true;
		const url = "http://localhost:3000/api/chat/joinedChannels";
		axios.get(url)
			.then( res => {
				console.log(res.data);
				let channels = res.data;
				setChannels(channels);
			})
			.catch((error) => {
				console.log("Error while getting all channels");
			})
	}

	useEffect(() => {
		createChanneltest();
		renderListChannels();
	}, []);

	return (
		<div id="listChannels">
			<div className="row">
				<div className="col-3" id="channel--col">
					<p id="list--channels--title"> Public channels :</p>
					<ul id="list--channels--ul">
						{channels.map(channel  =>
						<button key={channel.id} onClick={() => {updateActiveChannel(channel.id); console.log(activeChannel)}} className="channel--list">{channel.name} {channel.public === true ? "public" : "private"}</button>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
