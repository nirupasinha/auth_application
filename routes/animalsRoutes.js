const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.post('/registration', controller.animal.animalRegister);
router.get('/update', controller.animal.animalUpdate);

module.exports = router;