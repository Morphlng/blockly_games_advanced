const jwt = require('jsonwebtoken')

module.exports = function (name) {
    const token = jwt.sign({
        name: name
    }, 'secret', { expiresIn: '30m' });

    return token;
}