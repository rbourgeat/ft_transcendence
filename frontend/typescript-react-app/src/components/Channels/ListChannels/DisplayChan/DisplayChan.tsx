import './DisplayChan.scss';
import MyAxios from '../../../Utils/Axios/Axios';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';


export interface DisplayChanProps {
	channel?: any;
	setActiveChannelName?: any,
	setActiveChannelId?: any,
	isChan?: boolean,
	isDM?: boolean,
	dm?: any,
	setActiveDMName?: any,
	setActiveDMID?: any,
	minId?: any,
	login: string
}

//TODO: a reprendre pour les dms
export default function DisplayChan(props: DisplayChanProps) {

	const calledOnce = React.useRef(false);
	const [isSelected, setIsSelected] = React.useState("false");
	//const [firstIsSelected, setFirstIsSelected] = React.useState("false");
	const [load, setLoad] = React.useState(false);

	console.log(props.login);
	useEffect(() => {
		if (calledOnce.current) {
			return;
		}
		console.log("props channel id is " + props.channel.id);
		console.log("props minId is " + props.minId);
		if (calledOnce.current != true && props.channel.id == props.minId) {
			setIsSelected("true");
			//console.log("selected it");
			if (props.isDM == true) {
				props.setActiveDMName(props.channel.name);
				props.setActiveChannelName("");
				props.setActiveChannelId("");
				props.setActiveDMID(props.channel.id);
			}
			else {
				props.setActiveChannelName(props.channel.name);
				props.setActiveChannelId(props.channel.id);
				props.setActiveDMName("");
				props.setActiveDMID("");
			}
			//console.log("called props min");
		}
		setLoad(true);
		calledOnce.current = true;
	}, [isSelected]);


	const [participates, updateParticipates] = React.useState([]);
	const [DMname, setDMName] = React.useState("");

	async function setNameToReceiverLogin() {

		await axios.get(`http://localhost:3000/api/chat/${props.channel.id}/users`)
			.then(res => {
				const users = res.data.map(element => element.user);
				updateParticipates(users);
				for (let i = 0; i < participates.length; i++) {
					if (participates[i].login !== props.login) {
						console.log("dm name will change to the receiver login value:" + participates[i].login);
						props.setActiveDMName(participates[i].login);
						setDMName(participates[i].login);
					}
				}
			})
			.catch(error => {
				console.log(error);
			})
	}

	function selectChan() {
		if (load == true && props.isChan == true) {
			let selected = document.getElementsByClassName("chan-title_selected");
			selected.item(0).className = 'chan-title_notselected';
			setIsSelected("true");

			//On note la channel active en mettant à vide un éventuel dm sélectionné précédemment
			props.setActiveChannelName(props.channel.name);
			props.setActiveChannelId(props.channel.id);
			props.setActiveDMName("");
			props.setActiveDMID("");

			let other = document.getElementById("chan-title_".concat(props.channel.id));
			other.className = "chan-title_selected";

		}
	}

	function selectDM() {
		if (load == true && props.isDM == true) {
			let selected = document.getElementsByClassName("dm-title_selected");
			selected.item(0).className = 'dm-title_notselected';
			setIsSelected("true");


			//bahaas add
			setNameToReceiverLogin();
			//On note le DM actif en mettant à vide l'éventuelle channel précédemment sélectionnée
			//props.setActiveDMName(props.channel.name);
			props.setActiveDMName(DMname);
			props.setActiveChannelName("");
			props.setActiveChannelId("");
			props.setActiveDMID(props.channel.id);

			let other = document.getElementById("dm-title_".concat(props.channel.id));
			other.className = "dm-title_selected";
		}
	}

	return (
		<>
			<div className="display_chan" id={"display_chan".concat("_" + props.channel.name)}>
				{load == true && props.isChan == true ? <>
					<button type="button" id={"chan-title_".concat(props.channel.id)} className={isSelected == "true" ? "chan-title_selected" : "chan-title_notselected"}
						onClick={selectChan}>{props.channel.name}</button>
				</> : ""}
			</div>
			<div className="display_dm" id={"dm_chan".concat("_" + props.channel.name)}>
				{load == true && props.isDM == true ? <>
					<button type="button" id={"dm-title_".concat(props.channel.id)} className={isSelected == "true" ? "dm-title_selected" : "dm-title_notselected"}
						onClick={selectDM}>{DMname}</button>
				</> : ""}
			</div>
		</>
	);
}
