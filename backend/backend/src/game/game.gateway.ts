import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from "@nestjs/common";

@WebSocketGateway({ cors: true })

export class GameGateway {
    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger("GameGateway");

    constructor(
    ) { }

    afterInit(server: Server) {
        this.logger.log("game socket init !");
    }

    async handleConnection(socket: Socket, ...args: any[]) {
        this.logger.log("Client disconnected: " + socket.handshake.query.username + ' id: ' + socket.id + ')');
    }

    async handleDisconnect(socket: Socket, ...args: any[]) {
        this.logger.log("Client disconnected: " + socket.handshake.query.username + ' id: ' + socket.id + ')');
    }
}