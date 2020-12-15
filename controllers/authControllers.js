const db = require("../utils/dbHelper")

module.exports = {
    register: (req, res) => {
        const userObject = req.body;
        db.checkEmail(userObject, function(err, existUser) {
            if (err) { //execute when get mongo error
                res.status(500).json({
                    status: 'error',
                    ok: true,
                    code: 400,
                    message: err.message || "something wrong",
                    result: {
                        err
                    },
                });
            } else if (err == null && existUser !== null) { //execute this con when error is null and user already exist in database 
                res.status(400).json({
                    status: 'error',
                    ok: true,
                    code: 400,
                    message: `user with email, ${existUser.email}, already exist `,
                    result: {

                    },
                });


            } else { //execute when error and user both are not exist 
                db.insertDocument(userObject, function userResponse(err, dbData) { //function definition of callback function(caller)

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
                            message: 'User register successfully',
                            result: {
                                dbData
                            },
                        });
                        // res.send("user details", dbData);
                    }
                })
            }
        })

        //console.log(`++++++++++`, userObject) //inserting to database
        // res.send(userObject); 
    },

    login: (req, res) => {
        const userLogin = req.body;
        db.getUserLoginDetails(userLogin, function userLoginResponse(err, userCredential) {
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
                    // res.send("error in registration", err);

                } else {
                    let passwordMatched = userLogin.password === userCredential.password
                        // console.log(userLogin.password)
                        //  console.log(userCredential.password)
                    res.status(500).json({
                        status: 'success',
                        ok: true,
                        code: 200,
                        message: 'User Details',
                        result: {
                            passwordMatched
                        },
                    });
                    // console.log("+++++++++++++++", userCredential)
                    // res.send("user details", dbData);
                }

            }
            //res.send("Login Successfully")


        )
    }
}