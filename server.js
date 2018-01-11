var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var port = 3000;


// mongoose.connect("mongodb://localhost/traveldisc");
var mongoDB = 'mongodb://localhost/traveldisc';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

// set the view engine to ejs
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// database references
var User = require("./models/users");
var Question = require("./models/questions");
var Answer = require("./models/answers");

app.get('/', function(req, res){
  res.render('pages/index');
});

app.get('/questions', function(req, res){
  res.render('pages/questions');
});

app.listen(port, function(){
  console.log("listening on port: " + port);
})
