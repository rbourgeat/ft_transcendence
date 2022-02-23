import { BaseEntity } from "../base-entity";
import { Entity, Column } from "typeorm";

@Entity('user')
export class User extends BaseEntity {
    @Column()
    login: string;

    @Column()
    status: string;
}