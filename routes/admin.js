var express         = require('express'),
    passport        = require('passport');

var User            = require('../models/user');

var adminMidware    = require('../middleware/admin');

var router  = express.Router();

// ######################################################################
// ROUTES
// ######################################################################

// SHOW ADMIN REGISTRATION FORM
router.get("/register", adminMidware.isAdmin, function(req, res) {
  res.render("admin/register");
})

// REGISTER AN ADMIN USER
router.post("/register", adminMidware.isAdmin, function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/");
    });
  });
})

// SHOW ADMIN LOGIN FORM
router.get("/login", function(req, res) {
    res.render("admin/login");
})

// LOGIN AN ADMIN
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/admin/login"
    }), function(req, res) {
    }
);

// LOGOUT AN ADMIN
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
})

module.exports = router;
