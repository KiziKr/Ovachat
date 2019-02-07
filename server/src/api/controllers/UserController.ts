import { Authorized, JsonController, Post, Body, Res } from 'routing-controllers';
import { Response } from "express";

import { UserService } from '../services/UserService'

import { User } from '../models/user'

@JsonController('/users')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    /**
     * Create a user in the database
     */
    @Post('/create')
    public async createUser(@Body({ required: true }) user: User, @Res() res: Response): Promise<undefined | object> {
        try {
            var test = await this.userService.createUser(user);
            return res.send(test)
        } catch (err) {
            return res.send(err)
        }
    }
}
