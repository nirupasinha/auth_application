//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
let userSchema = mongoose.Schema;
let SomeModelSchema = new userSchema({
    id: {
        type: unique,
    },
    name: {
        type: string,

    },
    phone: {
        type: string,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { type: String, required: true }
})
let UserModel = mongoose.model('UserModel', SomeModelSchema);
module.exports = UserModel;