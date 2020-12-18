const { isValidObjectId } = require("mongoose");
const { update } = require("../models/usersModel");
const db = require("../utils/dbHelper")

module.exports = {
    animalRegister: (req, res) => {
        const animalObject = req.body;
        db.insertAnimalDocuments(animalObject, function userResponse(err, dbData) {
            if (err) {
                res.status(500).json({
                    status: 'error',
                    ok: true,
                    code: 400,
                    message: 'error ...',
                    result: {
                        err
                    },
                });
            } else if (dbData !== null) {
                console.log(`=====+++=====`, dbData)
                let filter = { email: animalObject.email }
                let update = {
                    $push: {
                        animals: dbData._id
                    }
                }

                db.updateUserProfile(filter, update, function userResponse(err, dbData) {
                    if (err) {
                        //execute when get mongo error
                        res.status(500).json({
                            status: 'error',
                            ok: true,
                            code: 400,
                            message: err.message || "something wrong",
                            result: {
                                err
                            },
                        });

                    } else if (!dbData) {
                        res.status(404).json({
                            status: 'success',
                            ok: true,
                            code: 404,
                            message: 'user does not exist in database',
                            result: {
                                dbData
                            },
                        });
                    } else {
                        res.status(200).json({
                            status: 'success',
                            ok: true,
                            code: 200,
                            message: 'Update User Profile successfully',
                            result: {
                                dbData
                            },
                        });
                    }
                })
            } else {
                res.status(200).json({
                    status: 'success',
                    ok: true,
                    code: 200,
                    message: 'animal register successfully',
                    result: {
                        dbData
                    },
                });
            }
        });

    },
    animalUpdate: (req, res) => {
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
        db.updateUserProfile(filter, update, function userResponse(err, dbData) {
            if (err) {
                //execute when get mongo error
                res.status(500).json({
                    status: 'error',
                    ok: true,
                    code: 400,
                    message: err.message || "something wrong",
                    result: {
                        err
                    },
                });

            } else if (!dbData) {
                res.status(404).json({
                    status: 'success',
                    ok: true,
                    code: 404,
                    message: 'user does not exist in database',
                    result: {
                        dbData
                    },
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    ok: true,
                    code: 200,
                    message: 'Update User Profile successfully',
                    result: {
                        dbData
                    },
                });
            }
        })

    }

}