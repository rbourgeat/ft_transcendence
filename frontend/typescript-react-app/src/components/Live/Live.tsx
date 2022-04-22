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
					<div id='score-` + adversaires.indexOf(adversaire) + `'></div>
					<div id='dark-canvas'>
						<canvas id="canvas-` + adversaires.indexOf(adversaire) + `" width={500} height={500}></canvas>
					</div>
				</div>
				`;
				// init partie pour chaque joueur + adversaire
				initParty(adversaires.indexOf(adversaire));
			})
		});
		noGames();
	}

	// PONG CODE BELOW
	var canvas = [];
	var game = [];
	var anim;
	// On peut changer les dimensions de la balle et des joueurs, ex: autres modes de jeux
	var PLAYER_HEIGHT = 80;
	var PLAYER_WIDTH = 10;
	var BALL_HEIGHT = 10;
	var BALL_SPEED = 2;
	var BALL_ACCELERATE = true;
	function draw(idGame: number) {
		if (canvas.length != 0 && canvas[idGame]) {
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
			context.fillRect(game[idGame].ball.x, game[idGame].ball.y, BALL_HEIGHT, BALL_HEIGHT);
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
		// play(idGame);
		// canvas.addEventListener('mousemove', playerMove);
	}

	function play() {
		var i = 0;
		canvas.forEach(c => {
			draw(i);
			ballMove(i);
			i++;
		});
		// draw(idGame);
		// ballMove(idGame);
		anim = requestAnimationFrame(play);
	}

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
		if (joueurs.indexOf(b[0]) == -1 && adversaires.indexOf(b[0]) == -1) {
			joueurs.push(b[0]);
			adversaires.push(b[2]);
			display();
		}
		console.log("joueur: " + b[0] + ", position : " + b[1] + ", adversaire : " + b[2] + ", coté : " + b[3]);

		if (b[3] == "gauche")
			joueurs.map(joueur => {
				if (joueur)
					if (joueur == b[0]) {
						game[joueurs.indexOf(joueur)].player.y = Number(b[1]);
						draw(joueurs.indexOf(joueur));
					}
			});
		if (b[3] == "droit")
			adversaires.map(adversaire => {
				if (adversaire)
					if (adversaire == b[0]) {
						game[adversaires.indexOf(adversaire)].player2.y = Number(b[1]);
						draw(adversaires.indexOf(adversaire));
					}
			})
	});

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
