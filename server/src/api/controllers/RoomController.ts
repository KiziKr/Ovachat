import { Response } from 'express'
import { JsonController, Authorized, Post, CurrentUser, Res, Body } from 'routing-controllers'
import { User } from '../models/user'
import { RoomService } from '../services/RoomService'
import { Room } from '../models/room';

@Authorized()
@JsonController('/rooms')
export class RoomController {
    constructor(
        private roomService: RoomService
    ) { }

    @Post('/create')
    public async createRoom(@CurrentUser() user: User, @Body() room: Room, @Res() res: Response) {
        this.roomService.setUser(user)
        this.roomService.createRoom(room)
    }

    @Post('/delete')
    public async deleteRoom(@CurrentUser() user: User, @Res() res: Response) {

    }

    @Post('/change')
    public async changeRoom(@CurrentUser() user: User, @Res() res: Response) {
    }
}