/**
 * Created by MS on 07-04-2015.
 */
var express = require('express');
var router = express.Router();

var public = require('../model/publicQuoteFacade');


//router.get('/123', function(req, res){
//    req.session.email = 'test@test.dk';
//    res.end('added');
//});

router.get('/quote', function(req, res){
    public.allTopics(function(elem){
        res.send(elem)
    })
});

router.get('/quote/:topic', function(req, res){
    var param = req.params.topic;

    // what to do here?
    //var topic = param.toLowerCase();

    public.byTopic(param, function(err, elem){
        if(err) return console.log(err);
        res.send(elem);
    });
});

router.get('/quote/:topic/random', function(req, res){

});

router.post('/quote/:topic', function(req, res){
    //if(typeof (req.session.email) !== 'undefined'){
        //var quote = JSON.parse(req.body);
       // console.log('parsed '+quote);
        var quote = req.body;
        quote.topic = req.params.topic;

        console.log(quote.body);
        res.send('ok')

    //}
    //res.end('login in plez');
});

router.delete('/quote/:topic/:id', function(req, res){

});

router.put('/quote/:topic/:id', function(req, res){

});

//missing the post user, to be added later

module.exports = router;