var mongoose = require( 'mongoose' );

//Uncomment if you are going to use a local instance or add connection details for your account on MongoLab
//This is set by the backend tests
if( typeof global.TEST_DATABASE != "undefined" ) {
    dbURI = global.TEST_DATABASE;
}
else {
    //var dbURI = 'mongodb://localhost/quotes';
    var dbURI = 'mongodb://grp1:grp1@ds051841.mongolab.com:51841/soren1337';

}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

/** Add SCHEMAS HERE ** */

var usersSchema = {
    firstName: String,
    lastName : String,
    email: String,
    phone: Number,
    password: String
};

var quotesSchema = {
    topic: String,
    author: String,
    reference: String,
    quote: String
};

var remoteServerSchema = {
    url: String,
    authors: Array,
    topics: Array
};

mongoose.model('Users', usersSchema);
mongoose.model('Quotes', quotesSchema);
mongoose.model('Servers', remoteServerSchema);



