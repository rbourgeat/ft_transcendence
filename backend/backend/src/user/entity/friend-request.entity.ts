import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RelationStatus } from 'src/user/interface/friend-request.interface';
import { User } from 'src/user/entity/user.entity';

@Entity('userRelation')
export class UserRelation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (userEntity) => userEntity.sentFriendRequests)
    creator: User;

    @ManyToOne(() => User, (userEntity) => userEntity.receivedFriendRequests)
    receiver: User;

    @Column()
    status: RelationStatus;
}
