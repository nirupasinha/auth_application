const db = require("../utils/dbHelper")
const { User, Animal } = require('../models');
const handler = require("../responseHandler")
module.exports = {
    animalRegister: (req, res) => {
        const animalObject = req.body;
        db.insertDocument(Animal, animalObject, function userResponse(err, dbData) {
            if (err) {
                let message = `error...`;
                return handler.responseHandler(res, 500, err, message, dbData)
            } else if (dbData !== null) {
                let filter = { email: animalObject.email }
                let update = {
                    $push: {
                        animals: dbData._id
                    }
                }
                db.updateProfile(User, filter, update, function userResponse(err, dbData) {
                    if (err) {
                        //execute when get mongo error
                        let message = `error...`;
                        return handler.responseHandler(res, 400, err, message, dbData)
                    } else if (!dbData) {
                        let message = `user does not exist in database`;
                        return handler.responseHandler(res, 404, err, message, dbData)
                    } else {
                        let message = `Update User Profile successfully`;
                        return handler.responseHandler(res, 200, err, message, dbData)
                    }
                })
            } else {
                let message = `animal register successfully`;
                return handler.responseHandler(res, 200, err, message, dbData)
            }
        });

    },

    /* animalUpdate: (req, res) => {
        const userObject = req.body;
        let newUserObject = new Object();
        if (userObject.id && userObject.id > 0) {
            newUserObject.id = userObject.id;
        }
        if (userObject.name && userObject.name !== "") {
            newUserObject.name = userObject.name;
        }

        if (userObject.email && userObject.email !== "") {
            newUserObject.email = userObject.email;
        }
        if (userObject.type && userObject.type > 0) {
            newUserObject.type = userObject.type;
        }
        if (userObject.breed && userObject.breed > 0) {
            newUserObject.breed = userObject.breed;
        }
        if (userObject.age && userObject.age > 0) {
            newUserObject.age = userObject.age;
        }
        if (userObject.color && userObject.color > 0) {
            newUserObject.color = userObject.color;
        }
        let filter = { email: newUserObject.email };
        let update = {
            name: newUserObject.name,
            phone: newUserObject.phone,
            email: newUserObject.email,
            type: newUserObject.type,
            breed: newUserObject.breed,
            age: newUserObject.age,
            color: newUserObject.color
        };
        db.updateProfile(Animal, filter, update, function userResponse(err, dbData) {
            if (err) {
                //execute when get mongo error
                let message = `error... `;
                return handler.responseHandler(res, 500, err, message, dbData)
            } else if (!dbData) {
                let message = `animal does not exist in database`;
                return handler.responseHandler(res, 404, err, message, dbData)
            } else {
                let message = `Update animal Profile successfully`;
                return handler.responseHandler(res, 200, err, message, dbData)
            }
        })

    },
 */
    animalUpdate: (req, res) => {
        db.highestPrice(Animal, function userResponse(err, dbData) {
            if (err) {
                let message = `internal error`;
                return handler.responseHandler(res, 400, err, message, dbData)
            } else {
                let message = `Highest Price Animal`;
                return handler.responseHandler(res, 200, err, message, dbData)
            }
        })
    }
}