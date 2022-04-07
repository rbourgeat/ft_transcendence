import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { UserService } from 'src/user/user.service';

//@WebSocketGateway(
//	{
//	//{
//	//cors: {
//	//	origin: '*',
//	//},
//})

@WebSocketGateway({ cors: true })

export class ChatGateway implements OnGatewayConnection {
	@WebSocketServer()
	server: Server;

	constructor(
		private readonly chatService: ChatService,
		private readonly userService: UserService
	) { }

	async handleConnection(socket: Socket, ...args: any[]) {
		console.log(socket.id + " connecté")
	}

	async handleDisconnect(socket: Socket, ...args: any[]){
		console.log(socket.id + " déconnecté")
	}

	@SubscribeMessage('status')
	statusMessage(@MessageBody() body: any) {
		console.log(body);
		const message = body.split(':');
		this.userService.updateStatus(message[0], message[1]);
	}

	@SubscribeMessage('test')
	testMessage(@MessageBody() body: any) {
		console.log(body);
	}

	@SubscribeMessage('message')
	async messageMessage(@MessageBody() body: string) {
		console.log(body);
		const b = body.split(':');
		const author = await this.userService.getUserByLogin(b[0]);
		const message = await this.chatService.saveChatMessage(b[1], b[2], author);

		this.server.sockets.emit('receive_message', message);
	}



	// async handleConnection(socket: Socket) {
	// 	await this.chatService.getUserFromSocket(socket);
	// }

	@SubscribeMessage('send_message')
	async listenForMessages(@MessageBody() content: string, @ConnectedSocket() socket: Socket) {

		const author = await this.chatService.getUserFromSocket(socket);
		const message = await this.chatService.saveMessage(content, author);

		this.server.sockets.emit('receive_message', message);
	}

	@SubscribeMessage('send_message_chat')
	async listenForChatMessages(@MessageBody() chat: string, @MessageBody() content: string, @ConnectedSocket() socket: Socket) {

		const author = await this.chatService.getUserFromSocket(socket);
		const message = await this.chatService.saveChatMessage(chat, content, author);

		this.server.sockets.emit('receive_message_chat', chat, message);
	}

	@SubscribeMessage('request_all_messages')
	async requestAllMessages(@ConnectedSocket() socket: Socket) {
		await this.chatService.getUserFromSocket(socket);
		const messages = await this.chatService.getAllMessages();

		socket.emit('send_all_messages', messages);
	}
}
