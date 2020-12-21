//Require Mongoose
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt.js')

//Define a schema
let userSchema = mongoose.Schema;
let SomeModelSchema = new userSchema({
    id: {
        type: Number,
        unique: true,

    },
    name: {
        type: String,

    },
    phone: {
        type: Number,

    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { type: String, required: true },
    animals: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "animalModel"
        }

    ]
})
let UserModel = mongoose.model('UserModel', SomeModelSchema);
module.exports = UserModel;