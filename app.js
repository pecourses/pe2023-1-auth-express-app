const express = require('express');
const { errorHandlers } = require('./middleware');
const { authController } = require('./controllers');

const app = express();

app.use(express.json());

app.post('/signUp', authController.signUp);
app.get('/login', authController.login);

app.use(errorHandlers.errorHandler);

module.exports = app;
