const {Schema} = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    is_admin: {
        type: Boolean,
        default: false,
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = UserSchema;

//email, name, password