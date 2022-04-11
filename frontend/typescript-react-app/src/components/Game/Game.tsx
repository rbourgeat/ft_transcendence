import React, {useState,  useEffect, useLayoutEffect } from 'react';
import './Game.scss';
import useWindowDimensions from "./useWindowDimensions"
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import GameRules from "../GameRules/GameRules";
import io from "socket.io-client";
import axios from "axios";

var adversaire: string;
var joueur: string;
let joueur1: string;
let joueur2: string;
var isSearching = false;
// let isActive = true;

export default function Game() {
	let size = useWindowDimensions();
	const [isActive, setActive] = React.useState(true);

	// socket game
	const [username, setUsername] = React.useState("");
	async function getUser() {
		let url = "http://localhost:3000/api/auth/";
		let username = "";
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;
		await axios.get(url)
			.then(res => {
				username = res.data.login;
				joueur = username;
				setUsername(username);
			})
			.catch((err) => {
				console.log("Error while getting api auth");
			})
	}
	var SearchText = "Rechercher une partie"

	let socket = io("http://localhost:3000/game", { query: { username: username } });
	
	function sendSearch() {
		if (joueur) {
			isSearching = isSearching ? false : true;
			if (isSearching)
				SearchText = "Annuler la recherche"
			else
				SearchText = "Rechercher une partie à nouveau"
			document.querySelector('#search-button').textContent = SearchText;
			socket.emit('search', isSearching);
		}
		else
			document.querySelector('#search-button').textContent = "Impossible de te connecter !"
    }

	socket.on("gameStart", (...args) => {
		document.querySelector('#victoryMessage').textContent = "";
		joueur1 = args[0];
		joueur2 = args[1];
		console.log("joueur1 = " + joueur1 + " joueur2 = " + joueur2)
		console.log("adversaire = " + adversaire + " joueur = " + joueur)
		if (joueur1 != adversaire && joueur1 == joueur) {
			initParty();
			adversaire = joueur2;
			document.querySelector('#joueur1').textContent = joueur1;
			document.querySelector('#joueur2').textContent = joueur2;
			play();
			setActive(false);
		}
		else if (joueur2 != adversaire && joueur2 == joueur) {
			initParty();
			adversaire = joueur1;
			document.querySelector('#joueur1').textContent = joueur1;
			document.querySelector('#joueur2').textContent = joueur2;
			play();
			setActive(false);
		}

	});


	// PONG CODE BELOW
	var canvas;
	var game;
	var anim;
	// On peut changer les dimensions de la balle et des joueurs, ex: autres modes de jeux
	const PLAYER_HEIGHT = 100;
	const PLAYER_WIDTH = 20;
	const BALL_HEIGHT = 10;
	const BALL_SPEED = 2;
	function draw() {
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

	function initParty()
	{
		canvas = document.getElementById('canvas');
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
		draw();
		canvas.addEventListener('mousemove', playerMove);
		otherMove();
	}

	useEffect(() => {
		getUser();
		initParty();
    }, []);

	function play() {
		draw();
		otherMove();
		ballMove();
		anim = requestAnimationFrame(play);
	}

	function playerMove(event) {
		// Get the mouse location in the canvas
		var canvasLocation = canvas.getBoundingClientRect();
		var mouseLocation = event.clientY - canvasLocation.y;
		// collision
		if (joueur == joueur1) {
			game.player.y = mouseLocation - PLAYER_HEIGHT / 2;
			if (mouseLocation < PLAYER_HEIGHT / 2) {
				game.player.y = 0;
			} else if (mouseLocation > canvas.height - PLAYER_HEIGHT / 2) {
				game.player.y = canvas.height - PLAYER_HEIGHT;
			} else {
				game.player.y = mouseLocation - PLAYER_HEIGHT / 2;
			}
			if (adversaire)
				socket.emit('playerMove', joueur + ":" + game.player.y);
		} else if (joueur == joueur2) {
			game.player2.y = mouseLocation - PLAYER_HEIGHT / 2;
			if (mouseLocation < PLAYER_HEIGHT / 2) {
				game.player2.y = 0;
			} else if (mouseLocation > canvas.height - PLAYER_HEIGHT / 2) {
				game.player2.y = canvas.height - PLAYER_HEIGHT;
			} else {
				game.player2.y = mouseLocation - PLAYER_HEIGHT / 2;
			}
			if (adversaire)
				socket.emit('playerMove', joueur + ":" + game.player2.y);
		}
	}

	socket.on("playerMove", (body: string) => {
		const b = body.split(':');
		console.log("adversaire = " + b[0] + " | position = " + b[1] + " | socket = " + socket.id)
		if (b[0] == joueur2) {
			game.player2.y = b[1];
		} else if (b[0] == joueur1) {
			game.player.y = b[1];
		}
	});

	function otherMove() {
		// game.player2.y += game.ball.speed.y;
	}

	function ballMove() {
		// Rebounds on top and bottom
		if (game.ball.y > canvas.height || game.ball.y < 0) {
			game.ball.speed.y *= -1;
		}
		if (game.ball.x > canvas.width - PLAYER_WIDTH) {
			collide(game.player2);
		} else if (game.ball.x < PLAYER_WIDTH) {
			collide(game.player);
		}
		game.ball.x += game.ball.speed.x;
		game.ball.y += game.ball.speed.y;
	}

	function collide(player) {
		// The player does not hit the ball
		if (game.ball.y < player.y || game.ball.y > player.y + PLAYER_HEIGHT) {
			// Set ball and players to the center
			game.ball.x = canvas.width / 2 - BALL_HEIGHT / 2;
			game.ball.y = canvas.height / 2 - BALL_HEIGHT / 2;
			game.player.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
			game.player2.y = canvas.height / 2 - PLAYER_HEIGHT / 2;

			// Reset speed
			game.ball.speed.x = BALL_SPEED;
			// Update score
			if (player == game.player) {
				game.player2.score++;
				document.querySelector('#player2-score').textContent = game.player2.score;
				if (game.player2.score >= 5) {
					stop();
					if (joueur1 == joueur)
						document.querySelector('#victoryMessage').textContent = "Game Over";
					else
						document.querySelector('#victoryMessage').textContent = "Victory";
					clearDataGame();
				}
			} else {
				game.player.score++;
				document.querySelector('#player-score').textContent = game.player.score;
				if (game.player.score >= 5) {
					stop();
					if (joueur1 == joueur)
						document.querySelector('#victoryMessage').textContent = "Victory";
					else
						document.querySelector('#victoryMessage').textContent = "Game Over";
					clearDataGame();
				}
			}
		} else {
			// Increase speed and change direction
			game.ball.speed.x *= -1.2;
			changeDirection(player.y);
		}
	}

	function changeDirection(playerPosition) {
		var impact = game.ball.y - playerPosition - PLAYER_HEIGHT / 2;
		var ratio = 100 / (PLAYER_HEIGHT / 2);
		// Get a value between 0 and 10
		// game.ball.speed.y = Math.round(impact * ratio / 10); // REBOND RAPIDE
		// game.ball.speed.y = Math.round(impact * ratio / 10 / 2); // REBOND NORMAL
		game.ball.speed.y = Math.round(impact * ratio / 10 / 4); // REBOND LENT
	}

	function stop() {
		console.log("username: ", joueur, "adversaire", adversaire, "score player 1: ", game.player.score, "score player 2: ", game.player.score)
		if (game.player.score > game.player2.score && joueur1 && joueur2 && joueur1 == joueur)
			socket.emit('gameEnd', joueur1 + ":" + joueur2 + ":" + game.player.score + ":" + game.player2.score);
		if (game.player.score < game.player2.score && joueur1 && joueur2 && joueur2 == joueur)
			socket.emit('gameEnd', joueur2 + ":" + joueur1 + ":" + game.player2.score + ":" + game.player.score);
		cancelAnimationFrame(anim); 
		// Set ball and players to the center
		game.ball.x = canvas.width / 2 - BALL_HEIGHT / 2;
		game.ball.y = canvas.height / 2 - BALL_HEIGHT / 2;
		game.player.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
		game.player2.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
		// Reset speed
		game.ball.speed.x = 0;
		game.ball.speed.y = 0;

		// draw();
	}

	function clearDataGame()
	{
		joueur1 = null;
		joueur2 = null;
		game = null;
		adversaire = null;
		anim = null;
		isSearching = false;
		setActive(true);
		document.querySelector('#search-button').textContent = "Refaire une partie";
	}

	return (
		<div id="game-root">
			<Nav />
			<div className="container">
			<div className="row d-flex justify-content-center text-center">
					{isActive ? <button type="button" className="btn btn-outline-dark" id="search-button" onClick={() => sendSearch()}>{SearchText}</button> : ""}
					<p className='text' id="victoryMessage"></p>
					<main role="main">
						<p className="canvas-score" id="scores">
							<em className="canvas-score" id="joueur1"></em>
							<span className="canvas-score">:</span>
							<em className="canvas-score" id="player-score">0</em> - <em id="joueur2"></em><span>:</span><em className="canvas-score" id="player2-score">0</em></p>
						<canvas id="canvas" width={size.width / 1.5} height={size.height / 1.25}></canvas>
					</main>
					{/*<GameRules />*/}
				</div>
			</div>
			{/*<Footer />*/}
		</div>
	);
}
