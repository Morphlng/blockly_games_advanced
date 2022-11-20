const config = require('../bin/config')
const nodemailer = require('nodemailer')

// TODO：Change the email address and password to your own!!
var transporter = nodemailer.createTransport(
    {
        service: 'qq',
        auth: {   // 发送者的账户和授权码
            user: '744247457@qq.com', // 账户
            pass: 'ukhlqhkehfdnbcgc', // smtp授权码，到邮箱设置下获取
        }
    }
);

module.exports = function (email, code) {
    var mailOptions = {
        from: "744247457@qq.com", // 发信邮箱
        to: email, // 接收者邮箱
        subject: "Blockly_games_advanced 验证电子邮箱", // 邮件主题
        text: "您好！",
        html: `<p>感谢您的注册，请点击这里激活您的账号</p>
     <p><a href="http://${config.web_server}:${config.web_port}/users/checkCode?email=${email}&code=${code}">http://${config.web_server}:${config.web_port}/users/checkCode?email=${email}&code=${code}</a></p>
     <p>祝您使用愉快，使用过程中您有任何问题请及时联系我们。</p>
     <p>温馨提示：不要泄漏给其他人，如果无法点击，请复制地址粘贴到浏览器地址栏中按回车。</p>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}




