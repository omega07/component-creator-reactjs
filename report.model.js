const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportMessage = new Schema({
    message: { type: String }, 
    Date: { type: Date }
});

module.exports = mongoose.model('reportbug',ReportMessage);
