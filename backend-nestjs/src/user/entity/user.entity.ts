import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
    @Column({nullable: false})
    name: string;

    @Column({nullable: true})
    avatar: string;
}
