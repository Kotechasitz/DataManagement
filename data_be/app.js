const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport')

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const studentRouter = require('./routes/student');

const errorHandler = require('./middleware/errHandler');

const app = express();

mongoose.connect('mongodb://localhost:27017/student');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// init passport
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/student', studentRouter);

app.use(errorHandler)

module.exports = app;
