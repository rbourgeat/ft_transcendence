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
        if (user.friends.length == 1) {
            var login = user.login;
            user.achievements.push("AddFriend");
            this.userRepository.update({ login }, {
                achievements: user.achievements
            });
            console.log('User ' + login + ' unlocked the friend achievement');
        }
    }

    @OnEvent('achievement.42')
    handleAchievement42(user: User) {
        if (user.login == "norminet") {
            var login = user.login;
            user.achievements.push("42");
            this.userRepository.update({ login }, {
                achievements: user.achievements
            });
            console.log('User ' + login + ' unlocked the 42 achievement');
        }
    }

    @OnEvent('achievement.1000Game')
    handleAchievement1000Game(user: User) {
        if (user.total_games == 1000) {
            var login = user.login;
            user.achievements.push("1000Game");
            this.userRepository.update({ login }, {
                achievements: user.achievements
            });
            console.log('User ' + login + ' unlocked the 1000Game achievement');
        }
    }


    @OnEvent('achievement.avatarUpload')
    handleAchievementAvatarUpload(user: User) {
        console.log('TODO achievement uploadavatar event');
        /*
        if (user.total_games == 1000) {
            var login = user.login;
            user.achievements.push("AvatarUpload");
            this.userRepository.update({ login }, {
                achievements: user.achievements
            });
            console.log('User ' + login + ' unlocked the AvatarUpload achievement');
        }
        */
    }

    @OnEvent('achievement.duellist')
    handleAchievementDuellist(user: User) {
        console.log('TODO achievement duellist event');
        /*
        if (user.total_games == 1000) {
            var login = user.login;
            user.achievements.push("Duellist");
            this.userRepository.update({ login }, {
                achievements: user.achievements
            });
            console.log('User ' + login + ' unlocked the Duellist achievement');
        }
        */
    }

    @OnEvent('achievement.rankLadder')
    handleAchievementRankLadder(user: User) {
        console.log('TODO achievement rankladder event');
        /*
        if (user.total_games == 1000) {
            var login = user.login;
            user.achievements.push("RankLadder");
            this.userRepository.update({ login }, {
                achievements: user.achievements
            });
            console.log('User ' + login + ' unlocked the RankLadder achievement');
        }
        */
    }

    @OnEvent('achievement.firstGame')
    handleAchievementFirstGame(user: User) {
        if (user.total_games == 1) {
            var login = user.login;
            user.achievements.push("FirstGame");
            this.userRepository.update({ login }, {
                achievements: user.achievements
            });
            console.log('User ' + login + ' unlocked the FirstGame achievement');
        }
    }
}