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


_createNewQuote({topic: "Sports",
    author: "Michael Jordan",
    reference: "http://www.brainyquote.com/quotes/topics/topic_sports.html#RE61vPC0oBgId12o.99",
    quote: "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times, I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed."})