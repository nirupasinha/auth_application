const db = require("../utils/dbHelper")
const { User } = require('../models');
const handler = require("../responseHandler")
const { jwt } = require("../middleware")

module.exports = {
    details: (req, res) => {
        const userObject = req.body;
        console.log("=============", userObject.email);
        db.getUserDetails(User, userObject).then(function successResponse(dbData) {
            if (!dbData) {
                let message = `User does not exist`;
                return handler.responseHandler(res, 400, message, null, dbData)
            } else {
                console.log("get data", dbData);
                let message = `User Details find Successfully`;
                return handler.responseHandler(res, 200, message, null, dbData)
            }
        }).catch(function errorResponse(err) {
            let message = `e`;
            return handler.responseHandler(res, 500, message, err)
        })
    },
    updateProfile: (req, res) => {
        const userObject = req.body;
        console.log("user details from postman", userObject);
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
        console.log("filter email in controller", filter);
        console.log("update details in controller", update);
        db.updateProfile(User, filter, update).then(function successResponse(dbData) {
            console.log("****************", dbData);
            if (!dbData) {
                let message = `user does not exist in database`;
                return handler.responseHandler(res, 404, err, message, dbData)
            } else {
                let message = `Update User Profile successfully`;
                return handler.responseHandler(res, 200, err, message, dbData)
            }
        }).catch(function errorFunction(err) {
            let message = `error...`;
            return handler.responseHandler(res, 500, message, err)
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