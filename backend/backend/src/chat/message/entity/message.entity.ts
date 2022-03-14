import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Chat } from 'src/chat/entity/chat.entity'
import { User } from 'src/user/entity/user.entity'

Entity('message')
export class Message {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @Column()
    content: string;

    @ManyToOne(() => User, user => user.messages)
    user: User[];

    @ManyToOne(() => Chat, chat => chat.messages)
    chat: Chat[];
}
