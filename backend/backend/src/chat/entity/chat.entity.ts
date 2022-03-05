import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, OneToMany } from "typeorm";
import { User } from '../../user/entity/user.entity'

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @OneToMany(type => User, user => user.login, { nullable: true })
    admin?: User;

    @OneToMany(type => User, user => user.login, { nullable: true })
    members?: User[];

    // ERROR
    // @Column({nullable: true})
    // messages: string[];


    // passwords, channels, message
}