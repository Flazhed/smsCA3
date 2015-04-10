var express = require('express');
var fs = require('fs');

var userFacade = require('../model/usersFacade');
var quoteFacade = require('../model/QuoteFacade');

var router = express.Router();

var path = __dirname.substr(0,__dirname.lastIndexOf("\\"));  //Remove the routes part

router.get('/home', function(req, res) {

    var _quote = "";
    var _author = "";

    quoteFacade.getRandomQuoteByTopic('Truth', function(err, elem){
        item = JSON.parse(elem);
        _quote = item.quote;
        _author = item.author;

        console.log(_quote);
        res.render('home',{quote: {"quote" : _quote, "author"  :  _author, category: "general"}});
    });


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

router.get('/viewQuotes', function(req, res) {
    res.render('viewQuotes');
});

router.get('/doc', function(req, res) {
    res.render('doc');
});

router.get('/friendQuotes', function(req, res) {
   res.render('quoteFriend');
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
    res.redirect(req.get('referer'));
});

router.post('/addUser', function(req, res){

    var user = req.body;

    userFacade.createNewUser(user, function(err, elem){
        //should provide the user with some feedback!...
        console.log(elem);
    })

});

module.exports = router;