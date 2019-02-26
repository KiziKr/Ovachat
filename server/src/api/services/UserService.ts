import { Service } from 'typedi';
import { User, UserModel } from '../models/user'
import { RoomModel } from '../models/room'
import { ValidatorService } from '../validators/validatorService'

@Service()
export class UserService {
    /**
     * 
     */
    public async createUser(user: User): Promise<null| {}> {
        var errors = null

        try {
            let userModel = new UserModel(user)
            await ValidatorService.completeEntityValidation(
                userModel
            )

            let roomLobby = await RoomModel.findOne({
                name: 'Lobby'
            })

            roomLobby.addUser(userModel)

        } catch(err) {
           errors = err.errors
        }

        return errors
    }

    /**
     * 
     */
    public async getUserByName(username: string): Promise<User | undefined> {
        let user = await UserModel.findOne({
            username: username
        })

        return (user) ? user:undefined 
    }
}
