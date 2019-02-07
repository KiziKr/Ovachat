import { Response } from 'express'
import { JsonController, Authorized, Post, CurrentUser, Res } from 'routing-controllers'
import { User } from '../models/user'

@Authorized()
@JsonController('/rooms')
export class RoomController {
    constructor() {

    }

    @Post('/create')
    public async createRoom(@CurrentUser() user: User,  @Res() res: Response) {
        res.send(user)
    }
}