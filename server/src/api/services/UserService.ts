import { Service } from 'typedi';
import { User, UserModel } from '../models/user'
import { ValidatorService } from '../validators/validatorService'

@Service()
export class UserService {

    /**
     * 
     */
    public async createUser(user: User): Promise<undefined | object> {
        return await ValidatorService.completeEntityValidation(
            new UserModel(user)
        )
    }
}
