import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from 'src/user/entity/user.entity'

@Entity('game')
export class Game {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @JoinTable()
    @ManyToMany(() => User, { nullable: false })
    login1: User[];

    @JoinTable()
    @ManyToMany(() => User, { nullable: false })
    login2: User[];

    // @OneToMany(type => User, user => user.login, { nullable: true })
    // login1?: User;

    // @OneToMany(type => User, user => user.login, { nullable: true })
    // login2?: User;

    // winner, score, points, etc...
}