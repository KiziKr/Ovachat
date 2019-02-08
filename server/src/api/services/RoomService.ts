import { Service } from 'typedi';
import { Room, RoomModel } from '../models/room'
import { User, UserModel } from '../models/user'
import { ValidatorService } from '../validators/validatorService'

@Service()
export class RoomService {
    /**
     * 
     */
    public async joinRoom(user: User, nameRoom: string) {
        const room = await this.searchRoom(nameRoom)

        if(room === undefined) {
            return undefined
        }

        return new UserModel(user)
            .addRoom(new RoomModel(room))
    }

    /**
     * 
     */
    public async searchRoom(nameRoom: string): Promise<Room | undefined> {
        const room = await RoomModel.findOne({
            name: nameRoom
        })

        return (room === null)
            ?undefined 
            :room
    }

    /**
     * 
     */

}