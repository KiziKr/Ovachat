import { pre, prop, Typegoose } from "typegoose"
import { Authorized } from "routing-controllers";

@pre<Room>('save', function (next) {
    if (!this.createdAt) this.createdAt = new Date()
    next();
})

export class Room extends Typegoose {
    @prop()
    createdAt: Date

    @prop({ required: true, minlength: 3, maxlength: 10, match: /[0-9a-z]*/ })
    name: string

    @prop()
    password: string

    @prop({ required: true })
    owner: string

    @prop()
    users: string[]

    @prop({ default: ['Visiteur', 'Membre'] })
    rolesAccess: string[]
}

export const RoomModel = new Room().getModelForClass(Room);