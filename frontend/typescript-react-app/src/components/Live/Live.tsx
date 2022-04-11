import React, {useState,  useEffect, useLayoutEffect } from 'react';
import './Live.scss';
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import GameRules from "../GameRules/GameRules";
import io from "socket.io-client";
import axios from "axios";
import { Form } from 'react-bootstrap'

var joueurs = [];
var adversaires = [];

export default function Live() {

	let socket = io("http://localhost:3000/game");

	socket.on("playerMove", (body: string) => {
		const b = body.split(':');
		console.log("joueur: " + b[0] + ", position : " + b[1] + ", adversaire : " + b[2]);
		if (joueurs.indexOf(b[0]) == -1 && adversaires.indexOf(b[0]) == -1) {
			joueurs.push(b[0]);
			adversaires.push(b[2]);
			display();
		}
		console.log("joueurs: " + joueurs);
	});

	function display()
	{
		document.getElementById("content").innerHTML = "<div></div>";
		joueurs.map(joueur => {
			adversaires.map(adversaire => {
				document.getElementById("content").innerHTML += `
				<div id='box'>
					<div id='vs'>🏓 ` + joueur +` vs ` + adversaire +`</div>
					<button id='watch'>Watch</button>
				</div>
				`;
			})
		});
	}

	socket.on("stopGame", (...args) => {
		let i1 = joueurs.indexOf(args[0]);
		let i2 = adversaires.indexOf(args[1]);
		let i3 = adversaires.indexOf(args[0]);
		let i4 = joueurs.indexOf(args[1]);
		if (i1 > -1 && i2 > -1) {
			joueurs.splice(i1, 1);
			adversaires.splice(i2, 1);
			display();
		} else if (i3 > -1 && i4 > -1) {
			joueurs.splice(i3, 1);
			adversaires.splice(i4, 1);
			display();
		}
	});

	return(
		<div>
			<Nav/>
			<div id="titre">📺 Liste des Lives</div>
			<div id="content">
				{/* <div id='box'>
					<div id='vs'>🏓 Joueur1 vs Joueur2</div>
					<button id='watch'>Watch</button>
				</div>
				<div id='box'>
					<div id='vs'>🏓 Joueur1 vs Joueur2</div>
					<button id='watch'>Watch</button>
				</div>
				<div id='box'>
					<div id='vs'>🏓 Joueur1 vs Joueur2</div>
					<button id='watch'>Watch</button>
				</div>
				<div id='box'>
					<div id='vs'>🏓 Joueur1 vs Joueur2</div>
					<button id='watch'>Watch</button>
				</div>
				<div id='box'>
					<div id='vs'>🏓 Joueur1 vs Joueur2</div>
					<button id='watch'>Watch</button>
				</div> */}
				

			</div> 
		</div>
	)

}