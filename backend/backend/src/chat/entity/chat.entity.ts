import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from '../../user/entity/user.entity'
import { Message } from 'src/chat/message/entity/message.entity'
import { Participate } from 'src/participate/participate.entity'
import { PasswordChatDto } from '../dto/chat.dto'

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn()
    id?: number;

    /*
    @CreateDateColumn({ nullable: true })
    createdAt?: Date;
    */
    @Column({ unique: true })
    name: string

    /*
    @Column({ nullable: true })
    password: string

    @Column()
    public: boolean = true;
*/
    @OneToMany(() => Message, (message: Message) => message.channel, { eager: true })
    public message: Message[];

    @Column()
    public: boolean = true;

    @Column({ nullable: true })
    password: PasswordChatDto;

    @OneToMany(() => Participate, participate => participate.chat, { eager: true })
    public participates: Participate[];

    /*
    @ManyToMany(() => Participate, (Participate: Participate) => Participate.chats)
    public participates: Participate[];
    */
}
