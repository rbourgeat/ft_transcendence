import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto, CreateUserDtoTest } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    getAllUsers() {
        return this.userRepository.find();
    }

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

    async updateUser(login: string, user: UpdateUserDto) {
        await this.userRepository.update(login, user);
        const updatedUser = await this.userRepository.findOne(login);
        if (updatedUser) {
            return updatedUser
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async deleteUser(login: string) {
        const deleteResponse = await this.userRepository.delete(login);
        if (!deleteResponse.affected) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }

    async addFriend(login: string, friend: string) {
        const u = await this.userRepository.findOne(login);
        u.friends.push(friend)
    }

    async removeFriend(login: string, friend: string) {
        const u = await this.userRepository.findOne(login);
        for (var i = 0; i < u.friends.length; i++)
            if (u.friends[i] === friend)
                u.friends.splice(i, 1);
    }

    async updateStatus(login: string, status: string) {
        const u = await this.userRepository.findOne(login);
        u.status = status;
    }

    async toggleTwoFactorAuthentication(login: string) {
        const u = await this.userRepository.findOne(login);
        u.two_factor_auth = !u.two_factor_auth;
    }

    async setupTwoFactorAuthentication(login: string, secret: string) {
        const u = await this.userRepository.findOne(login);
        u.two_factor_secret = secret;
    }

    //WIP might be deleted
    async create(userData: CreateUserDtoTest) {
        const newUser = await this.userRepository.create(userData);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({ email });
        if (user) {
            return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }

    async getById(id: number) {
        const user = await this.userRepository.findOne({ id });
        if (user) {
            return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }
}