/**
 * Created by MS on 07-04-2015.
 */
var db = require('./db');

var mongoose = require('mongoose');
var users = mongoose.model('Users');

users.find(function(err, result){

    if(err) return console.log(err);

    console.log(result);

});