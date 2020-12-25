const express = require('express');
const controller = require('../controllers');
const { jwt: { verifyJWTToken } } = require('../middleware');

const router = express.Router();
router.get('/me', verifyJWTToken, controller.user.details); //before controller this route go into verifyJWTToken (middleware) 
router.post('/update', controller.user.updateProfile);
//router.post('/changePassword', controller.user.changeUserPassword);

module.exports = router;