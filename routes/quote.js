var express      = require('express');

var Quote        = require('../models/quote');
var adminMidware = require('../middleware/admin');

var router       = express.Router();

// ######################################################################
// CORE ROUTES
// ######################################################################

// INDEX - SHOW ALL QUOTES
router.get("/", adminMidware.isAdmin, function(req, res) {
  Quote.find({}, function(err, foundQuotes) {
    res.render("quotes/index", {quotes: foundQuotes});
  });
});

// NEW - SHOW FORM TO CREATE NEW QUOTE
router.get("/new", adminMidware.isAdmin, function(req, res) {
  res.render("quotes/new");
});

// CREATE - CREATE NEW QUOTE
router.post("/", adminMidware.isAdmin, function(req, res) {
  var newQuote = req.body.quote;
  // console.log(quote);
  Quote.create(newQuote, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/quotes");
    }
  });
});

// EDIT - SHOW FORM TO EDIT EXISTING QUOTE
router.get("/:id/edit", adminMidware.isAdmin, function(req, res) {
  Quote.findById(req.params.id, function(err, foundQuote) {
    res.render("quotes/edit", {quote: foundQuote});
  });
});

// UPDATE - UPDATE EXISTING QUOTE WITH EDITED INFO
router.put("/:id", adminMidware.isAdmin, function(req, res) {
  Quote.findByIdAndUpdate(req.params.id, req.body.quote, function(err, updatedQuote) {
    if (err) {
      res.redirect("/quotes");
    } else {
      res.redirect("/quotes");
    }
  })
})

// DESTROY - DESTROY EXISTING QUOTE
router.delete("/:id", adminMidware.isAdmin, function(req, res) {
  Quote.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/quotes");
        } else {
            res.redirect("/quotes");
        }
    });
});

// ######################################################################
// SPECIAL ROUTES
// ######################################################################

router.get("/random", function(req, res) {
  Quote.find({}, function(err, foundQuotes) {
    var idx = Math.floor(Math.random() * foundQuotes.length);
    res.send(foundQuotes[idx]['quote']);
  });
});

module.exports = router;
