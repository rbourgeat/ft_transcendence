import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>
	){}
	  
	create(user: UserDto): Promise<UserDto> { 
		return this.userRepository.save(user);
	}

	findAll(): Promise<UserDto[]> {
		return this.userRepository.find();;
	}
}
