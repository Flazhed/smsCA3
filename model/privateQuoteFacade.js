var db = require('./db');

var mongoose = require('mongoose');
var Quote = mongoose.model('Quotes');

function _createNewQuote(quote, callback){



    var newQuote = new Quote({

        topic: quote.topic,
        author: quote.author,
        reference: quote.reference,
        quote: quote.quote

    })


    newQuote.save(function(err, newQuote){

        if(err){
            callback(err)
        }
        else{
            console.log(newQuote)
            callback(null, JSON.stringify(newQuote))
        }

    })

}


function _deleteQuote(id, callback){


    Quote.findByIdAndRemove(id, function(err, result){

        if(err){
            callback(err)
        }
        else{

            callback(null, JSON.stringify(result))
        }

    })


}

function _getQuoteById(id, callback){


    Quote.find({_id: id}, function(err, result){
        if(err){
            callback(err)
        }
        else {
            //console.log("INSIDE GETBYID!!--- " +result)
            callback(null, result)

        }
    })

}

//_createNewQuote({topic: "Sports",
//    author: "Michael Jordan",
//    reference: "http://www.brainyquote.com/quotes/topics/topic_sports.html#RE61vPC0oBgId12o.99",
//    quote: "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times, I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed."})


//_deleteQuote({topic: "Sports",
//    author: "Michael Jordan",
//    reference: "http://www.brainyquote.com/quotes/topics/topic_sports.html#RE61vPC0oBgId12o.99",
//    quote: "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times, I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
//    _id : "5524fcf9a7364eb409d2b8f7"})


//_getQuoteById("552511fc515b064405e13e6d")
//_deleteQuote("552511fc515b064405e13e6d");

module.exports = {

    createQuote: _createNewQuote,
    deleteQuote: _deleteQuote

};