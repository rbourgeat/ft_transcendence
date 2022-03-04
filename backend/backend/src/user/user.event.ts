import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserEvent {
    constructor(private eventEmitter: EventEmitter2,
        @InjectRepository(User)
        private userRepository: Repository<User>) { }

    emitEvent() {
        this.eventEmitter.emit('msg.sent', 'updated profile')
    }

    achievementFriend(user: User) {
        this.eventEmitter.emit('achievement.friend', user)
    }

    achievement1000Game(user: User) {
        this.eventEmitter.emit('achievement.1000Game', user)
    }

    achievementFirstGame(user: User) {
        this.eventEmitter.emit('achievement.fistGame', user)
    }

    achievementRankLadder(user: User) {
        this.eventEmitter.emit('achievement.rankLadder', user)
    }

    achievementConsecutiveWins(user: User) {
        this.eventEmitter.emit('achievement.consecutiveWins', user)
    }

    achievementDuellist(user: User) {
        this.eventEmitter.emit('achievement.duellist', user)
    }

    achievementAvatarUpload(user: User) {
        this.eventEmitter.emit('achievement.avatarUpload', user)
    }

    achievement42(user: User) {
        this.eventEmitter.emit('achievement.42', user)
    }

    @OnEvent('achievement.friend')
    handleAchievementFriend(user: User) {
        if (user.friends.length == 1) {
            var login = user.login;
            user.achievements.push("AddFriend");
            this.userRepository.update({ login }, {
                achievements: user.achievements
            });
        }
    }

    @OnEvent('msg.sent')
    listentToEvent(msg: string) {
        console.log('Message Received: ', msg)
    }
}