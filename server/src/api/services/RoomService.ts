import { Service } from 'typedi';
import { Room, RoomModel } from '../models/room'
import { User } from '../models/user'
import { ValidatorService } from '../validators/validatorService'

@Service()
export class RoomService {
    private currentUser: User = undefined;

    public setUser(user: User) {
        this.currentUser = user
    }

    /**
     * 
     */
    public async createRoom(room: Room): Promise<undefined | object> {
        if (this.currentUser === undefined) {
            return undefined
        }

        return undefined
    }
}