import { MigrationInterface, QueryRunner, getConnection } from "typeorm";
import { Message } from "src/chat/message/entity/message.entity";
import { User } from 'src/user/entity/user.entity';
import { Chat } from "src/chat/entity/chat.entity";


export class Message1647274534845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        /*
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Chat)
            .values({
                name: "dummy_chat",
            })
            .execute();
            */

        const user = await getConnection()
            .createQueryBuilder()
            .select("user")
            .from(User, "user")
            .where("user.id = :id", { id: 1 })
            .getOne()

        //console.log("test:" + user.id);

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Message)
            .values({
                author: user,
                content: "Hello World",
            })
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
