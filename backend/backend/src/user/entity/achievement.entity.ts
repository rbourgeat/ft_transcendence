import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from 'src/user/entity/user.entity'

@Entity('achievement')
export class Achievement {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user: User) => user.achievement)
    user: User;
}