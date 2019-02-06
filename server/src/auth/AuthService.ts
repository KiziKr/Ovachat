import {express} from 'express';
import { Service } from 'typedi';
import {Action} from "routing-controllers";
const jwt = require('jsonwebtoken')

import { User } from './api/models/user'

@Service()
export class AuthService {
constructor() {
}

// /**
//  * 
//  */
// public parseAuthFromRequest(req: express.Request): { username: string, password: string }  {
//     const authorization = req.headers['authorization'];

//     if(authorization) {
//         var decoded = jwt.verify(authorization, 'shhhhh');

//         if(decoded) {
//             return {
//                 username : decoded.username,
//                 password : decoded.password
//             }
//         }
//     }

//     return undefined
// }

/**
 * 
 */
public async authenticate(username: string, password: string): Promise<string | undefined> {
    var user = await this.validateUser(username, password)

    if(user === undefined) {
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
    // const user = await this.findOne({
    //     where: {
    //         username,
    //         password
    //     },
    // })

    // return user

    // if(await User.comparePassword(user, password)) {
    //     return user;
    // }

    //return undefined
}
