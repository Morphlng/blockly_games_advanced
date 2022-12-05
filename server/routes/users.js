/* eslint-disable no-unused-vars */
var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
const config = require('../bin/config');
const createToken = require('../middleware/createToken.js')
const sendMail = require('../middleware/sendMail.js')
const sha1 = require('sha1')
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

/* ----------------Function definition---------------- */
// 注册
function register(req, res, next) {
    living = false;
    if (req.body.email === 'anonymous@anonymous.com') {
        req.body.password = Math.random().toString(36).substring(2, 10);
        living = true;
    }

    let userRegister = new User({
        email: req.body.email,
        password: sha1(req.body.password),
        islive: living
    })
    // 将 objectid 转换为 用户创建时间
    userRegister.create_time = moment(objectIdToTimestamp(userRegister._id)).format('YYYY-MM-DD HH:mm:ss');
    User.findOne({
        email: (userRegister.email).toLowerCase()
    }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: '查询失败',
                result: ''
            })
        } else if (doc) {
            res.json({
                status: '1',
                msg: '用户名已经存在',
                result: doc
            })
        } else {
            userRegister.save((err, doc) => {
                if (err) {
                    console.log(err)
                }
                sendMail(doc.email, doc._id)
                res.json({
                    status: '0',
                    msg: '加入成功',
                    result: doc
                })

            })
        }
    })
}

// 登录
function login(req, res, next) {
    let userLogin = new User({
        email: req.body.email,
        password: sha1(req.body.password),
        token: createToken(this.email)
    })
    console.log('userLogin:' + userLogin)

    User.findOne({
        email: (userLogin.email).toLowerCase()
    }, (err, doc) => {
        console.log('doc:' + doc)
        if (err) {
            res.json({
                status: '1',
                msg: '查询失败',
                result: err
            })
        } else if (!doc) {
            res.json({
                status: '1',
                msg: '账号不存在',
                result: doc
            })
        } else if (!doc.islive) {
            res.json({
                status: '1',
                msg: '账号未激活',
                result: ''
            })
        } else {
            if (userLogin.password == doc.password) {
                res.json({
                    status: '0',
                    msg: '登录成功',
                    result: userLogin
                })
            } else {
                res.json({
                    status: '1',
                    msg: '密码错误',
                    result: doc
                })
            }
        }
    })
}

// 查找用户
function findUser(req, res, next) {
    User.findOne({
        email: (req.body.email).toLowerCase()
    }, (err, doc) => {
        console.log('doc:' + doc)
        if (err) {
            res.json({
                status: '1',
                msg: '查询失败',
                result: err
            })
        } else if (!doc) {
            res.json({
                status: '1',
                msg: '账号不存在',
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '账号存在',
                result: doc._id
            })
        }
    })
}

// 验证用户
function checkCode(req, res, next) {
    var email = req.query.email;
    var code = req.query.code;

    User.findOne({ email: email }, function (err, user) {
        if (user._id == code) {
            User.update({ email: email }, { islive: true }, function (err, doc) {
                if (err) {
                    res.json({
                        status: '1',
                        msg: '激活失败',
                        result: ''
                    })
                } else {
                    res.redirect(`http://${config.web_server}:${config.web_port}/login`)
                }
            });
        }
    });
}

/* ----------------Routes---------------- */
router.post('/register', register);
router.post('/login', login);
router.post('/find', findUser);
router.get('/checkCode', checkCode);


module.exports = {
    "router": router,
    "util":
    {
        "register": register,
        "login": login,
        "findUser": findUser,
        "checkCode": checkCode
    }
};