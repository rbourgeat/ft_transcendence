import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { UserService } from 'src/user/user.service';
import { Logger } from "@nestjs/common";
import { AdminDto, BanDto, CreateChatDto, LeaveDto, MuteDto } from './dto/chat.dto';

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
		//this.logger.log("Client connected: " + socket.handshake.query.username + ' id: ' + socket.id + ')');
		this.userService.updateStatus(String(socket.handshake.query.username), "online");
		//this.server.emit("updateStatus", String(socket.handshake.query.username), "online");
	}

	async handleDisconnect(socket: Socket, ...args: any[]) {
		//this.logger.log("Client disconnected: " + socket.handshake.query.username + ' id: ' + socket.id + ')');
		this.userService.updateStatus(String(socket.handshake.query.username), "offline");
		this.server.emit("updateStatus", String(socket.handshake.query.username), "offline");
	}

	@SubscribeMessage('update')
	async update(@ConnectedSocket() socket: Socket, @MessageBody() body: string) {
		const b = body.split(':');
		//console.log("www:" + b[0]);
		this.server.emit("updateStatus", b[0], b[1]);
	}

		@SubscribeMessage('getUsersLogins')
	async getLogins(@ConnectedSocket() socket: Socket, @MessageBody() body: string) {
		const b = body.split(':');
		//console.log("www:" + body);

		var y: number = +b[0];
		const user1 = await this.userService.getUserById(y);
		var x: number = +b[1];
		const user2 = await this.userService.getUserById(x);
		socket.emit("receiveLogins", user1.login, user2.login);
	}

	@SubscribeMessage('message')
	async messageMessage(@ConnectedSocket() socket: Socket, @MessageBody() body: string) {

		console.log(body + ' = body in event message');
		let b = body.split(':');
		const author = await this.userService.getUserByLogin(b[0]);

		console.log(b[4] + ' = chat or dm');

		if(b[4] == "chat")
		{
		const message = await this.chatService.saveChatMessage(b[1], b[2], author);
		const messages = await this.chatService.getMessagesbyName(b[1]);
		this.server.emit('refreshMessages', messages, b[1]);
		}
		else if(b[4] == "dm")
		{
		   console.log(b[1] + ' = check dm');
		   var y: number = +b[3];
		   console.log("dm id:" + y);
           const dm = await this.chatService.getChatById(y);
		   const message = await this.chatService.saveChatMessage(dm.name, b[2], author);
		   const messages = await this.chatService.getMessagesbyName(dm.name);
		   	this.server.emit('refreshMessages', messages, dm.name);
		}
	}

	@SubscribeMessage('requestAllMessages')
	async requestAllMessagesbyName(@ConnectedSocket() socket: Socket, @MessageBody() body: number) {
		if (body) {
			const messages = await this.chatService.getMessagesById2(body, String(socket.handshake.query.username));
			socket.emit('sendAllMessages', messages);
		}
	}

	@SubscribeMessage('updateChat')
	async updateChat(@ConnectedSocket() socket: Socket, @MessageBody() body: string) {
		this.server.emit('newMessageEvent', true);
		this.server.emit('updateParticipants', true);
	}

	@SubscribeMessage('getChannels')
	async getChannels(@ConnectedSocket() socket: Socket, @MessageBody() body: string) {
		const user = await this.userService.getUserByLogin(body);
		const channels = await this.chatService.getChatsFromUser(user);
		socket.emit('channels', channels);
		//this.server.emit('newMessageEvent', true);
		//this.server.emit('updateParticipants', true);
	}

	@SubscribeMessage('refresh')
	async refreshChat(@ConnectedSocket() socket: Socket, @MessageBody() body: string) {
		console.log(body + 'event refresh');
		//const b = body.split(':');
		//const author = await this.userService.getUserByLogin(b[0]);
		//const message = await this.chatService.saveChatMessage(b[1], b[2], author);

		//const messages = await this.chatService.getMessagesbyName(b[1]);
		const chat = await this.chatService.getChatByName(body);
		const users = await this.chatService.getUsersInChannel(chat.id);
		this.server.emit('refreshParticipants', users, body);
	}

	@SubscribeMessage('leave')
	async leaveChat(@ConnectedSocket() socket: Socket, @MessageBody() body: LeaveDto) {
		console.log(body.user + ' event leave in chat ' + body.chatName);
		const user = await this.userService.getUserByLogin(body.user);
		const chat = await this.chatService.getChatByName(body.chatName);
		await this.chatService.quitChat(chat.id, user);
		this.refreshChat(socket, body.chatName);
	}

	@SubscribeMessage('mute')
	async muteUser(@ConnectedSocket() socket: Socket, @MessageBody() body: MuteDto) {
		console.log(body.user + " " + body.mute + ' event isMute in chat ' + body.chatName);
		const user = await this.userService.getUserByLogin(body.user);
		const admin = await this.userService.getUserByLogin(body.admin);
		if (body.mute)
			await this.chatService.mute(body.chatName, body.user, admin, body.time);
		else
			await this.chatService.active(body.chatName, body.user, admin);
		this.server.emit('isMute', user.login, body.mute, body.time);
		this.refreshChat(socket, body.chatName);
	}

	@SubscribeMessage('ban')
	async banUser(@ConnectedSocket() socket: Socket, @MessageBody() body: BanDto) {
		console.log(body.user + " " + body.ban + ' event isBan in chat ' + body.chatName);
		const user = await this.userService.getUserByLogin(body.user);
		const admin = await this.userService.getUserByLogin(body.admin);
		if (body.ban)
			await this.chatService.ban(body.chatName, body.user, admin);
		else
			await this.chatService.active(body.chatName, body.user, admin);
		this.server.emit('isBan', user.login, body.ban);
		this.refreshChat(socket, body.chatName);
	}

	@SubscribeMessage('setAdmin')
	async setAdmin(@ConnectedSocket() socket: Socket, @MessageBody() body: AdminDto) {
		console.log(body.user + ' event setAdmin in chat ' + body.chatName);
		const user = await this.userService.getUserByLogin(body.user);
		const admin = await this.userService.getUserByLogin(body.admin);

		await this.chatService.setAdmin(body.chatName, user.login, admin);
		this.refreshChat(socket, body.chatName);
	}

	@SubscribeMessage('requestAllUsers')
	async requestAllUsers(@ConnectedSocket() socket: Socket, @MessageBody() body: number) {
		if (body) {
			const users = await this.chatService.getUsersInChannel(body);
			socket.emit('sendAllUsers', users);
		}
	}
}
