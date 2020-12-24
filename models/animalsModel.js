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
    type: {
        type: String,

    },
    breed: {
        type: String,
    },
    age: {
        type: String,
    },
    color: {
        type: String,
    },
    price: {
        type: Number,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    }

})
let animalModel = mongoose.model('animalModel', AnimalModelSchema);
module.exports = animalModel;