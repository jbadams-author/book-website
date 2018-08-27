var express      = require('express');

var Author        = require('../models/author');
var adminMidware = require('../middleware/admin');

var router       = express.Router();

// ######################################################################
// CORE ROUTES
// ######################################################################

// INDEX - SHOW ALL ERAS
router.get("/", adminMidware.isAdmin, function(req, res) {
  Author.find({}, function(err, foundAuthors) {
    res.render("authors/index", {authors: foundAuthors});
  });
});

// NEW - SHOW FORM TO CREATE NEW QUOTE
router.get("/new", adminMidware.isAdmin, function(req, res) {
  res.render("authors/new");
});

// CREATE - CREATE NEW QUOTE
router.post("/", adminMidware.isAdmin, function(req, res) {
  var newAuthor = req.body.author;
  Author.create(newAuthor, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/authors");
    }
  });
});

// EDIT - SHOW FORM TO EDIT EXISTING QUOTE
router.get("/:id/edit", adminMidware.isAdmin, function(req, res) {
  Author.findById(req.params.id, function(err, foundAuthor) {
    res.render("authors/edit", {author: foundAuthor});
  });
});

// UPDATE - UPDATE EXISTING QUOTE WITH EDITED INFO
router.put("/:id", adminMidware.isAdmin, function(req, res) {
  Author.findByIdAndUpdate(req.params.id, req.body.author, function(err, updatedAuthor) {
    if (err) {
      res.redirect("/authors");
    } else {
      res.redirect("/authors");
    }
  })
})

// DESTROY - DESTROY EXISTING QUOTE
router.delete("/:id", adminMidware.isAdmin, function(req, res) {
  Author.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/authors");
        } else {
            res.redirect("/authors");
        }
    });
});

module.exports = router;
