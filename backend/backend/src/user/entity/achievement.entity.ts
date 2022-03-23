import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Game } from 'src/game/entity/game.entity'
import { Message } from 'src/chat/message/entity/message.entity'
import { Participate } from 'src/participate/participate.entity'
import { User } from 'src/user/entity/user.entity'

@Entity('achievement')
export class Achievement {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string;

    @Column()
    description: string;

    //@ManyToMany(() => User)
    //achievements: User[];
}