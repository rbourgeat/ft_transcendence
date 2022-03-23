import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';

export type FriendRequest_Status =
    | 'not-sent'
    | 'pending'
    | 'accepted'
    | 'declined'
    | 'waiting-for-current-user-response';

export class FriendRequestStatus {
    @ApiProperty()
    status?: FriendRequest_Status;
}

export interface FriendRequest {
    id?: number;
    creator?: User;
    receiver?: User;
    status?: FriendRequest_Status;
}