import { pre, prop, Typegoose, instanceMethod} from "typegoose"
import { compare } from "semver";
const bcrypt = require('bcrypt');

@pre<User>('save', function (next) {
  var user = this;

  if (!user.isModified('password')) return next();
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        })
})

export class User extends Typegoose {   
    @prop({ required: "Pseudo requis", unique: true, minlength: [3, "trop court"], maxlength: [15, "trop long"], match: /[0-9a-z]*/ })
    username: string;
   
    @prop({ required: "Mot de passe requis", minlength:  [3, "trop court"], maxlength: [30, "trop long"] })
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
}

export const UserModel = new User().getModelForClass(User);