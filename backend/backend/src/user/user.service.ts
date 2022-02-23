import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    getAllUsers() {
        return this.userRepository.find();
    }

    /*
    async getUserById(id: number) {
        const user = await this.userRepository.findOne({ id: id });
        if (user) {
            return user;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    */

    async getUserByLogin(login: string) {
        const user = await this.userRepository.findOne({ login: login });
        if (user) {
            return user;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async createUser(user: CreateUserDto) {
        const newUser = await this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async updateUser(id: number, user: UpdateUserDto) {
        await this.userRepository.update(id, user);
        const updatedUser = await this.userRepository.findOne(id);
        if (updatedUser) {
            return updatedUser
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async deleteUser(id: number) {
        const deleteResponse = await this.userRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }
}
