const jwt = require('jsonwebtoken');
const handler = require("../responseHandler")
const { JWT_PRIVATE_KEY } = require("../config/constant")


//const SECRET_KEY = "JWT_SECRET";

function createJWTToken(emailId, userRole) {
    return new Promise(function(resolve, reject) {
        jwt.sign({ email: emailId, role: userRole }, JWT_PRIVATE_KEY, {
            expiresIn: "1d"
        }, function(err, token) {
            if (!err) {
                resolve(token)
                console.log("check token", token);
            } else {
                reject(err)
                    // console.log("check mail", token);
            }
            // console.log("token generated", token)
        })
    })
}

//createJWTToken();

function verifyJWTToken(req, res, next) {
    const token = req.headers.authorization;
    console.log("token from postman", token)
    return new Promise(function(resolve, reject) {
        jwt.verify(token, JWT_PRIVATE_KEY, function(err, decoded) {
            if (!err) {
                req.userDetails = decoded.email;
                req.userRole = decoded.role;
                console.log("user email in jwt", req.userDetails);
                console.log("user role in jwt", req.userRole);
                resolve(token)
                console.log("token decoded", decoded);
                next(); //after middleware execution go to next level(controller)
            } else {
                // reject(err)
                let message = `token is not found`;
                return handler.responseHandler(res, 500, message, err);
            }
        });
    })

    // console.log("token verified", decoded)
}
/* verifyJWTToken(req, res).then(function successResponse(matchedToken) {
    const token = req.body;
    if (token) {
        let message = `token is found`;
        return handler.responseHandler(res, 500, message, null, matchedToken);
    }
}).catch(function errorResponse(err) {
    let message = `token is not found`;
    return handler.responseHandler(res, 500, message, err);
}) */


module.exports = { createJWTToken, verifyJWTToken }