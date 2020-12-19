const db = require("../utils/dbHelper")
const handler = require("../responseHandler")
const { User } = require('../models');
module.exports = {
    register: (req, res) => {
        const userObject = req.body;
        db.checkEmail(User, userObject, function(err, existUser) {
            if (err) { //execute when get mongo error
                let message = `error in email`
                return handler.responseHandler(res, 400, err, message, existUser)

            } else if (err == null && existUser !== null) { //execute this con when error is null and user already exist in database 
                let message = `user with email, ${existUser.email}, already exist `;
                return handler.responseHandler(res, 400, err, message, existUser)
            } else { //execute when error and user both are not exist 
                db.insertDocument(User, userObject, function userResponse(err, dbData) { //function definition of callback function(caller)
                    if (err) {
                        let message = `error....... `;
                        return handler.responseHandler(res, 500, err, message, dbData)

                    } else {
                        let message = `User register successfully `;
                        return handler.responseHandler(res, 200, err, message, dbData)

                    }
                })
            }
        })
    },

    login: (req, res) => {
        const userLogin = req.body;
        db.getUserLoginDetails(User, userLogin, function userLoginResponse(err, userCredential) {
            if (err) {
                let message = `error...`;
                return handler.responseHandler(res, 500, err, message, dbData)
            } else {
                let passwordMatched = userLogin.password === userCredential.password
                let message = `User register successfully `;
                return handler.responseHandler(res, 500, err, message, passwordMatched)
            }

        })
    }
}