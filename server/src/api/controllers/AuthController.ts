import "reflect-metadata";
import { JsonController, Post, Body, BodyParam, Res, CurrentUser, NotFoundError, Get, HttpError, OnUndefined, Param} from 'routing-controllers';
import {Response} from "express";

import { AuthService } from '../../auth/AuthService';
import { UserService } from '../services/UserService';

import { User, UserModel } from '../models/user';

const jwt = require('jsonwebtoken')


import { UserNotFoundError } from '../errors/UserNotFoundError';

@JsonController('/users')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ){}

    /**
     * 
     */
    @Get('/test')
    public test(@Res() res: Response) {
        throw new NotFoundError('test')
    }

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
        const data = await this.userService.createUser(user)

        if(data) {
            return res.status(400).send({
                data: {
                    errors: data
                },
                status: 400,
                success: false
            })
        }
        else {
            return res.status(200).send({
                data: {},
                status: 200,
                success: true
            })
        }
    }

    /**
     * Auth user
     */
    @Post("/login")
    public async loginUser(@BodyParam('username') username: string, @BodyParam('password') password: string, @Res() res: Response) {
        const user = await this.authService.validateUser(username, password)

        if(user === undefined) {
            return res.status(401).send({
                data : {
                    errmsg : "Pseudo ou mot de passe incorrect"
                }, 
                status: 401,
                success: false
            })
        }

        return res.status(200).send({
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
