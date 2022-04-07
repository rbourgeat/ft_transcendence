import { User } from "src/user/entity/user.entity";
import { MigrationInterface, QueryRunner, getConnection } from "typeorm";
import { Message } from "src/chat/message/entity/message.entity";
import { Chat } from "src/chat/entity/chat.entity";
import { Participate } from "src/participate/participate.entity";
import { Game } from "src/game/entity/game.entity";
import { UserRelation } from "src/user/entity/friend-request.entity";

export class UserMigration1645626140921 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const dummy1 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy1',
                status: 'offline',
                avatar: '/upload/avatar2.png'
            }),
        );
        const dummy2 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy2',
                status: 'online',
                avatar: '/upload/avatar1.png'
            }),
        );
        const dummy3 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy3',
                status: 'online',
                avatar: '/upload/avatar2.png'
            }),
        );
        const dummy4 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy4',
                status: 'online',
                avatar: '/upload/avatar2.png'
            }),
        );

        const dummy5 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy5',
                status: 'online',
                avatar: '/upload/avatar1.png'
            }),
        );

        const malatini = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'malatini',
                status: 'online',
                email: 'malatini@student.42.fr'
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


        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                login: "string",
                email: "string@a.com",
                password: "string2A",
                status: 'playing'
            })
            .execute();


        const channel1 = await queryRunner.manager.save(
            queryRunner.manager.create<Chat>(Chat, {
                name: "DummyChannel",
                public: true,
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
                winner_login: "dummy1",
                loser_login: "dummy2",
                players: [dummy1, dummy2]
            }),
        );

        const game2 = await queryRunner.manager.save(
            queryRunner.manager.create<Game>(Game, {
                winner_score: 5,
                loser_score: 0,
                winner_login: "dummy3",
                loser_login: "dummy4",
                players: [dummy3, dummy4]
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM user`);
    }
}
