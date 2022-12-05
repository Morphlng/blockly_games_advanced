/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Record = require('../models/record');
const validLevel = require('../middleware/validLevel')
const moment = require('moment');

/* ----------------Function definition---------------- */
// 加载进度
function loadProgress(req, res, next) {
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
}

// 保存进度
function saveProgress(req, res, next) {
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
}

/* ----------------Routes---------------- */
router.post('/load', loadProgress);
router.post('/save', saveProgress);


module.exports = {
    "router": router,
    "util":
    {
        "load": loadProgress,
        "save": saveProgress,
    }
}