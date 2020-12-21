const db = require("../utils/dbHelper");
const handler = require("../responseHandler");
const { User } = require("../models");
//const bcrypt = require('bcrypt.js')
module.exports = {
    register: (req, res) => {
        const userObject = req.body;
        db.checkEmail(User, userObject).then((dbData) => {
            console.log(`check main data, ${dbData}`)
            if (dbData) {
                let message = `user with email, ${dbData.email}, already exist `;
                return handler.responseHandler(res, 400, message, null, dbData);
            } else {
                db.insertDocument(User, userObject).then(function successResponse(dbData) {
                    console.log("insert data", dbData)
                    let message = `User register successfully`;
                    return handler.responseHandler(res, 200, message, null, dbData);
                }).catch(function errorResponse(err) {
                    let message = `error....... `;
                    return handler.responseHandler(res, 500, message, err, dbData);
                });
            }
        }).catch((err) => {
            let message = `error in email`;
            return handler.responseHandler(res, 400, message, err);
        })
    },

    login: (req, res) => {
        const userObject = req.body;
        console.log(`request user object from postman, ${userObject}`);
        db.getUserLoginDetails(User, userObject).then(function successResponse(dbData) {
            let passwordMatched = dbData.password === userCredential.password;
            let message = `User register successfully `;
            return handler.responseHandler(res, 500, err, message, passwordMatched);
        }).catch(function errorResponse(err) {
            let message = `error...`;
            return handler.responseHandler(res, 500, err, message);
        });
    },
};