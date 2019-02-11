import { Authorized, JsonController, Post, Body, BodyParam, Res } from 'routing-controllers';
import {Response} from "express";

import { AuthService } from '../../auth/AuthService'
import { UserService } from '../services/UserService'

import { User } from '../models/user'

const jwt = require('jsonwebtoken')

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
        var user = await this.authService.validateUser(username, password)

        if(user === undefined) {
            return res.status(403).send({
                error : {
                    errmsg : "Authentification failed"
                }
            })
        }

        return res.status(200).send({
            data : jwt.sign({
                username: user.username,
                password: password
            }, 'shhhhh')
        })
    }
}
