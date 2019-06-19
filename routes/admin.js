var express         = require('express'),
    passport        = require('passport'),
    User            = require('../models/user'),
    Email           = require('../models/email'),
    adminMidware    = require('../middleware/admin'),
    emailValidator  = require('email-validator');

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

// EMAIL SIGNUP
router.post("/emailsignup", function(req, res) {
  var validEmail = emailValidator.validate(req.body.emailaddress);
  var responseString = "";

  if (validEmail) {

    Email.find({"email":req.body.emailaddress}, function(err, foundEmails) {
      if (err) {
        responseString = "There was an error, please try again later";
        res.send(responseString);
      } else {
        if (foundEmails.length === 0) {
          var newEmail = {email: req.body.emailaddress}
          Email.create(newEmail, function(err, newlyCreated) {
            if (err) {
              responseString = "There was an error, please try again later";
              res.send(responseString);
            } else {
              responseString = "Thank you for signing up!";
              res.send(responseString);
            }
          });

        } else {
          responseString = "You've already signed up!";
          res.send(responseString);
        }
      }
    })

  } else {
    responseString = "Please enter a valid email address";
    res.send(responseString);
  }
})

module.exports = router;
