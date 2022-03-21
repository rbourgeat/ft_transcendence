import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Chat } from 'src/chat/entity/chat.entity'
import { User } from 'src/user/entity/user.entity'

@Entity('message')
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => User, (author: User) => author.message)
    author: User;

    @ManyToOne(() => Chat, (channel: Chat) => channel.message)
    channel: Chat;
}
