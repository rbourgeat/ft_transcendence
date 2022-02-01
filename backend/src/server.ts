const express = require("express");
const request = require('request');
const app = express();

const PORT = process.env.PORT || '80';

function checkIfRegister(info42, res) {
	res.send(info42);
}

function me(token, res) {
	var options = {
		'method': 'GET',
		'url': 'https://api.intra.42.fr/v2/me',
		'headers': {
			'Authorization': 'Bearer ' + token
		},
		json: true
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
		console.log(response.body);
		checkIfRegister(response.body, res);
	});
}

function auth(code, state, res) {
	var options = {
		'method': 'POST',
		'url': 'https://api.intra.42.fr/oauth/token',
		'headers': {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		form: {
			'grant_type': 'authorization_code',
			'client_id': 'f60dc2f1d07980f192aaa1f0205dad411ee73dd20086150ffb9f62d7f7e0c901',
			'client_secret': 'ea3c557c987c33a5f364461fa7ed4fae295142efff2906168d71c05b99f47ccd',
			'code': code,
			'state': state,
			'redirect_uri': 'http://localhost/auth',
		},
		json: true
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
		console.log(response.body);
		// console.log('access_token = ' + response.body['access_token']);
		me(response.body['access_token'], res);
	});
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

app.get("/login", (req, res) => {
	var randomverylongstring = makeid(15);
	res.writeHead(301, {
		Location: `https://api.intra.42.fr/oauth/authorize?client_id=f60dc2f1d07980f192aaa1f0205dad411ee73dd20086150ffb9f62d7f7e0c901&redirect_uri=http%3A%2F%2Flocalhost%2Fauth&response_type=code&state=${randomverylongstring}`
	}).end();
});

app.get("/auth", (req, res) => {
	var url = req.url;
	var code = url.substring(url.indexOf("=") + 1, url.lastIndexOf("&"));
	var state = url.substring(url.indexOf("state=") + 6, url.length - 1);
	if (code && state)
		auth(code, state, res);
	else
		res.send("ERROR WITH 42 API");
});

app.get("/callback", (req, res) => {
	res.send("YESSSS !");
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
