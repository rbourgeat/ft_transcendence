import { Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

export class BaseEntity {
    //autoincrement
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({ nullable: true })
    createdAt?: Date;

    @CreateDateColumn({ nullable: true })
    updateAt?: Date;
}