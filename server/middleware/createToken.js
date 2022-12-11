const jwt = require("jsonwebtoken");

module.exports = function (name, expiresIn = "7d") {
    const token = jwt.sign(
        {
            name: name,
        },
        "secret",
        { expiresIn: expiresIn }
    );

    return token;
};
