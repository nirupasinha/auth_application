const express = require('express');
const controller = require('../controllers');

const router = express.Router();
router.get('/me', controller.user.details);

module.exports = router;