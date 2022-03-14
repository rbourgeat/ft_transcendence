import { MigrationInterface, QueryRunner, getConnection } from "typeorm";
import { Message } from "src/chat/message/entity/message.entity";
import { User } from 'src/user/entity/user.entity';


export class Message1647274534845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        let user1 = await getConnection()
            .createQueryBuilder()
            .select("user")
            .from(User, "user")
            .where("user.login = :login", { login: 'dummy1' })
            .getOne();

        const message1 = await queryRunner.manager.save(
            queryRunner.manager.create<Message>(Message, {
                content: 'message1',
                //user: user1,
                //status: 'offline',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
