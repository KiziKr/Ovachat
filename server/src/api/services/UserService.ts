import { Service } from 'typedi';
import { User, UserModel } from '../models/user'
import { ValidatorService } from '../validators/validatorService'

@Service()
export class UserService {
    /**
     * 
     */
    public async createUser(user: User): Promise<undefined | object> {
        const data = await ValidatorService.completeEntityValidation(
            new UserModel(user)
        )

        if(data.success === true) {
            return null
        }

        return data.errors
    }
}
