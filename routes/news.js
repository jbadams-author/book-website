var express = require('express'),
    mongoose = require('mongoose');

var NewsItem        = require('../models/newsItem'),
    CalendarEvent   = require('../models/calendarEvent');

var adminMidware    = require('../middleware/admin');
var customFunctions = require('../functions/functions');

var router  = express.Router();

// ######################################################################
// CORE ROUTES
// ######################################################################

// INDEX - SHOW ALL NEWS ITEMS AND CALENDAR EVENTS
router.get("/", function(req, res) {
  NewsItem.find({}, function(err, foundNewsItems) {

    customFunctions.sortByPubDate(foundNewsItems, false);

    foundNewsItems.forEach(function(foundNewsItem) {
      foundNewsItem.formattedDate = customFunctions.formatDate(foundNewsItem.pub_date);
    })

    res.render("news/index", {newsItems: foundNewsItems});
  })
})

// NEW - SHOW FORM TO CREATE NEW NEWS ITEM
router.get("/new", adminMidware.isAdmin, function(req, res) {
  res.render("news/new");
});

// CREATE - CREATE NEW NEWS ITEM OBJECT
router.post("/", adminMidware.isAdmin, function(req, res) {
  var newNewsItem = req.body.newsItem;
  newNewsItem.pub_date = new Date();

  NewsItem.create(newNewsItem, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/news");
    }
  });
});

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

module.exports = router;
