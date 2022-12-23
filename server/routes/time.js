/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Time = require("../models/time");

function addTimes(time1, time2) {
    // Split the times into hours, minutes, seconds and milliseconds
    const time1Parts = time1.split(":").map((x) => parseInt(x, 10));
    const time2Parts = time2.split(":").map((x) => parseInt(x, 10));
    // Add the times
    const result = [0, 0, 0, 0];
    for (let i = 3; i >= 0; i--) {
        result[i] += time1Parts[i] + time2Parts[i];
        if (result[i] >= 60) {
            result[i - 1] += 1;
            result[i] -= 60;
        }
    }
    // Format the result as a string
    return result.map((x) => x.toString().padStart(2, "0")).join(":");
}

async function formatData(times, chapter) {
    // 使用 reduce 函数统计每个 uid 对应的时间
    const uidToTime = times.reduce((accumulator, time) => {
        if (accumulator[time.uid]) {
            // 如果已经有这个 uid 的时间，则将两个时间相加
            accumulator[time.uid] = addTimes(accumulator[time.uid], time.time);
        } else {
            // 如果没有这个 uid 的时间，则将时间设为当前时间
            accumulator[time.uid] = time.time;
        }
        return accumulator;
    }, {});
    let result = [];
    for (let key in uidToTime) {
        let user = await User.findOne({ _id: key });
        let email = user.email;
        let time = uidToTime[key];
        let passedlevel = times.filter((item) => item.uid === key).length;
        let levelnum = 10;
        let totallevelnum = 50;
        let passed = false;
        if (chapter === "puzzle") {
            passed = true;
        } else if (passedlevel >= levelnum) {
            passed = true;
        }
        if (chapter === "all" && passedlevel < totallevelnum) {
            passed = false;
        }
        result.push({ time: time, user: email, passed: passed });
    }
    return result;
}

router.get("/total", async function (req, res, next) {
    let result = await Time.find(function (error, times) {
        if (error) {
            console.error(error);
        }
    });
    let formatted = await formatData(result, "all");
    res.json({
        status: "0",
        msg: "获取排行榜成功",
        result: formatted,
    });
});

router.post("/chapter", async function (req, res, next) {
    let chapter = req.body.chapter;
    let result = await Time.find({ level: { $regex: "^" + chapter } }, function (
        error,
        times
    ) {
        if (error) {
            console.error(error);
        }
    });
    let formatted = await formatData(result, chapter);
    res.json({
        status: "0",
        msg: "获取排行榜成功",
        result: formatted,
    });
});

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

    if (!user) {
        return res.json({
            status: "1",
            msg: "用户不存在",
            result: "",
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

router.post("/ranklist", async function (req, res, next) {
    let result = [];
    let searchParam = { level: req.body.level };
    let ranklist = await Time.find(searchParam);

    for (let i = 0; i < ranklist.length; i++) {
        let item = ranklist[i];

        let user = await User.findOne({ _id: item.uid });

        result.push({
            user: user.email,
            time: item.time,
        });
    }

    res.json({
        status: "0",
        msg: "获取排行榜成功",
        result: result,
    });
});

module.exports = {
    router: router,
};
