import { HttpException, HttpStatus, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { UpdateUserDto, CreateUserDtoViaRegistration, User42Dto } from 'src/user/dto/user.dto';
import { UserEvent } from 'src/user/user.event';
import { UsersRepository } from 'src/user/user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userEvent: UserEvent,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
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

    async updateUser(login: string, user: UpdateUserDto) {
        await this.userRepository.update({ login }, user);
        const updatedUser = await this.userRepository.findOne({ login });
        if (updatedUser) {
            return updatedUser;
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
        const u = await this.userRepository.findOne({ login });
        u.friends.push(friend);
        this.userEvent.achievementFriend(u);
        return this.userRepository.update({ login }, {
            friends: u.friends
        });
    }

    async removeFriend(login: string, friend: string) {
        const u = await this.userRepository.findOne({ login });
        for (var i = 0; i < u.friends.length; i++)
            if (u.friends[i] === friend)
                u.friends.splice(i, 1);
        return this.userRepository.update({ login }, {
            friends: u.friends
        });
    }

    async updateStatus(login: string, s: string) {
        return this.userRepository.update({ login }, {
            status: s
        });
    }

    async turnOnTwoFactorAuthentication(login: string) {
        return this.userRepository.update({ login }, {
            two_factor_auth: true
        });
    }

    async turnOffTwoFactorAuthentication(login: string) {
        return this.userRepository.update({ login }, {
            two_factor_auth: false
        });
    }

    async setupTwoFactorAuthentication(login: string, secret: string) {
        return this.userRepository.update({ login }, {
            two_factor_secret: secret
        });
    }

    async addAvatar(login: string, filename: string) {
        return this.userRepository.update({ login }, {
            avatar: filename
        });
    }

    async create(userData: CreateUserDtoViaRegistration) {
        console.log('went by create in user service');
        const newUser = await this.userRepository.create(userData);
        newUser.friends = [];
        newUser.achievements = [];
        const login = newUser.login;
        this.userRepository.update({ login }, {
            friends: [],
            achievements: []
        });
        await this.userRepository.save(newUser);
        this.userEvent.achievement42(newUser);
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

    ////
    async validateUser42(userData: User42Dto): Promise<User> {
        let user: User = undefined;

        const { login42 } = userData;
        user = await this.usersRepository.findOne({ login42: login42 });
        if (user)
            return user;
        let { username } = userData;
        user = await this.usersRepository.findOne({ username });
        if (user) {
            const rand = Math.random().toString(16).substr(2, 5);
            username = username + '-' + rand;
            userData.username = username;
        }
        const newUser: User = await this.createUser42(userData);
        return newUser;
    }

    createUser42(userData: User42Dto): Promise<User> {
        return this.usersRepository.createUser42(userData)
    }
}

export function fileMimetypeFilter(...mimetypes: string[]) {
    return (
        req,
        file: Express.Multer.File,
        callback: (error: Error | null, acceptFile: boolean) => void,
    ) => {
        if (mimetypes.some((m) => file.mimetype.includes(m))) {
            callback(null, true);
        } else {
            callback(
                new UnsupportedMediaTypeException(
                    `File type is not matching: ${mimetypes.join(', ')}`,
                ),
                false,
            );
        }
    };
}
