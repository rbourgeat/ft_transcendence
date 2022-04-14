import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { Injectable } from "@nestjs/common";
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class UserEvent {
    constructor(private eventEmitter: EventEmitter2,
    ) { }


    achievementBeAdmin(user: User) {
        console.log('emit event achievementBeAdmin for ' + user.login);
        this.eventEmitter.emit('achievement.BeAdmin', user)
    }

    @OnEvent('achievement.BeAdmin')
    handleAchievementBeAdmin(user: User) {
        //TODO
    }
}