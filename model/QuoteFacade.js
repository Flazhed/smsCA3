var db = require('./db');

var mongoose = require('mongoose');
var Quote = mongoose.model('Quotes');
var remoteServerSModule = require('./remoteServersFacade')
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
            //console.log(newQuote)
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

function _editQuote(quote, callback){


    Quote.update({_id : quote._id}, quote, function(err, numAffected, result){

        if(err){
            //console.log(err)
            callback(err)
        }
        else {

            if(numAffected.ok === numAffected.nModified && numAffected.ok === numAffected.n){
                //console.log(quote, "was updated")
                callback(null, true, quote)
            }
            else{
                //console.log(quote, " was not updated" )
                callback(null, false, quote)
            }


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


    _getAllTopics(function(err, data){

        var foundBool = false;

        data = JSON.parse(data);

        data.forEach(function(elem){
            if(elem === topicInput) foundBool = true;
        })

    if(!foundBool){
        remoteServerSModule.getRandomQuoteFromFriends(topicInput, function(err, friendlyQuote){
            callback(null, friendlyQuote);
        })
    }
    else {
        Quote.count({topic: topicInput}, function (err, c) {
            if (err) {
                callback(err)
            }
            else {
                var random = Math.floor(Math.random() * c);
                //console.log(c + " random: " + random);
                Quote.findOne({topic: topicInput}).skip(random).exec(
                    function (err, result) {
                        if (err) {
                            return console.log(err)
                        }
                        //console.log(JSON.stringify(result))
                        callback(null, JSON.stringify(result))
                    });


            }
        })
    }
    //return a single json-quote randomly from the given topic
    })
}

// SIMPLE TEST START --------------------

//_createNewQuote({topic: "Sports",
//    author: "Michael Jordan",
//    reference: "http://www.brainyquote.com/quotes/topics/topic_sports.html#RE61vPC0oBgId12o.99",
//    quote: "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times, I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed."})


//_deleteQuote({topic: "Sports",
//    author: "Michael Jordan",
//    reference: "http://www.brainyquote.com/quotes/topics/topic_sports.html#RE61vPC0oBgId12o.99",
//    quote: "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times, I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
//    _id : "55251fbd6514d9080de5da7f"})


//_editQuote({topic: "Sports",
//    author: "Jannik",
//    reference: "http://www.brainyquote.com/quotes/topics/topic_sports.html#RE61vPC0oBgId12o.99",
//    quote: "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times, I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
//    _id : "55251fbd6514d9080de5da7f"})

//_getQuoteById("552511fc515b064405e13e6d")
//_deleteQuote("552511fc515b064405e13e6d");


//_getAllTopics()
//_getQuoteByTopic("Fiskecitater");
//_getRandomQuoteByTopic("Sports");

// SIMPLE TEST END --------------------

module.exports = {

    createQuote: _createNewQuote,
    deleteQuote: _deleteQuote,
    editQuote : _editQuote,
    getAllTopics : _getAllTopics,
    getQuoteByTopic : _getQuoteByTopic,
    getRandomQuoteByTopic : _getRandomQuoteByTopic

};