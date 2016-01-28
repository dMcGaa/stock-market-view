require('dotenv').load(); //for loading the .env variables that connect to the mongoDB
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient,
  test = require('assert');  //for testing the DB connection
var ObjectId = require('mongodb').ObjectId;  //referencing items by "_id" in DB


// Connection url (MongoDB info)
var userName = process.env.MONGOLAB_USER || "null";
var userPw = process.env.MONGOLAB_UPW || "null";
var dbUrl = 'mongodb://' + userName + ":" + userPw + "@" + "ds039125.mongolab.com:39125/mylonelydb";
var dbConn;  //global variable for database connection (connect once)

//Initial DB connection at startup
mongoConnect();

app.set('port', (process.env.PORT || 5000));

//directory for serving static files (CSS, client JS)
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



// Connect using MongoClient
function mongoConnect() {
  MongoClient.connect(dbUrl, function(err, db) {
    test.equal(null, err);
    dbConn = db; //mongodb connection instance
    // db.close();  //no need to close, let application termination handle this
  });
}