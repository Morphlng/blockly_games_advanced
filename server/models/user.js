const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    recheck: String,
    token: String,
    create_time: Date,
    islive: Boolean,
});

module.exports = mongoose.model("User", userSchema);
