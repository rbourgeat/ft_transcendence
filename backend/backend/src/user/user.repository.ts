import { EntityRepository, Repository } from "typeorm";
import { User } from 'src/user/entity/user.entity'
import { User42Dto } from 'src/user/dto/user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser42(userData: User42Dto): Promise<User> {
        const user: User = this.create(userData);
        //const salt = await bcrypt.genSalt();
        //user.password = await bcrypt.hash(user.password, salt);
        user.password = userData.password;
        user.login = userData.login;
        user.email = userData.email;
        return this.save(user);
    }
}