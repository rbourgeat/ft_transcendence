import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';

import { User } from 'src/user/entity/user.entity';
import { Achievement } from "./entity/achievement.entity";

@Injectable()
export class UserEvent {
    constructor(private eventEmitter: EventEmitter2,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Achievement)
        private readonly achievementRepository: Repository<Achievement>,
    ) { }

    achievementFriend(user: User) {
        console.log('emit event for achievementfriend');
        this.eventEmitter.emit('achievement.friend', user)
    }

    @OnEvent('achievement.friend')
    handleAchievementFriend(user: User) {
        console.log('go to save the achievement');
        this.saveAchievement(user, "AddFriend")
    }

    achievement1000Game(user: User) {
        this.eventEmitter.emit('achievement.1000Game', user)
    }

    @OnEvent('achievement.1000Game')
    handleAchievement1000Game(user: User) {
        if (user.total_games == 1000)
            this.saveAchievement(user, "1000Game")
    }

    achievementFirstGame(user: User) {
        this.eventEmitter.emit('achievement.firstGame', user)
    }

    @OnEvent('achievement.firstGame')
    handleAchievementFirstGame(user: User) {
        if (user.total_games == 1)
            this.saveAchievement(user, "FirstGame")
    }

    achievementConsecutiveWins(user: User) {
        this.eventEmitter.emit('achievement.5Row', user)
    }

    @OnEvent('achievement.5Row')
    handleAchievement5Row(user: User) {
        //TODO
    }

    achievement42(user: User) {
        this.eventEmitter.emit('achievement.42', user)
    }

    @OnEvent('achievement.42')
    handleAchievement42(user: User) {
        if (user.login == "norminet")
            this.saveAchievement(user, "42")
    }

    achievementBeAdmin(user: User) {
        this.eventEmitter.emit('achievement.BeAdmin', user)
    }

    @OnEvent('achievement.BeAdmin')
    handleAchievementBeAdmin(user: User) {
        //TODO
    }

    async saveAchievement(user: User, achievementTitle: string) {

        const newAchievement = await this.achievementRepository.create(
            {
                title: achievementTitle,
                user: user,
            }
        );
        await this.achievementRepository.save(newAchievement);
        console.log('User ' + user.login + ' unlocked the ' + achievementTitle + ' achievement');
    }
}