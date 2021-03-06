require('dotenv').load(); //for loading the .env variables that connect to the mongoDB
var express = require('express');
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var MongoClient = require('mongodb').MongoClient,
  test = require('assert'); //for testing the DB connection
var ObjectId = require('mongodb').ObjectId; //referencing items by "_id" in DB

var yahooFinance = require('yahoo-finance');


// Connection url (MongoDB info)
var userName = process.env.MONGOLAB_USER || "null";
var userPw = process.env.MONGOLAB_UPW || "null";
var dbUrl = 'mongodb://' + userName + ":" + userPw + "@" + "ds039125.mongolab.com:39125/mylonelydb";
var dbConn; //global variable for database connection (connect once)

//Initial DB connection at startup
mongoConnect();

// app.set('port', 8080);
app.set('port', (process.env.PORT || 5000));

//directory for serving static files (CSS, client JS)
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/socket/', function(request, response) {
  response.render('pages/socket-test');
});

io.on('connection', function(socket) {
  console.log('incoming: ');
  // console.log('incoming: ' + JSON.stringify(socket));
  var tweet = {user: "nodesource", text: "Hello, world!"};
  socket.on('connect', function() {
    console.log('user connected');
  });
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('track stock', function(msg) {
    console.log('track stock: ' + msg);
    //stockDataOnClientRequest(msg);
    stockDataOnClientConnect([msg], function(data){
    var stockData = {
      name: msg,
      data: data[msg]
    }
    io.emit('new stock', stockData);
    })
  });
  socket.on('untrack stock', function(msg) {
    console.log('untrack stock: ' + msg);
    io.emit('delete stock', msg);
  });
});

http.listen(app.get('port'), function() {
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

var SYMBOLS = [
  'AAPL',
  'AMZN',
  'GOOGL',
  'YHOO'
];
// stockDataOnClientRequest("ASTI");
// stockDataOnClientConnect(SYMBOLS);

function stockDataOnClientConnect(SYMBOLS, callback){
  yahooFinance.historical({
    symbols: SYMBOLS,
    from: '2015-01-01',
    to: '2015-12-31',
    period: 'd'
  }, function (err, result) {
    if (err) { throw err; }
    console.log(typeof(result));
    // console.log(result.length);
    for(var prop in result) {
      // console.log(prop);
      console.log(JSON.stringify(result[prop])); //result:{"prop":[data]}
      callback(result);
    }
  });
}
function stockDataOnClientRequest(SYMBOL){
  yahooFinance.historical({
    symbol: SYMBOL,
    from: '2015-01-01',
    to: '2015-12-31',
    period: 'd'
  }, function (err, result) {
    if (err) { throw err; }
    console.log(typeof(result));
    // console.log(result.length);
    for(var prop in result) {
      // console.log(prop);
      console.log(JSON.stringify(result[prop])); //result:{"prop":[data]}
    }
  });
}