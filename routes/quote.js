/**
 * Created by MS on 07-04-2015.
 */
var express = require('express');
var router = express.Router();

var public = require('../model/publicQuoteFacade');
var private = require('../model/privateQuoteFacade');

router.get('/quote', function(req, res){
    public.getAllTopics(function(err, elem){
        if(err) return res.send(err)
        res.send(elem)
    })
});

router.get('/quote/:topic', function(req, res){
    var param = req.params.topic;

    // what to do here?
    //var topic = param.toLowerCase();

    public.getQuoteByTopic(param, function(err, elem){
        if(err) return res.send(err);
        res.send(elem);
    });
});

router.get('/quote/random/:topic', function(req, res){
    var topic = req.params.topic;

    public.getRandomQuoteByTopic(topic, function(err, elem){
        if(err) return res.send(err)
        res.send(elem);
    });
});


//private part -----------------------------------------------------

router.post('/quote', function(req, res){
    var quote = req.body;

    console.log(quote.body);

    private.createQuote(quote, function(err, elem){
        if(err) return res.send(err)
        res.send(elem)
    });
});

router.delete('/quote/:id', function(req, res){
    var id = req.params.id;

    private.deleteQuote(id, function(err, elem){
       if(err) res.send(err);
        res.send(elem);
    });
});

router.put('/quote', function(req, res){

});

//missing the post user, to be added later

module.exports = router;