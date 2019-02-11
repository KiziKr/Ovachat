import { Service } from 'typedi';
import { Room, RoomModel } from '../models/room'
import { User, UserModel } from '../models/user'
import { ValidatorService } from '../validators/validatorService'

@Service()
export class RoomService {
    /**
     * 
     */
    public async joinRoom(user: User, nameRoom: string): Promise<Room | string[]> {
        const room = await this.searchRoom(nameRoom)
        var errors: string[] = []

        if (room === undefined) {
            errors.push("Channel introuvable")
        }

        var roomModel = new RoomModel(room)

        if (user.room_id.equals(roomModel._id)) {
            errors.push("Tu fais déjà parti de ce channel")
        }

        if(errors.length > 0) {
            return errors
        }

        return new UserModel(user).addRoom(roomModel)
    }

    /**
     * 
     */
    public async searchRoom(nameRoom: string): Promise<Room | undefined> {
        const room = await RoomModel.findOne({
            name: nameRoom
        })

        return (room === null)
            ? undefined
            : room
    }

    /**
     * 
     */

}