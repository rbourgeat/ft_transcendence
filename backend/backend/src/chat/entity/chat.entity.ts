import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from '../../user/entity/user.entity'

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @Column({nullable: false})
    owner: string;

    @Column("simple-array", { nullable: true })
    admins: string[];

    @Column("simple-array", { nullable: true })
    members: string[];

    @Column()
    public: boolean = true;

    @Column("simple-array", { nullable: true })
    blocked_users: string[];

    @Column("simple-array", { nullable: true })
    temp_ban: string[];

    @Column("simple-array", { nullable: true })
    temp_mute: string[];

    // @OneToMany(type => User, user => user.login, { nullable: true })
    // admin?: User;

    // @OneToMany(type => User, user => user.login, { nullable: true })
    // members?: User[];

    // ERROR
    // @Column({nullable: true})
    // messages: string[];

}