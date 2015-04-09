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

router.get('/pageB', function(req, res) {
   res.render('jadeB');
  });

router.get('/login', function(req, res) {
   res.render('login');
  });

router.post("/login", function(req, res){

    var email = req.body.email;
    var password = req.body.password;

    console.log(email, password);

    userFacade.validateLogin(email, password, function(err, item){
        if(err) return console.log(err);
        console.log(item);
        if(item !== null){
            console.log(item.firstName);
            req.session.firstName = item.firstName;
            return res.redirect('/');
        }
        else{
            console.log("else");
            //here brah
            res.redirect('/partials/login');
        };
    });

});

module.exports = router;