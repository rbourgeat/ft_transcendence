import { HttpException, HttpStatus, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { UpdateUserDto, CreateUserDtoViaRegistration, User42Dto } from 'src/user/dto/user.dto';
import { UserEvent } from 'src/user/user.event';
import { UsersRepository } from 'src/user/user.repository';

import { FriendRequestEntity } from 'src/user/entity/friend-request.entity';
import {
	FriendRequest,
	FriendRequestStatus,
	FriendRequest_Status,
} from 'src/user/interface/friend-request.interface';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'

@Injectable()
export class UserService {
	constructor(
		private readonly userEvent: UserEvent,
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(UsersRepository)
		private usersRepository: UsersRepository,
		@InjectRepository(FriendRequestEntity)
		private readonly friendRequestRepository: Repository<FriendRequestEntity>,
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

	// async addFriend(user: string, friend: string) {
	// 	const u = await this.userRepository.findOne({ where: { login: user }, relations: ["friends"] });
	// 	const f = await this.userRepository.findOne({ where: { login: friend } });
	// 	console.log("test1: " + u.friends)
	// 	if (!u.friends) {
	// 		u.friends = [];
	// 		console.log("test2: " + u.friends)
	// 	}
	// 	u.friends.push(f);
	// 	// this.userEvent.achievementFriend(u);
	// 	console.log("test3: " + u.friends)
	// 	var login = user;
	// 	this.userRepository.update({ login }, {
	// 	    friends: u.friends
	// 	});
	// 	// return this.userRepository.save(u);
	// }

	async addFriend(user: string, friend: string) {
		var init = false;
		var login = user;
		const u = await this.userRepository.findOne({ login });
		login = friend;
		const f = await this.userRepository.findOne({ login });
		if (!u.friends) {
			u.friends = [""];
			init = true;
		}
		u.friends.push(f.login);
		if (init)
			u.friends.splice(0, 1);
		// this.userEvent.achievementFriend(u);
		login = user;
		return this.userRepository.update({ login }, {
			friends: u.friends
		});
	}
	/*
		async removeFriend(user: string, friend: string) {
			var login = user;
			const u = await this.userRepository.findOne({ login });
			login = friend;
			const f = await this.userRepository.findOne({ login });
			if (u.friends.length == 1 && u.friends[0] === f.login)
				u.friends = [];
			else
				for (var i = 0; i < u.friends.length; i++)
					if (u.friends[i] === f.login)
						u.friends.splice(i, 1);
			return this.userRepository.update({ login }, {
				friends: u.friends
			});
		}
		*/

	async updateStatus(login: string, s: string) {
		return this.userRepository.update({ login }, {
			status: s
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
		// newUser.achievements = [];
		const login = newUser.login;
		this.userRepository.update({ login }, {
			friends: [],
			// achievements: []
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

	async createUser42(userData: User42Dto): Promise<User> {
		const user = await this.userRepository.findOne({ email: userData.email });
		if (user) {
			console.log("that user already exists");
			return;
		}
		return this.usersRepository.createUser42(userData)
	}

	async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
		return this.usersRepository.update(userId, {
			twoFactorAuthenticationSecret: secret
		});
	}

	async turnOnTwoFactorAuthentication(userId: number) {
		console.log('has set 2fa to true for user');
		return this.usersRepository.update(userId, {
			isTwoFactorAuthenticationEnabled: true
		});
	}

	////////////////
	async findUserById(id: number) {
		console.log('we search for user: ' + id);
		const user = await this.userRepository.findOne({ id: id });
		if (user)
			return user;
		else {
			console.log(user + ' not found');
			return;
		}
		/*
		return from(this.userRepository.findOne({ id }),
		).pipe(
			map((user: User) => {
				if (!user) {
					throw new HttpException('User not found', HttpStatus.NOT_FOUND);
				}
				delete user.password;
				return user;
			}),
		);
		*/
	}

	/**
	 * check in db if we find an invitation already exist with the 2 user
	 */
	async hasRequestBeenSentOrReceived(creator: User, receiver: User) {
		const invite = await this.friendRequestRepository.findOne({
			where: [
				{ creator, receiver },
				{ creator: receiver, receiver: creator },
			],
		});
		if (invite)
			return true;
		return false;
	}

	/*
	* 1.check self invite
	* 2.check if receiver exists
	* 3.check if no invite to him / request from him already exist
	* 4.add new invitation
	*/
	async sendFriendRequest(receiverId: number, creator: User) {
		if (receiverId === creator.id)
			return console.log('It is not possible to add yourself!');
		const receiver = await this.findUserById(receiverId);
		if (!receiver)
			return console.log('user not found');
		const duplicate_request = await this.hasRequestBeenSentOrReceived(creator, receiver)
		if (duplicate_request)
			return console.log('A friend request has already been (sent to/received from) that user');
		const newFriendRequest = this.friendRequestRepository.create(
			{
				creator: creator,
				receiver: receiver,
				status: 'pending'
			}
		);
		this.friendRequestRepository.save(newFriendRequest);
	}

	/*
		getFriendRequestStatus(receiverId: number, currentUser: User): Observable<FriendRequestStatus> {
			return this.findUserById(receiverId).pipe(
				switchMap((receiver: User) => {
					return from(this.friendRequestRepository.findOne({
						where: [
							{ creator: currentUser, receiver: receiver },
							{ creator: receiver, receiver: currentUser },
						],
						relations: ['creator', 'receiver'],
					}),
					);
				}),
				switchMap((friendRequest: FriendRequest) => {
					if (friendRequest?.receiver.id === currentUser.id) {
						return of({
							status: 'waiting-for-current-user-response' as FriendRequest_Status,
						});
					}
					return of({ status: friendRequest?.status || 'not-sent' });
				}),
			);
		}
	*/


	getFriendRequestUserById(friendRequestId: number) {
		return this.friendRequestRepository.findOne({ where: [{ id: friendRequestId }] });
	}

	/*
	* update the status of the request only
	*/
	async respondToFriendRequest(statusResponse: FriendRequest_Status, friendRequestId: number) {
		await this.friendRequestRepository.update(friendRequestId, { status: statusResponse })
		const friendRequest = await this.getFriendRequestUserById(friendRequestId)
		return friendRequest;
	}

	/**
	 * find all invite where receiver is user, relations:[] allows to send the user element details :)
	 */
	getFriendRequestsFromRecipients(currentUser: User): Observable<FriendRequest[]> {
		return from(this.friendRequestRepository.find({
			where: [{ receiver: currentUser }],
			relations: ['receiver', 'creator'],
		}),
		);
	}

	/**
	 * 1.search for all elemtns of requestRepo where user is creator or receiver
	 * 2. for each of them, store the id of the friend in a list
	 * 3. return the research in userRepo with the friends id list
	 */
	async getFriends(currentUser: User) {
		let list = await this.friendRequestRepository.find({
			where: [
				{ creator: currentUser, status: 'accepted' },
				{ receiver: currentUser, status: 'accepted' },
			],
			relations: ['creator', 'receiver'],
		});

		let userIds: number[] = [];
		list.forEach((friend: FriendRequest) => {
			if (friend.creator.id === currentUser.id) {
				userIds.push(friend.receiver.id);
			} else if (friend.receiver.id === currentUser.id) {
				userIds.push(friend.creator.id);
			}
		});
		return this.userRepository.findByIds(userIds);
	}

	/*
	* find user you want to unfriend, delete the relation either if it was the targer or u that
	* made the invitation
	 */
	async removeFriend(userToRemoveId: number, currentUser: User) {
		console.log('test1:' + userToRemoveId);
		const userToRemove = await this.findUserById(userToRemoveId);
		console.log('test before delete:' + currentUser.id + '');
		await this.friendRequestRepository.delete({ receiver: currentUser, creator: userToRemove });
		await this.friendRequestRepository.delete({ receiver: userToRemove, creator: currentUser });
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
