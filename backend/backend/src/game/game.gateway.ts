import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from "@nestjs/common";

@WebSocketGateway({ namespace: 'game', cors: true })

export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger("GameGateway");

    constructor(
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
}