import { Service } from 'typedi';
import { Room, RoomModel } from '../models/room'
import { User, UserModel } from '../models/user'
import { ValidatorService } from '../validators/validatorService'

@Service()
export class RoomService {
    /**
     * 
     */
    public async find(): Promise<Room[] | undefined> {
        return await RoomModel.find()
    }

    /**
     * 
     */
    public async join(user: User, nameRoom: string): Promise<Room> {
        const room = await this.search(nameRoom)

        if(!room) {
            return undefined
        }

        let roomUser = await this.search(user.getRoom())
        
        if(new RoomModel(room).users.indexOf(user.username) !== -1) {
            return undefined
        }

        if(roomUser) {
            let userModel = new UserModel(user)
            await new RoomModel(roomUser).removeUser(userModel)
            await new RoomModel(room).addUser(userModel)
            return room
        }

        return undefined
    }

    /**
     * 
     */
    public async search(nameRoom: string, options?: any): Promise<Room | undefined> {
        const room = await RoomModel.findOne({
            name: nameRoom,
            options
        })
        
        return (room) ? room:undefined
    }
}