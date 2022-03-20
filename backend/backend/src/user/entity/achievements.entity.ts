import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, Unique, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { User } from 'src/user/entity/user.entity'

@Entity('achievement')
export class Achievement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
}
