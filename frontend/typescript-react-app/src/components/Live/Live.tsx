import React, { useState, useEffect } from 'react';
import './Live.scss';
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import GameRules from "../GameRules/GameRules";
import io from "socket.io-client";
import axios from "axios";
import { Form } from 'react-bootstrap'
import LiveButton from './LiveButton/LiveButton';

var joueurs = [];
var adversaires = [];
var canvas = [];
var game = [];

let url_begin = "http://".concat(process.env.REACT_APP_IP);

export default function Live() {
	let socket = io(url_begin.concat(":3000/game"));
	const [myArgs, setmyArgs] = React.useState([""]);
	const [displayedNo, setDisplayedNo] = React.useState(false);


	function display_no() {
		//setDisplayedNo(true);
		if (displayedNo == false) {
			let check = document.getElementsByClassName("nogame");
			// console.log("no game is " + check.length);
			if (check.length == 0) {
				let nogame = document.createElement("div");
				nogame.className = "nogame";
				let parent = document.getElementById("list");
				let newContent = document.createTextNode("😢 Nobody is currently playing");
				nogame.appendChild(newContent);
				parent.appendChild(nogame);
			}
			setDisplayedNo(true);
		}

	}

	function remove_no() {
		//if (displayedNo == true)
		//{
		const todelete = Array.from(document.getElementsByClassName("nogame"));
		todelete.forEach(del => {
			del.remove();
		});
		if (displayedNo == true)
			setDisplayedNo(false);
		//}
	}

	function display(args) {
		let parent: any;
		let child: any;
		let exists: any;
		let newdiv: any;
		let newContent: any;
		let erases: any;

		//Joueur est un Object et pas un Array
		//console.log("type of joueurs is " + typeof joueurs);

		// console.log("args are " + args);

		const b = args[0].split(':');

		//if (!joueurs)
		//{
		//	//if (displayedNo == false)
		//		display_no();
		//}
		//else
		//{
		remove_no();
		Object.keys(joueurs).map(joueur => {
			adversaires.map(adversaire => {
				parent = document.getElementById("list");
				if (parent) {
					exists = document.getElementById("div_".concat(joueur).concat("_").concat(adversaire));
					if (!exists || exists == null || exists == undefined) {
						newdiv = document.createElement("div");
						newdiv.id = "div_".concat(joueur).concat("_").concat(adversaire);
						newdiv.className = "game";
						newContent = document.createTextNode('🏓 A game is being played by ' + joueurs + " against " + adversaire);
						newdiv.appendChild(newContent);
						parent.appendChild(newdiv);
						let newbutton = document.createElement("button");
						newbutton.innerHTML = "See match";
						newbutton.type = "submit";
						newbutton.className = "btn btn-light watch";
						newbutton.onclick = function () {
							//alert("Button is clicked");
							console.log("redirecting to game page");
							window.top.location = url_begin.concat(":3030/game?live=").concat(joueurs[joueur]).concat("+").concat(adversaire);
						};
						newdiv.appendChild(newbutton);
					}
				}
				initParty(adversaires.indexOf(adversaire));
			})
		})
		//}
	}
	//}

	useEffect(() => {
		//display();
		if (displayedNo == false)
			display_no();
	}, []);

	//Initialisation de variables
	function initParty(idGame: number) {
		game[idGame] = {
			player: {
				score: 0
			},
			player2: {
				score: 0
			},
		}
	}

	function display_null() {
		// console.log("Should display null");
		const todelete = Array.from(document.getElementsByClassName("game"));

		todelete.forEach(del => {
			del.remove();
		});

		const todelete2 = Array.from(document.getElementsByClassName("btn btn-lignt watch"));
		todelete2.forEach(del => {
			del.remove();
		});

		display_no();
	}

	//un jeu commence
	socket.on("roundStartLIVE", (...args) => {

		let len: number;
		let i: number = 0;
		len = args.length;

		//TODO: rbourgea : checker si il ne faut (comme c'était fait) checker que sur args[0] ou sur un args[i] ? (si il y a plusieurs match est-ce que c'est OK ?)
		//Attention les args sont régulièrement null
		if (args) {
			//console.log("args are : " + args)
			if (args[i]) {
				let check = args[i].split(':');
				//if (args && check[1] != "null")
				//{
				//	console.log("New game");
				//}
				if (check[1] == "null") {
					display_null();
				}
			}
		}
	})


	//va permettre d'identifier les joueurs
	socket.on("playerMove", (body: string) => {
		console.log("Player move called");
		// Update Paddle position in real time
		const b = body.split(':');
		if (joueurs.indexOf(b[0]) == -1 && adversaires.indexOf(b[0]) == -1) {
			joueurs.push(b[0]);
			adversaires.push(b[2]);
			display(body);
		}

		if (b[3] == "gauche")
			joueurs.map(joueur => {
				if (joueur)
					if (joueur == b[0]) {
						if (game)
							game[joueurs.indexOf(joueur)].player.y = Number(b[1]);
						//draw(joueurs.indexOf(joueur));
					}
			});
		if (b[3] == "droit")
			adversaires.map(adversaire => {
				if (adversaire)
					if (adversaire == b[0]) {
						game[adversaires.indexOf(adversaire)].player2.y = Number(b[1]);
					}
			})
	});

	return (
		<div id="live-page">
			<Nav />
			<div className="container">
				<div className="row d-flex justify-content-center text-center">
					<div className="col-9">
						<div className="live--div">
							<p id="titre">📺 Watch games live</p>
							<div id="content">
								<div id="box">
									<ul id="list">
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

}