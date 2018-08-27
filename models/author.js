var mongoose = require("mongoose");

var AuthorSchema = new mongoose.Schema({
    name: String
})

var Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;
