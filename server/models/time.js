const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSchema = new Schema({
    uid: String,
    level: String,
    time: String,
});

module.exports = mongoose.model('Time', timeSchema);