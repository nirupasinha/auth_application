const mongoose = require('mongoose');
const UserModel = require('../models/usersModel');
const AnimalModel = require('../models/animalsModel');

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
    checkEmail: (userObject, callback) => {
        console.log(userObject.email)
        UserModel.findOne({ email: userObject.email }, function(err, existingUser) {
            /* err = new Error("mongodb error")
            console.log("error in check mail", err)
            console.log("existing user 
            data", existingUser); */
            callback(err, existingUser)
        })
    },
    insertDocument: (userObject, callback) => { //
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
    insertAnimalDocuments: (userObject, callback) => { //
        const userData = new AnimalModel(userObject) //creating userData instance by passing userObject in userModel

        userData.save((err, dbData) => {
            if (err) {
                console.log("error in registration", err);

            } else {
                console.log("user details", dbData);
            }
            callback(err, dbData) //callback execution
        });
    },


    getUserLoginDetails: (userLoginObject, callback) => {
        //const userLoginData = new UserModel(userLoginObject)
        rerEmail = userLoginObject.email;
        populate('animals')
        UserModel.findOne({ email: rerEmail },
            (err, username) => {
                if (err) {
                    console.log("user is not register", err);
                } else {
                    console.log("user is exist", username);
                }
                callback(err, username) //callback execution
            });
    },

    getUserDetails: (userDetails, callback) => {
        reqEmail = userDetails.email;
        UserModel.find({ email: reqEmail }, (err, userDetails) => {
            if (err) {
                console.log("email is not matched", err);
            } else {
                console.log("User Details", userDetails);
            }
            callback(err, userDetails)
        });
    },
    updateUserProfile: (filter, update, callback) => {
        try {
            UserModel.findOneAndUpdate(filter, update, { new: true }, (err, dbData) => {
                if (err) {
                    console.log("error in update", err);

                } else {
                    console.log("user details", dbData);
                }
                callback(err, dbData);
                console
            });
        } catch (err) {
            console.log(err, "error in findOneAndUpdate method")
        }

    },
    updateAnimalProfile: (filter, update, callback) => {
        try {
            UserModel.findOneAndUpdate(filter, update, { new: true }, (err, dbData) => {
                if (err) {
                    console.log("error in update", err);

                } else {
                    console.log("user details", dbData);
                }
                callback(err, dbData);
                console
            });
        } catch (err) {
            console.log(err, "error in findOneAndUpdate method")
        }

    }

}