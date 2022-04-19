import React, { useState, useEffect, useLayoutEffect } from 'react';
import './Game.scss';
import useWindowDimensions from "./useWindowDimensions"
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import GameRules from "../GameRules/GameRules";
import io from "socket.io-client";
import axios from "axios";
import { Form } from 'react-bootstrap'
import Confetti from 'react-confetti';
import { Offline, Online } from "react-detect-offline";
import "../../../node_modules/react-rain-animation/lib/style.css";

var adversaire: string;
var joueur: string;
let joueur1: string;
let joueur2: string;
var isSearching = false;
var gm = 0;

export default function Game() {
	let size = useWindowDimensions();
	const [isActive, setActive] = React.useState(true);
	const [isActive2, setActive2] = React.useState(false);
	const [isWin, setWin] = React.useState(false);
	const [gameMode, chanScopeSet] = React.useState("original");

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
	var SearchText2 = "Rejouer avec le même joueur"

	var socket = io("http://localhost:3000/game", { query: { username: username } });

	function sendSearch() {
		if (joueur) {
			isSearching = isSearching ? false : true;
			if (isSearching) {
				setActive2(false);
				SearchText = "Annuler la recherche"
				socket.emit('search', gameMode);
			}
			else {
				setActive2(true);
				SearchText = "Rechercher une partie à nouveau"
				socket.emit('search', "STOPSEARCH");
			}
			document.querySelector('#search-button').textContent = SearchText;
		}
		else
			document.querySelector('#search-button').textContent = "Impossible de te connecter !"
	}

	function sendSearch2() {
		if (joueur) {
			isSearching = isSearching ? false : true;
			if (isSearching) {
				setActive(false);
				SearchText2 = "Annuler la demande"
				socket.emit('search', "RETRY:" + gameMode + ":" + adversaire);
			}
			else {
				setActive(true);
				SearchText2 = "Rejouer avec le même adversaire"
				socket.emit('search', "STOPSEARCH");
			}
			document.querySelector('#search-button2').textContent = SearchText;
		}
		else
			document.querySelector('#search-button2').textContent = "Impossible de te connecter !"
	}

	socket.on("gameStart", (...args) => {
		setWin(false);
		document.querySelector('#player-score').textContent = "0";
		document.querySelector('#player2-score').textContent = "0";
		document.querySelector('#victoryMessage').textContent = "";
		joueur1 = args[0];
		joueur2 = args[1];
		gm = args[2];
		initParty();
		if (joueur1 != adversaire && joueur1 == joueur && game) {
			adversaire = joueur2;
			document.querySelector('#joueur1').textContent = joueur1;
			document.querySelector('#joueur2').textContent = joueur2;
			play();
			setActive(false);
			setActive2(false);
			setGameMode(gm);
		}
		else if (joueur2 != adversaire && joueur2 == joueur && game) {
			adversaire = joueur1;
			document.querySelector('#joueur1').textContent = joueur1;
			document.querySelector('#joueur2').textContent = joueur2;
			play();
			setActive(false);
			setActive2(false);
			setGameMode(gm);
		}

	});

	function setGameMode(gm: number) {
		if (gm == 0) {
			PLAYER_HEIGHT = 80;
			PLAYER_WIDTH = 10;
			BALL_HEIGHT = 10;
			BALL_SPEED = 2;
			BALL_ACCELERATE = true;
		} else if (gm == 1) {
			PLAYER_HEIGHT = 80;
			PLAYER_WIDTH = 10;
			BALL_HEIGHT = 50;
			BALL_SPEED = 2;
			BALL_ACCELERATE = true;
		} else if (gm == 2) {
			PLAYER_HEIGHT = 80;
			PLAYER_WIDTH = 10;
			BALL_HEIGHT = 10;
			BALL_SPEED = 5;
			BALL_ACCELERATE = true;
		} else if (gm == 3) {
			PLAYER_HEIGHT = 80;
			PLAYER_WIDTH = 10;
			BALL_HEIGHT = 10;
			BALL_SPEED = 0.5;
			BALL_ACCELERATE = false;
		} else if (gm == 4) {
			PLAYER_HEIGHT = 80;
			PLAYER_WIDTH = 80;
			BALL_HEIGHT = 10;
			BALL_SPEED = 2;
			BALL_ACCELERATE = false;
		}
	}


	// PONG CODE BELOW
	var canvas;
	var game;
	var anim;
	// On peut changer les dimensions de la balle et des joueurs, ex: autres modes de jeux
	var PLAYER_HEIGHT = 80;
	var PLAYER_WIDTH = 10;
	var BALL_HEIGHT = 10;
	var BALL_SPEED = 2;
	var BALL_ACCELERATE = true;
	function draw() {
		// Draw Canvas
		var context = canvas.getContext('2d');
		context.fillStyle = 'black';
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.strokeStyle = 'white';
		context.beginPath();
		context.moveTo(canvas.width / 2, 0);
		context.lineTo(canvas.width / 2, canvas.height);
		context.stroke();
		context.fillStyle = 'white';
		context.fillRect(0, game.player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
		context.fillRect(canvas.width - PLAYER_WIDTH, game.player2.y, PLAYER_WIDTH, PLAYER_HEIGHT);
		context.beginPath();
		context.fillStyle = 'white';
		context.fillRect(game.ball.x, game.ball.y, BALL_HEIGHT, BALL_HEIGHT);
		context.fill();
	}

	function initParty() {
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
				speed: {
					x: BALL_SPEED,
					y: BALL_SPEED
				}
			}
		}
		draw();
	}

	useEffect(() => {
		// First page loading event (only one time)
		getUser();
		initParty();
		canvas.addEventListener('mousemove', playerMove);
	}, []);

	function play() {
		draw();
		ballMove();
		anim = requestAnimationFrame(play);
	}

	function playerMove(event) {
		// Get the mouse location in the canvas
		var canvasLocation = canvas.getBoundingClientRect();
		var mouseLocation = event.clientY - canvasLocation.y;
		// Emit socket player position
		if (joueur == joueur1) {
			game.player.y = mouseLocation - PLAYER_HEIGHT / 2;
			if (mouseLocation < PLAYER_HEIGHT / 2) {
				game.player.y = 0;
			} else if (mouseLocation > canvas.height - PLAYER_HEIGHT / 2) {
				game.player.y = canvas.height - PLAYER_HEIGHT;
			} else {
				game.player.y = mouseLocation - PLAYER_HEIGHT / 2;
			}
			if (joueur && game.player.y && adversaire)
				socket.emit('playerMove', joueur + ":" + game.player.y + ":" + adversaire + ":" + "gauche" + ":" + gm);
		} else if (joueur == joueur2) {
			game.player2.y = mouseLocation - PLAYER_HEIGHT / 2;
			if (mouseLocation < PLAYER_HEIGHT / 2) {
				game.player2.y = 0;
			} else if (mouseLocation > canvas.height - PLAYER_HEIGHT / 2) {
				game.player2.y = canvas.height - PLAYER_HEIGHT;
			} else {
				game.player2.y = mouseLocation - PLAYER_HEIGHT / 2;
			}
			if (joueur && game.player.y && adversaire)
				socket.emit('playerMove', joueur + ":" + game.player2.y + ":" + adversaire + ":" + "droit" + ":" + gm);
		}
	}

	socket.on("playerMove", (body: string) => {
		if (game) {
			// Update Paddle position in real time
			const b = body.split(':');
			if (b[0] == joueur2) {
				game.player2.y = b[1];
			} else if (b[0] == joueur1) {
				game.player.y = b[1];
			}
		}
	});

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
		// Ball progressive speed
		game.ball.x += game.ball.speed.x;
		game.ball.y += game.ball.speed.y;
	}

	function collide(player) {
		// The player does not hit the ball
		var bottom: Number;
		bottom = Number(player.y) + Number(PLAYER_HEIGHT);
		if (game.ball.y < player.y || game.ball.y > bottom) {
			// Set ball and players to the center
			game.ball.x = canvas.width / 2 - BALL_HEIGHT / 2;
			game.ball.y = canvas.height / 2 - BALL_HEIGHT / 2;
			game.ball.speed.y = BALL_SPEED;

			if (player == game.player) {
				// Change ball direction + reset speed
				game.ball.speed.x = BALL_SPEED * -1;
				// Update score
				game.player2.score++;
				socket.emit('roundStart', 0 + ":" + joueur1 + ":" + joueur2 + ":" + game.player.score + ":" + game.player2.score);
				document.querySelector('#player2-score').textContent = game.player2.score;
				if (game.player2.score >= 5) {
					stop();
					clearDataGame();
				}
			} else {
				// Change ball direction + reset speed
				game.ball.speed.x = BALL_SPEED;
				// Update score
				game.player.score++;
				socket.emit('roundStart', 0 + ":" + joueur1 + ":" + joueur2 + ":" + game.player.score + ":" + game.player2.score);
				document.querySelector('#player-score').textContent = game.player.score;
				if (game.player.score >= 5) {
					stop();
					clearDataGame();
				}
			}
		} else {
			// Increase speed and change direction
			if (BALL_ACCELERATE)
				game.ball.speed.x *= -1.2;
			else
				game.ball.speed.x *= -1;
			changeDirection(player.y);
		}
	}

	function changeDirection(playerPosition) {
		// Ball bounce
		var impact = game.ball.y - playerPosition - PLAYER_HEIGHT / 2;
		var ratio = 100 / (PLAYER_HEIGHT / 2);
		game.ball.speed.y = Math.round(impact * ratio / 10);
	}

	function stop() {
		// console.log("username: ", joueur, ", adversaire: ", adversaire, ", score player 1: ", game.player.score, ", score player 2: ", game.player.score, ", gameMode: ", gm)
		if (game.player.score > game.player2.score && joueur1 && joueur2 && joueur1 == joueur) {
			socket.emit('gameEnd', joueur1 + ":" + joueur2 + ":" + game.player.score + ":" + game.player2.score + ":" + gm);
			document.querySelector('#victoryMessage').textContent = "Victory";
		}
		if (game.player.score < game.player2.score && joueur1 && joueur2 && joueur2 == joueur) {
			socket.emit('gameEnd', joueur2 + ":" + joueur1 + ":" + game.player2.score + ":" + game.player.score + ":" + gm);
			document.querySelector('#victoryMessage').textContent = "Victory";
		}
		if (document.querySelector('#victoryMessage').textContent != "Victory")
			document.querySelector('#victoryMessage').textContent = "Game Over";
		else
			setWin(true);
		cancelAnimationFrame(anim);
		// Set ball and players to the center
		game.ball.x = canvas.width / 2 - BALL_HEIGHT / 2;
		game.ball.y = canvas.height / 2 - BALL_HEIGHT / 2;
		game.player.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
		game.player2.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
		// Reset speed
		game.ball.speed.x = 0;
		game.ball.speed.y = 0;
	}

	function clearDataGame() {
		joueur1 = null;
		joueur2 = null;
		// adversaire = null;
		game = {
			player: {
				y: canvas.height / 2 - PLAYER_HEIGHT / 2
			},
			player2: {
				y: canvas.height / 2 - PLAYER_HEIGHT / 2
			},
			ball: {
				x: canvas.width / 2 - BALL_HEIGHT / 2,
				y: canvas.height / 2 - BALL_HEIGHT / 2,
				speed: {
					x: 0,
					y: 0
				}
			}
		}
		anim = null;
		isSearching = false;
		setActive(true);
		setActive2(true);
		document.querySelector('#search-button').textContent = "Refaire une partie";
		document.querySelector('#search-button2').textContent = "Rejouer avec le même joueur";
	}

	return (
		<>
			{localStorage.getItem("loggedIn") != "true" ?
				<>
					<Nav />
					<div className="container">
						<div className="row d-flex justify-content-center text-center">
							<div className="col-9">
								<div className="channels-not-logged">
									<p>You are not logged in.</p>
								</div>
								<canvas id="canvas" width="0" height="0"></canvas>
							</div>
						</div>
					</div>
				</>
				:
				<div>
					<Online>
						<div id="game-root">
							<Nav />
							{isWin ? <Confetti width={size.width} height={size.height} /> : ""}
							<div className="container">
								<div className="row d-flex justify-content-center text-center">
									{isActive ?
										<Form>
											<Form.Group>
												<Form.Select aria-label="Modes de jeux:" defaultValue="original" onChange={e => chanScopeSet(e.target.value)}>
														<option>Modes de jeux:</option>
														<option value="original">Original (1972)</option>
														<option value="bigball">Big Ball (Facile)</option>
														<option value="blitz">Blitz (Balle Rapide)</option>
														<option value="slow">Slow (Balle Lente)</option>
														<option value="cube">Cube World (All is cubic)</option>
												</Form.Select>
											</Form.Group>
										</Form>
									: ""}
									{isActive ? <button type="button" className="btn btn-outline-light" id="search-button" onClick={() => sendSearch()}>{SearchText}</button> : ""}
									{isActive2 ? <button type="button" className="btn btn-outline-light" id="search-button2" onClick={() => sendSearch2()}>{SearchText2}</button> : ""}
									<p id="victoryMessage"></p>
									<main role="main">
										<p className="canvas-score" id="scores">
											<em className="canvas-score" id="joueur1"></em>
											<span className="canvas-score">:</span>
											<em className="canvas-score" id="player-score">0</em> - <em id="joueur2"></em><span>:</span><em className="canvas-score" id="player2-score">0</em></p>
										<canvas id="canvas" width={size.width / 1.5} height={size.height / 1.25}></canvas>
									</main>
								</div>
							</div>
						</div>
					</Online>
					<Offline>
						<div id="offline">Vous n'êtes pas connecté à internet !</div>
					</Offline>
				</div>
			}
		</>
	);
}
