const express = require('express');
const controller = require('../controllers');
const { checkRole: { IsAdmin }, jwt: { verifyJWTToken } } = require('../middleware');

const router = express.Router();
router.get('/userdetails', verifyJWTToken, IsAdmin, controller.admin.userDetails); //before controller this route go into verifyJWTToken (middleware) 
//router.post('/update', verifyJWTToken, controller.user.updateProfile);


module.exports = router;