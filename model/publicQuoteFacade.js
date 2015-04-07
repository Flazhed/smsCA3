var db = require('./db');

var mongoose = require('mongoose');
var Quote = mongoose.model('Quotes');

function _getAllTopics(callback){

    //Return json with all topics
    Quote.find().distinct('topic', function(err, result){

        if(err){
            console.log(err)
        }
        else {
            console.log(JSON.stringify(result));
            callback(JSON.stringify(result))
        }
    })

}


function _getQuoteByTopic(topicInput, callback){

    //Return json list with all quotes matching a topic
    Quote.find({topic: topicInput}, function(err, result){
        if(err){
            console.log(err)
        }
        else {
            console.log(JSON.stringify(result));
            callback(JSON.stringify(result))
        }
    })

}

function _getRandomQuoteByTopic(topic, callback){

    //return a single json-quote randomly from the given topic

}

//_getAllTopics()
//_getQuoteByTopic("Fiskecitater");