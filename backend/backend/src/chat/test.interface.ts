import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';


export interface ChatInterface {
    id?: number;
    name?: string;
    participate?: User[];
}