import { Authorized, JsonController, Post, Body, BodyParam, Res, CurrentUser } from 'routing-controllers';
import {Response} from "express";

import { AuthService } from '../../auth/AuthService'
import { UserService } from '../services/UserService'

import { User, UserModel } from '../models/user'

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
    @Post('/verify')
    public async verifyUser(@CurrentUser() user: User, @Res() res: Response): Promise<User | undefined> {
        if(user) {
            return res.send({
                data: {
                    username: user.username
                }
            })
        } else {
            return res.send({
                error: {
                    errmsg: "Not authentified"
                }
            })
        }
    }

    /**
     * 
     */
    @Post('/register')
    public async register(@Body() user: User, @Res() res: Response ): Promise<undefined | object> {
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
            return res.send({
                data : {
                    errmsg : "Pseudo ou mot de passe incorrect"
                }, 
                status: 401,
                success: false
            })
        }

        return res.send({
            data : {
                username: user.username,
                token : jwt.sign({
                    id: new UserModel(user)._id
                }, 'shhhhh', {
                    expiresIn: '1d'
                })
            },
            status: 200,
            success: true
        })
    }
}
