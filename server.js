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

// load the users page
app.get('/users', function(req, res){
  res.render('pages/users');
});

// load view - questions for a form to add questions
app.get('/admin/questions', function(req, res){
  res.render('pages/admin/questions');
});

// load view to see all the questions
app.get('/allQuestions', function(req, res){
    Question.find({}).populate('_answer').exec(function(err, data){
      if(err) throw err; 

    res.render('pages/admin/all', {
      questions: data
    }); 
  });

});

app.get('/every', function(req, res){
  Question.find({}).populate('_answer').exec(function(err, data){
    if(err) throw err; 

    console.log("All Quest and answers: " + data);

    //   for (var item in data) {
    //     console.log("Answers for the question: " + data[item]._answer[0].response);

    //   }

    res.render('pages/admin/allQuestAns', {
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

        // get all the questions and display them on the all page
        Question.find({}, function(err, data){
          if(err) throw err; 

            // redirect to allQuestions page
            res.redirect('/allQuestions');
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

// save the yes/no answers form
app.post('/addYNAnswer', function(req, res){

  var newAnswer = new Answer({
    response: [req.body.response_text1, req.body.response_text2],
    _question: req.body.question_id
  });
  newAnswer.save(function(err){
    if(err) throw err; 

    Question.findOne({ _id: req.body.question_id }, function(err, questData){
      if(err) throw err;

            // set the _answer of this question to the id 
            questData._answer.push(newAnswer._id); 
            console.log("Quest Data: " + questData); 

            questData.save(function(err){
              console.log('New Answer added...' + questData); 

                // populate theQuestion with the answers to the new question based on the answer model
                Question.findOne({ _id: questData._id }).populate('_answer')
                .exec(function(err, question){
                    // now we have the populated responses, redirect back to the /allQuestions page
                    // questions[idx]._answer.response

                    // redirect to /every to show all questions and answers
                    res.redirect('/every');
                  });
              }); 
            
          });  
  });

});

// this is where the other form needs to be created at
// form actions
app.post('/users', function(req, res){
  var newUser = new User({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email
  });
  newUser.save(function(err){
      if(err) throw err;
  });
  res.redirect('/');
});

app.post('/addMultipleAnswer', function(req, res){
    
    var newAnswer = new Answer({
        response: [req.body.response_text],
        _question: req.body.question_id
    });
  
    newAnswer.save(function(err){
        if(err) throw err; 

        Question.findOne({ _id: req.body.question_id }, function(err, questData){
            if(err) throw err;

            // set the _answer of this question to the id 
            questData._answer.push(newAnswer._id); 
            console.log("Quest Data: " + questData); 

            questData.save(function(err){
                console.log('New Answer added...' + questData); 

                // populate theQuestion with the answers to the new question based on the answer model
                Question.findOne({ _id: questData._id }).populate('_answer')
                        .exec(function(err, question){
                    // now we have the populated responses, redirect back to the /every page

                    // redirect to /every to show all questions and answers
                    res.redirect('/every');
                });
            }); 
            
        });  
    });

});

app.listen(port, function(){
  console.log("listening on port: " + port);
})
