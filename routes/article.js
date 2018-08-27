var express = require('express'),
    mongoose = require('mongoose');

var Article        = require('../models/article'),
    Era            = require('../models/era'),
    Series         = require('../models/series'),
    Author         = require('../models/author');

var adminMidware    = require('../middleware/admin');
var customFunctions = require('../functions/functions');

var router  = express.Router();

// ######################################################################
// CORE ROUTES
// ######################################################################

// INDEX - SHOW ALL ARTICLES
router.get("/", function(req, res) {
  Article.find({}, function(err, foundArticles) {
    foundArticles.forEach(function(foundArticle) {
      var re1 = /^.{50}[^\s,\.]+/;
      var match = re1.exec(foundArticle.article_body);

      if (match !== null) {
        foundArticle.blurb = match[0] + "...";
      } else {
        foundArticle.blurb = foundArticle.article_body.substring(0,50) + "...";
      }
    })

    customFunctions.sortByPubDate(foundArticles, true);

    res.render("articles/index", {articles: foundArticles});
  })

})

// NEW - SHOW FORM TO CREATE NEW ARTICLE
router.get("/new", adminMidware.isAdmin, function(req, res) {
  Era.find({}, function(err, foundEras) {
    Series.find({}, function(err, foundSeries) {
      Author.find({}, function(err, foundAuthors) {
        var menuObj = {
          eras: foundEras,
          series: foundSeries,
          authors: foundAuthors
        }

        res.render("articles/new", menuObj);
      });
    });
  });
});

// CREATE - CREATE NEW ARTICLE OBJECT
router.post("/", adminMidware.isAdmin, function(req, res) {
  var newArticle = req.body.article;
  newArticle.pub_date = new Date();

  Article.create(newArticle, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/articles");
    }
  });

});

// SHOW - SHOW ARTICLE
router.get("/:id", function(req, res) {
  Article.findById(req.params.id).populate("era").populate("series").populate("author").exec(function(err, foundArticle) {
    if (err) {
      console.log(err);
    } else {
      foundArticle.formattedDate = customFunctions.formatDate(foundArticle.pub_date);
      var part = 1;
      var prevArticle = null;
      var nextArticle = null;

      Article.find({series: foundArticle.series._id}, function(err, allArticlesInSeries) {
        if (err) {
          console.log(err);
        } else {

          customFunctions.sortByPubDate(allArticlesInSeries, true);
          for (var i=0; i<allArticlesInSeries.length; i++) {
            if (allArticlesInSeries[i]["_id"] == req.params.id) {
              part = i+1;
              if (i > 0) {
                prevArticle = allArticlesInSeries[i-1];
              }
              if (i < allArticlesInSeries.length - 1) {
                nextArticle = allArticlesInSeries[i+1];
              }
            }
          }

          res.render("articles/show", {article: foundArticle, nextArticle: nextArticle, prevArticle: prevArticle, part: part});
        }
      })
    }
  });

});

// EDIT - SHOW FORM TO EDIT EXISTING QUOTE
router.get("/:id/edit", adminMidware.isAdmin, function(req, res) {
  Article.findById(req.params.id, function(err, foundArticle) {
    Era.find({}, function(err, foundEras) {
      Series.find({}, function(err, foundSeries) {
        Author.find({}, function(err, foundAuthors) {
          var menuObj = {
            eras: foundEras,
            series: foundSeries,
            authors: foundAuthors
          }

          res.render("articles/edit", {article: foundArticle, menu: menuObj});
        });
      });
    });
  });
});

// UPDATE - UPDATE EXISTING QUOTE WITH EDITED INFO
router.put("/:id", adminMidware.isAdmin, function(req, res) {
  var updated_date = null;
  var to_adjust_date = req.body.adjust_date;

  Article.findById(req.params.id, function(err, foundArticle) {
    if (to_adjust_date == "0") {
      updated_date = foundArticle.pub_date;
    } else if (to_adjust_date == "1") {
      updated_date = new Date();
    }

    req.body.article.pub_date = updated_date;
    Article.findByIdAndUpdate(req.params.id, req.body.article, function(err, updatedArticle) {
      if (err) {
        res.redirect("/articles");
      } else {
        res.redirect("/articles");
      }
    });
  });
})

// DESTROY - DESTROY EXISTING QUOTE
router.delete("/:id", adminMidware.isAdmin, function(req, res) {
  Article.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/articles");
        } else {
            res.redirect("/articles");
        }
    });
});


module.exports = router;
