var express = require('express');
var fs = require('fs');

var userFacade = require('../model/usersFacade');

var router = express.Router();

var path = __dirname.substr(0,__dirname.lastIndexOf("\\"));  //Remove the routes part

router.get('/home', function(req, res) {
   res.render('home',{quote: {"quote" : "A clear conscience is usually the sign of a bad memory", "author"  :  "Unknown", category: "general"}});
  });

router.get('/pageA', function(req, res) {
   res.render('jadeA',{info: {"text" : "Message to page A"}});
  });

router.get('/signUp', function(req, res) {
   res.render('signUp');
  });

router.get('/restApi', function(req, res) {
    res.render('restApi');
});

router.get('/addQuote', function(req, res) {
    res.render('addQuote');
});

router.get('/pageB', function(req, res) {
   res.render('jadeB');
  });

router.get('/login', function(req, res) {
   res.render('login');
  });

router.post("/login", function(req, res){

    var email = req.body.email;
    var password = req.body.password;

    userFacade.validateLogin(email, password, function(err, item){
        if(err) return console.log(err);
        if(item !== null){
            var jsItem = JSON.parse(item);
            req.session.user = jsItem.firstName;
            return res.redirect('/');
        }
        else{
            //do not rendering main.ejs
            res.redirect('/partials/login');
        };
    });

});

router.get('/logout', function(req, res){
    console.log('si papi');
    delete req.session.user;
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('main.ejs')
});

module.exports = router;