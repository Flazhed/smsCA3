/**
 * Created by Slyngel on 4/8/15.
 */

//var mongoose = require('mongoose');
//var _quotes = mongoose.model('Quotes');

var _quoteArray = [];

_quoteArray.push({
    topic: "Fiskecitater",
    author: "Ernest Miller Hemingway",
    reference: "1951",
    quote: "Jeg ved ikke, hvorfor jeg skriver Laks med stort, men det er naesten umuligt ikke at gQre det."
})

_quoteArray.push({
    topic: "Fiskecitater",
    author: "SorenLEET",
    reference: "Igaar",
    quote: "Den skal bare have FULD Laks!"
})

_quoteArray.push({
    topic: "Fiskecitater",
    author: "SorenLEET",
    reference: "Igaar",
    quote: "Saa var der den her pige i fitness der spurgte om hvordan man bruger en maskine. Jeg taenkte: Nej, gaa vaek"
})

_quoteArray.push({
    topic: "Koalacitater",
    author: "SorenLEET",
    reference: "igaar",
    quote: "KOALA!"
})


module.exports = {
    quoteArray : _quoteArray
}