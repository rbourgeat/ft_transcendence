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
		
		
	});

	useEffect(() => {
		noGames();
    }, []);

	function noGames()
	{
		if (joueurs.length == 0 && adversaires.length == 0)
			document.getElementById("content").innerHTML = `
				<div id='box'>
					<div id='vs'>😢 There is no live game at the moment.</div>
				</div>
				`;
	}

	function gotoGame()
	{
		window.top.location = "http://localhost:3030/game";
	}

	function display()
	{
		document.getElementById("content").innerHTML = "<div></div>";
		joueurs.map(joueur => {
			adversaires.map(adversaire => {
				document.getElementById("content").innerHTML += `
				<div id='box'>
					<div id='vs'>🏓 ` + joueur +` vs ` + adversaire +`</div>
					<div id='dark-canvas'>
						<canvas id="canvas" width={size.width / 2} height={size.height / 2}></canvas>
					</div>
				</div>
				`;
				// init partie pour chaque joueur + adversaire
				initParty()
			})
		});
		noGames();
	}

	useEffect(() => {
		// getUser();
		initParty();
    }, []);

	// PONG CODE BELOW
	var canvas;
	var game;
	var anim;
	// On peut changer les dimensions de la balle et des joueurs, ex: autres modes de jeux
	var PLAYER_HEIGHT = 100;
	var PLAYER_WIDTH = 20;
	var BALL_HEIGHT = 10;
	var BALL_SPEED = 2;
	function draw() {
		if (canvas) {
			var context = canvas.getContext('2d');
			// Draw field
			context.fillStyle = 'black';
			context.fillRect(0, 0, canvas.width, canvas.height);
			// Draw middle line
			context.strokeStyle = 'white';
			context.beginPath();
			context.moveTo(canvas.width / 2, 0);
			context.lineTo(canvas.width / 2, canvas.height);
			context.stroke();
			// Draw players
			context.fillStyle = 'white';
			context.fillRect(0, game.player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
			context.fillRect(canvas.width - PLAYER_WIDTH, game.player2.y, PLAYER_WIDTH, PLAYER_HEIGHT);
			// Draw ball
			context.beginPath();
			context.fillStyle = 'white';
			// context.arc(game.ball.x, game.ball.y, game.ball.r, 0, Math.PI * 2, false); // Si on veut la faire ronde !
			context.fillRect(game.ball.x, game.ball.y, BALL_HEIGHT, BALL_HEIGHT); // Si on veut la faire carré !
			context.fill();
		}
	}

	function initParty()
	{
		canvas = document.getElementById('canvas');
		if (canvas) {
			game = {
				player: {
					y: canvas.height / 2 - PLAYER_HEIGHT / 2,
					score: 0
				},
				player2: {
					y: canvas.height / 2 - PLAYER_HEIGHT / 2,
					score: 0
				},
				ball: {
					x: canvas.width / 2 - BALL_HEIGHT / 2,
					y: canvas.height / 2 - BALL_HEIGHT / 2,
					r: 5,
					speed: {
						x: BALL_SPEED,
						y: BALL_SPEED
					}
				}
			}
		}
		draw();
		// canvas.addEventListener('mousemove', playerMove);
	}

	function play() {
		draw();
		anim = requestAnimationFrame(play);
	}

	function setGameMode(gm: number) {
		let resize = 4;
		if (gm == 0)
		{
			PLAYER_HEIGHT = 100 / resize;
			PLAYER_WIDTH = 20 / resize;
			BALL_HEIGHT = 10 / resize;
			BALL_SPEED = 2 / resize;
		} else if (gm == 1)
		{
			PLAYER_HEIGHT = 100 / resize;
			PLAYER_WIDTH = 20 / resize;
			BALL_HEIGHT = 50 / resize;
			BALL_SPEED = 2 / resize;
		} else if (gm == 2)
		{
			PLAYER_HEIGHT = 100 / resize;
			PLAYER_WIDTH = 20 / resize;
			BALL_HEIGHT = 10 / resize;
			BALL_SPEED = 4 / resize;
		} else if (gm == 3)
		{
			PLAYER_HEIGHT = 100 / resize;
			PLAYER_WIDTH = 20 / resize;
			BALL_HEIGHT = 10 / resize;
			BALL_SPEED = 0.5 / resize;
		} else if (gm == 4)
		{
			PLAYER_HEIGHT = 20 / resize;
			PLAYER_WIDTH = 100 / resize;
			BALL_HEIGHT = 10 / resize;
			BALL_SPEED = 0.5 / resize;
		}
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
			{/* <button type='button' id='watch' onClick={() => gotoGame()}>Watch</button> */}
				<div id="content"></div>
		</div>
	)

}
