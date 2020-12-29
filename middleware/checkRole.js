const handler = require("../responseHandler")

function IsAdmin(req, res, next) {
    const token = req.headers.authorization;
    console.log("token from postman", token)
    if (req.userRole == "admin") {
        next();
    } else {
        let message = `User has not authorized to access this section`;
        return handler.responseHandler(res, 500, message);
    }

}
module.exports = { IsAdmin }