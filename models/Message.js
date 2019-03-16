const mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    id: { type: String, required: true },
    message: { type: String, required: true },
    reply: { type: Array } 
});

module.exports = mongoose.model('messages', MessageSchema);