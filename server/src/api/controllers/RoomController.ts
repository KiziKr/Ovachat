import { Response } from 'express'
import { JsonController, Authorized, Post, CurrentUser, Res, Body, BodyParam, Get } from 'routing-controllers'
import { User } from '../models/user'
import { RoomService } from '../services/RoomService'
import { Room, RoomModel } from '../models/room';
import { ValidatorService } from '../validators/validatorService'

@Authorized()
@JsonController('/rooms')
export class RoomController {
    constructor(
        private roomService: RoomService
    ) { }

    @Post('/create')
    public async createRoom(@CurrentUser() user: User, @Body() room: Room, @Res() res: Response) {
        if (user) {
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
    public async deleteRoom(@CurrentUser() user: User, @BodyParam('name') name: string, @Res() res: Response): Promise<object> {
        var room = await this.roomService.searchRoom(name)

        if (room === undefined) {
            return res.status(403).send({
                errors: {
                    errmsg: "Channel introuvable"
                }
            })
        }

        if (room.owner === user.username) {
            room.users.forEach(async user => {
                await this.roomService.joinRoom(user, "Lobby")
            })

            await RoomModel.remove({ name: room.name })

            return res.status(200).send({
                data: room.users
            })
        }

        return res.status(403).send({
            errors: {
                errmsg: "Ce channel ne t'appartient pas"
            }
        })
    }

    @Post('/join')
    public async joinRoom(@CurrentUser() user: User, @BodyParam('roomName') roomName: string, @Res() res: Response) {
        const room = await this.roomService.joinRoom(user, roomName)

        if (room[0]) {
            return res.status(403).send({ errors: room })
        }

        return res.status(200).send(room)
    }

    @Get('/test')
    public test(@Res() res: Response) {
        return res.send({data: "Ok"})
    }
}