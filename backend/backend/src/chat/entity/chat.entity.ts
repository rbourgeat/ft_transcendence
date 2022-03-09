import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from '../../user/entity/user.entity'

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @JoinTable()
    @ManyToMany(() => User)
    owner: User;

    @JoinTable()
    @ManyToMany(() => User)
    admins: User[];

    @JoinTable()
    @ManyToMany(() => User)
    members: User[];

    @Column()
    public: boolean = true;

    @JoinTable()
    @ManyToMany(() => User)
    blocked_users: User[];

    @JoinTable()
    @ManyToMany(() => User)
    temp_ban: User[];

    @JoinTable()
    @ManyToMany(() => User)
    temp_mute: User[];

    // @OneToMany(type => User, user => user.login, { nullable: true })
    // admin?: User;

    // @OneToMany(type => User, user => user.login, { nullable: true })
    // members?: User[];

    // ERROR
    // @Column({nullable: true})
    // messages: string[];

}