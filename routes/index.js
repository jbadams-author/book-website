var express = require('express');

var router  = express.Router();

router.get("/", function(req, res) {
  res.render("home")
})

router.get("/jbadams", function(req, res) {
  res.render("jbadams");
})

router.get("/invalid", function(req, res) {
  res.render("invalid");
})

module.exports = router;
