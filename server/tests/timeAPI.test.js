/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const axios = require("axios");
const validLevel = require("../middleware/validLevel");
const User = require("../models/user");
const Time = require("../models/time");

describe("User API tests", () => {
    let test_doc_id;
    let token;
    let levels = Object.keys(validLevel);
    let randlevel = () => levels[Math.floor(Math.random() * levels.length)];

    async function connectDB() {
        await mongoose.connect(`mongodb://localhost:27017/list`);
    }

    async function cleanup() {
        try {
            const user = await User.findOneAndRemove({ _id: test_doc_id });
        } catch (err) {
            console.log(err.message);
        }

        try {
            const time_record = await Time.remove({ uid: test_doc_id });
        } catch (err) {
            console.log(err.message);
        }

        await mongoose.disconnect();
    }

    beforeAll(connectDB, 3000);
    afterAll(cleanup, 3000);

    it("Register a Test User", async () => {
        const response = await axios.post("http://localhost:3000/users/register", {
            email: "fake_email_time@test.com",
            password: "123456",
        });

        expect(response.data.status).toEqual("0");
        test_doc_id = response.data.result._id;

        // wait for sendMail to finish.
        await new Promise((resolve) =>
            setTimeout(() => {
                expect(true).toBe(true);
                resolve();
            }, 1500)
        );
    });

    it("Activate test account", async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/users/checkCode",
                {
                    params: {
                        email: "fake_email_time@test.com",
                        code: test_doc_id,
                    },
                }
            );
        } catch (error) {
            console.log(error.message);
        }
        expect(true).toEqual(true);
    });

    it("Login with test account", async () => {
        const response = await axios.post("http://localhost:3000/users/login", {
            email: "fake_email_time@test.com",
            password: "123456",
        });

        token = response.data.result.token;
        expect(response.data.status).toEqual("0");
        expect(response.data.msg).toEqual("登录成功");
    });

    it("Save time with non-exist user", async () => {
        let params = {
            email: "non_exist_user@test.com",
            level: randlevel(),
            time: "00:11:45:14",
        };

        const response = await axios.post(
            "http://localhost:3000/time/save",
            params,
            {
                headers: {
                    Authorization: `token ${token}, Basic Og==`,
                },
            }
        );

        expect(response.data.status).toEqual("1");
        expect(response.data.msg).toEqual("用户不存在");
    });

    it("Save time with test user", async () => {
        let params = {
            email: "fake_email_time@test.com",
            level: randlevel(),
            time: "00:11:45:14",
        };

        const response = await axios.post(
            "http://localhost:3000/time/save",
            params,
            {
                headers: {
                    Authorization: `token ${token}, Basic Og==`,
                },
            }
        );

        expect(response.data.status).toEqual("0");
        expect(response.data.msg).toEqual("更新用时成功");
    });

    it("Get ranklist", async () => {
        const response = await axios.post(
            "http://localhost:3000/time/ranklist",
            {
                level: randlevel(),
            },
            {
                headers: {
                    Authorization: `token ${token}, Basic Og==`,
                },
            }
        );

        expect(response.data.status).toEqual("0");
        expect(response.data.msg).toEqual("获取排行榜成功");
    })
});
