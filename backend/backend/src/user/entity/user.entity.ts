import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Message } from 'src/chat/message/entity/message.entity'
import { Participate } from 'src/participate/participate.entity'
import { Achievement } from './achievement.entity';
import { UserRelation } from 'src/user/entity/friend-request.entity';
import { Game } from "src/game/entity/game.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @CreateDateColumn({ nullable: true })
    updateAt?: Date;

    @Column({ unique: true })
    login: string;

    @Column({ unique: true, nullable: true })
    login42: string;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ nullable: true })
    avatar: string = "https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg";

    @Column({ nullable: true })
    status: string = "offline";

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

    @Column({ nullable: true })
    rank: number;

    @Column({ nullable: true })
    points: number = 1000;

    @Column({ nullable: true })
    xp: number = 0;

    @Column({ nullable: true })
    percent_to_next_lvl: number = 0;

    @Column({ nullable: true })
    level: number = 0;

    @OneToMany(() => Achievement, (achievement: Achievement) => achievement.id)
    public achievement: Achievement[];

    @OneToMany(() => Message, (message: Message) => message.author)
    public message: Message[];

    @OneToMany(() => Participate, (participate: Participate) => participate.user, { eager: true })
    public participate: Participate[];

    @ManyToMany(() => Game, (game) => game.players)
    @JoinTable()
    games: Game[]

    @Column({ nullable: true })
    public twoFactorAuthenticationSecret?: string;

    @Column({ default: false })
    public isTwoFactorAuthenticationEnabled: boolean;

    @OneToMany(() => UserRelation, (userRelation) => userRelation.creator)
    sentFriendRequests: UserRelation[];

    @OneToMany(() => UserRelation, (userRelation) => userRelation.receiver)
    receivedFriendRequests: UserRelation[];
}