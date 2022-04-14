import { HttpException, HttpStatus, Injectable, UnsupportedMediaTypeException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relation, Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { UpdateUserDto, CreateUserDtoViaRegistration, User42Dto } from 'src/user/dto/user.dto';
import { UserEvent } from 'src/user/user.event';
import { UsersRepository } from 'src/user/user.repository';
import { UserRelation } from 'src/user/entity/friend-request.entity';
import { RelationInvitation, RelationStatus } from 'src/user/interface/friend-request.interface';
import { from, Observable } from 'rxjs';
import { UserStatus } from 'src/participate/participate.entity';
import { Achievement } from './entity/achievement.entity';

@Injectable()
export class UserService {
	constructor(
		private readonly userEvent: UserEvent,
		@InjectRepository(User)
		public userRepository: Repository<User>,
		@InjectRepository(UsersRepository)
		private usersRepository: UsersRepository,
		@InjectRepository(UserRelation)
		private readonly userRelationRepository: Repository<UserRelation>,
		@InjectRepository(Achievement)
		private achievementRepository: Repository<Achievement>,
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

	async getUserByLogin42(login: string) {
		const user = await this.userRepository.findOne({ login42: login });
		if (user)
			return user;
		throw new HttpException('User not found by 42login', HttpStatus.NOT_FOUND);
	}

	async updateUser(login: string, user: UpdateUserDto) {
		await this.userRepository.update({ login }, user);
		const updatedUser = await this.userRepository.findOne({ login });
		if (updatedUser)
			return updatedUser;
		throw new HttpException('User not found', HttpStatus.NOT_FOUND);
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
		const newUser = await this.userRepository.create(userData);
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
		const user = await this.userRepository.findOne({ id });
		if (user)
			return user;
		throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
	}

	async createUser42(userData: User42Dto) {
		const user = await this.userRepository.findOne({ email: userData.email });
		if (user) {
			console.log("that user already exists");
			return;
		}
		console.log("that user didnt exists, gonna create it");
		return await this.usersRepository.createUser42(userData)
	}

	async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
		return this.usersRepository.update(userId, {
			twoFactorAuthenticationSecret: secret
		});
	}

	async turnOnTwoFactorAuthentication(userId: number) {
		return this.usersRepository.update(userId, {
			isTwoFactorAuthenticationEnabled: true
		});
	}

	async turnOffTwoFactorAuthentication(userId: number) {
		return this.usersRepository.update(userId, {
			isTwoFactorAuthenticationEnabled: false
		});
	}

	/**
	 * Check if there is a relation saved in the db between 2 users
	 * @param creator
	 * @param receiver
	 * @returns true/false
	 */
	async hasExistingRelation(creator: User, receiver: User) {
		const invite = await this.userRelationRepository.findOne({
			where: [
				{ creator, receiver },
				{ creator: receiver, receiver: creator },
			],
		});
		return (invite ? true : false);
	}

	/**
	 * Send a relation invitation to someone.
	 * @param receiverLogin
	 * @param creator
	 * @returns
	 */
	async sendInvitation(receiverLogin: string, creator: User) {
		const receiver = await this.getUserByLogin(receiverLogin);
		if (!receiver || receiverLogin == creator.login)
			return;
		if (await this.hasExistingRelation(creator, receiver)) {
			const inviteFromHim = await this.userRelationRepository.findOne({ creator: receiver, receiver: creator });
			if (inviteFromHim && inviteFromHim.status == 'blocked')
				return console.log('You have been blocked by that user');
			else if (inviteFromHim && (inviteFromHim.status == 'pending' || inviteFromHim.status == 'accepted'))
				return console.log('A friend request has already been (sent to/received from) that user');

			const inviteFromYou = await this.userRelationRepository.findOne({ creator: creator, receiver: receiver });
			if (inviteFromYou && inviteFromYou.status == 'blocked')
				return console.log('You have blocked that user, unblock it first');
			if (inviteFromYou && (inviteFromYou.status == 'pending' || inviteFromYou.status == 'accepted'))
				return console.log('You have already sent a invite to that user or you are already friends');
			//si demande de chaque coté, on update automatiquement la relation a accepted ? //
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

	async triggerFriendAchievement(user: User) {
		const friendsList = await this.getFriends(user);
		console.log('Friend list of' + user.login + ' has a length:' + friendsList.length);
		if (friendsList.length == 1) {
			console.log(user.login + " will unlocked friend achievement");
			this.userEvent.achievementFriend(user);
		}
	}

	async answerToInvitation(statusResponse: RelationStatus, creatorLogin: string, user: User) {

		const creator = await this.getUserByLogin(creatorLogin);
		const relation = await this.userRelationRepository.findOne({
			where: [{ creator: creator, receiver: user, status: 'pending' }],
			relations: ['creator', 'receiver']
		})

		if (relation) {
			relation.status = statusResponse;
			await this.userRelationRepository.save(relation);
			if (statusResponse == "accepted") {
				await this.triggerFriendAchievement(relation.creator);
				await this.triggerFriendAchievement(relation.receiver);
			}
		}
		return relation;
	}

	getSentInvitations(currentUser: User): Observable<RelationInvitation[]> {
		return from(this.userRelationRepository.find({
			where: [{ creator: currentUser, status: 'pending' }],
			relations: ['receiver', 'creator']
		}),
		);
	}

	getReceivedInvitations(currentUser: User): Observable<RelationInvitation[]> {
		return from(this.userRelationRepository.find({
			where: [{ receiver: currentUser }],
			relations: ['receiver', 'creator']
		}),
		);
	}

	getPendingInvitations(currentUser: User): Observable<RelationInvitation[]> {
		return from(this.userRelationRepository.find({
			where: [{ receiver: currentUser, status: 'pending' }],
			relations: ['receiver', 'creator']
		}),
		);
	}

	async getAchievementsOf(login: string) {
		const user = await this.getUserByLogin(login);
		const achievements = await this.achievementRepository.find({
			where: [{ user: user }],
			relations: ['user']
		});
		if (achievements)
			return achievements;
	}


	/**
	 * 1.search for all elemtns of requestRepo where user is creator or receiver
	 * 2. for each of them, store the id of the friend in a list
	 * 3. return the research in userRepo with the friends id list
	 */
	async getFriends(user: User) {
		let list = await this.userRelationRepository.find({
			where: [
				{ creator: user, status: 'accepted' },
				{ receiver: user, status: 'accepted' },
			],
			relations: ['creator', 'receiver'],
		});

		let userIds: number[] = [];
		list.forEach((relation: RelationInvitation) => {
			if (relation.creator.id === user.id) {
				userIds.push(relation.receiver.id);
			} else if (relation.receiver.id === user.id) {
				userIds.push(relation.creator.id);
			}
		});
		return this.userRepository.findByIds(userIds);
	}

	/**
 * 1.search for all elemtns of requestRepo where user is creator
 * 2. for each of them, store the id of the friend in a list
 * 3. return the research in userRepo with the friends id list
 */
	async getBlockedUsers(user: User) {
		let list = await this.userRelationRepository.find({
			where: [{ creator: user, status: 'blocked' }],
			relations: ['creator', 'receiver'],
		});

		let userIds: number[] = [];
		list.forEach((relation: RelationInvitation) => {
			if (relation.creator.id === user.id)
				userIds.push(relation.receiver.id);
		});
		return this.userRepository.findByIds(userIds);
	}

	/**
	 * 	Delete your relation with $login
	 * @param login
	 * @param user
	 */
	async removeFriend(login: string, user: User) {
		const target = await this.getUserByLogin(login);
		await this.userRelationRepository.delete({ receiver: user, creator: target });
		await this.userRelationRepository.delete({ receiver: target, creator: user });
	}

	/**
	 * Unblock $login only from your side of the relation
	 * @param login
	 * @param user
	 */
	async unblockUser(login: string, user: User) {
		const target = await this.getUserByLogin(login);
		await this.userRelationRepository.delete({ receiver: target, creator: user, status: 'blocked' });
	}

	/**
	* 1.block yourself / 2. user not existing / 3. user already blocked / 4. update if relation already existing
	*/
	async blockUser(login: string, creator: User) {
		if (login == creator.login)
			return console.log('It is not possible to block yourself!');
		const receiver = await this.getUserByLogin(login);
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
				//await this.answerToInvitation('blocked', inviteFromYou.id, creator);
				await this.answerToInvitation('blocked', creator.login, receiver);
				return console.log('update the existing relation. you blocked the targeted user invite from you');
			}
			else if (inviteFromYou && inviteFromYou.status == 'blocked')
				return console.log('You have already blocked that user');
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

	async getRelation(login: string, user: User) {
		const target = await this.getUserByLogin(login);
		const invite = await this.userRelationRepository.findOne({
			where: [
				{ creator: user, receiver: target },
				{ creator: target, receiver: user }
			],
		});
		if (invite) {
			let struct = {
				id: invite.id,
				creator: user.login,
				receiver: target.login,
				status: invite.status
			};
			return struct;

		}
		return;
	}

	async getStats(login: string) {

		const query = await this.userRepository.createQueryBuilder('user')
			.andWhere('user.login = :login', { login: login })
			.select([
				"user.rank",
				"user.points",
				"user.xp",
				"user.percent_to_next_lvl",
				"user.level",
			]).getOne();
		return query;
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
