var mongoose = require("mongoose");

var ArticleSchema = new mongoose.Schema({
    title: String,
    image_url: String,
    era: {type: mongoose.Schema.Types.ObjectId, ref: "Era"},
    series: {type: mongoose.Schema.Types.ObjectId, ref: "Series"},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "Author"},
    article_body: String,
    pub_date: { type: Date, default: Date.now }
})

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
