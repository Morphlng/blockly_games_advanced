const mongoose = require("mongoose")

module.exports = async () => {
    global.server.close();
    await mongoose.disconnect();

    console.log("test env teardown...");
}