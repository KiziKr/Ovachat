import { pre, arrayProp, prop, Typegoose, instanceMethod, InstanceType } from "typegoose"

import { User } from './user'

@pre<Room>('save', function (next) {
    console.log("je passe pour la room")
    if (!this.users) this.users = [];
    if (!this.createdAt) this.createdAt = new Date()
    next();
})

export class Room extends Typegoose {
    @prop()
    createdAt: Date

    @prop({ required: true, unique: true, minlength: 3, maxlength: 10, match: /[0-9a-z]*/ })
    name: string

    @instanceMethod
    setName(this: InstanceType<Room>, name: string): InstanceType<Room> {
        this.name = name
        
        return this
    }

    @prop({ required: true })
    owner: string

    @arrayProp({ items: Array })
    users?: string[];

    /**
     * 
     */
    @instanceMethod
    addUser(this: InstanceType<Room>, user: InstanceType<User>): InstanceType<Room> {
        if (!this.users) {
            this.users = [];
        }

        if(this.users.indexOf(user.username) === -1) {
            this.users.push(user.username);
            user.setRoom(this.name).save();
            this.save()
        }

        return this
    }

    /**
     * 
     */
    @instanceMethod
    removeUser(this: InstanceType<Room>, user: InstanceType<User>) {
        if (!this.users) {
            this.users = [];
        }

        let i = this.users.indexOf(user.username)

        if(i !== -1) {
            this.users.splice(i, 1)
            
            if(user.getRoom() === this.name) {
                user.setRoom('').save()
            }

            this.save()
        }

        return this
    }

    @prop({ default: ['visiteur', 'membre'] })
    roles_access: string[]
}

export const RoomModel = new Room().getModelForClass(Room);