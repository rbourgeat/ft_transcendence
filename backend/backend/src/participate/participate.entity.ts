import { Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from 'src/user/entity/user.entity'
import { Chat } from 'src/chat/entity/chat.entity'
import { PasswordChatDto } from '../chat/dto/chat.dto';


export enum UserStatus {
    BAN = "ban",
    MUTE = "mute",
    ACTIVE = "active"
}

@Entity('participate')
export class Participate {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ default: false })
    owner: boolean

    @Column({ default: false })
    admin: boolean

    /*
    @Column()
    public: boolean = true;
    */

    @Column({ nullable: true })
    timestamp: Date;

    @Column({ type: "enum", enum: UserStatus, default: UserStatus.ACTIVE })
    role: UserStatus;

    //can't have eager on both sides :(
    @ManyToOne(() => User, (user: User) => user.participate)
    user: User;

    @ManyToOne(() => Chat, (chat: Chat) => chat.participates)
    chat: Chat;

    /*
    @ManyToMany(() => Chat, (chat: Chat) => chat.participates, { eager: true })
    @JoinTable()
    public chats: Chat[];
    */
}