var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  //Will be true when the "login" part has been completed

    //bypass the login part for test purpose
   // req.session.user = 'test';


    console.log("session ", req.session.user);

  if (typeof req.session != "undefined" && typeof req.session.user != "undefined") {
    var user = req.session.user;
    res.render("main.ejs", {user: user});
  }
  else {
    res.render("main.ejs");
  }
});

module.exports = router;
