import { express } from 'express';
import { Service } from 'typedi';
import { User, UserModel } from '../api/models/user'
import { ObjectID } from 'bson';

const jwt = require('jsonwebtoken')

@Service()
export class AuthService {
    constructor() {
    }

    public async currentUserChecker(req: express.Request): Promise<User | undefined> {
        var credential = this.parseAuthFromRequest(req)

        if (credential === undefined) {
            return undefined
        }

        const user = await UserModel.findOne({
            _id: credential.id
        })

        if(user) {
            return user
        }

        return undefined
    }

    /**
     * 
     */
    public parseAuthFromRequest(req: express.Request): { id: ObjectID | undefined } {
        const authorization = req.headers['authorization'];

        if (authorization) {
            var test = authorization.split(' ')

            if(test[0] === 'Bearer' && test[1]) {
                var decoded = jwt.verify(test[1], 'shhhhh');
    
                if (decoded) {
                    return {
                        id: decoded.id
                    }
                }
            }
        }

        return undefined
    }

    /**
     * 
     */
    public async validateUser(username: string, password: string): Promise<User | undefined> {
        const user = await UserModel.findOne({
            username: username
        })

        if (user && await user.comparePassword(password)) {
            return user
        }

        return undefined
    }
}
