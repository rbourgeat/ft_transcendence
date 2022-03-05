import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from '../../user/entity/user.entity'

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @JoinTable()
    @ManyToMany(() => User, { nullable: false })
    admin: User[];

    @JoinTable()
    @ManyToMany(() => User)
    members: User[];

    // @OneToMany(type => User, user => user.login, { nullable: true })
    // admin?: User;

    // @OneToMany(type => User, user => user.login, { nullable: true })
    // members?: User[];

    // ERROR
    // @Column({nullable: true})
    // messages: string[];


    // passwords, channels, message
}