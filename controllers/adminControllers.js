const db = require("../utils/dbHelper")
const { User } = require('../models');
const handler = require("../responseHandler")

module.exports = {
    userDetails: (req, res) => {
        userObject = req.body;
        const filter = {};
        db.getAlluserDetails(User, filter).then(function successResponse(dbData) {
            let message = `All users details`;
            return handler.responseHandler(res, 404, message, null, dbData)
        }).catch(function errorResponse(err) {
            let message = `Error in finding of Users`;
            return handler.responseHandler(res, 404, message, err)
        })

    }
}