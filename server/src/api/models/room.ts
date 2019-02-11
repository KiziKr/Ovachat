import { Ref, pre, arrayProp, prop, Typegoose, instanceMethod, InstanceType} from "typegoose"

import { User } from './user'

@pre<Room>('save', function (next) {
    if (!this.users) this.users = [];
    if (!this.createdAt) this.createdAt = new Date()
    next();
})

export class Room extends Typegoose {
    @prop()
    createdAt: Date

    @prop({ required: true, unique: true, minlength: 3, maxlength: 10, match: /[0-9a-z]*/ })
    name: string

    @prop({ required: true })
    owner: string

    @arrayProp({ items: Array })
    users?: User[];

    @instanceMethod
    addUser(this: InstanceType<Room>, user: User) {
        if (!this.users) {
            this.users = [];
        }

        this.users.push(user);
        return this.save();
    }

    @prop({ default: ['visiteur', 'membre'] })
    roles_access: string[]
}

export const RoomModel = new Room().getModelForClass(Room);