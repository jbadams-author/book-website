var express      = require('express');

var Era        = require('../models/era');
var adminMidware = require('../middleware/admin');

var router       = express.Router();

// ######################################################################
// CORE ROUTES
// ######################################################################

// INDEX - SHOW ALL ERAS
router.get("/", adminMidware.isAdmin, function(req, res) {
  Era.find({}, function(err, foundEras) {
    res.render("eras/index", {eras: foundEras});
  });
});


// NEW - SHOW FORM TO CREATE NEW QUOTE
router.get("/new", adminMidware.isAdmin, function(req, res) {
  res.render("eras/new");
});

// CREATE - CREATE NEW QUOTE
router.post("/", adminMidware.isAdmin, function(req, res) {
  var newEra = req.body.era;
  Era.create(newEra, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/eras");
    }
  });
});

// EDIT - SHOW FORM TO EDIT EXISTING QUOTE
router.get("/:id/edit", adminMidware.isAdmin, function(req, res) {
  Era.findById(req.params.id, function(err, foundEra) {
    res.render("eras/edit", {era: foundEra});
  });
});

// UPDATE - UPDATE EXISTING QUOTE WITH EDITED INFO
router.put("/:id", adminMidware.isAdmin, function(req, res) {
  Era.findByIdAndUpdate(req.params.id, req.body.era, function(err, updatedEra) {
    if (err) {
      res.redirect("/eras");
    } else {
      res.redirect("/eras");
    }
  })
})

// DESTROY - DESTROY EXISTING QUOTE
router.delete("/:id", adminMidware.isAdmin, function(req, res) {
  Era.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/eras");
        } else {
            res.redirect("/eras");
        }
    });
});

module.exports = router;
