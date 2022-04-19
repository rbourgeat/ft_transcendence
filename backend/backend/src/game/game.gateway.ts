import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from "@nestjs/common";
import { GameService } from './game.service';
import { UserService } from '../user/user.service';

let MatchMaking = [[],[],[],[],[]];
let privateMatchMaking = [];

@WebSocketGateway({ namespace: 'game', cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	private logger: Logger = new Logger("GameGateway");

	constructor(
		private readonly gameService: GameService,
		private readonly userService: UserService
	) { }

	afterInit(server: Server) {
		this.logger.log("game socket init !");
	}

	async handleConnection(socket: Socket, ...args: any[]) {
		this.logger.log("Client connected: " + socket.handshake.query.username + ' id: ' + socket.id + ')');
	}

	async handleDisconnect(socket: Socket, ...args: any[]) {
		this.logger.log("Client disconnected: " + socket.handshake.query.username + ' id: ' + socket.id + ')');
	}

	@SubscribeMessage('search')
	async searchMessage(@ConnectedSocket() socket: Socket, @MessageBody() body: string) {
		console.log(body)
		// File d'attente en fonction du gamemode choisis
		let gameMode = 0;
		let privatePlayer2;
		if (body == "bigball")
			gameMode = 1;
		if (body == "blitz")
			gameMode = 2;
		if (body == "slow")
			gameMode = 3;
		if (body == "cube")
			gameMode = 4;
		if (body == "STOPSEARCH")
			gameMode = -1;
		if (body.includes("RETRY")) {
			var b = body.split(':');
			if (b[1] == "bigball")
				gameMode = 1;
			if (b[1] == "blitz")
				gameMode = 2;
			if (b[1] == "slow")
				gameMode = 3;
			if (b[1] == "cube")
				gameMode = 4;
			if (b[1] == "STOPSEARCH")
				gameMode = -1;
			privatePlayer2 = b[2];
		}

		// Le joueur rejoins une file d'attende suivant le mode de jeu
		if (socket.handshake.query.username && gameMode != -1) {
			if (body.includes("RETRY"))
				privateMatchMaking.push(socket.handshake.query.username);
			else
				MatchMaking[gameMode].push(socket.handshake.query.username);
			console.log(socket.handshake.query.username + " a rejoint la file d'attente " + gameMode)
			console.log("File d'attente " + gameMode + ": " + MatchMaking[gameMode]);
		} else if (socket.handshake.query.username && gameMode == -1) {
			if (body.includes("RETRY")) {
				const index = privateMatchMaking.indexOf(socket.handshake.query.username);
				if (index > -1) {
					privateMatchMaking.splice(index, 1);
				}
			} else {
				const index = MatchMaking[gameMode].indexOf(socket.handshake.query.username);
				if (index > -1) {
					MatchMaking[gameMode].splice(index, 1);
				}
			}
			console.log(socket.handshake.query.username + " a quitté la file d'attente " + gameMode)
			console.log("File d'attente " + gameMode + ": " + MatchMaking[gameMode]);
		}

		if (socket.handshake.query.username && privateMatchMaking.length >= 2 && body.includes("RETRY")) {
			const index = privateMatchMaking.indexOf(socket.handshake.query.username);
			const index2 = privateMatchMaking.indexOf(privatePlayer2);
			if (index > -1 && index2 > -1) {
				privateMatchMaking.splice(index, 1);
				privateMatchMaking.splice(index2, 1);
				this.server.emit('gameStart', socket.handshake.query.username, privatePlayer2, gameMode);
				console.log("Une partie recommence avec " + socket.handshake.query.username + " VS " + privatePlayer2)
			}
		}

		// Adversaire trouvé, la partie peut commencer (joueur en haut de la file en premier)
		if (!body.includes("RETRY"))
			if (socket.handshake.query.username && MatchMaking[gameMode].length >= 2 
				&& MatchMaking[gameMode][0] != socket.handshake.query.username)
			{
				var index = MatchMaking[gameMode].indexOf(socket.handshake.query.username);
				if (index > -1) {
					MatchMaking[gameMode].splice(index, 1);
				}
				let adversaire = MatchMaking[gameMode][0];
				index = MatchMaking[gameMode].indexOf(adversaire);
				if (index > -1) {
					MatchMaking[gameMode].splice(index, 1);
				}
				this.server.emit('gameStart', socket.handshake.query.username, adversaire, gameMode);
				console.log("Une partie commence avec " + socket.handshake.query.username + " VS " + adversaire)
			}
	}

	@SubscribeMessage('gameEnd')
	async gameEnd(@ConnectedSocket() socket: Socket, @MessageBody() body: string) {
		const b = body.split(':');
		console.log("winner: ", b[0], ", loser: ", b[1], ", winner score: ", b[2], ", loser score: ", b[3], ", gameMode: ", b[4])
		if (b[0] && b[1]) {
			this.gameService.createGame(b[0], b[1], Number(b[2]), Number(b[3]), Number(b[4]));
			this.server.emit('stopGame', b[0], b[1]);
			this.userService.updateStatus(String(b[0]), "online");
			this.userService.updateStatus(String(b[1]), "online");
		}
		
	}

	@SubscribeMessage('playerMove')
	async playerMove(@ConnectedSocket() socket: Socket, @MessageBody() body: string) {
		const b = body.split(':');
		this.server.emit('playerMove', body);
		this.userService.updateStatus(String(socket.handshake.query.username), "ingame");
		console.log("joueur: " + b[0] + ", position : " + b[1] + ", adversaire : " + b[2] + ", coté : " + b[3]);
	}

	@SubscribeMessage('roundStart')
	async roundStart(@ConnectedSocket() socket: Socket, @MessageBody() body: string) {
		const b = body.split(':');
		this.server.emit('roundStartLIVE', body);
		console.log("round: " + b[0] + ", player1: " + b[1] + ", player2: " + b[2] + ", score1: " + b[3] + ", score2: " + b[4]);
	}


}