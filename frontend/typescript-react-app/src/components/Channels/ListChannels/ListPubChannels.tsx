import './ListChannels.scss';
import React, {Component, useState, useEffect} from "react";
import Nav from "../../Nav/Nav";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";

export default function ListPubChannels() {
	const [pubChan, pubChanSet] = React.useState([]);

	useEffect(() => {
		axios.get("http://localhost:3000/api/chat")
			.then((response) => {
				pubChanSet(response.data);
			})
			.catch((error) => {
				//console.log(error);
				;
			})
	}, [])

	function joinChan(chanName) {
		axios.post("http://localhost:3000/api/chat/join", {
				"public": true,
				"name": chanName
			})
				.then(function (response) {
					//console.log(response);
					;
				})
				.catch(function (error) {
					//console.log(error);
					;
				});
	}

	return (
		<div className="listChannels">
			<h2>Public Channels</h2>
			<ul id="list--channels--ul">
				{pubChan.map(channel =>
					channel.public === true ?	<button key={channel.id} className="channel--list" onClick={() => {joinChan(channel.name)}}>{channel.name}</button> : ""
				)}
			</ul>
		</div>
	);
}
