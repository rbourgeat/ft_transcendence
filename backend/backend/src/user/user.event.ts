import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';

import { User } from 'src/user/entity/user.entity';

@Injectable()
export class UserEvent {
    constructor(private eventEmitter: EventEmitter2,
        @InjectRepository(User)
        private userRepository: Repository<User>) { }

    achievementFriend(user: User) {
        this.eventEmitter.emit('achievement.friend', user)
    }

    achievement1000Game(user: User) {
        this.eventEmitter.emit('achievement.1000Game', user)
    }

    achievementFirstGame(user: User) {
        this.eventEmitter.emit('achievement.firstGame', user)
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
        //if (user.friends.length == 1)
        //   this.saveAchievement(user, "AddFriend")
    }

    @OnEvent('achievement.42')
    handleAchievement42(user: User) {
        if (user.login == "norminet")
            this.saveAchievement(user, "42")
    }

    @OnEvent('achievement.1000Game')
    handleAchievement1000Game(user: User) {
        if (user.total_games == 1000)
            this.saveAchievement(user, "1000Game")
    }


    @OnEvent('achievement.avatarUpload')
    handleAchievementAvatarUpload(user: User) {
        console.log('TODO achievement uploadavatar event');
    }

    @OnEvent('achievement.duellist')
    handleAchievementDuellist(user: User) {
        console.log('TODO achievement duellist event');
    }

    @OnEvent('achievement.rankLadder')
    handleAchievementRankLadder(user: User) {
        console.log('TODO achievement rankladder event');
    }

    @OnEvent('achievement.firstGame')
    handleAchievementFirstGame(user: User) {
        if (user.total_games == 1)
            this.saveAchievement(user, "FirstGame")
    }

    saveAchievement(user: User, achievementTitle: string) {
        // var login = user.login;
        // user.achievements.push(achievementTitle);
        // this.userRepository.update({ login }, {
        //     achievements: user.achievements
        // });
        // console.log('User ' + login + ' unlocked the ' + achievementTitle + ' achievement');
    }
}