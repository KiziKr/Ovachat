import { Service } from 'typedi';
import { User, UserModel} from '../models/user'
import { ValidatorService } from '../validators/validatorService'

@Service()
export class UserService {

    /**
     * 
     */
    public async createUser(user: User): Promise<undefined | object> {
        const userModel = new UserModel(user)

        let validation = await ValidatorService.validateEntity(userModel).then((res) => {
                return res
            }).catch(err => {
                return err
            }
        )

        if(validation.status === "failed") {
            return validation
        }

        return await ValidatorService.validationSave(
            userModel
        )
    }
}
