//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
let animalSchema = mongoose.Schema;
let AnimalModelSchema = new animalSchema({
    id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,

    },
    email: {
        type: String,
    },
    type: {
        type: String,

    },
    breed: {
        type: String,
    },
    age: {
        type: Number,
    },
    color: { type: String },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    }

})
let animalModel = mongoose.model('animalModel', AnimalModelSchema);
module.exports = animalModel;