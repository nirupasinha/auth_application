const bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = require("../models");

function hashPassword(password, callback) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) {
            console.log(`error in genSalt method, ${err}`)
            callback(err, null)
        } else {
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    console.log(`error in hash method, ${err}`)
                } else {
                    console.log(`hash`)
                }
                callback(err, hash)
            });
        }
    });
}

module.exports = hashPassword;