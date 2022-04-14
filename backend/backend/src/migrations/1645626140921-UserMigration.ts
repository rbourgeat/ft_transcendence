import { User } from "src/user/entity/user.entity";
import { MigrationInterface, QueryRunner, getConnection } from "typeorm";
import { Message } from "src/chat/message/entity/message.entity";
import { Chat } from "src/chat/entity/chat.entity";
import { Participate } from "src/participate/participate.entity";
import { Game } from "src/game/entity/game.entity";
import { Achievement } from "src/user/entity/achievement.entity";
import { UserRelation } from "src/user/entity/friend-request.entity";

export class UserMigration1645626140921 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const dummy1 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy1',
                password: 'dummy1',
                email: 'dummy1@gmail.com',
                status: 'offline',
                avatar: 'norminet.jpg',
                rank: 1,
                level: 42,
                points: 10000,
                xp: 0
            }),
        );
        const dummy2 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy2',
                password: 'dummy2',
                email: 'dummy2@gmail.com',
                status: 'online',
                avatar: 'grenouille.jpg',
                rank: 2,
                level: 21,
                points: 9500,
                xp: 0
            }),
        );
        const dummy3 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy3',
                password: 'dummy3',
                email: 'dummy3@gmail.com',
                status: 'offline',
                avatar: 'lievre.jpg',
                rank: 3,
                level: 3,
                points: 1500
            }),
        );
        const dummy4 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy4',
                password: 'dummy4',
                email: 'dummy4@gmail.com',
                status: 'online',
                avatar: 'flowey.jpg',
                rank: 4,
                level: 2,
                points: 1050
            }),
        );

        const dummy5 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy5',
                password: 'dummy5',
                email: 'dummy5@gmail.com',
                //status: 'ingame',
                status: 'online',
                avatar: 'turtle.jpg',
                rank: 5,
                level: 4,
                points: 900
            }),
        );

        const malatini = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'malatini',
                status: 'online',
                email: 'malatini@student.42.fr',
                login42: 'malatini',
                isTwoFactorAuthenticationEnabled: false
            }),
        );

        const bahaas = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'bahaas',
                status: 'offline',
                email: 'bahaas@student.42.fr',
                login42: 'bahaas',
                xp: 150,
                points: 1050,
                level: 2,
                percent_to_next_lvl: 75,
                win_loss_ration: 40,
                total_loss: 3,
                total_wins: 2,
                total_games: 5
            }),
        );

        const bahaasRelation1 = await queryRunner.manager.save(
            queryRunner.manager.create<UserRelation>(UserRelation, {
                creator: dummy1,
                receiver: bahaas,
                status: 'accepted',
            }),
        );

        const bahaasRelation2 = await queryRunner.manager.save(
            queryRunner.manager.create<UserRelation>(UserRelation, {
                creator: bahaas,
                receiver: dummy2,
                status: 'accepted',
            }),
        );

        const bahaasRelation3 = await queryRunner.manager.save(
            queryRunner.manager.create<UserRelation>(UserRelation, {
                creator: dummy3,
                receiver: bahaas,
                status: 'pending',
            }),
        );

        const bahaasRelation31 = await queryRunner.manager.save(
            queryRunner.manager.create<UserRelation>(UserRelation, {
                creator: bahaas,
                receiver: malatini,
                status: 'blocked',
            }),
        );

        const bahaasRelation4 = await queryRunner.manager.save(
            queryRunner.manager.create<UserRelation>(UserRelation, {
                creator: bahaas,
                receiver: dummy4,
                status: 'blocked',
            }),
        );

        const bahaasRelation41 = await queryRunner.manager.save(
            queryRunner.manager.create<UserRelation>(UserRelation, {
                creator: dummy5,
                receiver: bahaas,
                status: 'blocked',
            }),
        );

        const malatiniRelation1 = await queryRunner.manager.save(
            queryRunner.manager.create<UserRelation>(UserRelation, {
                creator: malatini,
                receiver: dummy1,
                status: 'accepted',
            }),
        );

        const malatiniRelation2 = await queryRunner.manager.save(
            queryRunner.manager.create<UserRelation>(UserRelation, {
                creator: malatini,
                receiver: dummy2,
                status: 'accepted',
            }),
        );

        const malatiniRelation3 = await queryRunner.manager.save(
            queryRunner.manager.create<UserRelation>(UserRelation, {
                creator: dummy3,
                receiver: malatini,
                status: 'pending',
            }),
        );

        const malatiniRelation4 = await queryRunner.manager.save(
            queryRunner.manager.create<UserRelation>(UserRelation, {
                creator: malatini,
                receiver: dummy4,
                status: 'blocked',
            }),
        );

        const malatiniRelation5 = await queryRunner.manager.save(
            queryRunner.manager.create<UserRelation>(UserRelation, {
                creator: dummy5,
                receiver: malatini,
                status: 'pending',
            }),
        );

        const malatiniRelation6 = await queryRunner.manager.save(
            queryRunner.manager.create<UserRelation>(UserRelation, {
                creator: bahaas,
                receiver: malatini,
                status: 'blocked',
            }),
        );


        const channel1 = await queryRunner.manager.save(
            queryRunner.manager.create<Chat>(Chat, {
                name: "DummyChannel",
                public: true,
            }),
        );

        const channel2 = await queryRunner.manager.save(
            queryRunner.manager.create<Chat>(Chat, {
                name: "NotDummyChannel",
                public: true,
            }),
        );

        const bahaasparticipate1 = await queryRunner.manager.save(
            queryRunner.manager.create<Participate>(Participate, {
                user: bahaas,
                chat: channel1,
            }),
        );

        const bahaasparticipate2 = await queryRunner.manager.save(
            queryRunner.manager.create<Participate>(Participate, {
                user: bahaas,
                chat: channel2,
            }),
        );

        const participate1 = await queryRunner.manager.save(
            queryRunner.manager.create<Participate>(Participate, {
                user: dummy1,
                chat: channel1,
            }),
        );

        const participate2 = await queryRunner.manager.save(
            queryRunner.manager.create<Participate>(Participate, {
                user: dummy2,
                chat: channel1,
            }),
        );

        const message1 = await queryRunner.manager.save(
            queryRunner.manager.create<Message>(Message, {
                content: "Hello World",
                author: dummy1,
                channel: channel1
            }),
        );

        const message2 = await queryRunner.manager.save(
            queryRunner.manager.create<Message>(Message, {
                content: "I wont spam mssg :v",
                author: dummy2,
                channel: channel1
            }),
        );


        const game1 = await queryRunner.manager.save(
            queryRunner.manager.create<Game>(Game, {
                winner_score: 5,
                loser_score: 3,
                winner: "dummy4",
                loser: "dummy2",
                players: [dummy4, dummy2]
            }),
        );

        const game2 = await queryRunner.manager.save(
            queryRunner.manager.create<Game>(Game, {
                winner_score: 5,
                loser_score: 0,
                winner: "dummy3",
                loser: "dummy4",
                players: [dummy3, dummy4]
            }),
        );

        const bahaasgame1 = await queryRunner.manager.save(
            queryRunner.manager.create<Game>(Game, {
                winner_score: 5,
                loser_score: 0,
                winner: "bahaas",
                loser: "dummy4",
                players: [bahaas, dummy4]
            }),
        );

        const bahaasgame2 = await queryRunner.manager.save(
            queryRunner.manager.create<Game>(Game, {
                winner_score: 5,
                loser_score: 3,
                winner: "bahaas",
                loser: "dummy2",
                players: [dummy2, bahaas]
            }),
        );

        const bahaasgame3 = await queryRunner.manager.save(
            queryRunner.manager.create<Game>(Game, {
                winner_score: 2,
                loser_score: 1,
                winner: "dummy3",
                loser: "bahaas",
                players: [dummy3, bahaas]
            }),
        );

        const bahaasgame4 = await queryRunner.manager.save(
            queryRunner.manager.create<Game>(Game, {
                winner_score: 5,
                loser_score: 1,
                winner: "dummy5",
                loser: "bahaas",
                players: [dummy5, bahaas]
            }),
        );

        const bahaasgame5 = await queryRunner.manager.save(
            queryRunner.manager.create<Game>(Game, {
                winner_score: 5,
                loser_score: 4,
                winner: "dummy3",
                loser: "bahaas",
                players: [dummy3, bahaas]
            }),
        );


        const malatiniachievement1 = await queryRunner.manager.save(
            queryRunner.manager.create<Achievement>(Achievement, {
                user: malatini,
                title: "AddFriend"
            }),
        );

        const bahaasachievement1 = await queryRunner.manager.save(
            queryRunner.manager.create<Achievement>(Achievement, {
                user: bahaas,
                title: "AddFriend"
            }),
        );

        const dummy2chievement1 = await queryRunner.manager.save(
            queryRunner.manager.create<Achievement>(Achievement, {
                user: dummy2,
                title: "FirstGame"
            }),
        );

        const dummy1chievement1 = await queryRunner.manager.save(
            queryRunner.manager.create<Achievement>(Achievement, {
                user: dummy2,
                title: "FirstGame"
            }),
        );

        const bahaasachievement2 = await queryRunner.manager.save(
            queryRunner.manager.create<Achievement>(Achievement, {
                user: bahaas,
                title: "FirstGame"
            }),
        );

        const dummy4achievement2 = await queryRunner.manager.save(
            queryRunner.manager.create<Achievement>(Achievement, {
                user: dummy4,
                title: "FirstGame"
            }),
        );

        const dummy3achievement2 = await queryRunner.manager.save(
            queryRunner.manager.create<Achievement>(Achievement, {
                user: dummy4,
                title: "FirstGame"
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM user`);
    }
}
