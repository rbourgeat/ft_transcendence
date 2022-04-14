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

    /*
    achievementFriend(user: User) {
        console.log('emit event achievementfriend for ' + user.login);
        this.eventEmitter.emit('achievement.friend', user)
    }

    @OnEvent('achievement.friend')
    handleAchievementFriend(user: User) {
        this.saveAchievement(user, "AddFriend")
    }
*/
    achievement1000Game(user: User) {
        console.log('emit event achievement1000Game for ' + user.login);
        this.eventEmitter.emit('achievement.1000Game', user)
    }

    @OnEvent('achievement.1000Game')
    handleAchievement1000Game(user: User) {
        if (user.total_games == 1000)
            this.saveAchievement(user, "1000Game")
    }

    achievementFirstGame(user: User) {
        console.log('emit event achievementFirstGame for ' + user.login);
        this.eventEmitter.emit('achievement.firstGame', user)
    }

    @OnEvent('achievement.firstGame')
    handleAchievementFirstGame(user: User) {
        console.log(user.total_games);
        if (user.total_games == 1)
            this.saveAchievement(user, "FirstGame")
    }

    achievement5Row(user: User) {
        console.log('emit event achievement5Row for ' + user.login);
        this.eventEmitter.emit('achievement.5Row', user)
    }

    @OnEvent('achievement.5Row')
    async handleAchievement5Row(user: User) {

        const userdefined = await this.userRepository.findOne({
            relations: ['games'],
            where: { login: user.login }
        });

        //twice unlock
        /*
        const isUnlocked = await this.achievementRepository.findOne({
            where: [
                { user: user, title: '5Row' }
            ],
            relations: ['user']
        });
        */

        const games = userdefined.games.reverse();
        for (let i = 0; i < 5; i++) {
            if (games[i].winner != user.login)
                return;
        }
        this.saveAchievement(user, "5Row")
    }

    achievement42(user: User) {
        console.log('emit event achievement42 for ' + user.login);
        this.eventEmitter.emit('achievement.42', user)
    }

    @OnEvent('achievement.42')
    handleAchievement42(user: User) {
        if (user.login == "norminet")
            this.saveAchievement(user, "42")
    }

    achievementBeAdmin(user: User) {
        console.log('emit event achievementBeAdmin for ' + user.login);
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