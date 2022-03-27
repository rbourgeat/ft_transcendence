import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Chat } from 'src/chat/entity/chat.entity'
import { User } from 'src/user/entity/user.entity'

@Entity('message')
export class Message {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public content: string;

    @ManyToOne(() => User, (author: User) => author.message)
    public author: User;

    @ManyToOne(() => Chat, (channel: Chat) => channel.message)
    public channel: Chat;
}

