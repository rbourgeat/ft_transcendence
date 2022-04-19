import './DisplayChan.scss';
import MyAxios from '../../../Utils/Axios/Axios';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';


export interface DisplayChanProps {
	channel: any;
	setActiveChannelName: any,
	setActiveChannelId: any
}

import ReactDOM from 'react-dom';

export default function DisplayChan(props: DisplayChanProps) {

	const calledOnce = React.useRef(false);
	const [isSelected, setIsSelected] = React.useState("false");
	const [load, setLoad] = React.useState(false);

	useEffect(() => {
		if (calledOnce.current) {
			return;
		}
		if (props.channel.id === 1 && calledOnce.current != true)
		{
			console.log("called once")
			setIsSelected("true");
		}
		setLoad(true);
		calledOnce.current = true;
	}, [isSelected]);

	function selectChan()
	{
		if (load == true /*&& isSelected == "false"*/)
		{
			let selected = document.getElementsByClassName("chan-title_selected");
			selected.item(0).className = 'chan-title_notselected';
			setIsSelected("true");
			let other = document.getElementById("chan-title_".concat(props.channel.id));
			console.log("other is " + other);
			console.log(other.className);
			other.className = "chan-title_selected";
			console.log(other.className);
		}



	}

	return (
		<div className="display_chan" id={"display_chan".concat("_" + props.channel.name)}>
			{load == true ? <>
				<button type="button" id={"chan-title_".concat(props.channel.id)} className={isSelected == "true" ? "chan-title_selected" : "chan-title_notselected" }
				//disabled={isSelected == "true" ? true : false}
				onClick={selectChan}>{props.channel.name}</button>
			</> : ""}

		</div>
	);
}
