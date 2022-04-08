import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Message } from 'src/chat/message/entity/message.entity'
import { Participate } from 'src/participate/participate.entity'

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    name: string

    @OneToMany(() => Message, (message: Message) => message.channel, { eager: true })
    public message: Message[];

    @Column({ nullable: true })
    direct: boolean = false;

    @Column()
    public: boolean = true;

    @Column({ nullable: true })
    password: string;

    @OneToMany(() => Participate, participate => participate.chat, { eager: true })
    public participates: Participate[];
}
