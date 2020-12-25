function authHandler(req, res, next) {
    if (req.token == valid) {
        next()
    } else {
        console.error("token is not valid"); //response to user token is not valid
    }
}