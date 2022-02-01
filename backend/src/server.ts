const express = require("express");
const request = require('request');
const app = express();

const PORT = process.env.PORT || '80';

function login() {
	var access_token = "";
	var options = {
		'method': 'POST',
		'url': 'https://api.intra.42.fr/oauth/token',
		'headers': {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		form: {
			'grant_type': 'client_credentials',
			'client_id': 'f60dc2f1d07980f192aaa1f0205dad411ee73dd20086150ffb9f62d7f7e0c901',
			'client_secret': 'ea3c557c987c33a5f364461fa7ed4fae295142efff2906168d71c05b99f47ccd'
		},
		json: true
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
			console.log(response.body);
		const obj = JSON.parse(response.body);
		access_token = obj.access_token;
		console.log("acces_token = " + access_token);
	});
	//console.log("acces_token = " + access_token);
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	//res.send("Hello, ft_transcendence !");
	res.render("index");
});

app.get("/game", (req, res) => {
	res.render("game", { user: "rbourgea"});
});

app.get("/error", (req, res) => {
	res.render("error");
});

app.get("/login", (req, res) => {
	//res.render("login");
	//login();
	var randomverylongstring = makeid(15);
	res.writeHead(301, {
		Location: `https://api.intra.42.fr/oauth/authorize?client_id=f60dc2f1d07980f192aaa1f0205dad411ee73dd20086150ffb9f62d7f7e0c901&redirect_uri=http%3A%2F%2Flocalhost%2Fauth&response_type=code&state=${randomverylongstring}`
	}).end();
});

app.get("/auth", (req, res) => {
	res.render("auth");
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
