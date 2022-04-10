import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from 'src/user/entity/user.entity'

@Entity('game')
export class Game {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @Column({ nullable: true })
    winner_score: number;

    @Column({ nullable: true })
    loser_score: number;

    @Column({ nullable: true })
    loser: string;

    @Column({ nullable: true })
    winner: string;

    @ManyToMany(() => User, (user) => user.games)
    players: User[]
}