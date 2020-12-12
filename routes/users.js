const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");

router.post("/signup", (req, res) => {
    const addNewUser = new UserModel(req.body)
    console.log(addNewUser);
});
router.post("/login", (req, res) => {

});
router.get("/me", (req, res) => {

});



module.exports = router;