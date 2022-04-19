import './DisplayChan.scss';
import MyAxios from '../../../Utils/Axios/Axios';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
//import io from "socket.io-client";


export interface DisplayChanProps {
	//id: any,
	//name: string,
	//category: boolean,//ce serait mieux d'avoir la categorie explicite en string plutot qu'un boolean
	//key: any,
	//password: string //Attention on va devoir gérer le fait que ce soit crypté puisqu'on a pas l'option protected :/
	channel: any;
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
			//console.log("selected chan is " + props.channel.name);
			console.log("ici");
			let selected = document.getElementsByClassName("chan-title_selected");
			//console.log("selected is ");
			//console.log(selected);
			//console.log("after modif");
			//selected.item(0).classList.add('chan-title_notselected');
			selected.item(0).className = 'chan-title_notselected';
			//console.log(selected);
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
