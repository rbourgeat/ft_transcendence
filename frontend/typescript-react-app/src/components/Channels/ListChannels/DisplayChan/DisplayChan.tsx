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
	setActiveDMID?: any
}

//TODO: a reprendre pour les dms
export default function DisplayChan(props: DisplayChanProps) {

	const calledOnce = React.useRef(false);
	const [isSelected, setIsSelected] = React.useState("false");
	const [load, setLoad] = React.useState(false);

	useEffect(() => {
		if (calledOnce.current) {
			return;
		}
		if (props.channel.id === 1 && calledOnce.current != true && props.isChan == true)
		{
			setIsSelected("true");
		}
		setLoad(true);
		calledOnce.current = true;
	}, [isSelected]);

	function selectChan()
	{
		if (load == true && props.isChan == true)
		{
			let selected = document.getElementsByClassName("chan-title_selected");
			selected.item(0).className = 'chan-title_notselected';
			setIsSelected("true");
			let other = document.getElementById("chan-title_".concat(props.channel.id));
			other.className = "chan-title_selected";
			props.setActiveChannelName(props.channel.name);
			props.setActiveChannelId(props.channel.id);
		}
	}

	return (
		<>
			<div className="display_chan" id={"display_chan".concat("_" + props.channel.name)}>
				{load == true && props.isChan == true ? <>
					<button type="button" id={"chan-title_".concat(props.channel.id)} className={isSelected == "true" ? "chan-title_selected" : "chan-title_notselected" }
					onClick={selectChan}>{props.channel.name}</button>
				</> : ""}
			</div>
			<div className="display_dm" id={"dm_chan".concat("_" + props.channel.name)}>
				{/* TODO: a reprendre pour les DMs */}
				{load == true && props.isDM == true ? <>
					<button type="button" id={"dm-title_".concat(props.channel.id)} className={isSelected == "true" ? "dm-title_selected" : "dm-title_notselected" }
					/*onClick={selecDM}*/>{props.channel.name}</button>
				</> : ""}
			</div>
		</>
	);
}
