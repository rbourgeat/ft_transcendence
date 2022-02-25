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

    @Column({ nullable: true })
    avatar: string = "https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg";

    @Column()
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

    @Column("simple-array", { nullable: true })
    friends: string[];

    //One to many / Many to many stuff
    //@Column()
    //game_history: [];

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
}