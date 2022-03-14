import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from '../../user/entity/user.entity'
import { Message } from 'src/chat/message/entity/message.entity'
import { Participate } from 'src/participate/participate.entity'

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @Column({ unique: true })
    name: string

    @Column({ nullable: true })
    password: string

    @Column()
    public: boolean = true;

    @OneToMany(() => Message, message => message.chat)
    messages: Message[];

    @OneToMany(() => Participate, participate => participate.chat)
    participate: Participate[];
}
