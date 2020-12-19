const mongoose = require('mongoose');


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
    checkEmail: (Model, userObject, callback) => {
        Model.findOne({ email: userObject.email }, function(err, existingUser) {
            /* err = new Error("mongodb error")
            console.log("error in check mail", err)
            console.log("existing user 
            data", existingUser); */
            callback(err, existingUser)
        })
    },
    insertDocument: (Model, userObject, callback) => { //
        const dataModel = new Model(userObject) //creating userData instance by passing userObject in userModel
        dataModel.save((err, dbData) => {
            if (err) {
                console.log("error in registration", err);

            } else {
                console.log("user details", dbData);
            }
            callback(err, dbData) //callback execution
        });
    },


    getUserLoginDetails: (Model, userLoginObject, callback) => {
        //const userLoginData = new UserModel(userLoginObject)
        rerEmail = userLoginObject.email;
        Model.findOne({ email: rerEmail },
            (err, username) => {
                if (err) {
                    console.log("user is not register", err);
                } else {
                    console.log("user is exist", username);
                }
                callback(err, username) //callback execution
            });
    },

    getUserDetails: (Model, userDetails, callback) => {
        reqEmail = userDetails.email;
        Model.find({ email: reqEmail }, (err, userDetails) => {
                if (err) {
                    console.log("email is not matched", err);
                } else {
                    console.log("User Details", userDetails);
                }
                callback(err, userDetails)
            }).populate('animals')
            /* .populate('animals').exec((err, data) => {
                console.log("Populated User " + data)
            }) */
            // 
    },
    updateProfile: (Model, filter, update, callback) => {
        try {
            Model.findOneAndUpdate(filter, update, { new: true }, (err, dbData) => {
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
}