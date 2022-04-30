import React, {useState,  useEffect} from 'react';
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

export default function Live() {
<<<<<<< HEAD
=======

	if (localStorage.getItem("loggedIn") != "true")
	{
		return (<>
			<Nav />
			<div className="container">
				<div className="row d-flex justify-content-center text-center">
						<div className="channels-not-logged">
							<p>You are not logged in.</p>
						</div>
				</div>
			</div>
		</>)
	}
>>>>>>> c3c82dbb339fa776ae179b7f01c0cfade61b7f44
	let socket = io("http://localhost:3000/game");
	const [myArgs, setmyArgs] = React.useState([""]);
	const [displayedNo, setDisplayedNo] = React.useState(false);


	function display_no()
	{
		//setDisplayedNo(true);
		if (displayedNo == false)
		{
<<<<<<< HEAD
			let check = document.getElementsByClassName("nogame");
			console.log("no game is " + check.length);
			if (check.length == 0)
			{
				let nogame = document.createElement("div");
				nogame.className = "nogame";
				let parent = document.getElementById("list");
				let newContent = document.createTextNode("😢 Nobody is currently playing");
				nogame.appendChild(newContent);
				parent.appendChild(nogame);
			}
			setDisplayedNo(true);
=======
			<>
					<Nav />
					<div className="container">
						<div className="row d-flex justify-content-center text-center">
							<div className="col-9">
								<div className="channels-not-logged">
									<p>You are not logged in.</p>
								</div>
							</div>
						</div>
					</div>
				</>
>>>>>>> c3c82dbb339fa776ae179b7f01c0cfade61b7f44
		}
		
	}

	function remove_no()
	{
<<<<<<< HEAD
		//if (displayedNo == true)
		//{
			const todelete = Array.from(document.getElementsByClassName("nogame"));
			todelete.forEach(del => {
				del.remove();
			});
			if (displayedNo == true)
				setDisplayedNo(false);
		//}
=======
		if (localStorage.getItem("loggedIn") != "true")
		{
			return
		}
		document.getElementById("content").innerHTML = "<div></div>";
		joueurs.map(joueur => {
			adversaires.map(adversaire => {
				document.getElementById("content").innerHTML += `
				<div id='box'>
					<div id='vs'>🏓 ` + joueur +` vs ` + adversaire +`</div>
					<div id='score-` + adversaires.indexOf(adversaire) + `'></div>
					<div id='dark-canvas'>
						<canvas id="canvas-` + adversaires.indexOf(adversaire) + `"></canvas>
					</div>
				</div>
				`;
				// init partie pour chaque joueur + adversaire
				initParty(adversaires.indexOf(adversaire));
			})
		});
		noGames();
>>>>>>> c3c82dbb339fa776ae179b7f01c0cfade61b7f44
	}

	function display(args)
	{
		let parent:any;
		let child: any;
		let exists: any;
		let newdiv: any;
		let newContent : any;
		let erases: any;

		//Joueur est un Object et pas un Array
		//console.log("type of joueurs is " + typeof joueurs);

		console.log("args are " + args);

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
					if (parent)
					{
						exists = document.getElementById("div_".concat(joueur).concat("_").concat(adversaire));
						if (!exists || exists == null || exists == undefined)
						{
							newdiv = document.createElement("div");
							newdiv.id = "div_".concat(joueur).concat("_").concat(adversaire);
							newdiv.className = "game";
							newContent = document.createTextNode('🏓 ' + joueurs[joueur] + " vs " + adversaire);
							newdiv.appendChild(newContent);
							parent.appendChild(newdiv);
							let newbutton = document.createElement("button");
							newbutton.innerHTML = "See match";
							newbutton.type = "submit";
							newbutton.className = "btn btn-light watch";
							newbutton.onclick = function () {
								window.top.location = "http://localhost:3030/game?live=" + joueurs[joueur] + "+" + adversaire;
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
	function initParty(idGame: number)
	{
			game[idGame] = {
				player: {
					score: 0
				},
				player2: {
					score: 0
				},
			}
	}

	function display_null()
	{
		console.log("Should display null");
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
		if (args)
		{
			//console.log("args are : " + args)
			if (args[i])
			{
				let check = args[i].split(':');
				//if (args && check[1] != "null")
				//{
				//	console.log("New game");
				//}
				if (check[1] == "null")
				{
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

<<<<<<< HEAD
	return (
=======
	socket.on("roundStartLIVE", (...args) => {
		const b = args[0].split(':');
		// console.log("round: " + b[0] + ", player1: " + b[1] + ", player2: " + b[2] + ", score1: " + b[3] + ", score2: " + b[4]);
		joueurs.map(joueur => {
			if (joueur)
				if (joueur == b[1]) {
					play();
					document.querySelector('#score-' + joueurs.indexOf(joueur)).textContent = b[3] + " : " + b[4];
				}
		});
	})


	socket.on("stopGame", (...args) => {
		if (localStorage.getItem("loggedIn") != "true")
		{
			//console.log("you are not legged in !");
			return;
		}
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

	function ballMove(idGame: number) {
		// Rebounds on top and bottom
		if (canvas[idGame]) {
			if (game[idGame].ball.y > canvas[idGame].height || game[idGame].ball.y < 0) {
				game[idGame].ball.speed.y *= -1;
			}
			if (game[idGame].ball.x > canvas[idGame].width - PLAYER_WIDTH) {
				collide(game[idGame].player2, idGame);
			} else if (game[idGame].ball.x < PLAYER_WIDTH) {
				collide(game[idGame].player, idGame);
			}
			// Ball progressive speed
			game[idGame].ball.x += game[idGame].ball.speed.x;
			game[idGame].ball.y += game[idGame].ball.speed.y;
		}
	}

	function collide(player, idGame: number) {
		// The player does not hit the ball
		var bottom: Number;
		bottom = Number(player.y) + Number(PLAYER_HEIGHT);
		if (game[idGame].ball.y < player.y || game[idGame].ball.y > bottom) {
			// Set ball and players to the center
			game[idGame].ball.x = canvas[idGame].width / 2 - BALL_HEIGHT / 2;
			game[idGame].ball.y = canvas[idGame].height / 2 - BALL_HEIGHT / 2;
			game[idGame].ball.speed.y = BALL_SPEED;

			if (player == game[idGame].player) {
				// Change ball direction + reset speed
				game[idGame].ball.speed.x = BALL_SPEED * -1;
			} else {
				// Change ball direction + reset speed
				game[idGame].ball.speed.x = BALL_SPEED;
			}
		} else {
			// Increase speed and change direction
			if (BALL_ACCELERATE)
				game[idGame].ball.speed.x *= -1.2;
			else
				game[idGame].ball.speed.x *= -1;
			changeDirection(player.y, idGame);
		}
	}

	function changeDirection(playerPosition, idGame: number) {
		// Ball bounce
		var impact = game[idGame].ball.y - playerPosition - PLAYER_HEIGHT / 2;
		var ratio = 100 / (PLAYER_HEIGHT / 2);
		game[idGame].ball.speed.y = Math.round(impact * ratio / 10);
	}

	//Attention sur les autres pages ont a le texte en anglais
	return(
>>>>>>> c3c82dbb339fa776ae179b7f01c0cfade61b7f44
		<div id="live-page">
			<Nav/>
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