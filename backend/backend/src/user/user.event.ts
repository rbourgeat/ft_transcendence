import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class UserEvent {
    constructor(private eventEmitter: EventEmitter2) { }

    emitEvent() {
        this.eventEmitter.emit('msg.sent', 'Hello World')
    }

    @OnEvent('msg.sent')
    listentToEvent(msg: string) {
        console.log('Message Received: ', msg)
    }
}