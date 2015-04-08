var db = require('./db');

var mongoose = require('mongoose');
var Quote = mongoose.model('Quotes');

function _getAllTopics(callback){

    //Return json with all topics
    Quote.find().distinct('topic', function(err, result){

        if(err){
            callback(err)
        }
        else {
            //console.log(JSON.stringify(result));
            callback(null, JSON.stringify(result))
        }
    })

}


function _getQuoteByTopic(topicInput, callback){

    //Return json list with all quotes matching a topic
    Quote.find({topic: topicInput}, function(err, result){
        if(err){
            callback(err)
        }
        else {
            //console.log(JSON.stringify(result));
            callback(null, JSON.stringify(result))
        }
    })

}

function _getRandomQuoteByTopic(topicInput, callback){

    Quote.count({topic: topicInput}, function(err, c){
        if(err){
            callback(err)
        }
        else {
            var random = Math.floor(Math.random() * c);
            console.log(c + " random: " + random);
            Quote.findOne({topic: topicInput}).skip(random).exec(
                function (err, result) {
                    if(err){return console.log(err)}
                    console.log(JSON.stringify(result))
                    //callback(null, JSON.stringify(result))
                });


        }
    })
    //return a single json-quote randomly from the given topic

}

//_getAllTopics()
//_getQuoteByTopic("Fiskecitater");
_getRandomQuoteByTopic("Sports");

module.exports = {
    getAllTopics : _getAllTopics,
    getQuoteByTopic : _getQuoteByTopic,
    getRandomQuoteByTopic : _getRandomQuoteByTopic
}