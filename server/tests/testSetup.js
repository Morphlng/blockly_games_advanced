const app = require("../app");

module.exports = async () => {
    const server = app.listen(3000);
    global.server = server;
};
