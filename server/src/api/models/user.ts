import { pre, arrayProp, prop, Typegoose, instanceMethod, InstanceType } from "typegoose"
import { ObjectID } from "bson";
const bcrypt = require('bcrypt');

import { RoomModel } from './room'

@pre<User>('save', function (next) {
    var user = this;

    if (!user.isModified('password')) {
        console.log("le mot de passe est :", user.password)
        return next();
    }

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    })
})

export class User extends Typegoose {
    @prop({ required: true, unique: true, minlength: 3, maxlength: 15, match: /[0-9a-z]*/ })
    username: string;

    @prop({ required: true, minlength: 3, maxlength: 100 })
    password: string;

    @instanceMethod
    comparePassword(password: string): Promise<boolean> {
        var user = this
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true)
            });
        });
    }

    @prop({ default: ['visiteur'] })
    roles: string[]

    @prop()
    room_name: string

    @instanceMethod
    setRoom(this: InstanceType<User>, roomName: string): InstanceType<User> {
        this.room_name = roomName

        return this
    }

    @instanceMethod
    getRoom(): string {
        return this.room_name
    }

    @prop({default: 0})
    status: number
}

export const UserModel = new User().getModelForClass(User);
