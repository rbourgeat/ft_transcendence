import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { UserService } from 'src/user/user.service';
import { Logger } from "@nestjs/common";

const clients = [];

@WebSocketGateway({ namespace: 'chat', cors: true })

export class ChatGateway implements OnGatewayConnection {
	@WebSocketServer()
	server: Server;

	private logger: Logger = new Logger("chatGateway");

	constructor(
		private readonly chatService: ChatService,
		private readonly userService: UserService
	) { }

	async handleConnection(socket: Socket, ...args: any[]) {
		this.logger.log("Client connected: " + socket.handshake.query.username + ' id: ' + socket.id + ')');
		this.userService.updateStatus(String(socket.handshake.query.username), "online");
		clients.push(socket);
		clients.forEach(function (client) {
			client.emit("updateStatus", String(socket.handshake.query.username), "online");
		});
	}

	async handleDisconnect(socket: Socket, ...args: any[]) {
		this.logger.log("Client disconnected: " + socket.handshake.query.username + ' id: ' + socket.id + ')');
		this.userService.updateStatus(String(socket.handshake.query.username), "offline");
		clients.forEach(function (client) {
			client.emit("updateStatus", String(socket.handshake.query.username), "offline");
		});
		const index = clients.indexOf(socket);
		if (index > -1)
			clients.splice(index, 1);
	}

	@SubscribeMessage('message')
	async messageMessage(@ConnectedSocket() socket: Socket, @MessageBody() body: string) {
		console.log(body);
		const b = body.split(':');
		const author = await this.userService.getUserByLogin(b[0]);
		const message = await this.chatService.saveChatMessage(b[1], b[2], author);

		const messages = await this.chatService.getMessagesbyName(b[1]);
		this.server.emit('refreshMessages', messages, b[1]);
	}

	@SubscribeMessage('requestAllMessages')
	async requestAllMessagesbyName(@ConnectedSocket() socket: Socket, @MessageBody() body: string) {
		if (body)
		{
			const messages = await this.chatService.getMessagesbyName(body);
			socket.emit('sendAllMessages', messages);
		}
	}
}
