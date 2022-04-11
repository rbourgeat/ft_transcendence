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
                status: 'offline',
                avatar: 'norminet.jpg'
            }),
        );
        const dummy2 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy2',
                status: 'online',
                avatar: 'grenouille.jpg'
            }),
        );
        const dummy3 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy3',
                status: 'offline',
                avatar: 'lievre.jpg'
            }),
        );
        const dummy4 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy4',
                status: 'online',
                avatar: 'flowey.jpg'
            }),
        );

        const dummy5 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy5',
                status: 'ingame',
                avatar: 'turtle.jpg'
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
                login42: 'bahaas'
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
                creator: malatini,
                receiver: bahaas,
                status: 'pending',
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
                winner: "dummy1",
                loser: "dummy2",
                players: [dummy1, dummy2]
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
                winner: "dummy1",
                loser: "bahaas",
                players: [dummy3, bahaas]
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

        const bahaasachievement2 = await queryRunner.manager.save(
            queryRunner.manager.create<Achievement>(Achievement, {
                user: bahaas,
                title: "FirstGame"
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM user`);
    }
}
