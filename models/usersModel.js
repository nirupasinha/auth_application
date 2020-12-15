//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
let userSchema = mongoose.Schema;
let SomeModelSchema = new userSchema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,

    },
    phone: {
        type: String,
    },

    email: {
        type: String,
        required: true,

    },
    password: { type: String, required: true }
})
let UserModel = mongoose.model('UserModel', SomeModelSchema);
module.exports = UserModel;