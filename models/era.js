var mongoose = require("mongoose");

var EraSchema = new mongoose.Schema({
    archetype: String,
    maincolor: String,
    accentcolor: String
})

var Era = mongoose.model("Era", EraSchema);

module.exports = Era;
