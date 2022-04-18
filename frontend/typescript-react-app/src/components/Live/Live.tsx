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

// For resize elements from game canvas
let resize = 4;

//TODO: a refacto un tout petit peu @rbourgea ?
export default function Live() {

	if (localStorage.getItem("loggedIn") != "true")
	{
		console.log("you are not legged in !");
		return (<>
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
		</>)
	}
	let socket = io("http://localhost:3000/game");

	socket.on("playerMove", (body: string) => {
		const b = body.split(':');
		// console.log("joueur: " + b[0] + ", position : " + b[1] + ", adversaire : " + b[2]);
		if (joueurs.indexOf(b[0]) == -1 && adversaires.indexOf(b[0]) == -1) {
			joueurs.push(b[0]);
			adversaires.push(b[2]);
			display();
		}


	});

	useEffect(() => {
		noGames();
    }, []);

	function noGames()
	{
		if (localStorage.getItem("loggedIn") != "true")
		{
			console.log("you are not legged in !");
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
		}
		if (joueurs.length == 0 && adversaires.length == 0)
			document.getElementById("content").innerHTML = `
				<div id='box'>
					<div id='vs'>😢 There is no live game at the moment.</div>
				</div>
				`;
	}

	function display()
	{
		if (localStorage.getItem("loggedIn") != "true")
		{
			console.log("you are not legged in !");
			return
		}
		document.getElementById("content").innerHTML = "<div></div>";
		joueurs.map(joueur => {
			adversaires.map(adversaire => {
				document.getElementById("content").innerHTML += `
				<div id='box'>
					<div id='vs'>🏓 ` + joueur +` vs ` + adversaire +`</div>
					<div id='dark-canvas'>
						<canvas id="canvas-` + adversaires.indexOf(adversaire) + `" width={size.width / 2} height={size.height / 2}></canvas>
					</div>
				</div>
				`;
				// init partie pour chaque joueur + adversaire
				initParty(adversaires.indexOf(adversaire))
			})
		});
		noGames();
	}

	useEffect(() => {
		// getUser();
		// initParty();
    }, []);

	// PONG CODE BELOW
	var canvas = [];
	var game = [];
	var anim;
	// On peut changer les dimensions de la balle et des joueurs, ex: autres modes de jeux
	var PLAYER_HEIGHT = 80 / resize;
	var PLAYER_WIDTH = 10 / resize;
	var BALL_HEIGHT = 10 / resize;
	var BALL_SPEED = 2 / resize;
	var BALL_ACCELERATE = true;
	function draw(idGame: number) {
		if (canvas.length != 0) {
			var context = canvas[idGame].getContext('2d');
			// Draw field
			context.fillStyle = 'black';
			context.fillRect(0, 0, canvas[idGame].width, canvas[idGame].height);
			// Draw middle line
			context.strokeStyle = 'white';
			context.beginPath();
			context.moveTo(canvas[idGame].width / 2, 0);
			context.lineTo(canvas[idGame].width / 2, canvas[idGame].height);
			context.stroke();
			// Draw players
			context.fillStyle = 'white';
			context.fillRect(0, game[idGame].player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
			context.fillRect(canvas[idGame].width - PLAYER_WIDTH, game[idGame].player2.y, PLAYER_WIDTH, PLAYER_HEIGHT);
			// Draw ball
			context.beginPath();
			context.fillStyle = 'white';
			// context.arc(game.ball.x, game.ball.y, game.ball.r, 0, Math.PI * 2, false); // Si on veut la faire ronde !
			context.fillRect(game[idGame].ball.x, game[idGame].ball.y, BALL_HEIGHT, BALL_HEIGHT); // Si on veut la faire carré !
			context.fill();
		}
	}

	function initParty(idGame: number)
	{
		canvas[idGame] = document.getElementById('canvas-' + idGame);
		if (canvas.length != 0) {
			game[idGame] = {
				player: {
					y: canvas[idGame].height / 2 - PLAYER_HEIGHT / 2,
					score: 0
				},
				player2: {
					y: canvas[idGame].height / 2 - PLAYER_HEIGHT / 2,
					score: 0
				},
				ball: {
					x: canvas[idGame].width / 2 - BALL_HEIGHT / 2,
					y: canvas[idGame].height / 2 - BALL_HEIGHT / 2,
					r: 5,
					speed: {
						x: BALL_SPEED,
						y: BALL_SPEED
					}
				}
			}
		}
		draw(idGame);
		// canvas.addEventListener('mousemove', playerMove);
	}

	// function play() {
	// 	draw();
	// 	anim = requestAnimationFrame(play);
	// }

	function setGameMode(gm: number) {
		if (gm == 0)
		{
			PLAYER_HEIGHT = 80 / resize;
			PLAYER_WIDTH = 10 / resize;
			BALL_HEIGHT = 10 / resize;
			BALL_SPEED = 2 / resize;
			BALL_ACCELERATE = true;
		} else if (gm == 1)
		{
			PLAYER_HEIGHT = 80 / resize;
			PLAYER_WIDTH = 10 / resize;
			BALL_HEIGHT = 50 / resize;
			BALL_SPEED = 2 / resize;
			BALL_ACCELERATE = true;
		} else if (gm == 2)
		{
			PLAYER_HEIGHT = 80 / resize;
			PLAYER_WIDTH = 10 / resize;
			BALL_HEIGHT = 10 / resize;
			BALL_SPEED = 4 / resize;
			BALL_ACCELERATE = true;
		} else if (gm == 3)
		{
			PLAYER_HEIGHT = 80 / resize;
			PLAYER_WIDTH = 10 / resize;
			BALL_HEIGHT = 10 / resize;
			BALL_SPEED = 0.5 / resize;
			BALL_ACCELERATE = false;
		} else if (gm == 4)
		{
			PLAYER_HEIGHT = 80 / resize;
			PLAYER_WIDTH = 80 / resize;
			BALL_HEIGHT = 10 / resize;
			BALL_SPEED = 2 / resize;
			BALL_ACCELERATE = false;
		}
	}

	socket.on("playerMove", (body: string) => {
		// Update Paddle position in real time
		const b = body.split(':');
		// console.log("joueur = " + b[0] + " | position = " + b[1] + " | socket = " + socket.id)

		if (b[2] == "gauche")
			joueurs.map(joueur => {
				if (joueur == b[0])
					game[joueurs.indexOf(joueur)].player.y = b[1];
			});
		if (b[2] == "droit")
			adversaires.map(adversaire => {
				game[adversaires.indexOf(adversaire)].player2.y = b[1];
			})
	});


	socket.on("stopGame", (...args) => {
		if (localStorage.getItem("loggedIn") != "true")
		{
			console.log("you are not legged in !");
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

	//Attention sur les autres pages ont a le texte en anglais
	return(
		<div id="live-page">
			<Nav/>
			<div className="container">
				<div className="row d-flex justify-content-center text-center">
					<div className="col-9">
						<div className="live--div">
							<p id="titre">📺 Watch games live</p>
							<div id="content"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

}
