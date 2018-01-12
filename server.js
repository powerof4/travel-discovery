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

// load the index page
app.get('/', function(req, res){
  res.render('pages/index');
});

// load view - questions for a form to add questions
app.get('/admin/questions', function(req, res){
  res.render('pages/admin/questions');
});

// load view to see all the questions
app.get('/allQuestions', function(req, res){
    Question.find({}, function(err, data){
      if(err) throw err; 

      res.render('pages/admin/all', {
          questions: data
      }); 
  });

});

// save the data from the form
app.post('/saveQuestion', function(req, res){
  var newQuest = new Question({
      title: req.body.quest_title,
      image: req.body.img_file
  });

  // save the new question then render the all page, catch any errors and respond with error
    newQuest.save(function (err){
        if(err) throw err; 

        // populate the answers
        Question.findOne({ title: req.body.quest_title, image: req.body.img_file }).
          populate('_question').
          exec(function(err, data){
            if(err) throw err; 

            console.log(data); 
        });
        // get all the questions and display them on the all page
        Question.find({}, function(err, data){
            if(err) throw err; 

            console.log(data); 
            res.render('pages/admin/all', {
                questions: data
            }); 
        });
    });
});

// get the page based on the id of the question
app.get('/answers/:id', function(req, res){
    Question.findOne({ _id: req.params.id}, function (err, data){
        if(err) throw err; 

        res.render('pages/admin/addAnswers', { 
            question: data
        });
      
    });
});

// save the answers
app.post('/addAnswer', function(req, res){
    console.log(req.body);

    var newAnswer = new Answer({
      response: [req.body.response_text],
      _question: req.body.question_id
  });

  // save the new answer 
  newAnswer.save(function (err){
        if(err) throw err; 

        // find the question based on the id and populate _question
        Question.findOne({ _id: req.body.question_id}).
          populate('_question').
          exec(function(err, data){
            if(err) throw err; 

            // make sure to get a list of the questions

            // res.render('pages/admin/all', {
            //     questions: data
            // }); 
        });
    });
});

app.listen(port, function(){
  console.log("listening on port: " + port);
})
