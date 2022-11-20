var jwt = require('jsonwebtoken')

module.exports = function (name) {
    const token = jwt.sign({
        name: name
    }, 'secret', { expiresIn: '30m' });
    console.log('服务器token:' + token)
    return token;
}