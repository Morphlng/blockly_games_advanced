// 监测 token 是否过期
const jwt = require("jsonwebtoken");

let unLogin = {
    get: ["/", "/users/checkCode"],
    post: ["/users/login", "/users/register"],
    put: [],
    delete: [],
};

module.exports = function (req, res, next) {
    let method = req.method.toLowerCase();
    let path = req.path;
    // 接口不需要登陆：直接next
    // 判断method类型，并且是否包含path
    if (unLogin[method] && unLogin[method].indexOf(path) !== -1) {
        console.log(path, "don't need verify");
        return next();
    }

    const t = req.headers["authorization"].split(" ")[1];
    let token = t.substring(0, t.length - 1);

    // 没有token值，返回401
    if (!token) {
        return res.json({
            status: 401,
            msg: "token不存在",
        });
    }
    console.log("checkToken:" + token);

    // 认证token
    jwt.verify(token, "secret", (err, decoded) => {
        console.log("verifying, decoded data:", decoded);
        if (err || typeof decoded == "undefined") {
            return res.json({
                status: 401,
                msg: "token失效",
            });
        } else {
            return next();
        }
    });
};
