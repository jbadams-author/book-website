var express = require('express'),
    mongoose = require('mongoose');

var CalendarEvent   = require('../models/calendarEvent');

var adminMidware    = require('../middleware/admin');
var customFunctions = require('../functions/functions');

var router  = express.Router();

// ######################################################################
// CORE ROUTES
// ######################################################################


// NEW - SHOW FORM TO CREATE NEW CALENDAR EVENT
router.get("/new", adminMidware.isAdmin, function(req, res) {
  res.render("calendar/new");
});

// CREATE - CREATE NEW CALENDAR EVENT OBJECT
router.post("/", adminMidware.isAdmin, function(req, res) {
  var newCalendarEvent = req.body.calendarEvent;
  newCalendarEvent.pub_date = new Date();
  newCalendarEvent.event_date = new Date(req.body.calendarEvent.event_date);

  CalendarEvent.create(newCalendarEvent, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/news");
    }
  });
});
/*
// SHOW - SHOW NEWS ITEM
router.get("/:id", function(req, res) {
  NewsItem.findById(req.params.id, function(err, foundNewsItem) {
    if (err) {
      console.log(err);
    } else {
      foundNewsItem.formattedDate = customFunctions.formatDate(foundNewsItem.pub_date);
      res.render("news/show", {newsItem: foundNewsItem});
    }
  })
});

// EDIT - SHOW FORM TO EDIT EXISTING NEWS ITEM
router.get("/:id/edit", adminMidware.isAdmin, function(req, res) {
  NewsItem.findById(req.params.id, function(err, foundNewsItem) {
    res.render("news/edit", {newsItem: foundNewsItem});
  });
});

// UPDATE - UPDATE EXISTING QUOTE WITH EDITED INFO
router.put("/:id", adminMidware.isAdmin, function(req, res) {
  var updated_date = null;
  var to_adjust_date = req.body.adjust_date;

  NewsItem.findById(req.params.id, function(err, foundNewsItem) {
    if (to_adjust_date == "0") {
      updated_date = foundNewsItem.pub_date;
    } else if (to_adjust_date == "1") {
      updated_date = new Date();
    }

    req.body.newsItem.pub_date = updated_date;
    NewsItem.findByIdAndUpdate(req.params.id, req.body.newsItem, function(err, updatedNewsItem) {
      if (err) {
        res.redirect("/news");
      } else {
        res.redirect("/news");
      }
    });
  });
})

// DESTROY - DESTROY EXISTING QUOTE
router.delete("/:id", adminMidware.isAdmin, function(req, res) {
  NewsItem.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/news");
        } else {
            res.redirect("/news");
        }
    });
});
*/

// AJAX ROUTE - GET EVENT DICTIONARY
router.get("/get_event_dictionary", function(req, res) {
  CalendarEvent.find({}, function(err, foundCalendarEvents) {

    var calendarEventsByDayDict = {};
    foundCalendarEvents.forEach(function(foundCalendarEvent) {
      foundCalendarEvent.formattedDate = customFunctions.formatDate(foundCalendarEvent.event_date);

      var dateObj = new Date(foundCalendarEvent.event_date);
      var ymd = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;

      if (ymd in calendarEventsByDayDict) {
      } else {
        calendarEventsByDayDict[ymd] = [];
      }
      calendarEventsByDayDict[ymd].push(foundCalendarEvent);
    })
    res.send(JSON.stringify(calendarEventsByDayDict));
  })
});

// AJAX ROUTE - GET A SINGLE EVENT
router.get("/get_single_event/:id", function(req, res) {
  CalendarEvent.findById(req.params.id, function(err, foundCalendarEvent) {
    res.send(JSON.stringify(foundCalendarEvent));
  })
});

module.exports = router;
