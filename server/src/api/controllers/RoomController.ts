import { JsonController, Authorized, Post, CurrentUser, Get, Param, OnUndefined, HttpError, BodyParam } from 'routing-controllers'
import { User } from '../models/user'
import { RoomService } from '../services/RoomService';
import { UserService } from '../services/UserService'
import { Room, RoomModel } from '../models/room';
import { ValidatorService } from '../validators/validatorService'

import { UserNotFoundError, RoomNotFoundError } from '../errors'

/**
 * Class RoomController
 */
@Authorized()
@JsonController('/rooms')
export class RoomController {
    constructor(
        private roomService: RoomService,
        private userService: UserService
    ) { }

    /**
     * Return all existing room
     */
    @Get()
    public async find(): Promise<Room[]> {
        return await this.roomService.find()
    }

    /**
     * Return an array of all users from the room passed as a parameter
     */
    @Get('/:name/users')
    @OnUndefined(RoomNotFoundError)
    public async getUsers(@Param('name') roomName: string): Promise<string[]> {
        const room = await this.roomService.search(roomName)

        if(room) {
            return room.users
        }
    }

    /**
     * Add a room by using the current user as owner 
     */
    @Post('/add/:name')
    @OnUndefined(UserNotFoundError)
    public async addRoom(@CurrentUser() user: User, @Param('name') roomName: string): Promise<Room>{
        if(!user) return

        return await ValidatorService.completeEntityValidation(
            new RoomModel({
                owner: user.username,
                name: roomName
            })
        )
    }

    /**
     * 
     */
    @Post('/delete/:name')
    @OnUndefined(UserNotFoundError)
    public async deleteRoom(@CurrentUser() user: User, @Param('name') roomName: string): Promise<string[]> {
        if(!user) return

        let room = await this.roomService.search(roomName)

        if(!room) {
            throw new RoomNotFoundError()
        }

        if(room.owner !== user.username) {
            throw new HttpError(500, 'Tu nes pas proprietaire')
        }

        let usersRoom = room.users

        usersRoom.forEach(async user => {
            let theUser = await this.userService.getUserByName(user)

            if(theUser) {
                await this.roomService.join(theUser, 'Lobby')
                console.log(theUser)
            }
        })

        //await RoomModel.remove({ name: roomName })
        return usersRoom
    }

    /**
     * Join room by name if user is not one of them.
     */
    @Post('/join/:name')
    @OnUndefined(UserNotFoundError)
    public async join(@CurrentUser() user: User, @Param('name') roomName: string): Promise<Room> {
        if(!user) return

        const result = await this.roomService.join(user, roomName)

        if(!result) {
            throw new RoomNotFoundError()
        }

        return result
    }

    /**
     * Set name of the room passed as a parameter
     */
    @Post('/set/name')
    @OnUndefined(UserNotFoundError)
    public async setName(@CurrentUser() user: User, @BodyParam('name', {required: true}) name: string, @BodyParam('newName', {required: true}) newName: string) {
        const room = await this.roomService.search(name)

        if(!room) {
            throw new RoomNotFoundError()
        }

        if(room.owner === user.username) {
            let test = new RoomModel(room).setName(newName)

            return new Promise((resolve, reject) => {
                test.save(function (next) {
                    if (next) {
                        return reject(next)
                    }
                    return resolve(room)
                })
            })
        }

        throw new HttpError(401, 'Tu nes pas proprietaire')
    }
}