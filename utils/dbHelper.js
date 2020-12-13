const mongoose = require('mongoose');
const UserModel = require('../models/usersModel');

function mongoConnection() {
    mongoose.connect('mongodb+srv://nirupa:sinha@cluster0.fgk4y.mongodb.net/authDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, (err, data) => {
        console.log(`mongo error, ${err}`)
        console.log(`mongo data, ${data}`)
    });
}

mongoConnection()

/* function insertDocument(userObject) {
    const userData = new UserModel(userObject) //creating userData instance by passing userObject in userModel
    userData.save((err, userData) => {
        if (err) {
            console.log("error in registration", err);

        } else {
            console.log("user details", userData);
        }

    });
}
module.exports = {
    mongoInsert: insertDocument
} */
module.exports = {
    insertDocument: (userObject, callback) => { //
        // console.log(callback)
        const userData = new UserModel(userObject) //creating userData instance by passing userObject in userModel
        userData.save((err, dbData) => {
            if (err) {
                console.log("error in registration", err);

            } else {
                console.log("user details", dbData);
            }
            callback(err, dbData) //callback execution
        });
    },
    //login operation
    getUserLoginDetails: (userLoginObject, callback) => {
        //const userLoginData = new UserModel(userLoginObject)
        rerEmail = userLoginObject.email;
        // console.log("+_+_+_+_", userLoginData, rerEmail);
        UserModel.findOne({ email: rerEmail },
            (err, username) => {
                if (err) {
                    console.log("user is not register", err);
                } else {
                    console.log("user is exist", username);
                }
                callback(err, username) //callback execution
            });
    }

}