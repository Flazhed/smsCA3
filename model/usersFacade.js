var db = require('./db');

var mongoose = require('mongoose');
var User = mongoose.model('Users');

function _createNewUser(user, callback){



    var newUser = new User({

        firstName : user.firstName,
        lastName : user.lastName,
        email: user.email,
        phone: user.phone,
        password: user.password

    })


    newUser.save(function(err, newUser){

        if(err){
            callback(err)
        }
        else{
            //console.log(newUser)
            callback(null, JSON.stringify(newUser))
        }

    })

}

function _validateLogin(userInput, passwordInput, callback){


    User.findOne({email : userInput, password : passwordInput},function(err, result){
        if(err){
            callback(err)
        }
        else {
            if(result) {
                //console.log(result)
                callback(null, JSON.stringify(result))
            }
            else{
                //console.log("nothing brah")
                callback(null, null)
            }

        }
    })

}

// SIMPLE TEST START ----
//
//_createNewUser({firstName : "Per",
//    lastName : "Laursen",
//    email: "per@mail.dk",
//    phone: 123456,
//    password: "test"})

//_validateLogin("psr@mail.dk", "test")


// SIMPLE TEST END ----
module.exports = {

    createNewUser : _createNewUser,
    validateLogin :_validateLogin

}