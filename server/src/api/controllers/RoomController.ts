import { Response } from 'express'
import { JsonController, Authorized, Post, CurrentUser, Res, Body, BodyParam } from 'routing-controllers'
import { User } from '../models/user'
import { RoomService } from '../services/RoomService'
import { Room, RoomModel } from '../models/room';
import { ValidatorService } from '../validators/validatorService'

@Authorized()
@JsonController('/rooms')
export class RoomController {
    constructor(
        private roomService: RoomService
    ){}

    @Post('/create')
    public async createRoom(@CurrentUser() user: User, @Body() room: Room, @Res() res: Response) {
        if(user) {
            room.owner = user.username
        }
        
        try {
            return res.send(await ValidatorService.completeEntityValidation(
                new RoomModel(room)
            ))
        } catch (err) {
            return res.send(err)
        }
    }

    @Post('/delete')
    public async deleteRoom(@CurrentUser() user: User, @BodyParam('roomName') roomName: string, @Res() res: Response) {
        // var room = await this.roomService.searchRoom(roomName)

        // if(room && room.owner === user.username) {

        // }
    }

    @Post('/join')
    public async joinRoom(@CurrentUser() user: User,@BodyParam('roomName') roomName: string, @Res() res: Response) {
        const room = await this.roomService.joinRoom(user, roomName)

        res.send(room)
    }
}