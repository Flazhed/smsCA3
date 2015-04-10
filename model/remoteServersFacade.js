var db = require('./db');
var request = require('request');


var mongoose = require('mongoose');
var Server = mongoose.model('Servers');

function _getRandomQuoteFromFriends(topic, callback){


    _getRemoteServers(function(err, data){
        if(err){
            console.log(err)
        }
        else {
            var serverArray = data;

            serverArray.forEach(function(elem){



                elem.topics.forEach(function(topicElem){

                    if(topicElem === topic){
                        var url = elem.url + "api/quote/random/" + topicElem
                        console.log(url);
                        request(url, function(error, response, body) {
                            if(error){
                                callback(error);
                            }
                            else{
                                callback(null, body)
                            }
                        })
                    }


                })

            })




        }
    })


}

//_getRandomQuoteFromFriends("Sad")


function _getRemoteServers(callback){


    Server.find({}, function(err, result){

        if(err){
            callback(err)
        }
        else{
            callback(null, result)
        }

    })


}

module.exports = {

    getRandomQuoteFromFriends : _getRandomQuoteFromFriends

}
