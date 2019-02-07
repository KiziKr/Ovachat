import {express} from 'express';
import { Service } from 'typedi';
import { User, UserModel } from '../api/models/user'

const jwt = require('jsonwebtoken')

@Service()
export class AuthService {
    constructor() {
    }

    /**
     * 
     */
    public parseAuthFromRequest(req: express.Request): { username: string, password: string }  {
        const authorization = req.headers['authorization'];

        if(authorization) {
            var decoded = jwt.verify(authorization, 'shhhhh');

            if(decoded) {
                return {
                    username : decoded.username,
                    password : decoded.password
                }
            }
        }

        return undefined
    }

    /**
     * 
     */
    public async authenticateUser(username: string, password: string): Promise<string | undefined> {
        var user = await this.validateUser(username, password)

        if(user === null) {
            return undefined
        }

        return jwt.sign({
            username : user.username,
            password : user.password
        }, 'shhhhh')
    }

    /**
     * 
     */
    public async validateUser(username: string, password: string): Promise<User | undefined> {
        const user = await UserModel.findOne({
            username: username
        })

        if(user && await user.comparePassword(password)) {
           return user
        }

        return undefined
    }
}
