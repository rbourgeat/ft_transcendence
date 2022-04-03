import { User } from "src/user/entity/user.entity";
import { MigrationInterface, QueryRunner, getConnection } from "typeorm";

export class UserMigration1645626140921 implements MigrationInterface {

    // Create factice registered users in our db.

    public async up(queryRunner: QueryRunner): Promise<void> {
        const dummy1 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy1',
                status: 'offline',
            }),
        );
        const dummy2 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy2',
                status: 'online',
                //avatar: '/upload/e48584dad3802c6592c5ee81f95f08b1--cook-gifs-4ec7.jpeg'
            }),
        );
        const dummy3 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy3',
                status: 'online',
            }),
        );
        const dummy4 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy4',
                status: 'online',
            }),
        );
        const dummy5 = await queryRunner.manager.save(
            queryRunner.manager.create<User>(User, {
                login: 'dummy5',
                status: 'online',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM user`);
    }
}
