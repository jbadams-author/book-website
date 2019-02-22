// ######################################################################
// REQUIREMENTS
// ######################################################################

// NODE MODULES

var express         = require('express'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    flash           = require('connect-flash'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    methodOverride  = require('method-override');

// MY MODELS
var User            = require("./models/user");

// MY ROUTES
var indexRoutes     = require("./routes/index"),
    adminRoutes     = require("./routes/admin"),
    articleRoutes   = require("./routes/article"),
    quoteRoutes     = require("./routes/quote"),
    eraRoutes       = require("./routes/era"),
    seriesRoutes    = require("./routes/series"),
    authorRoutes    = require("./routes/author"),
    newsRoutes      = require("./routes/news"),
    calendarRoutes  = require("./routes/calendar");

// ######################################################################
// BASIC SETUP
// ######################################################################

// APP CONFIGURATION
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "nB|SKx]g(Go$#:Dg63t]nh1WRj)!EK",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// DB CONFIGURATION
mongoose.connect("mongodb://localhost:27017/botw_db", { useNewUrlParser: true});

// MIDDLEWARE: USER, FLASH MESSAGES AVAILABLE ON EVERY ROUTE
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// ######################################################################
// ROUTES
// ######################################################################

app.use(indexRoutes);
app.use("/admin", adminRoutes);
app.use("/articles", articleRoutes);
app.use("/quotes", quoteRoutes);
app.use("/eras", eraRoutes);
app.use("/series", seriesRoutes);
app.use("/authors", authorRoutes);
app.use("/news", newsRoutes);
app.use("/calendar", calendarRoutes);

app.listen(3001, '0.0.0.0', function() {
  console.log("server has started");
})
