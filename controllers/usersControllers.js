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
                    // res.send("error in registration", err);

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
                    // console.log("+++++++++++++++", userCredential)
                    // res.send("user details", dbData);
                }

            }
            //res.send("Login Successfully")


        )
    }

}