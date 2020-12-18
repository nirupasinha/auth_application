const { checkEmail } = require("../utils/dbHelper");
const db = require("../utils/dbHelper")

module.exports = {
    details: (req, res) => {
        const userLogin = req.body;
        db.getUserDetails(userLogin, function userDetails(err, userDetails) {
            if (err) {
                res.status(500).json({
                    status: 'error',
                    ok: true,
                    code: 400,
                    message: '',
                    result: {
                        err
                    },
                });
            } else {
                res.status(500).json({
                    status: 'success',
                    ok: true,
                    code: 200,
                    message: 'User Details',
                    result: {
                        userDetails
                    },
                });
            }
        })
    },
    /*    updateProfile: (req, res) => {
           const userObject = req.body;
           db.checkEmail(userObject, function userResponse(err, existingUser) {
               if (err) {
                   res.status(500).json({
                       status: 'error',
                       ok: true,
                       code: 400,
                       message: err.message || "something wrong",
                       result: {
                           err
                       },
                   });
               } else {
                   if (userObject.id) {
                       existingUser.id = userObject.id;
                   }
                   if (userObject.name) {
                       existingUser.name = userObject.name;
                   }
                   if (userObject.email) {
                       existingUser.id = userObject.email;
                   }
                   if (userObject.id) {
                       existingUser.password = userObject.password;
                   }
                   db.insertDocument(userObject, function userResponse(err, dbData) {
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
                           // res.send("error in registration", err);

                       } else {
                           res.status(200).json({
                               status: 'success',
                               ok: true,
                               code: 200,
                               message: 'User Profile Update successfully',
                               result: {
                                   dbData
                               },
                           });
                           // res.send("user details", dbData);
                       }
                   })

               }
           })

       }, */

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

    },
    /* changeUserPassword: (req, res) => {
        const userObject = req.body;
        db.checkEmail(userObject, function userResponse(err, existingUser) {
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

            } else {
                if (userObject.password == existingUser.password) {
                    if (userObject.newPassword == userObject.confirmPassword) {
                        existingUser.password = userObject.newPassword;
                        console.log(existingUser.password)
                        console.log(userObject.newPassword)
                        console.log(userObject)

                        db.insertDocument(existingUser, function userResponse(err, dbData) {
                            if (err) {
                                res.status(400).json({
                                    status: 'error',
                                    ok: true,
                                    code: 400,
                                    message: 'error ...',
                                    result: {
                                        err
                                    },
                                });
                            } else {
                                res.status(200).json({
                                    status: 'success',
                                    ok: true,
                                    code: 200,
                                    message: 'Password Change successfully',
                                    result: {
                                        dbData
                                    },
                                });
                            }
                        })
                    } else {
                        res.status(500).json({
                            status: 'error',
                            ok: true,
                            code: 400,
                            message: `Please entry same password`,
                            result: {

                            },
                        });
                    }
                } else {
                    res.status(500).json({
                        status: 'error',
                        ok: true,
                        code: 400,
                        message: 'existing password does not matched',
                        result: {

                        },
                    });
                }

            }

        })
    } */
}