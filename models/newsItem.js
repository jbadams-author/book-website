var mongoose = require("mongoose");

var NewsItemSchema = new mongoose.Schema({
    title: String,
    article_body: String,
    pub_date: { type: Date, default: Date.now }
})

var NewsItem = mongoose.model("NewsItem", NewsItemSchema);

module.exports = NewsItem;
