const express = require('express');
module.exports = {
    appRoutes: (app) => {
        const v1 = express.Router();
        app.use('/api', v1);
        v1.use('/auth', require('./authRoutes'));
        v1.use('/user', require('./usersRoutes'));
        v1.use('/animal', require('./animalsRoutes'));
    }
}