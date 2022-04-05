import { MigrationInterface, QueryRunner, getConnection, Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from "src/chat/message/entity/message.entity";
import { User } from 'src/user/entity/user.entity';
import { Chat } from "src/chat/entity/chat.entity";
import { query } from "express";


export class Message1647274534845 implements MigrationInterface {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Message)
        private messageRepository: Repository<Message>
    ) { }

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

        /*
                const user = await getConnection()
                    .createQueryBuilder()
                    .select("user")
                    .from(User, "user")
                    .where({ id: 1 })
                    .getOneOrFail();
        */
        /*
    const timber = await getConnection()
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: 1 })
        .getOneOrFail()*/

        //const user = await this.userRepository.findOne({ id: 1 });
        // const user = await this.userRepository.findOne({ id: 1 });
        /*
                let message = await getConnection()
                    .createQueryBuilder()
                    .relation(Message, "author")
                    .of(1) // you can use just post id as well
                    .set(1); // you can use just category id as well
          */
        /*
            const newMessage = await this.messageRepository.create({
                content: "test",
                author: user.id
            });
            //console.log("test:" + user.id);

            /*
                    const message = await getConnection()
                        .createQueryBuilder()
                        .insert()
                        .into(Message)
                        .values({
                            author: user,
                            content: "Hello World",
                        })
                        //.relation(User, "author")
                        .execute();
            */

        /*
    const test = await getConnection()
        .createQueryBuilder()
        .select("message")
        .from(Message, "message")
        .where("message.id = :id", { id: 1 })
        .getOne()
*/
        // this code sets category of a given post

        /*
                await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Message)
            .values({content: "test"})
            .execute()
            .relation(User, "message")
            .of(1) // you can use just post id as well
            .add(1);
*/
        /*
                await getConnection()
                    .createQueryBuilder()
                    .relation(User, "message")
                    .of(1) // you can use just post id as well
                    .add(1);
        */
        //.add(user.id) // you can use just category id as well

        /*
                const message1 = await queryRunner.manager.save(
                    queryRunner.manager.create<Message>(Message, {
                        content: 'Hello World',
                        //author: user
                    }));
        */
        /*
                const message1 = await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Message)
                    .values({
                        content: "string",
                    })
                    .execute();
                    */
        //const updateUSer = await this.userRepository.findOne({ id: 1 });

        //await this.messageRepository.update(1, { author: user });
        /*
                await getConnection()
                    .createQueryBuilder()
                    .relation(Message, "author")
                    .of(message1) // you can use just post id as well
                    .set(user)// you can use just category id as well*/
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
