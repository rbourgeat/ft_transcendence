import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Game } from 'src/game/entity/game.entity'
import { Message } from 'src/chat/message/entity/message.entity'
import { Participate } from 'src/participate/participate.entity'

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @Column({ unique: true, nullable: true })
    username: string;

    @CreateDateColumn({ nullable: true })
    updateAt?: Date;
    s
    @Column({ unique: true })
    login: string;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ nullable: true })
    avatar: string = "https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg";

    @Column({ nullable: true })
    status: string = "Offline";

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    total_games: number = 0;

    @Column({ nullable: true })
    total_wins: number = 0;

    @Column({ nullable: true })
    total_loss: number = 0;

    @Column({ nullable: true })
    win_loss_ration: number = 0;

    // @Column("simple-array", { nullable: true })
    // friends: string[];

    // @JoinTable()
    // @ManyToMany(() => User)
    // friends: User[];

    @Column("simple-array", { nullable: true })
    friends: string[];

    // @ManyToOne(type => Game, { nullable: true })
    // games: Game[];

    // @JoinTable()
    // @ManyToMany(() => Game)
    // games: Game[];

    @Column("simple-array", { nullable: true })
    games: number[];

    @Column("simple-array", { nullable: true })
    chats: number[];

    @Column({ default: false })
    two_factor_auth: boolean = false;

    @Column({ default: false })
    two_factor_secret: string;

    @Column({ default: false })
    is_ban: boolean;

    @Column({ default: false })
    is_admin: boolean;

    @Column("simple-array", { nullable: true })
    blocked_users: string[];

    @Column("simple-array", { nullable: true })
    achievements: string[];

    @OneToMany(() => Message, message => message.user)
    message: Message[];

    @OneToMany(() => Participate, participate => participate.user)
    participate: Participate[];

    @Column({ nullable: true })
    public twoFactorAuthenticationSecret?: string;

    @Column({ default: false })
    public isTwoFactorAuthenticationEnabled: boolean;
}