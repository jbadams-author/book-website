var mongoose = require("mongoose");

var QuoteSchema = new mongoose.Schema({
    quote: String,
    speaker: String
})

var Quote = mongoose.model("Quote", QuoteSchema);

module.exports = Quote;
