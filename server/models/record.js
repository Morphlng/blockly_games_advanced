const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({
    uid: String,
    level: String,
    progress: String,
    save_time: Date,
});

module.exports = mongoose.model("Record", recordSchema);
