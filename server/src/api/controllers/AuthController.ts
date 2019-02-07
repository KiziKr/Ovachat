import { Authorized, JsonController, Post, Body, BodyParam, Res } from 'routing-controllers';
import {Response} from "express";

import { AuthService } from '../../auth/AuthService'
import { UserService } from '../services/UserService'

import { User } from '../models/user'

@JsonController('/users')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ){}

    /**
     * 
     */
    @Post('/registry')
    public async registry(@Body() user: User, @BodyParam('confirmPassword') password: string, @Res() res: Response ): Promise<undefined | object> {
        if(user.password !== password) {
            res.send("Les mots de passe ne sont pas identique")
        }

        try {
            var test = await this.userService.createUser(user);
            return res.send(test)
        } catch(err) {
            return res.send(err)
        }
    }

    /**
     * Auth user
     */
    @Post("/login")
    public async loginUser(@BodyParam('username') username: string, @BodyParam('password') password: string, @Res() res: Response) {
        var token = await this.authService.authenticateUser(username, password)
        
        var message = { data : 'Authentication failed' , status : 403 }

        if(token) {
            message.data = token
            message.status = 200
        }

        return res.status(message.status)
            .send(message.data)
    }
}
