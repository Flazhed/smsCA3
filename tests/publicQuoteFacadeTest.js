/**
 * Created by Slyngel on 4/8/15.
 */

var should = require('should');
var mongoose = require('mongoose');

//Global test variable, will be set in the ../model/db.js
global.TEST_DATABASE = "mongodb://localhost/TestDB";

//Make sure we use the test DB instead of the other
require("../model/db");

var _users = mongoose.model('Users');
var _quotes = mongoose.model('Quotes');
var _servers = mongoose.model('Servers');

var quotesArray = require('./quotesList').quoteArray;

var QFacade = require('../model/QuoteFacade');


//Missing tests:
//
//Test all methods for non existing topics
//

describe("Testing the publicQuoteFacade", function(){

    //We remove all quotes from the DB before each test
    beforeEach(function(done){

        //_users.remove({}, function(){done()})
        _quotes.remove({}, function(){done()})

        quotesArray.forEach(function(elm){
            elm = new _quotes(elm);
            elm.save(function(err, newQuote) {
                if(err) return console.error(err);
            })
        })

    })

    it("Testing that we get an empty array when there are no quotes", function(done){

        //Removing all the quotes
        {_quotes.remove({}, function(){})}

        QFacade.getAllTopics(function(err, res){
            if(err){throw new Error("DERP")}

            //Should return a empty list with no json objects
            res.toString().should.equal("[]");
            done();
        });
    })

    it("Testing that we get an empty array when we ask for a non existent topic", function(done){
        QFacade.getQuoteByTopic("ASDQWE",function(err, res){
            if(err){throw new Error("DERP")}

            res.should.equal("[]");
            done();
        });
    })

    it("Testing we are able to get a quote", function(done){
        QFacade.getAllTopics(function(err, res){
            if(err){throw new Error("DERP")}

            //Should return a empty list with no json objects
            res.toString().should.equal("[\"Fiskecitater\",\"Koalacitater\"]");
            done();
        });
    })

    it("Testing we are able to get quotes by topic", function(done){
        QFacade.getQuoteByTopic("Koalacitater" ,function(err, res){
            if(err){throw new Error("DERP")}

            var resJSON = JSON.parse(res);

            resJSON.forEach(function(elm){
                elm.topic.should.equal("Koalacitater");
            })

            done();
        });
    })

    it("Testing we are able to get a random quote", function(done){
        QFacade.getRandomQuoteByTopic("Fiskecitater" ,function(err, res){
            if(err){throw new Error("DERP")}

            var resJSON = JSON.parse(res);

            QFacade.getQuoteByTopic("Fiskecitater", function(err, result){
                var resultJSON = JSON.parse(result);

                resultJSON.should.containEql(resJSON);

                done();
            })

        });
    })

    it("getRandomQuoteByTopic - Empty array returned if topic dont exist", function(done){
        QFacade.getRandomQuoteByTopic("ASDASD" ,function(err, res){
            if(err){throw new Error("DERP")}

            var resJSON = JSON.parse(res);

            //WHY DO WE GET NULL SUDDENLY!?!??!?!
            res.should.eql([]);

            done();


        });
    })

})