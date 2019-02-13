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
                    errmsg : "Pseudo ou mot de passe incorrect"
                }
            })
        }

        return res.status(200).send({
            data : {
                username: user.username,
                token : jwt.sign({
                    id: new UserModel(user)._id
                }, 'shhhhh', {
                    expiresIn: '2d'
                })
            }
        })
    }
}
