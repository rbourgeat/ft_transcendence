import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @CreateDateColumn({ nullable: true })
    updateAt?: Date;

    @Column()
    login: string;

    @Column()
    status: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    total_games: number;

    @Column({ nullable: true })
    total_wins: number;

    @Column({ nullable: true })
    total_loss: number;

    @Column({ nullable: true })
    win_loss_ration: number;

    @Column("simple-array", { nullable: true })
    friends: string[];

    //One to many / Many to many stuff
    //@Column()
    //game_history: [];

    @Column({ default: false })
    two_factor_auth: boolean;

    @Column({ default: false })
    is_ban: boolean;

    @Column({ default: false })
    is_admin: boolean;

    @Column("simple-array", { nullable: true })
    blocked_users: string[];
}