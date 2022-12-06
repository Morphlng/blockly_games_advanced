/* eslint-disable no-unused-vars */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const checkToken = require('./middleware/checkToken');
const config = require("./bin/config");

// import Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordRouter = require('./routes/record');

const app = express();

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
});
app.use(checkToken);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter.router);
app.use('/record', recordRouter.router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb://${config.db_server}:${config.db_port}/list`, { useNewUrlParser: true });

mongoose.connection.on("connected", () => {
    console.log('mongodb connection succeed');

    // ! WARNING: This is a hack to insert anonumous user info
    usersRouter.util.register({ "body": { "email": "anonymous@anonymous.com" } }, { "json": () => { } }, null);
});

mongoose.connection.on("error", () => {
    console.log('mongodb connection failed');
});

mongoose.connection.on("disconnected", () => {
    console.log('mongodb connection disconnected');
});

module.exports = app;