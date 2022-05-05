import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToMany } from "typeorm";
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
    loser: number;

    @Column({ nullable: true })
    winner: number;

    @Column({ nullable: true })
    game_mode: number;

    @ManyToMany(() => User, (user) => user.games)
    players: User[]
}