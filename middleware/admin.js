var middlewareObj = {};

middlewareObj.isAdmin = function(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.username == "jbadams_admin") {
      next();
    } else {
      res.redirect("/invalid");
    }
  } else {
    res.redirect("/invalid");
  }
};

module.exports = middlewareObj;
