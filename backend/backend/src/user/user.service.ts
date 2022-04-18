import { HttpException, HttpStatus, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { CreateUserDtoViaRegistration, User42Dto } from 'src/user/dto/user.dto';
import { UsersRepository } from 'src/user/user.repository';
import { UserRelation } from 'src/user/entity/friend-request.entity';
import { RelationInvitation, RelationStatus } from 'src/user/interface/friend-request.interface';
import { from, Observable } from 'rxjs';
import { Achievement } from './entity/achievement.entity';

@Injectable()
export class UserService {
	constructor(
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

	async updateUser(oldlogin: string, newlogin: string) {
		const alreadyTaken = await this.userRepository.findOne({ login: newlogin });
		if (alreadyTaken) {
			console.log("name already taken");
			throw new HttpException('Login already taken', HttpStatus.UNAUTHORIZED);
		}
		await this.userRepository.update({ login: oldlogin },
			{
				login: newlogin
			});
		const updatedUser = await this.userRepository.findOne({ login: newlogin });
		await this.triggerAchievement42(updatedUser);
		return updatedUser;
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

	async triggerAchievement42(user: User) {
		console.log(user);
		if (user.login == "norminet")
			this.saveAchievement(user, "42")
	}

	async giveRankOnCreation(user: User) {
		const allUsers = await this.getAllUsers();
		user.rank = allUsers.length + 1;
		await this.userRepository.save(user);
	}

	async create(userData: CreateUserDtoViaRegistration) {
		const newUser = await this.userRepository.create(userData);
		await this.userRepository.save(newUser);
		await this.giveRankOnCreation(newUser);
		await this.triggerAchievement42(newUser);
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
		if (user)
			return console.log("that user already exists");
		console.log("that user didnt exists, gonna create it");
		const newUser = await this.usersRepository.createUser42(userData);
		await this.giveRankOnCreation(newUser);
		await this.triggerAchievement42(newUser);
		return newUser;
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

	/**
	 * Save an achievement for a user to the db
	 * @param user
	 * @param achievementTitle
	 */
	async saveAchievement(user: User, achievementTitle: string) {

		const newAchievement = await this.achievementRepository.create(
			{
				title: achievementTitle,
				user: user,
			}
		);
		await this.achievementRepository.save(newAchievement);
		console.log('User ' + user.login + ' unlocked the ' + achievementTitle + ' achievement');
	}

	async triggerFriendAchievement(user: User) {
		const friendsList = await this.getFriends(user);
		if (friendsList.length == 1) {
			console.log(user.login + " will unlocked friend achievement");
			await this.saveAchievement(user, "AddFriend");
		}
	}

	async updateRelationStatus(statusResponse: RelationStatus, creator: User, user: User) {
		const relation = await this.userRelationRepository.findOne({
			where: [{ creator: creator, receiver: user }],
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

	getSentInvitations(user: User): Observable<RelationInvitation[]> {
		return from(this.userRelationRepository.find({
			where: [{ creator: user, status: 'pending' }],
			relations: ['receiver', 'creator']
		}),
		);
	}

	getReceivedInvitations(user: User): Observable<RelationInvitation[]> {
		return from(this.userRelationRepository.find({
			where: [{ receiver: user }],
			relations: ['receiver', 'creator']
		}),
		);
	}

	getPendingInvitations(user: User): Observable<RelationInvitation[]> {
		return from(this.userRelationRepository.find({
			where: [{ receiver: user, status: 'pending' }],
			relations: ['receiver', 'creator']
		}),
		);
	}

	async getAchievements(user: User) {
		const achievements = await this.achievementRepository.find({
			where: [{ user: user }],
			relations: ['user']
		});
		if (achievements)
			return achievements;
	}

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

	async removeRelation(target: User, user: User) {
		await this.userRelationRepository.delete({ receiver: user, creator: target });
		await this.userRelationRepository.delete({ receiver: target, creator: user });
	}

	/**
	 * Unblock target only from your side of the relation only
	 * @param target
	 * @param user
	 */
	async unblockUser(target: User, user: User) {
		await this.userRelationRepository.delete({ receiver: target, creator: user, status: 'blocked' });
	}

	/**
	 * Add target to your list of blocked users. If initial invite was from you, update it, if
	 * invite was from target and was accepted/declined remove the existing relation and then block him.
	 * @param target
	 * @param creator
	 * @returns
	 */
	async blockUser(target: User, user: User) {
		if (target.login == user.login)
			return console.log('It is not possible to block yourself!');

		if (await this.hasExistingRelation(user, target)) {
			const inviteFromYou = await this.userRelationRepository.findOne({ creator: user, receiver: target });
			if (inviteFromYou && inviteFromYou.status != 'blocked') {
				await this.updateRelationStatus('blocked', user, target);
				return console.log('update the existing relation. you blocked the targeted user invite from you');
			}
			else if (inviteFromYou && inviteFromYou.status == 'blocked')
				return console.log('You have already blocked that user');

			const inviteFromHim = await this.userRelationRepository.findOne({ creator: target, receiver: user });
			if (inviteFromHim && (inviteFromHim.status != 'blocked'))
				await this.removeRelation(target, user);
		}

		const newRelation = this.userRelationRepository.create(
			{
				creator: user,
				receiver: target,
				status: 'blocked'
			}
		);
		this.userRelationRepository.save(newRelation);
	}

	/**
	 * Get the relation between you and target
	 * @param target
	 * @param user
	 * @returns struct of the relation object
	 */
	async getRelation(target: User, user: User) {
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
