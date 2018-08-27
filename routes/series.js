var express      = require('express');

var Series        = require('../models/series');
var adminMidware = require('../middleware/admin');

var router       = express.Router();

// ######################################################################
// CORE ROUTES
// ######################################################################

// INDEX - SHOW ALL ERAS
router.get("/", adminMidware.isAdmin, function(req, res) {
  Series.find({}, function(err, foundSeries) {
    res.render("series/index", {allseries: foundSeries});
  });
});

// NEW - SHOW FORM TO CREATE NEW QUOTE
router.get("/new", adminMidware.isAdmin, function(req, res) {
  res.render("series/new");
});

// CREATE - CREATE NEW QUOTE
router.post("/", adminMidware.isAdmin, function(req, res) {
  var newSeries = req.body.series;
  Series.create(newSeries, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/series");
    }
  });
});

// EDIT - SHOW FORM TO EDIT EXISTING QUOTE
router.get("/:id/edit", adminMidware.isAdmin, function(req, res) {
  Series.findById(req.params.id, function(err, foundSeries) {
    res.render("series/edit", {series: foundSeries});
  });
});

// UPDATE - UPDATE EXISTING QUOTE WITH EDITED INFO
router.put("/:id", adminMidware.isAdmin, function(req, res) {
  console.log(req.body.series);
  Series.findByIdAndUpdate(req.params.id, req.body.series, function(err, updatedSeries) {
    if (err) {
      res.redirect("/series");
    } else {
      res.redirect("/series");
    }
  })
})

// DESTROY - DESTROY EXISTING QUOTE
router.delete("/:id", adminMidware.isAdmin, function(req, res) {
  Series.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/series");
        } else {
            res.redirect("/series");
        }
    });
});

module.exports = router;
