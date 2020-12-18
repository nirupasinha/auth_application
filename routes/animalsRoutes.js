const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.post('/registration', controller.animal.animalRegister);
//router.post('/updateUsers', controller.animal.animalRegister);

module.exports = router;