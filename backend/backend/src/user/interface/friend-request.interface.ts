import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';

export type RelationStatus =
    | 'pending'
    | 'accepted'
    | 'declined'
    | 'blocked';

export class RelationStatusClass {
    @ApiProperty()
    status?: RelationStatus;
}

export interface RelationInvitation {
    id?: number;
    creator?: User;
    receiver?: User;
    status?: RelationStatus;
}