/* eslint-disable no-unused-vars */
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Record = require('../models/record');
var validLevel = require('../middleware/validLevel')
const moment = require('moment');

router.post('/load', function (req, res, next) {
    console.log("Backend-load:", req.body);
    // 查询并返回已保存关卡的进度
    User.findOne({
        email: req.body.email,
    }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: '查询用户失败',
                result: err
            });
        }
        else {
            let uid = doc._id;
            Record.find({
                uid: uid
            }, (err, doc) => {
                if (err) {
                    res.json({
                        status: '1',
                        msg: '查询进度失败',
                        result: err
                    });
                }
                else {
                    res.json({
                        status: '0',
                        msg: '查询进度成功',
                        result: doc
                    });
                }
            })
        }
    });
});

router.post('/save', function (req, res, next) {
    // 接收当前关卡进度并更新数据库
    User.findOne({
        email: req.body.email,
    }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: '查询用户失败',
                result: err
            });
        } else {
            let uid = doc._id;
            let save_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            let progress = req.body;

            for (let level in progress) {
                if (level in validLevel) {
                    Record.findOneAndUpdate(
                        {
                            uid: uid,
                            level: level
                        },
                        {
                            progress: progress[level],
                            save_time: save_time
                        },
                        (err, doc) => {
                            if (err) {
                                res.json({
                                    status: '1',
                                    msg: '更新进度失败',
                                    result: err
                                });
                                return;
                            }
                            else if (!doc) {
                                let record = new Record({
                                    uid: uid,
                                    level: level,
                                    progress: progress[level],
                                    save_time: save_time
                                });

                                record.save((err, doc) => {
                                    if (err) {
                                        res.json({
                                            status: '1',
                                            msg: '创建进度失败',
                                            result: err
                                        });
                                        return;
                                    }
                                });
                            }
                        });
                }
            }
        }
    });

    res.json({
        status: '0',
        msg: '保存进度成功',
        result: ''
    });
});

module.exports = router;