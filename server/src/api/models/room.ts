import { pre, prop, Typegoose } from "typegoose"

@pre<Room>('save', function (next) {
    if (!this.createdAt) this.createdAt = new Date()
    next();
})

export class Room extends Typegoose {
    @prop()
    createdAt: Date

    @prop({ required: true, unique: true, minlength: 3, maxlength: 10, match: /[0-9a-z]*/ })
    name: string

    @prop()
    password: string

    @prop({ required: true })
    owner: string

    @prop({default : []})
    users: string[]

    @prop({ default: ['visiteur', 'membre'] })
    rolesAccess: string[]
}

export const RoomModel = new Room().getModelForClass(Room);