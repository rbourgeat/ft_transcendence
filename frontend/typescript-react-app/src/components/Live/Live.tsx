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
		console.log("joueur: " + b[0] + ", position : " + b[1] + ", adversaire : " + b[2]);
		if (joueurs.indexOf(b[0]) == -1 && adversaires.indexOf(b[0]) == -1) {
			joueurs.push(b[0]);
			adversaires.push(b[2]);
			display();
		}
		console.log("joueurs: " + joueurs);
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
					<button id='watch'>Watch</button>
				</div>
				`;
			})
		});
		noGames();
	}

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

	return(
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
							</div>
						</div>
					</div>
				</>
				:
				<div>
					<Nav/>
					<div id="titre">📺 Liste des Lives</div>
						<div id="content">
						</div>
				</div>
		}
		</>
	)

}
