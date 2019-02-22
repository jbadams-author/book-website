var mongoose = require("mongoose");

var CalendarEventSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    pub_date: { type: Date, default: Date.now },
    event_date: { type: Date, default: Date.now }
})

var CalendarEvent = mongoose.model("CalendarEvent", CalendarEventSchema);

module.exports = CalendarEvent;
