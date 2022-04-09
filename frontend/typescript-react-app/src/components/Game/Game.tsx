import {useState,  useEffect, useLayoutEffect } from 'react';
import './Game.scss';
import useWindowDimensions from "./useWindowDimensions"
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import GameRules from "../GameRules/GameRules";

export default function Game() {
	//const { width, height } = useWindowSize();
	// let size = useWindowSize();
	let size = useWindowDimensions();

	// PONG CODE BELOW
	var canvas;
	var game;
	var anim;
	// On peut changer les dimensions de la balle et des joueurs, ex: autres modes de jeux
	const PLAYER_HEIGHT = 50;
	const PLAYER_WIDTH = 10;
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

	useEffect(() => {
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
		play();
		canvas.addEventListener('mousemove', playerMove);
		otherMove();
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
		game.player.y = mouseLocation - PLAYER_HEIGHT / 2;
		// collision
		if (mouseLocation < PLAYER_HEIGHT / 2) {
			game.player.y = 0;
		} else if (mouseLocation > canvas.height - PLAYER_HEIGHT / 2) {
			game.player.y = canvas.height - PLAYER_HEIGHT;
		} else {
			game.player.y = mouseLocation - PLAYER_HEIGHT / 2;
		}
	}

	function otherMove() {
		game.player2.y += game.ball.speed.y;
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
				if (game.player2.score >= 5)
					stop();
			} else {
				game.player.score++;
				document.querySelector('#player-score').textContent = game.player.score;
				if (game.player.score >= 5)
					stop();
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
		console.log("anim = " + anim)
		cancelAnimationFrame(anim);
		// Set ball and players to the center
		game.ball.x = canvas.width / 2 - BALL_HEIGHT / 2;
		game.ball.y = canvas.height / 2 - BALL_HEIGHT / 2;
		game.player.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
		game.player2.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
		// Reset speed
		game.ball.speed.x = 0;
		game.ball.speed.y = 0;
		// Init score
		// game.player2.score = 0;
		// game.player.score = 0;
		// document.querySelector('#player2-score').textContent = game.player2.score;
		// document.querySelector('#player-score').textContent = game.player.score;
		draw();
	}

	console.log(size.width)
	return (
		<div id="game-root">
			<Nav />
			<div className="container">
			<div className="row d-flex justify-content-center text-center">
					{/*<h1 id="title--game" className="text">GAME</h1>*/}
					{/*<canvas></canvas>*/}
					<main role="main">
						<p>Joueur 1 : <em id="player-score">0</em> - Joueur 2 : <em id="player2-score">0</em></p>
						<canvas id="canvas" width={size.width / 1.5} height={size.height / 1.25}></canvas>
					</main>
					<GameRules />
				</div>
			</div>
			<Footer />
		</div>
	);
}
