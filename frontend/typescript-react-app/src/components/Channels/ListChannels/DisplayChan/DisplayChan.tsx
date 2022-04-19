import './DisplayChan.scss';
import MyAxios from '../../../Utils/Axios/Axios';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
//import { AriaAttributes, DOMAttributes } from "react";
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
		//console.log("channel is " + props.channel);
		console.log("id is " + props.channel.id);
		console.log("type is " + typeof props.channel.id);
		if (props.channel.id === 1)
		{
			setIsSelected("true");
			//let toSelect = document.getElementById("chan-title_".concat("1"));
			//toSelect.setAttribute("className", "chan-title_selected");
			//let selected = document.getElementsByClassName("chan-title_selected");
			//console.log("selected is " + selected.item(0));
		}
		setLoad(true);
		calledOnce.current = true;
	}, [isSelected]);

	function selectChan()
	{
		if (load == true)
		{
			console.log("selected chan is " + props.channel.name);
			//setIsSelected(true);
			//J'ai besoin de désélectionner tous les autres boutons quand je clique sur celui là
			//let notselected = document.getElementsByClassName("chan-title_notselected");
			let selected = document.getElementsByClassName("chan-title_selected");

			//celui qui était sélectionné est désélectionné
			//ce qui a été cliqué devient sélectionné

			console.log("selected is ");
			//console.log(selected);

			console.log(selected);

			//selected[0].setAttribute("disabled", "false");

			//selected[0].setAttribute("className", "chan-title_notselected");
			//setIsSelected("true");

			//let newSelected = document.getElementById("chan-title_".concat(props.channel.id));
			//newSelected.setAttribute("disabled", "true");
			//newSelected.setAttribute("className", "chan-title_selected");
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
