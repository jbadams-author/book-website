var mongoose = require("mongoose");

var SeriesSchema = new mongoose.Schema({
    series: String
})

var Series = mongoose.model("Series", SeriesSchema);

module.exports = Series;
