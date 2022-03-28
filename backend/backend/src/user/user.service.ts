import { HttpException, HttpStatus, Injectable, UnsupportedMediaTypeException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { UpdateUserDto, CreateUserDtoViaRegistration, User42Dto } from 'src/user/dto/user.dto';
import { UserEvent } from 'src/user/user.event';
import { UsersRepository } from 'src/user/user.repository';
import { UserRelation } from 'src/user/entity/friend-request.entity';
import { RelationInvitation, RelationStatus } from 'src/user/interface/friend-request.interface';
import { from, Observable } from 'rxjs';
import { UserStatus } from 'src/participate/participate.entity';

@Injectable()
export class UserService {
	constructor(
		private readonly userEvent: UserEvent,
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(UsersRepository)
		private usersRepository: UsersRepository,
		@InjectRepository(UserRelation)
		private readonly userRelationRepository: Repository<UserRelation>,
		//private readonly logger: Logger = new Logger('UserService')
	) { }

	getAllUsers() {
		return this.userRepository.find();
	}

	async getUserByLogin(login: string) {
		const user = await this.userRepository.findOne({ login: login });
		if (user)
			return user;
		throw new HttpException('User not found', HttpStatus.NOT_FOUND);
	}

	async updateUser(login: string, user: UpdateUserDto) {
		await this.userRepository.update({ login }, user);
		const updatedUser = await this.userRepository.findOne({ login });
		if (updatedUser)
			return updatedUser;
		throw new HttpException('User not found', HttpStatus.NOT_FOUND);
	}

	async deleteUser(login: string) {
		const deleteResponse = await this.userRepository.delete(login);
		if (!deleteResponse.affected) {
			throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
		}
	}

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
		const login = newUser.login;
		this.userRepository.update({ login }, { friends: [] });
		await this.userRepository.save(newUser);
		this.userEvent.achievement42(newUser);
		return newUser;
	}

	async getByEmail(email: string) {
		const user = await this.userRepository.findOne({ email });
		if (user)
			return user;
		throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
	}

	async getById(id: number) {
		console.log(id);
		const user = await this.userRepository.findOne({ id });
		if (user)
			return user;
		throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
	}

	async createUser42(userData: User42Dto)/*: Promise<User> */ {
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

	async findUserById(id: number) {
		console.log('we search for user: ' + id);
		const user = await this.userRepository.findOne({ id: id });
		if (user)
			return user;
		else {
			console.log(user + ' not found');
			return;
		}
	}

	/**
	 * check in db if we find an invitation already exist with the 2 user
	 */
	async hasExistingRelation(creator: User, receiver: User) {
		const invite = await this.userRelationRepository.findOne({
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
	async sendInvitation(receiverId: number, creator: User) {
		if (receiverId == creator.id)
			return console.log('It is not possible to add yourself!');
		const receiver = await this.findUserById(receiverId);
		if (!receiver)
			return console.log('user not found');
		console.log(creator.login + ' try to invite ' + receiver.login);
		if (await this.hasExistingRelation(creator, receiver)) {
			const inviteFromHim = await this.userRelationRepository.findOne({ creator: receiver, receiver: creator });
			if (inviteFromHim && inviteFromHim.status == 'blocked')
				return console.log('You have been blocked by that user');
			else if (inviteFromHim && inviteFromHim.status == 'pending')
				return console.log('A friend request has already been (sent to/received from) that user');

			const inviteFromYou = await this.userRelationRepository.findOne({ creator: creator, receiver: receiver });
			if (inviteFromYou && inviteFromYou.status == 'blocked')
				return console.log('You have blocked that user, unblock it first');
			if (inviteFromYou && (inviteFromYou.status == 'pending', inviteFromYou.status == 'accepted'))
				return console.log('You have already sent a invite to that user or you are already friends');
			//si demande de chaque coté, on update automatiquement la relation a accepted ?
		}
		const newRelation = this.userRelationRepository.create(
			{
				creator: creator,
				receiver: receiver,
				status: 'pending'
			}
		);
		this.userRelationRepository.save(newRelation);
	}

	getInvitationById(invitationId: number) {
		return this.userRelationRepository.findOne({ where: [{ id: invitationId }] });
	}

	/*
	* update the status of the request only
	*/
	async answerToInvitation(statusResponse: RelationStatus, invitationId: number) {
		await this.userRelationRepository.update(invitationId, { status: statusResponse })
		const friendRequest = await this.getInvitationById(invitationId)
		return friendRequest;
	}

	/**
	 * find all invite where receiver is user, relations:[] allows to send the user element details :)
	 */
	getReceivedInvitations(currentUser: User): Observable<RelationInvitation[]> {
		return from(this.userRelationRepository.find({
			where: [{ receiver: currentUser }],
			relations: ['receiver', 'creator']
		}),
		);
	}

	/**
	 * 1.search for all elemtns of requestRepo where user is creator or receiver
	 * 2. for each of them, store the id of the friend in a list
	 * 3. return the research in userRepo with the friends id list
	 */
	async getFriends(currentUser: User) {
		console.log('test');
		let list = await this.userRelationRepository.find({
			where: [
				{ creator: currentUser, status: 'accepted' },
				{ receiver: currentUser, status: 'accepted' },
			],
			relations: ['creator', 'receiver'],
		});

		let userIds: number[] = [];
		list.forEach((friend: RelationInvitation) => {
			if (friend.creator.id === currentUser.id) {
				userIds.push(friend.receiver.id);
			} else if (friend.receiver.id === currentUser.id) {
				userIds.push(friend.creator.id);
			}
		});
		return this.userRepository.findByIds(userIds);
	}

	/**
 * 1.search for all elemtns of requestRepo where user is creator
 * 2. for each of them, store the id of the friend in a list
 * 3. return the research in userRepo with the friends id list
 */
	async getBlockedUsers(currentUser: User) {
		let list = await this.userRelationRepository.find({
			where: [
				{ creator: currentUser, status: 'blocked' },
			],
			relations: ['creator', 'receiver'],
		});

		let userIds: number[] = [];
		list.forEach((friend: RelationInvitation) => {
			if (friend.creator.id === currentUser.id)
				userIds.push(friend.receiver.id);
		});
		return this.userRepository.findByIds(userIds);
	}

	/*
	* find user you want to unfriend, delete the relation either if it was the target or u that
	* made the invitation
	 */
	async removeFriend(userToRemoveId: number, currentUser: User) {
		const userToRemove = await this.findUserById(userToRemoveId);
		await this.userRelationRepository.delete({ receiver: currentUser, creator: userToRemove });
		await this.userRelationRepository.delete({ receiver: userToRemove, creator: currentUser });
	}

	/**
	 * compared to removeFriend, delete only the relation from the person requesting it.
	 */
	async unblockUser(userToRemoveId: number, currentUser: User) {
		const userToRemove = await this.findUserById(userToRemoveId);
		await this.userRelationRepository.delete({ receiver: userToRemove, creator: currentUser, status: 'blocked' });
	}

	/**
	* 1.block yourself / 2. user not existing / 3. user already blocked / 4. update if relation already existing
	*/
	async blockUser(receiverId: number, creator: User) {
		if (receiverId === creator.id)
			return console.log('It is not possible to block yourself!');
		const receiver = await this.findUserById(receiverId);
		if (!receiver)
			return console.log('user not found');
		const existing_invitation = await this.hasExistingRelation(creator, receiver)
		if (existing_invitation) {
			const inviteFromYou = await this.userRelationRepository.findOne({
				where: [
					{ creator, receiver },
					{ creator: creator, receiver: receiver },
				],
			});
			if (inviteFromYou && inviteFromYou.status != 'blocked') {
				await this.answerToInvitation('blocked', inviteFromYou.id);
				return console.log('update the existing relation. you blocked the targeted user invite from you');
			}
			else if (inviteFromYou && inviteFromYou.status == 'blocked')
				return console.log('You have already blocked that user');
			/*
		const inviteFromHim = await this.userRelationRepository.findOne({
			where: [
				{ creator, receiver },
				{ creator: receiver, receiver: creator },
			],
		});
		//if (invite.status == 'blocked')
		//	return console.log('You have already blocked that user');
		await this.answerToInvitation('blocked', inviteFromHim.id);
		return console.log('update the existing relation. you blocked the targeted user');
		*/
		}
		const newRelation = this.userRelationRepository.create(
			{
				creator: creator,
				receiver: receiver,
				status: 'blocked'
			}
		);
		this.userRelationRepository.save(newRelation);
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
