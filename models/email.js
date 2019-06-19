var mongoose = require("mongoose");

var EmailSchema = new mongoose.Schema({
    email: String,
})

var Email = mongoose.model("Email", EmailSchema);

module.exports = Email;
