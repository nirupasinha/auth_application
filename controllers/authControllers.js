const db = require("../utils/dbHelper")

module.exports = {
    register: (req, res) => {
        const userObject = req.body;
        db.insertDocument(userObject, function userResponse(err, dbData) { //function definition of callback function(caller)
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
                    res.status(500).json({
                        status: 'success',
                        ok: true,
                        code: 200,
                        message: 'User Details',
                        result: {
                            dbData
                        },
                    });
                    // res.send("user details", dbData);
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