import { Service } from 'typedi';
import { Room, RoomModel } from '../models/room'
import { User } from '../models/user'
import { ValidatorService } from '../validators/validatorService'

@Service()
export class RoomService {
    /**
     * 
     */
    public async joinRoom(user: User, nameRoom: string, password: string = '') {
        const room= await this.searchRoom(nameRoom)

        if(room === undefined) {
            return undefined
        }
    }

    /**
     * 
     */
    public async searchRoom(nameRoom: string): Promise<Room | undefined> {
        return await RoomModel.findOne({
            name: nameRoom
        })
    }
}