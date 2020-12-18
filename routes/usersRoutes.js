const express = require('express');
const controller = require('../controllers');

const router = express.Router();
router.get('/me', controller.user.details);
router.post('/update', controller.user.updateProfile);
//router.post('/changePassword', controller.user.changeUserPassword);

module.exports = router;