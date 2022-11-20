var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recordSchema = new Schema({
    uid: String,
    level: String,
    progress: String,
    save_time: Date,
})

module.exports = mongoose.model('Record', recordSchema)