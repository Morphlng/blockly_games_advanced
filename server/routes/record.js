/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Record = require('../models/record');
const validLevel = require('../middleware/validLevel');
const moment = require('moment');

/* ----------------Function definition---------------- */

/**
 * 保存进度 (Async)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function saveProgress(req, res, next) {
    let save_cnt = 0;

    function runUpdate(obj) {
        return new Promise((resolve, reject) => {
            Record.findOneAndUpdate(
                {
                    uid: obj.uid,
                    level: obj.level
                },
                obj,
                {
                    upsert: true,   // 如果不存在记录则插入
                    new: true       // 返回更新后的document
                })
                .then(doc => { save_cnt++; resolve(doc); })
                .catch(err => reject(err));
        });
    }

    User.findOne({
        email: req.body.email
    }).lean().then((user) => {
        if (!user) {
            res.json({
                status: '1',
                msg: "用户不存在",
                result: ''
            });
            return;
        }

        const save_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const progress = req.body;
        const promiseArr = []

        for (let level in progress) {
            if (level in validLevel) {
                const obj = {
                    uid: user._id,
                    level: level,
                    progress: progress[level],
                    save_time: save_time,
                };

                promiseArr.push(runUpdate(obj));
            }
        }

        Promise.all(promiseArr)
            .then((docs) => {
                // "docs" is an array of record documents
                // maybe could be of some use?
                res.json({
                    status: '0',
                    msg: "更新进度成功",
                    result: save_cnt
                });
            }
            ).catch(err =>  // error for Record.findOneAndUpdate
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                }));

    }).catch(err => res.json({  // err for User.findOne
        status: '1',
        msg: "查询用户失败",
        result: err.message
    }));
}

/**
 * 加载进度 (Async)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function loadProgress(req, res, next) {
    let user = null;

    try {
        user = await User.findOne({
            email: req.body.email
        }).lean();
    } catch (err) {
        res.json({
            status: '1',
            msg: '查询用户失败',
            result: err.message
        });
        return;
    }

    if (!user) {
        res.json({
            status: '1',
            msg: '用户不存在',
            result: ''
        });
        return;
    }

    try {
        const docs = await Record.find({
            uid: user._id
        });

        res.json({
            status: '0',
            msg: '查询进度成功',
            result: docs
        });
    }
    catch (err) {
        res.json({
            status: '1',
            msg: '查询进度失败',
            result: err.message
        })
    }
}

/**
 * 保存进度 (Callback)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @deprecated Use Async version instead
 */
function saveProgress_callback(req, res, next) {
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

/**
 * 加载进度(Callback)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @deprecated Use Async version instead
 */
function loadProgress_callback(req, res, next) {
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
};