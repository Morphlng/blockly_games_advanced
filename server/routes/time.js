/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Time = require("../models/time");

router.post("/save", async function (req, res, next) {
    let body = req.body;
    let user;
    let prev_record;
    let best_time;

    try {
        user = await User.findOne({ email: body.email }).lean();
    } catch (err) {
        return res.json({
            status: "1",
            msg: "查询用户失败",
            result: err.message,
        });
    }

    const obj = {
        uid: user._id,
        level: body.level,
        time: body.time,
    };

    try {
        prev_record = await Time.findOne({
            uid: obj.uid,
            level: obj.level,
        }).lean();
    } catch (err) {
        return res.json({
            status: "1",
            msg: "查询关卡用时失败",
            result: err.message,
        });
    }

    if (prev_record) {
        best_time = prev_record.time;
    }

    if (!best_time || best_time > obj.time) {
        Time.findOneAndUpdate(
            {
                uid: obj.uid,
                level: obj.level,
            },
            obj,
            {
                upsert: true, // 如果不存在记录则插入
                new: true, // 返回更新后的document
            }
        )
            .then((doc) => {
                res.json({
                    status: "0",
                    msg: "更新用时成功",
                    result: doc,
                });
            })
            .catch((err) => {
                res.json({
                    status: "1",
                    msg: "更新用时失败",
                    result: err.message,
                });
            });
    }
});

router.post("/ranklist",async function(req,res,next){
    let body = req.body;
    let level = body.level;
    let result = [];
    let searchParam = {"level":level};
    let ranklist = await Time.find(searchParam);
    for (var i = 0;i<ranklist.length;i++){
        let item = ranklist[i];
        let user = await User.findOne({'_id':item.uid});
        let resitem = {
            'user':user.email,
            'time':item.time
        };
        result.push(resitem)
    };
    res.json({
        status: "0",
        msg: "更新用时成功",
        result: result,
    });

});
module.exports = {
    router: router,
};
