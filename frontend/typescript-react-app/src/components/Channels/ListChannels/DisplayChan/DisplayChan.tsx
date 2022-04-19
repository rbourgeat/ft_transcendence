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

	useEffect(() => {
		if (calledOnce.current) {
			return;
		}
		console.log("channel is " + props.channel);
		calledOnce.current = true;
	}, []);

	return (
		<div className="display_chan" /*id={"display_chan".concat("_" + props.name)}*/>
			{/*<p className="chan-title">{props.name}</p>*/}
		</div>
	);
}
