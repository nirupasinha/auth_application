const db = require("../utils/dbHelper");
const handler = require("../responseHandler");
const { User } = require("../models");
const bcrypt = require("../utils/bcrypt");
const { jwt } = require("../middleware");
console.log(jwt.createJWTToken);
module.exports = {
    register: (req, res) => {
        const userObject = req.body;
        db.checkEmail(User, userObject).then((dbData) => {
            console.log(`check main data, ${dbData}`)
            if (dbData) {
                let message = `user with email, ${dbData.email}, already exist `;
                return handler.responseHandler(res, 400, message, null, dbData);
            } else {
                bcrypt.hashPassword(userObject.password, function(err, hashedPassword) {
                    if (err) {
                        let message = `error in email`;
                        return handler.responseHandler(res, 400, message, err);
                    } else {
                        console.log(`before hashing ${JSON.stringify(userObject)}`)
                        userObject.password = hashedPassword;
                        console.log(`after hashing ${JSON.stringify(userObject)}`)
                        db.insertDocument(User, userObject).then(function successResponse(dbData) {
                            console.log("insert data", dbData)
                            let message = `User register successfully`;
                            return handler.responseHandler(res, 200, message, null, dbData);
                        }).catch(function errorResponse(err) {
                            let message = `error....... `;
                            return handler.responseHandler(res, 500, message, err, dbData);
                        });
                    }
                })

            }
        }).catch((err) => {
            let message = `error in email`;
            return handler.responseHandler(res, 400, message, err);
        })
    },

    login: (req, res) => {
        const userObject = req.body;
        console.log(userObject);
        const emailId = userObject.email;
        console.log(`request user object from postman, ${userObject}`);
        db.getUserLoginDetails(User, userObject).then(function successResponse(dbData) {
            console.log("user password from database", dbData.password);
            console.log("user password from postman", userObject.password);
            //
            bcrypt.comparePassword(userObject.password, dbData.password, function(err, passwordMatched) {
                if (err) {
                    return handler.responseHandler(res, 500, "bcrypt error", err);
                } else {
                    const userRole = dbData.role;
                    if (passwordMatched == true) {
                        console.log("email id", emailId);
                        console.log("email id", jwt.createJWTToken());
                        jwt.createJWTToken(emailId, userRole).then(function successCreate(createdToken) {
                            let message = `User Login Successfully with token created `;
                            return handler.responseHandler(res, 500, message, null, createdToken);
                        }).catch(function errorCreateToken(err) {
                            let message = `error in token generation`;
                            return handler.responseHandler(res, 500, message, err);
                        });

                    } else {
                        let message = `Password does not matched`;
                        return handler.responseHandler(res, 500, message, null, passwordMatched);
                    }
                }
            })
        }).catch(function errorResponse(err) {
            let message = `user does not exist`;
            return handler.responseHandler(res, 500, message, err);
        });
    },
};