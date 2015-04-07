/**
 * Created by MS on 07-04-2015.
 */
var db = require('./db');

var mongoose = require('mongoose');
var User = mongoose.model('Users');
var Quote = mongoose.model('Quotes');


function addNewQuote(){

    //var newQuote = new Quote({
    //    topic: "Fiskecitater",
    //    author: "Ernest Miller Hemingway",
    //    reference: "1951",
    //    quote: "Jeg ved ikke, hvorfor jeg skriver Laks med stort, men det er næsten umuligt ikke at gøre det."
    //})

    var newQuote = new Quote({
        topic: "Fiskecitater",
        author: "Robert Storm Pedersen",
        reference: "1919",
        quote: "Det må sgu være koldt at være rødspætte."
    })

    newQuote.save(function(err, newQuote) {
        if (err) return console.error(err);
        //console.dir(newQuote);
    });


}

function showAllQuotes(){

    Quote.find(function(err, result){
        console.log(result);
    })

}

//addNewQuote();
//Quote.remove({}, function(err){})

showAllQuotes();
