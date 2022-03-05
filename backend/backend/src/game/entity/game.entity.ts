import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, OneToMany } from "typeorm";
import { User } from 'src/user/entity/user.entity'

@Entity('game')
export class Game {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @OneToMany(type => User, user => user.login, { nullable: true })
    login1?: User;

    @OneToMany(type => User, user => user.login, { nullable: true })
    login2?: User;

    // winner, score, points, etc...
}