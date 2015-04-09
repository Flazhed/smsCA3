/**
 * Created by abettbl on 4/9/15.
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

describe("Testing the QuoteFacade", function(){

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


    // WE DONT EVER GET IT FROM THE DB AGAIN TO SEE IF ITS TRUE THIS IS CRIME
    it("CreateNewQuote - If we are able to add a new quote to the DB", function(done){

        var testQuote = {
            topic: "Fiskecitater",
            author: "SorenLEET",
            reference: "Igaar",
            quote: "Hval og rejer"
        }

        QFacade.createQuote(testQuote, function(err, res){

            var resJSON = JSON.parse(res);

            testQuote.topic.should.equal(resJSON.topic);
            testQuote.author.should.equal(resJSON.author);
            testQuote.reference.should.equal(resJSON.reference);
            testQuote.quote.should.equal(resJSON.quote);

            _quotes.findOne({ _id : resJSON._id}, function(err, result){

                result.topic.should.equal(resJSON.topic);
                result.author.should.equal(resJSON.author);
                result.reference.should.equal(resJSON.reference);
                result.quote.should.equal(resJSON.quote);

                done();

            })

        })

    })

    it("DeleteQuote - Trying to delete a created quote",function(done){

        var testQuote = {
            topic: "Fiskecitater",
            author: "qweqwewqe",
            reference: "asdasdsad",
            quote: "asdsad"
        }

        QFacade.createQuote(testQuote, function(err, res) {

            var resJSON = JSON.parse(res);

            QFacade.deleteQuote(resJSON._id, function(errr, result){
                var resultJSON = JSON.parse(result);

                //console.log(result);

                resultJSON.topic.should.equal(testQuote.topic);
                resultJSON.author.should.equal(testQuote.author);
                resultJSON.reference.should.equal(testQuote.reference);
                resultJSON.quote.should.equal(testQuote.quote);

                done();

            })
        })
    })


    it("EditQuote - Trying to edit a quote",function(done){

        var testQuote = {
            topic: "Fiskecitater",
            author: "qweqwewqe",
            reference: "asdasdsad",
            quote: "asdsad"
        }

        QFacade.createQuote(testQuote, function(err, res) {

            var resJSON = JSON.parse(res);

            resJSON.topic = "Fiskecitater";
            resJSON.author = "Koala";
            resJSON.reference = "Kage";
            resJSON.quote = "LAKS!";

            QFacade.editQuote(resJSON, function(errr, value, result){

                result.topic.should.equal(resJSON.topic);
                result.author.should.equal(resJSON.author);
                result.reference.should.equal(resJSON.reference);
                result.quote.should.equal(resJSON.quote);

                done();

            })
        })
    })

})