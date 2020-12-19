const db = require("../utils/dbHelper")
const { User } = require('../models');

module.exports = {
    details: (req, res) => {
        const userLogin = req.body;
        db.getUserDetails(User, userLogin, function userDetails(err, dbData) {
            if (err) {
                let message = `error...`;
                return handler.responseHandler(res, 500, err, message, dbData)
            } else {
                let message = ``;
                return handler.responseHandler(res, 500, err, message, dbData)
            }
        })
    },
    updateProfile: (req, res) => {
        const userObject = req.body;
        let newUserObject = new Object();
        if (userObject.id && userObject.id > 0) {
            newUserObject.id = userObject.id;
        }
        if (userObject.name && userObject.name !== "") {
            newUserObject.name = userObject.name;
        }
        if (userObject.phone && userObject.phone > 0) {
            newUserObject.phone = userObject.phone;
        }
        if (userObject.email && userObject.email !== "") {
            newUserObject.email = userObject.email;
        }
        if (userObject.password && userObject.password > 0) {
            newUserObject.password = userObject.password;
        }
        let filter = { email: newUserObject.email };
        let update = {
            name: newUserObject.name,
            phone: newUserObject.phone,
            email: newUserObject.email,
            password: newUserObject.password
        };
        db.updateProfile(User, filter, update, function userResponse(err, dbData) {
            if (err) {
                //execute when get mongo error
                let message = `Update User Profile successfully`;
                return handler.responseHandler(res, 500, err, message, dbData)
            } else if (!dbData) {
                let message = `user does not exist in database`;
                return handler.responseHandler(res, 404, err, message, dbData)
            } else {
                let message = `Update User Profile successfully`;
                return handler.responseHandler(res, 200, err, message, dbData)
            }
        })

    },
    /*  changeUserPassword: (req, res) => {
         const userObject = req.body;
         db.checkEmail(userObject, function userResponse(err, existingUser) {
             if (err) {
                 //execute when get mongo error
                 let message = `error..`;
                 return handler.responseHandler(res, 200, err, message, dbData)

             } else {
                 if (userObject.password == existingUser.password) {
                     if (userObject.newPassword == userObject.confirmPassword) {
                         existingUser.password = userObject.newPassword;
                         console.log(existingUser.password)
                         console.log(userObject.newPassword)
                         console.log(userObject)

                         db.insertDocument(existingUser, function userResponse(err, dbData) {
                             if (err) {
                                 let message = `error`;
                                 return handler.responseHandler(res, 200, err, message, dbData)
                             } else {
                                 let message = `Password Change successfully`;
                                 return handler.responseHandler(res, 200, err, message, dbData)
                             }
                         })
                     } else {
                         let message = `Please entry same password`;
                         return handler.responseHandler(res, 200, err, message, dbData)
                     }
                 } else {
                     let message = `existing password does not matched`;
                     return handler.responseHandler(res, 200, err, message, dbData)
                 }

             }

         })
     } */
}