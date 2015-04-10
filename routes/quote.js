/**
 * Created by MS on 07-04-2015.
 */
var express = require('express');
var router = express.Router();

var quoteFacade = require('../model/QuoteFacade');
var userFacade = require('../model/usersFacade');

router.get('/quote', function(req, res){
    quoteFacade.getAllTopics(function(err, elem){
        if(err) return res.send(err)
        res.send(elem)
    })
});

router.get('/quote/:topic', function(req, res){
    var param = req.params.topic;

    // what to do here?
    //var topic = param.toLowerCase();

    quoteFacade.getQuoteByTopic(param, function(err, elem){
        if(err) return res.send(err);
        res.send(elem);
    });
});

router.get('/quote/random/:topic', function(req, res){
    var topic = req.params.topic;

    quoteFacade.getRandomQuoteByTopic(topic, function(err, elem){
        if(err) return res.send(err);
        res.send(elem);
    });
});


//private part -----------------------------------------------------

router.post('/quote', function(req, res){
    var quote = req.body;

    console.log(quote);

    quoteFacade.createQuote(quote, function(err, elem){
        if(err) return res.send(err);
        console.log('added', elem);
        //res.render("addQuote")
    });
});

router.delete('/quote/:id', function(req, res){
    var id = req.params.id;

    quoteFacade.deleteQuote(id, function(err, elem){
       if(err) res.send(err);
        res.send(elem);
    });
});

router.put('/quote', function(req, res){

    var quote = req.body;

    quoteFacade.editQuote(quote, function(err, bool, elem){
        if(err) return res.send(err);

        console.log('The editation was a sucesses: ', bool);

        res.send(elem);
    });
});

router.post('/user', function(req, res){

    var user = req.body;

    console.log(user);

    userFacade.createNewUser(user, function(err, item){
        if(err) return res.send(err);
        res.send(item);
    });

});


module.exports = router;